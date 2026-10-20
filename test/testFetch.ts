import {existsSync} from 'node:fs';
import {readFile, writeFile} from 'node:fs/promises';
import {join} from 'node:path';
import {z} from 'zod';
import {AbstractApi, type JsonCallback} from '../src/lib/AbstractApi';

export type TestFetchOptions = {
	storeDirectory: string;
	clone: boolean;
};

const apiBodySchema = z.object({
	id: z.number(),
	method: z.string(),
	params: z.union([z.array(z.object({}).loose()), z.string().array()]),
	version: z.string(),
});

type ApiBody = z.infer<typeof apiBodySchema>;

function assertBody(value: any): asserts value is ApiBody {
	apiBodySchema.parse(value);
}

export class MockFetch {
	#options: TestFetchOptions;
	public constructor(options: TestFetchOptions) {
		this.#options = options;
		this.fetch = this.fetch.bind(this);
	}
	public fetch(input: URL | RequestInfo, init?: RequestInit): Promise<Response> {
		if (this.#options.clone && !process.env.CI) {
			return this.#cloneFetch(input, init);
		}
		return this.#storeFetch(input, init);
	}
	async #cloneFetch(input: URL | RequestInfo, init?: RequestInit): Promise<Response> {
		const response = await fetch(input, init);
		if (response.ok) {
			if (response.headers.get('content-type')?.startsWith('application/json') !== true) {
				console.warn(`Response content-type is not application/json`);
				return response;
			}
			const req = input instanceof Request ? input : new Request(input, init);
			const body = await req.clone().json();
			assertBody(body);
			// console.log(body);
			const output = await response.clone().json();
			if (typeof output === 'object' && output !== null && 'error' in output) {
				console.warn(`Response contains error: ${JSON.stringify(output)}`);
				return response;
			}
			await writeFile(join(this.#options.storeDirectory, this.#buildFileName(body)), JSON.stringify(await response.clone().json(), null, 2));
		}
		return response;
	}
	async #storeFetch(input: URL | RequestInfo, init?: RequestInit): Promise<Response> {
		const req = input instanceof Request ? input : new Request(input, init);
		const body = await req.clone().json();
		assertBody(body);
		const filePath = join(this.#options.storeDirectory, this.#buildFileName(body));
		// check file path, else 404
		if (!existsSync(filePath)) {
			return new Response(JSON.stringify({error: 'File not found'}), {status: 404, headers: {'content-type': 'application/json'}});
		}
		return new Response(await readFile(filePath, 'utf-8'), {status: 200, headers: {'content-type': 'application/json'}});
	}

	#buildFileName(body: ApiBody): string {
		const paramSetup = body.params.reduce<string[]>((acc, param) => {
			acc.push(
				Object.entries(param)
					.map(([key, value]) => {
						if (typeof value === 'object') {
							return `${key}=${JSON.stringify(value).replace(/"/g, '')}`;
						}
						return `${key}=${value}`;
					})
					.join('_'),
			);
			return acc;
		}, []);
		const params = paramSetup.length > 0 ? `#${paramSetup.join('#')}` : '';
		return `${body.method}_${body.version}${params}.json`;
	}
}

export class ApiTester extends AbstractApi {
	public constructor(endpoint: string, props: TestFetchOptions) {
		super(endpoint, {
			fetchClient: new MockFetch(props).fetch,
		});
	}

	public runCall<F extends (callback: JsonCallback<any>) => Promise<any>>(fn: F): ReturnType<F> {
		return fn(this.jsonFirstResultCall) as ReturnType<F>;
	}

	public runResultsCall<F extends (callback: JsonCallback<any>) => Promise<any>>(fn: F): ReturnType<F> {
		return fn(this.jsonResultsCall) as ReturnType<F>;
	}
}

import {isResult, isResults} from '.';
import {AudioApiError, isError} from './error';

// import WebSocket from './WebSocket';

const apiServices = ['system', 'avContent', 'audio', 'guide'] as const;
export type ApiService = (typeof apiServices)[number];

export type JsonRpcArgs = {
	path: ApiService;
	method: string;
	params: object[] | [''];
	version: string;
};

export type JsonCallback<T = any> = (args: JsonRpcArgs) => Promise<T>;

interface IOptions {
	fetchClient?: typeof fetch;
	preFetch?: (headers: Headers) => Promise<void>;
}

/* interface IConnectionState {
	path: ApiService;
	ws: WebSocket | undefined;
	resolves: Record<number, PromiseConstructor>;
} */

/**
 *
 */
export abstract class AbstractApi {
	// private wsConnections: IConnectionState[];
	private idCounter = 1;
	private endpoint: string;
	private fetchClient: typeof fetch;
	private preFetch: ((headers: Headers) => Promise<void>) | undefined;
	public constructor(endpoint: string, options?: IOptions) {
		this.endpoint = endpoint;
		this.jsonFirstResultCall = this.jsonFirstResultCall.bind(this);
		this.jsonResultsCall = this.jsonResultsCall.bind(this);
		this.fetchClient = options?.fetchClient || fetch;
		this.preFetch = options?.preFetch || undefined;
		//this.wsConnections = paths.map((path) => ({path, ws: undefined, resolves: []}));
	}

	public resetIdCounter() {
		this.idCounter = 1;
	}

	protected async jsonFirstResultCall<T = any>({path, method, params, version}: JsonRpcArgs): Promise<T> {
		if (this.idCounter > 90) {
			this.idCounter = 1;
		}
		const body = JSON.stringify({
			id: this.idCounter++,
			method,
			params,
			version,
		});
		const headers = new Headers();
		this.preFetch && (await this.preFetch(headers));
		headers.set('Content-type', 'application/json');
		headers.set('Content-length', body.length.toString());
		const response = await (await this.fetchClient(`${this.endpoint}/${path}`, {method: 'POST', headers, body})).json();
		if (isError(response)) {
			throw new AudioApiError(method, ...response.error);
		}
		if (!isResult(response)) {
			console.error(`Invalid response: ${JSON.stringify(response)}`);
			throw new Error('not valid result');
		}
		return response.result[0];
	}
	protected async jsonResultsCall<T = any>({path, method, params, version}: JsonRpcArgs): Promise<T[]> {
		if (this.idCounter > 90) {
			this.idCounter = 1;
		}
		const body = JSON.stringify({
			id: this.idCounter++,
			method,
			params,
			version,
		});
		const headers = new Headers();
		this.preFetch && (await this.preFetch(headers));
		headers.set('Content-type', 'application/json');
		headers.set('Content-length', body.length.toString());
		const response = await (await this.fetchClient(`${this.endpoint}/${path}`, {method: 'POST', headers, body})).json();
		if (isError(response)) {
			console.error(`Error response for `, body);
			throw new AudioApiError(method, ...response.error);
		}
		if (!isResults(response)) {
			console.error(`Invalid response: ${JSON.stringify(response)}`);
			throw new Error('not valid result');
		}
		return response.results;
	}
	/*	protected async wsCall<T = any>(path: PathType, id: number, method: string, params: object[], version: string): Promise<T> {

		const socket = this.getWsConnection(path);
		if (!socket) {
			throw new Error('no path socket');
		}
		if (!socket.ws) {
			socket.ws = new WebSocket(this.endpoint);
		}
	}
	private getWsConnection(path: PathType): IConnectionState | undefined {
		const socket = this.wsConnections.find((c) => c.path === path);
		return socket;
	}*/
}

import 'cross-fetch/polyfill';
import {isResult} from '.';
import {AudioApiError, isError} from './error';
// import WebSocket from './WebSocket';

const paths = ['system', 'avContent', 'audio', 'guide'] as const;
type PathType = typeof paths[number];

export type JsonCallback<T = any> = (path: 'system' | 'avContent' | 'audio' | 'guide', id: number, method: string, params: object[], version: string) => Promise<T>;

interface IOptions {
	fetchClient?: typeof fetch;
	preFetch?: (headers: Headers) => Promise<void>;
}

/* interface IConnectionState {
	path: PathType;
	ws: WebSocket | undefined;
	resolves: Record<number, PromiseConstructor>;
} */

export abstract class AbstractApi {
	// private wsConnections: IConnectionState[];

	private endpoint: string;
	private fetchClient: typeof fetch;
	private preFetch: ((headers: Headers) => Promise<void>) | undefined;
	constructor(endpoint: string, options?: IOptions) {
		this.endpoint = endpoint;
		this.jsonCall = this.jsonCall.bind(this);
		this.fetchClient = (options && options.fetchClient) || fetch;
		this.preFetch = (options && options.preFetch) || undefined;
		//this.wsConnections = paths.map((path) => ({path, ws: undefined, resolves: []}));
	}
	protected async jsonCall<T = any>(path: PathType, id: number, method: string, params: object[], version: string): Promise<T> {
		const body = JSON.stringify({
			id,
			method,
			params,
			version,
		});
		const headers = new Headers();
		this.preFetch && (await this.preFetch(headers));
		headers.set('Content-type', 'application/json');
		headers.set('Content-length', '' + body.length);
		const response = await (await this.fetchClient(`${this.endpoint}/${path}`, {method: 'POST', headers, body})).json();
		if (isError(response)) {
			throw new AudioApiError(method, ...response.error);
		}
		if (!isResult(response)) {
			throw new Error('not valid result');
		}
		return response.result[0];
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

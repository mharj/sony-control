import type {JsonCallback} from '../../../lib/AbstractApi';
import {PATH, VER} from '.';

export type ApiProtocol = 'xhrpost:jsonizer' | 'websocket:jsonizer';

export type IServiceProtocol = [service: string, protocols: ApiProtocol[]];

export function getServiceProtocols(callback: JsonCallback<IServiceProtocol[]>) {
	return callback({path: PATH, method: 'getServiceProtocols', params: [], version: VER});
}

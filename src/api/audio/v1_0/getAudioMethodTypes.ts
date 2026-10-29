import type {JsonCallback} from '../../../lib/AbstractApi';
import {PATH, VER} from '.';

export type IMethodType = readonly [method: string, inputTypes: string[], outputTypes: string[], version: string];

export function getAudioMethodTypesV1_0(apiVersion = '', callback: JsonCallback<IMethodType[]>) {
	return callback({path: PATH, method: 'getMethodTypes', params: [apiVersion], version: VER});
}

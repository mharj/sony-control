import type {JsonCallback} from '../../../lib/AbstractApi';
import {PATH, VER} from '.';

export type JsonString = string & {__jsonString: true};

export type JsonStringArray = `${JsonString}*` & {__jsonStringArray: true};

export type Arguments = JsonString;

export type Output = JsonString | JsonStringArray

export type MethodType = [methodName: string, arguments: [Arguments] | [], output: [Output] | [], version: string];

export function getMethodTypes_v1_0(callback: JsonCallback<MethodType[]>) {
	return callback({path: PATH, method: 'getMethodTypes', params: [''], version: VER});
}

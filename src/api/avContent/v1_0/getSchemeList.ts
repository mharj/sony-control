import type {JsonCallback} from '../../../lib/AbstractApi';
import {PATH, VER} from '.';

export interface IScheme {
	scheme: string;
}

/**
 * https://developer.sony.com/develop/audio-control-api/api-references/api-overview-2#_getschemelist_v1_0
 */
export function getSchemeList(callback: JsonCallback<IScheme[]>) {
	return callback({path: PATH, method: 'getSchemeList', params: [], version: VER});
}

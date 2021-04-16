import {VER, PATH} from '.';
import {JsonCallback} from '../../../lib/AbstractApi';

export interface IScheme {
	scheme: string;
}

/**
 * https://developer.sony.com/develop/audio-control-api/api-references/api-overview-2#_getschemelist_v1_0
 */
export function getSchemeList(id: number, callback: JsonCallback<IScheme[]>) {
	return callback(PATH, id, 'getSchemeList', [], VER);
}

import {VER, PATH} from '.';
import {JsonCallback} from '../../../lib/AbstractApi';


/**
 * https://developer.sony.com/develop/audio-control-api/api-references/api-overview-2#_getpowerstatus_v1_1
 */
export function getPowerStatus(id: number, callback: JsonCallback<{status: string, standbyDetail?: string}>) {
	return callback(PATH, id, 'getPowerStatus', [], VER);
}

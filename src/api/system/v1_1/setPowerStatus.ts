import {VER, PATH} from '.';
import {JsonCallback} from '../../../lib/AbstractApi';

/**
 * https://developer.sony.com/develop/audio-control-api/api-references/api-overview-2#_getpowerstatus_v1_1
 */
export function setPowerStatus(id: number, status: 'active' | 'standby' | 'off', callback: JsonCallback<void>) {
	return callback(PATH, id, 'setPowerStatus', [{status}], VER);
}

import type {JsonCallback} from '../../../lib/AbstractApi';
import {PATH, VER} from '.';

/**
 * https://developer.sony.com/develop/audio-control-api/api-references/api-overview-2#_setpowerstatus_v1_1
 */
export function setPowerStatus(status: 'active' | 'standby' | 'off', callback: JsonCallback<void>) {
	return callback({path: PATH, method: 'setPowerStatus', params: [{status}], version: VER});
}

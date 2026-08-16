import type {JsonCallback} from '../../../lib/AbstractApi';
import {PATH, VER} from '.';

/**
 * https://developer.sony.com/develop/audio-control-api/api-references/api-overview-2#_setsoundsettings_v1_1
 */
export function setSoundSettings(target: string, value: string, callback: JsonCallback<void>) {
	return callback({path: PATH, method: 'setSoundSettings', params: [{target, value}], version: VER});
}

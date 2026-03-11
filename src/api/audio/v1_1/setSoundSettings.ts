import type {JsonCallback} from '../../../lib/AbstractApi';
import {PATH, VER} from '.';

/**
 * https://developer.sony.com/develop/audio-control-api/api-references/api-overview-2#_setsoundsettings_v1_1
 */
export function setSoundSettings(id: number, target: string, value: string, callback: JsonCallback<void>) {
	return callback(PATH, id, 'setSoundSettings', [{target, value}], VER);
}

import {VER, PATH} from '.';
import {JsonCallback} from '../../../lib/AbstractApi';

/**
 * https://developer.sony.com/develop/audio-control-api/api-references/api-overview-2#_setaudiomute_v1_1
 */
export function setAudioMute(id: number, mute: 'on' | 'off' | 'toggle', output: string | undefined, callback: JsonCallback<void>) {
	return callback(PATH, id, 'setAudioMute', [{output: output || '', mute}], VER);
}

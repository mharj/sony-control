import type {JsonCallback} from '../../../lib/AbstractApi';
import {PATH, VER} from '.';

/**
 * https://developer.sony.com/develop/audio-control-api/api-references/api-overview-2#_setaudiomute_v1_1
 */
export function setAudioMute(mute: 'on' | 'off' | 'toggle', output: string | undefined, callback: JsonCallback<void>) {
	return callback({path: PATH, method: 'setAudioMute', params: [{output: output || '', mute}], version: VER});
}

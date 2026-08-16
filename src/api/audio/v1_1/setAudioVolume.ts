import type {JsonCallback} from '../../../lib/AbstractApi';
import {PATH, VER} from '.';

/**
 * https://developer.sony.com/develop/audio-control-api/api-references/api-overview-2#_setaudiovolume_v1_1
 */
export function setAudioVolume(volume: number, output: string | undefined, callback: JsonCallback<void>) {
	return callback({path: PATH, method: 'setAudioVolume', params: [{output: output || '', volume: `${volume}`}], version: VER});
}

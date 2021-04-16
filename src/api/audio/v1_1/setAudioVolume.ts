import {VER, PATH} from '.';
import {JsonCallback} from '../../../lib/AbstractApi';

/**
 * https://developer.sony.com/develop/audio-control-api/api-references/api-overview-2#_setaudiovolume_v1_1
 */
export function setAudioVolume(id: number, volume: number, output: string | undefined, callback: JsonCallback<void>) {
	return callback(PATH, id, 'setAudioVolume', [{output: output || '', volume: `${volume}`}], VER);
}

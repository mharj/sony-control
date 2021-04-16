import {VER, PATH} from '.';
import {JsonCallback} from '../../../lib/AbstractApi';

export interface IVolumeInformation {
	maxVolume: number;
	minVolume: number;
	mute: string;
	output: string;
	step: number;
	volume: number;
}

/**
 * https://developer.sony.com/develop/audio-control-api/api-references/api-overview-2#_getschemelist_v1_0
 */
export function getSoundSettings(id: number, target: string | undefined, callback: JsonCallback<IVolumeInformation>) {
	return callback(PATH, id, 'getSoundSettings', [{target: target || ''}], VER);
}

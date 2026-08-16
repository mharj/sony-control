import type {JsonCallback} from '../../../lib/AbstractApi';
import {PATH, VER} from '.';

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
export function getSoundSettings(target: string | undefined, callback: JsonCallback<IVolumeInformation>) {
	return callback({path: PATH, method: 'getSoundSettings', params: [{target: target || ''}], version: VER});
}

import type {JsonCallback} from '../../../lib/AbstractApi';
import {PATH, VER} from '.';

export interface ICustomEqualizerCandidate {
	isAvailable: boolean;
	max: number;
	min: number;
	step: number;
	title?: string;
	titleTextID?: string;
	value?: string;
}

export interface ICustomEqualizerSetting {
	candidate: ICustomEqualizerCandidate[];
	currentValue: string;
	deviceUIInfo: string;
	isAvailable: boolean;
	target: string;
	title: string;
	titleTextID: string;
	type: string;
}

/**
 * https://developer.sony.com/develop/audio-control-api/api-references/api-overview-2#_getcustomequalizersettings_v1_0
 *
 * Note: Amp have more target types than API Doc says (not doing strict here), API Doc outdated?
 */
export function getCustomEqualizerSettings(target: undefined | string, callback: JsonCallback<ICustomEqualizerSetting[]>) {
	return callback({path: PATH, method: 'getCustomEqualizerSettings', params: [{target: target || ''}], version: VER});
}

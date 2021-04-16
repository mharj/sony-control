import {VER, PATH} from '.';
import {JsonCallback} from '../../../lib/AbstractApi';

interface ICandidate {
	isAvailable: boolean;
	max: number;
	min: number;
	step: number;
	title: string;
	titleTextID: string;
	value: string;
}

export interface ICustomEqualizerSetting {
	candidate: ICandidate[];
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
export function getCustomEqualizerSettings(id: number, target: undefined | string, callback: JsonCallback<ICustomEqualizerSetting[]>) {
	return callback(PATH, id, 'getCustomEqualizerSettings', [{target: target || ''}], VER);
}

import type {JsonCallback} from '../../../lib/AbstractApi';
import {PATH, VER} from '.';

export interface ISpeakerSettingCandidate {
	isAvailable: boolean;
	max?: number;
	min?: number;
	step?: number;
	title?: string;
	titleTextID?: string;
	value?: string;
}

export interface ISpeakerSetting {
	candidate: ISpeakerSettingCandidate[];
	currentValue: string;
	deviceUIInfo?: string;
	isAvailable: boolean;
	target: string;
	title: string;
	titleTextID: string;
	type: string;
}

export function getSpeakerSettings(target: string | undefined, callback: JsonCallback<ISpeakerSetting[]>) {
	return callback({path: PATH, method: 'getSpeakerSettings', params: [{target: target ?? ''}], version: VER});
}

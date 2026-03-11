import type {JsonCallback} from '../../../lib/AbstractApi';
import {PATH, VER} from '.';

interface IPowerSettingCandidate {
	isAvailable: boolean;
	title: string;
	value: string;
}

export interface IPowerSetting {
	candidate: IPowerSettingCandidate[];
	currentValue: string;
	target: string;
	title: string;
	titleTextID: string;
	type: string;
}

/**
 * No documentation found
 */
export function getPowerSettings(id: number, callback: JsonCallback<IPowerSetting[]>) {
	return callback(PATH, id, 'getPowerSettings', [{settings: []}], VER);
}

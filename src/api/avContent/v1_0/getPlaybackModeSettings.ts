import {VER, PATH} from '.';
import {JsonCallback} from '../../../lib/AbstractApi';

interface IPlaybackModeCandidate {
	isAvailable: boolean;
	title: string;
	titleTextID: string;
	value: string;
}

export interface IPlaybackModeSetting {
	candidate: IPlaybackModeCandidate[];
	currentValue: string;
	isAvailable: boolean;
	target: PlaybackTarget;
	title: string;
	titleTextID: string;
	type: string;
	uri: string;
}

export type PlaybackTarget = 'autoPlayback' | 'playType' | 'repeatType' | 'shuffleType';

/**
 * https://developer.sony.com/develop/audio-control-api/api-references/api-overview-2#_getplaybackmodesettings_v1_0
 */
export function getPlaybackModeSettings(id: number, target: PlaybackTarget | undefined, uri: string | undefined, callback: JsonCallback<IPlaybackModeSetting[]>) {
	return callback(PATH, id, 'getPlaybackModeSettings', [{target: target || '', uri}], VER);
}

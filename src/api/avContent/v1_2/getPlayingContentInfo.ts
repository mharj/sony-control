import type {JsonCallback} from '../../../lib/AbstractApi';
import {PATH, VER} from '.';

export interface IPlayingContentInfo {
	contentKind: string;
	output: string;
	parentUri: string;
	source: string;
	stateInfo: {state: string; supplement: string};
	uri: string;
}

/**
 * https://developer.sony.com/develop/audio-control-api/api-references/api-overview-2#_getplayingcontentinfo_v1_2
 */
export function getPlayingContentInfo(id: number, output: string | undefined, callback: JsonCallback<IPlayingContentInfo[]>) {
	return callback(PATH, id, 'getPlayingContentInfo', [{output: output || ''}], VER);
}

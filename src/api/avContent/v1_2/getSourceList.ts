import type {JsonCallback} from '../../../lib/AbstractApi';
import {PATH, VER} from '.';

export interface ISourceList {
	iconUrl: string;
	isBrowsable: boolean;
	isPlayable: boolean;
	meta: string;
	outputs: string[];
	playAction: string;
	protocols: string[];
	source: string;
	title: string;
	upnpOperationInfo?: {
		containerID: string;
		uuid: string;
	};
}
/**
 * https://developer.sony.com/develop/audio-control-api/api-references/api-overview-2#_getsourcelist_v1_2
 */
export function getSourceList(id: number, scheme: string, callback: JsonCallback<ISourceList[]>) {
	return callback(PATH, id, 'getSourceList', [{scheme}], VER);
}

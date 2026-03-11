import type {JsonCallback} from '../../../lib/AbstractApi';
import {PATH, VER} from '.';

interface IApiNameVersions {
	name: string;
	versions: Array<{version: string}>;
}

export interface IApiInfo {
	apis: IApiNameVersions[];
	notifications: IApiNameVersions[];
	protocols: string[];
	service: string;
}

/**
 * https://developer.sony.com/develop/audio-control-api/api-references/api-overview-2#_getsupportedapiinfo_v1_0
 */
export function getSupportedApiInfo(id: number, callback: JsonCallback<IApiInfo[]>) {
	return callback(PATH, id, 'getSupportedApiInfo', [{services: []}], VER);
}

import type {ApiService, JsonCallback} from '../../../lib/AbstractApi';
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
 * https://pro-bravia.sony.net/remote-display-control/rest-api/reference/#article-1664
 */
export function getSupportedApiInfo(services: ApiService[] | undefined, callback: JsonCallback<IApiInfo[]>) {
	return callback({path: PATH, method: 'getSupportedApiInfo', params: [{services: services ?? null}], version: VER});
}
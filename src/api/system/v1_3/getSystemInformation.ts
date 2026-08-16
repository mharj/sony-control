import type {JsonCallback} from '../../../lib/AbstractApi';
import {PATH, VER} from '.';

export interface ISystemInformation {
	macAddr: string;
	version: string;
	wirelessMacAddr: string;
	bdAddr: string;
	updatableVersion?: string | undefined;
	product?: string | undefined;
	region?: string | undefined;
	language?: string | undefined;
	model?: string | undefined;
	serial?: string | undefined;
	name?: string | undefined;
	generation?: string | undefined;
	area?: string | undefined;
	cid?: string | undefined;
	helpUrl?: string | undefined;
	deviceID?: string | undefined;
	duid?: string | undefined;
	esn?: string | undefined;
	iconUrl?: string | undefined;
	ssid?: string | undefined;
}

/**
 * https://developer.sony.com/develop/audio-control-api/api-references/api-overview-2#_getsysteminformation_v1_4
 *
 * TODO: check as dn1080 reports much less data than API documentation
 */
export function getSystemInformation_v1_3(callback: JsonCallback<ISystemInformation>) {
	return callback({path: PATH, method: 'getSystemInformation', params: [], version: VER});
}

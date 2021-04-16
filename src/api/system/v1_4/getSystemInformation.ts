import {VER, PATH} from '.';
import {JsonCallback} from '../../../lib/AbstractApi';

export interface ISystemInformation {
	bdAddr: string;
	macAddr: string;
	version: string;
	wirelessMacAddr: string;
}

/**
 * https://developer.sony.com/develop/audio-control-api/api-references/api-overview-2#_getsysteminformation_v1_4
 *
 * TODO: check as dn1080 reports much less data than API documentation
 */
export function getSystemInformation(id: number, callback: JsonCallback<ISystemInformation>) {
	return callback(PATH, id, 'getSystemInformation', [], VER);
}

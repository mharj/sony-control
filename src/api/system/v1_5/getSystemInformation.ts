import {VER, PATH} from '.';
import {JsonCallback} from '../../../lib/AbstractApi';

export interface ISystemInformation {
	area: string;
	bdAddr: string;
	bleID: string;
	bluetoothSppRoleForAndroidApp: string;
	bluetoothSppRoleForIosApp: string;
	cid: string;
	deviceColor: string;
	deviceID: string;
	duid: string;
	esn: string;
	generation: string;
	helpUrl: string;
	iconUrl: string;
	initialPowerOnTime: string;
	language: string;
	lastPowerOnTime: string;
	macAddr: string;
	model: string;
	name: string;
	product: string;
	region: string;
	serial: string;
	ssid: string;
	version: string;
	wirelessMacAddr: string;
}

/**
 * https://developer.sony.com/develop/audio-control-api/api-references/api-overview-2#_getsysteminformation_v1_5
 *
 * TODO: check actual info interface as there have been some differences on API and actual data
 */
export function getSystemInformation(id: number, callback: JsonCallback<ISystemInformation>) {
	return callback(PATH, id, 'getSystemInformation', [], VER);
}

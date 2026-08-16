import type {JsonCallback} from '../../../lib/AbstractApi';
import {PATH, VER} from '.';

export type StorageListEntry = {
	deviceName: string;
	formattable: string;
	freeCapacityMB: number;
	isAvailable: string;
	mounted: string;
	permission: string;
	position: string;
	systemAreaCapacityMB: number;
	uri: string;
	volumeLabel: string;
	wholeCapacityMB: number;
};

export type GetStorageListParams_v1_2 = {
	uri: string;
	isRegistered?: string;
};

export function getStorageList_v1_2(param: GetStorageListParams_v1_2 = {uri: ''}, callback: JsonCallback<StorageListEntry>) {
	return callback({path: PATH, method: 'getStorageList', params: [param], version: VER});
}

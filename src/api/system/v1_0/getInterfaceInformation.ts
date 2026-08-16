import type {JsonCallback} from '../../../lib/AbstractApi';
import {PATH, VER} from '.';

export interface IInterfaceInformation {
	interfaceVersion: string;
	modelName: string;
	productCategory: string;
	productName: string;
	serverName: string;
}

export function getInterfaceInformation_v1_0(callback: JsonCallback<IInterfaceInformation>) {
	return callback({path: PATH, method: 'getInterfaceInformation', params: [], version: VER});
}

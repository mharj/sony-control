import type {JsonCallback} from '../../../lib/AbstractApi';
import {PATH, VER} from '.';

export interface IInterfaceInformation {
	interfaceVersion: string;
	modelName: string;
	productCategory: string;
	productName: string;
	serverName: string;
}

export function getInterfaceInformation(id: number, callback: JsonCallback<IInterfaceInformation>) {
	return callback(PATH, id, 'getInterfaceInformation', [], VER);
}

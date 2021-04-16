import {VER, PATH} from '.';
import {JsonCallback} from '../../../lib/AbstractApi';

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

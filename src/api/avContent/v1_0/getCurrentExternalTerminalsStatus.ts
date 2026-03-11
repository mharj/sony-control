import type {JsonCallback} from '../../../lib/AbstractApi';
import {PATH, VER} from '.';

export interface IExternalTerminalStatus {
	active: string;
	connection: string;
	iconUrl: string;
	label: string;
	meta: string;
	outputs: string[];
	title: string;
	uri: string;
}

/**
 * https://developer.sony.com/develop/audio-control-api/api-references/api-overview-2#_getcurrentexternalterminalsstatus_v1_0
 */
export function getCurrentExternalTerminalsStatus(id: number, callback: JsonCallback<IExternalTerminalStatus[]>) {
	return callback(PATH, id, 'getCurrentExternalTerminalsStatus', [], VER);
}

import type {JsonCallback} from '../../../lib/AbstractApi';
import {PATH, VER} from '.';

/**
 * https://developer.sony.com/develop/audio-control-api/api-references/api-overview-2#_getpowerstatus_v1_1
 */
export function getPowerStatus(callback: JsonCallback<{status: string; standbyDetail?: string}>) {
	return callback({path: PATH, method: 'getPowerStatus', params: [], version: VER});
}

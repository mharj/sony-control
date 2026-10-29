import type {JsonCallback} from '../../../lib/AbstractApi';
import {PATH, VER} from '.';

export function getVersions(callback: JsonCallback<string[]>) {
	return callback({path: PATH, method: 'getVersions', params: [], version: VER});
}

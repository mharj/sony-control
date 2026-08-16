import type {JsonCallback} from '../../../lib/AbstractApi';
import {PATH, VER} from '.';

/**
 * https://developer.sony.com/develop/audio-control-api/api-references/api-overview-2#_setplaypreviouscontent_v1_0
 */
export function setPlayPreviousContent(output: string | undefined, callback: JsonCallback<void>) {
	return callback({path: PATH, method: 'setPlayPreviousContent', params: [{output: output || ''}], version: VER});
}

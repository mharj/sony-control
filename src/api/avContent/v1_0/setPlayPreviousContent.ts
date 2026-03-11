import type {JsonCallback} from '../../../lib/AbstractApi';
import {PATH, VER} from '.';

/**
 * https://developer.sony.com/develop/audio-control-api/api-references/api-overview-2#_setplaypreviouscontent_v1_0
 */
export function setPlayPreviousContent(id: number, output: string | undefined, callback: JsonCallback<void>) {
	return callback(PATH, id, 'setPlayPreviousContent', [{output: output || ''}], VER);
}

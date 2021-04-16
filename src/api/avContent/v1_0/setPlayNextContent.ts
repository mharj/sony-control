import {VER, PATH} from '.';
import {JsonCallback} from '../../../lib/AbstractApi';

/**
 * https://developer.sony.com/develop/audio-control-api/api-references/api-overview-2#_setplaynextcontent_v1_0
 */
export function setPlayNextContent(id: number, output: string | undefined, callback: JsonCallback<void>) {
	return callback(PATH, id, 'setPlayNextContent', [{output: output || ''}], VER);
}

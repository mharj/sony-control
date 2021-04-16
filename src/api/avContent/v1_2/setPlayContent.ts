import {VER, PATH} from '.';
import {JsonCallback} from '../../../lib/AbstractApi';

export interface IPlayContentParams {
	keepLastFrame?: boolean;
	positionMsec?: number;
	positionSec?: number;
	repeatType?: 'on' | 'off';
	requester?: 'ui' | 'user';
	resume?: boolean;
	uri?: string;
}
/**
 * https://developer.sony.com/develop/audio-control-api/api-references/api-overview-2#_getsourcelist_v1_2
 */
export function setPlayContent(id: number, params: IPlayContentParams, callback: JsonCallback<void>) {
	return callback(PATH, id, 'setPlayContent', [params], VER);
}

import type {JsonCallback} from '../../../lib/AbstractApi';
import {PATH, VER} from '.';

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
export function setPlayContent(params: IPlayContentParams, callback: JsonCallback<void>) {
	return callback({path: PATH, method: 'setPlayContent', params: [params], version: VER});
}

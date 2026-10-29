import type {JsonCallback} from '../../../lib/AbstractApi';
import {PATH, VER} from '.';

export interface SetSpeakerSettingParams {
	target: string;
	value: string;
}

/**
 * https://developer.sony.com/develop/audio-control-api/api-references/api-overview-2#_setspeakersettings_v1_0
 */
export function setSpeakerSettings(settings: SetSpeakerSettingParams[], callback: JsonCallback<void>) {
	return callback({path: PATH, method: 'setSpeakerSettings', params: [{settings}], version: VER});
}

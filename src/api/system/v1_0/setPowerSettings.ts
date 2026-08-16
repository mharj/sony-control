import type {JsonCallback} from '../../../lib/AbstractApi';
import {PATH, VER} from '.';

export type SetPowerSettingParams_v1_0 = {
	target: string;
	value: string;
};

/**
 * No documentation found
 *
 * Setting values are coming from getPowerSettings candidate list (usually 'on' ||'off')
 * settings example
 * @example
 * [{target: 'wolMode', value: 'on'}]
 * [{target: 'quickStartMode', value: 'off'}]
 */
export function setPowerSettings_v1_0(settings: SetPowerSettingParams_v1_0[], callback: JsonCallback<void>) {
	return callback({path: PATH, method: 'setPowerSettings', params: [{settings}], version: VER});
}

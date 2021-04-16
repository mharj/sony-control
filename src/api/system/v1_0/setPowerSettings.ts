import {VER, PATH} from '.';
import {JsonCallback} from '../../../lib/AbstractApi';


export interface IPowerSettings {
	target: string;
	value: string; 
}

/**
 * No documentation found
 * 
 * Setting values are coming from getPowerSettings candidate list (usually 'on' ||'off')
 * settings example
 * @example
 * [{target: 'wolMode', value: 'on'}]
 * [{target: 'quickStartMode', value: 'off'}]
 */
export function setPowerSettings(id: number, settings: IPowerSettings[], callback: JsonCallback<void>) {
	return callback(PATH, id, 'setPowerSettings', [{settings}], VER);
}

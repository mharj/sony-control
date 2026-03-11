import {AbstractSonyStrDn1080} from '../map/SonyStrDn1080';

const extInput = ['bd-dvd', 'btAudio', 'game', 'hdmi', 'line', 'sat-catv', 'source', 'tv', 'video', 'airPlay', 'sacd-cd'] as const;

type ExtInput = (typeof extInput)[number];
export interface ISourceSelection {
	extInput: ExtInput;
}

export function isExtInput(value: string): value is ExtInput {
	return extInput.indexOf(value as ExtInput) !== -1;
}

const dlna = ['music'] as const;

const storage = ['usb1'] as const;

const radio = ['fm'] as const;

const netService = ['audio'] as const;

const multiroom = ['audio'] as const;

const cast = ['audio'] as const;

type SonyStrDn1080SourceSelector =
	| {
			source: 'extInput';
			device: 'btAudio' | 'hdmi' | 'bd-dvd' | 'game' | 'line' | 'sat-catv' | 'source' | 'tv' | 'video' | 'airPlay' | 'sacd-cd';
	  }
	| {
			source: 'dlna';
			device: 'music';
	  }
	| {
			source: 'storage';
			device: 'usb1';
	  }
	| {
			source: 'radio';
			device: 'fm';
	  }
	| {
			source: 'netService';
			device: 'audio';
	  }
	| {
			source: 'multiroom';
			device: 'audio';
	  }
	| {
			source: 'cast';
			device: 'audio';
	  };

const sourceSelection = {
	extInput,
	dlna,
	storage,
	radio,
	netService,
	multiroom,
	cast,
} as const;

export type SourceSelection = keyof typeof sourceSelection;

function isValidSourceSelection({source, device}: SonyStrDn1080SourceSelector) {
	const schemeDevices = sourceSelection[source];
	if (!schemeDevices) {
		return false;
	}
	return (schemeDevices as readonly string[]).indexOf(device) !== -1;
}

/**
 * user facing class (with helper methods)
 * @example
 * const device = new SonyStrDn1080('http://192.168.0.61:10000/sony');
 */

export class SonyStrDn1080 extends AbstractSonyStrDn1080 {
	public setSource(selector: SonyStrDn1080SourceSelector, options?: {port?: number; zone?: number}) {
		if (!isValidSourceSelection(selector)) {
			throw new Error('uknown scheme or device combination');
		}
		let deviceResourceUri = `${selector.source}:${selector.device}`;
		if (options?.port !== undefined) {
			deviceResourceUri += `?port=${options.port}`;
		}
		if (options?.zone !== undefined) {
			deviceResourceUri += `?zone=${options.zone}`;
		}
		return this.setPlayContent({uri: deviceResourceUri});
	}
	public setHdmiSource(port = 1) {
		if (port < 1 || port > 4) {
			port = 1;
		}
		return this.setSource({source: 'extInput', device: 'hdmi'}, {port});
	}
	public setAudioService() {
		return this.setSource({source: 'netService', device: 'audio'});
	}
	public setBluetoothAudioSource() {
		return this.setSource({source: 'extInput', device: 'btAudio'});
	}

	public setDnlaAudioSource() {
		return this.setSource({source: 'dlna', device: 'music'});
	}
	public setMusicSoundField() {
		return this.setSoundSettings('soundField', 'music');
	}

	public setMovieSoundField() {
		return this.setSoundSettings('soundField', 'movie');
	}

	public setClearAudioPlusSoundField() {
		return this.setSoundSettings('soundField', 'clearAudio');
	}

	public setVoiceUp(value: number) {
		if (value < 1 || value > 3) {
			value = 1;
		}
		return this.setSoundSettings('voice', `type${value}`);
	}

	public setNightModeOn() {
		return this.setSoundSettings('nightMode', 'on');
	}

	public setNightModeOff() {
		return this.setSoundSettings('nightMode', 'off');
	}
}

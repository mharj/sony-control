import {AbstractSonyStrDn1080} from '../map/SonyStrDn1080';

const extInput = ['bd-dvd', 'btAudio', 'game', 'hdmi', 'line', 'sat-catv', 'source', 'tv', 'video', 'airPlay', 'sacd-cd'] as const;

type ExtInput = typeof extInput[number];
export interface ISourceSelection {
	extInput: ExtInput;
}

export function isExtInput(value: string): value is ExtInput {
	return extInput.findIndex((e) => e === value) !== -1;
}

const dlna = ['music'] as const;

const storage = ['usb1'] as const;

const radio = ['fm'] as const;

const netService = ['audio'] as const;

const multiroom = ['audio'] as const;

const cast = ['audio'] as const;

const sourceSelection = {
	extInput,
	dlna,
	storage,
	radio,
	netService,
	multiroom,
	cast,
} as const;

function isValidSourceSelection(scheme: string, device: string) {
	const schemeDevices = sourceSelection[scheme];
	if (!schemeDevices) {
		return false;
	}
	return schemeDevices.findIndex((d: string) => d === device) !== -1;
}

/**
 * user facing class (with helper methods)
 */

export class SonyStrDn1080 extends AbstractSonyStrDn1080 {
	public async setSource(scheme = 'extInput', device = 'btAudio', options?: {port?: number; zone?: number}) {
		if (!isValidSourceSelection(scheme, device)) {
			throw new Error('uknown scheme or device combination');
		}
		let deviceResourceUri = `${scheme}:${device}`;
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
		return this.setSource('extInput', 'hdmi', {port});
	}
	public setAudioService() {
		return this.setSource('netService', 'audio');
	}
	public setBluetoothAudioSource() {
		return this.setSource('extInput', 'btAudio');
	}

	public setDnlaAudioSource() {
		return this.setSource('dlna', 'audio');
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

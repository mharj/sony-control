import {AbstractApi} from '../lib/AbstractApi';
import {getPowerSettings} from '../api/system/v1_0/getPowerSettings';
import {getSystemInformation} from '../api/system/v1_5/getSystemInformation';
import {getSupportedApiInfo} from '../api/guide/v1_0/getSupportedApiInfo';
import {getSchemeList} from '../api/avContent/v1_0/getSchemeList';
import {getPowerStatus} from '../api/system/v1_1/getPowerStatus';
import {getCurrentExternalTerminalsStatus} from '../api/avContent/v1_0/getCurrentExternalTerminalsStatus';
import {getCustomEqualizerSettings} from '../api/audio/v1_0/getCustomEqualizerSettings';
import {getInterfaceInformation} from '../api/system/v1_0/getInterfaceInformation';
import {getPlaybackModeSettings, PlaybackTarget} from '../api/avContent/v1_0/getPlaybackModeSettings';
import {getPlayingContentInfo} from '../api/avContent/v1_2/getPlayingContentInfo';
import {getSourceList} from '../api/avContent/v1_2/getSourceList';
import {getVolumeInformation} from '../api/audio/v1_1/getVolumeInformation';
import {getSoundSettings} from '../api/audio/v1_1/getSoundSettings';
import {IPowerSettings, setPowerSettings} from '../api/system/v1_0/setPowerSettings';
import {setPowerStatus} from '../api/system/v1_1/setPowerStatus';
import {IPlayContentParams, setPlayContent} from '../api/avContent/v1_2/setPlayContent';
import {setPlayNextContent} from '../api/avContent/v1_0/setPlayNextContent';
import {setPlayPreviousContent} from '../api/avContent/v1_0/setPlayPreviousContent';
import {setAudioVolume} from '../api/audio/v1_1/setAudioVolume';
import {setAudioMute} from '../api/audio/v1_1/setAudioMute';
import {setSoundSettings} from '../api/audio/v1_1/setSoundSettings';

/**
 * Generic API
 * https://developer.sony.com/develop/audio-control-api/api-references/api-overview-2
 */

export abstract class AbstractGenericAudio extends AbstractApi {
	public setPlayPreviousContent(output?: string) {
		return setPlayPreviousContent(1, output, this.jsonCall);
	}
	public setPlayNextContent(output?: string) {
		return setPlayNextContent(1, output, this.jsonCall);
	}
	public getSoundSettings(target?: string) {
		return getSoundSettings(1, target, this.jsonCall);
	}
	public getSourceList(scheme: string) {
		return getSourceList(1, scheme, this.jsonCall);
	}
	public getPlayingContentInfo(output?: string) {
		return getPlayingContentInfo(1, output, this.jsonCall);
	}
	public getPlaybackModeSettings(target?: PlaybackTarget | undefined, uri?: string | undefined) {
		return getPlaybackModeSettings(1, target, uri, this.jsonCall);
	}
	public getInterfaceInformation() {
		return getInterfaceInformation(1, this.jsonCall);
	}
	public getCustomEqualizerSettings(target?: string) {
		return getCustomEqualizerSettings(1, target, this.jsonCall);
	}
	public getCurrentExternalTerminalsStatus() {
		return getCurrentExternalTerminalsStatus(1, this.jsonCall);
	}
	public getSystemInformation() {
		return getSystemInformation(1, this.jsonCall);
	}
	public async getSupportedApiInfo() {
		return getSupportedApiInfo(1, this.jsonCall);
	}
	public async getSchemeList() {
		return getSchemeList(1, this.jsonCall);
	}
	public async getPowerSettings() {
		return getPowerSettings(1, this.jsonCall);
	}
	public async getPowerStatus() {
		return getPowerStatus(1, this.jsonCall);
	}
	public async setPowerSettings(settings: IPowerSettings[]) {
		return setPowerSettings(1, settings, this.jsonCall);
	}
	public async setPowerStatus(status: 'active' | 'standby' | 'off') {
		return setPowerStatus(1, status, this.jsonCall);
	}
	public async getVolumeInformation(output?: string) {
		return getVolumeInformation(1, output, this.jsonCall);
	}
	public async setPlayContent(params: IPlayContentParams) {
		return setPlayContent(1, params, this.jsonCall);
	}
	public async setAudioVolume(volume: number, output?: string) {
		return setAudioVolume(1, volume, output, this.jsonCall);
	}
	public async setAudioMute(mute: 'on' | 'off' | 'toggle', output?: string) {
		return setAudioMute(1, mute, output, this.jsonCall);
	}
	public async setSoundSettings(target: string, value: string) {
		return setSoundSettings(1, target, value, this.jsonCall);
	}
}

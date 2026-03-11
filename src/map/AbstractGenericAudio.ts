import {getCustomEqualizerSettings} from '../api/audio/v1_0/getCustomEqualizerSettings';
import {getSoundSettings} from '../api/audio/v1_1/getSoundSettings';
import {getVolumeInformation} from '../api/audio/v1_1/getVolumeInformation';
import {setAudioMute} from '../api/audio/v1_1/setAudioMute';
import {setAudioVolume} from '../api/audio/v1_1/setAudioVolume';
import {setSoundSettings} from '../api/audio/v1_1/setSoundSettings';
import {getCurrentExternalTerminalsStatus} from '../api/avContent/v1_0/getCurrentExternalTerminalsStatus';
import {getPlaybackModeSettings, type PlaybackTarget} from '../api/avContent/v1_0/getPlaybackModeSettings';
import {getSchemeList} from '../api/avContent/v1_0/getSchemeList';
import {setPlayNextContent} from '../api/avContent/v1_0/setPlayNextContent';
import {setPlayPreviousContent} from '../api/avContent/v1_0/setPlayPreviousContent';
import {getPlayingContentInfo} from '../api/avContent/v1_2/getPlayingContentInfo';
import {getSourceList} from '../api/avContent/v1_2/getSourceList';
import {type IPlayContentParams, setPlayContent} from '../api/avContent/v1_2/setPlayContent';
import {getSupportedApiInfo} from '../api/guide/v1_0/getSupportedApiInfo';
import {getInterfaceInformation} from '../api/system/v1_0/getInterfaceInformation';
import {getPowerSettings} from '../api/system/v1_0/getPowerSettings';
import {type IPowerSettings, setPowerSettings} from '../api/system/v1_0/setPowerSettings';
import {getPowerStatus} from '../api/system/v1_1/getPowerStatus';
import {setPowerStatus} from '../api/system/v1_1/setPowerStatus';
import {getSystemInformation} from '../api/system/v1_5/getSystemInformation';
import {AbstractApi} from '../lib/AbstractApi';

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
	public getSupportedApiInfo() {
		return getSupportedApiInfo(1, this.jsonCall);
	}
	public getSchemeList() {
		return getSchemeList(1, this.jsonCall);
	}
	public getPowerSettings() {
		return getPowerSettings(1, this.jsonCall);
	}
	public getPowerStatus() {
		return getPowerStatus(1, this.jsonCall);
	}
	public setPowerSettings(settings: IPowerSettings[]) {
		return setPowerSettings(1, settings, this.jsonCall);
	}
	public setPowerStatus(status: 'active' | 'standby' | 'off') {
		return setPowerStatus(1, status, this.jsonCall);
	}
	public getVolumeInformation(output?: string) {
		return getVolumeInformation(1, output, this.jsonCall);
	}
	public setPlayContent(params: IPlayContentParams) {
		return setPlayContent(1, params, this.jsonCall);
	}
	public setAudioVolume(volume: number, output?: string) {
		return setAudioVolume(1, volume, output, this.jsonCall);
	}
	public setAudioMute(mute: 'on' | 'off' | 'toggle', output?: string) {
		return setAudioMute(1, mute, output, this.jsonCall);
	}
	public setSoundSettings(target: string, value: string) {
		return setSoundSettings(1, target, value, this.jsonCall);
	}
}

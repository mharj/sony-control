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
import {getServiceProtocols} from '../api/guide/v1_0/getServiceProtocols';
import {getSupportedApiInfo} from '../api/guide/v1_0/getSupportedApiInfo';
import {getInterfaceInformation_v1_0} from '../api/system/v1_0/getInterfaceInformation';
import {getMethodTypes_v1_0} from '../api/system/v1_0/getMethodTypes';
import {getPowerSettings_v1_0} from '../api/system/v1_0/getPowerSettings';
import {type SetPowerSettingParams_v1_0, setPowerSettings_v1_0} from '../api/system/v1_0/setPowerSettings';
import {getPowerStatus} from '../api/system/v1_1/getPowerStatus';
import {setPowerStatus} from '../api/system/v1_1/setPowerStatus';
import {type GetStorageListParams_v1_2, getStorageList_v1_2} from '../api/system/v1_2/getStorageList';
import {getSystemInformation_v1_4} from '../api/system/v1_4/getSystemInformation';
import {AbstractApi, type ApiService} from '../lib/AbstractApi';

/**
 * this maps DN1080 to correct API version calls
 *
 * https://developer.sony.com/develop/audio-control-api/api-references/api-overview-2
 */

export abstract class AbstractSonyStrDn1080 extends AbstractApi {
	public setPlayPreviousContent(output?: string) {
		return setPlayPreviousContent(output, this.jsonFirstResultCall);
	}
	public setPlayNextContent(output?: string) {
		return setPlayNextContent(output, this.jsonFirstResultCall);
	}
	public getSoundSettings(target?: string) {
		return getSoundSettings(target, this.jsonFirstResultCall);
	}
	public getSourceList(scheme: string) {
		return getSourceList(scheme, this.jsonFirstResultCall);
	}
	public getPlayingContentInfo(output?: string) {
		return getPlayingContentInfo(output, this.jsonFirstResultCall);
	}
	public getPlaybackModeSettings(target?: PlaybackTarget | undefined, uri?: string | undefined) {
		return getPlaybackModeSettings(target, uri, this.jsonFirstResultCall);
	}
	public getInterfaceInformation() {
		return getInterfaceInformation_v1_0(this.jsonFirstResultCall);
	}
	public getCustomEqualizerSettings(target?: string) {
		return getCustomEqualizerSettings(target, this.jsonFirstResultCall);
	}
	public getCurrentExternalTerminalsStatus() {
		return getCurrentExternalTerminalsStatus(this.jsonFirstResultCall);
	}
	public getSystemInformation() {
		return getSystemInformation_v1_4(this.jsonFirstResultCall);
	}
	public getSupportedApiInfo(services?: ApiService[]) {
		return getSupportedApiInfo(services, this.jsonFirstResultCall);
	}
	public getSchemeList() {
		return getSchemeList(this.jsonFirstResultCall);
	}
	public getPowerSettings() {
		return getPowerSettings_v1_0(this.jsonFirstResultCall);
	}
	public getPowerStatus() {
		return getPowerStatus(this.jsonFirstResultCall);
	}
	public setPowerSettings(settings: SetPowerSettingParams_v1_0[]) {
		return setPowerSettings_v1_0(settings, this.jsonFirstResultCall);
	}
	public setPowerStatus(status: 'active' | 'standby' | 'off') {
		return setPowerStatus(status, this.jsonFirstResultCall);
	}
	public getVolumeInformation(output?: string) {
		return getVolumeInformation(output, this.jsonFirstResultCall);
	}
	public setPlayContent(params: IPlayContentParams) {
		return setPlayContent(params, this.jsonFirstResultCall);
	}
	public setAudioVolume(volume: number, output?: string) {
		return setAudioVolume(volume, output, this.jsonFirstResultCall);
	}
	public setAudioMute(mute: 'on' | 'off' | 'toggle', output?: string) {
		return setAudioMute(mute, output, this.jsonFirstResultCall);
	}
	public setSoundSettings(target: string, value: string) {
		return setSoundSettings(target, value, this.jsonFirstResultCall);
	}
	public getServiceProtocols() {
		return getServiceProtocols(this.jsonResultsCall);
	}
	public getMethodTypes() {
		return getMethodTypes_v1_0(this.jsonResultsCall);
	}
	public getStorageList(param: GetStorageListParams_v1_2 = {uri: ''}) {
		return getStorageList_v1_2(param, this.jsonFirstResultCall);
	}
}

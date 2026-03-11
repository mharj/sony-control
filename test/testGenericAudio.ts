import {beforeAll, describe, expect, it} from 'vitest';
import {GenericAudio} from '../src/index';

const audioUrlEnv = process.env.AUDIO_URL as string;

let amp: GenericAudio;

describe('test Generic Audio', () => {
	beforeAll(() => {
		amp = new GenericAudio(audioUrlEnv);
	});
	it('should return interface information', async () => {
		const interfaceInfo = await amp.getInterfaceInformation();
		expect(interfaceInfo).to.have.all.keys(['interfaceVersion', 'modelName', 'productCategory', 'productName', 'serverName']);
	});
	it('should return api information', async () => {
		const apiInfo = await amp.getSupportedApiInfo();
		for (const e of apiInfo) {
			expect(e).to.contain.keys(['apis', 'protocols', 'service']);
		}
	});
	it('should return scheme list', async () => {
		const schemeList = await amp.getSchemeList();
		for (const e of schemeList) {
			expect(e).to.have.all.keys(['scheme']);
		}
	});
	it('should return volume information', async () => {
		const volumeInfo = await amp.getVolumeInformation();
		for (const e of volumeInfo) {
			expect(e).to.have.all.keys(['maxVolume', 'minVolume', 'mute', 'output', 'step', 'volume']);
		}
	});
	it('should return power settings', async () => {
		const powerSettings = await amp.getPowerSettings();
		for (const e of powerSettings) {
			expect(e).to.have.all.keys(['candidate', 'currentValue', 'target', 'title', 'titleTextID', 'type']);
		}
	});
});

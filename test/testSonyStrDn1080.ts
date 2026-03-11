import {beforeAll, describe, expect, it} from 'vitest';
import {SonyStrDn1080} from '../src/index';

const dn1080Env = process.env.DN1080_URL as string;

let amp: SonyStrDn1080;

describe('test Dn1080', () => {
	beforeAll(() => {
		amp = new SonyStrDn1080(dn1080Env);
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
	it('should return input list', async () => {
		const inputList = await amp.getSourceList('radio');
		for (const e of inputList) {
			expect(e).to.have.all.keys(['iconUrl', 'isBrowsable', 'isPlayable', 'meta', 'outputs', 'playAction', 'protocols', 'source', 'title']);
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

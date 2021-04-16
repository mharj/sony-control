process.env.NODE_ENV = 'test';
import {config as dotEnvConfig} from 'dotenv';
import {expect} from 'chai';
import 'mocha';
import {SonyStrDn1080} from '../src/index';
dotEnvConfig();

const dn1080Env = process.env.DN1080_URL as string;
const testdescribe = dn1080Env !== undefined ? describe : describe.skip;

let amp: SonyStrDn1080;

testdescribe('test Dn1080', () => {
	before(() => {
		amp = new SonyStrDn1080(dn1080Env);
	});
	it('should return interface information', async () => {
		const interfaceInfo = await amp.getInterfaceInformation();
		expect(interfaceInfo).to.have.all.keys(['interfaceVersion', 'modelName', 'productCategory', 'productName', 'serverName']);
	});
	it('should return api information', async () => {
		const apiInfo = await amp.getSupportedApiInfo();
		apiInfo.forEach((e) => expect(e).to.contain.keys(['apis','protocols', 'service']));
	});
	it('should return scheme list', async () => {
		const schemeList = await amp.getSchemeList();
		schemeList.forEach((e) => expect(e).to.have.all.keys(['scheme']));
	});
	it('should return input list', async () => {
		const inputList = await amp.getSourceList('radio');
		inputList.forEach((e) => expect(e).to.have.all.keys(['iconUrl', 'isBrowsable', 'isPlayable', 'meta', 'outputs', 'playAction', 'protocols', 'source', 'title']));
	});
	it('should return volume information', async () => {
		const volumeInfo = await amp.getVolumeInformation();
		volumeInfo.forEach((e) => expect(e).to.have.all.keys(['maxVolume', 'minVolume', 'mute', 'output', 'step', 'volume']));
	});
	it('should return power settings', async () => {
		const powerSettings = await amp.getPowerSettings();
		powerSettings.forEach((e) => expect(e).to.have.all.keys(['candidate', 'currentValue', 'target', 'title', 'titleTextID', 'type']));
	});
});

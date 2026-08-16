import {beforeAll, beforeEach, describe, expect, it} from 'vitest';
import {getStorageList_v1_1} from '../src/api/system/v1_1/getStorageList';
import {getStorageList_v1_2} from '../src/api/system/v1_2/getStorageList';
import {getSystemInformation_v1_3} from '../src/api/system/v1_3/getSystemInformation';
import {getSystemInformation_v1_4} from '../src/api/system/v1_4/getSystemInformation';
import {SonyStrDn1080} from '../src/index';
import type {ApiService} from '../src/lib/AbstractApi';
import {ApiTester, MockFetch} from './testFetch';
import {customEqualizerSetting} from './typeValidate/customEqualizerSetting';
import {serviceProtocolSchema} from './typeValidate/getServiceProtocols';
import {getStorageList_1_1_schema} from './typeValidate/getStorageList_1.1';
import {getStorageList_1_2_schema} from './typeValidate/getStorageList_1.2';
import {getSystemInformation_1_3_schema} from './typeValidate/getSystemInformation_1_3';
import {getSystemInformation_1_4_schema} from './typeValidate/getSystemInformation_1_4';

const dn1080Env = process.env.DN1080_URL as string;

let amp: SonyStrDn1080;
let apiTest: ApiTester;

const mockOptions = {
	storeDirectory: './test/dn1080',
	clone: true,
};

describe('test Dn1080', () => {
	beforeAll(() => {
		amp = new SonyStrDn1080(dn1080Env, {fetchClient: new MockFetch(mockOptions).fetch});
		apiTest = new ApiTester(dn1080Env, mockOptions);
	});
	beforeEach(() => {
		amp.resetIdCounter();
		apiTest.resetIdCounter();
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
	it('should return customer eq settings', async () => {
		customEqualizerSetting.array().parse(await amp.getCustomEqualizerSettings());
	});
	it.each(['guide'] satisfies ApiService[])('should return api information for %s', async (source) => {
		const apiInfo = await amp.getSupportedApiInfo([source]);
		for (const e of apiInfo) {
			expect(e).to.contain.keys(['apis', 'protocols', 'service']);
		}
	});
	it('should return service protocols', async () => {
		serviceProtocolSchema.array().parse(await amp.getServiceProtocols());
	});
	it('should return method types', async () => {
		const methodTypes = await amp.getMethodTypes();
		console.log(methodTypes);
		expect(methodTypes).to.be.an('array');
	});
	it('should return system information', async () => {
		const systemInfo = await apiTest.runCall((cb) => getSystemInformation_v1_3(cb));
		getSystemInformation_1_3_schema.parse(systemInfo);
	});
	it('should return system information', async () => {
		const systemInfo = await apiTest.runCall((cb) => getSystemInformation_v1_4(cb));
		getSystemInformation_1_4_schema.parse(systemInfo);
	});
	it('should return storage list v1.1', async () => {
		const storageList = await apiTest.runCall((cb) => getStorageList_v1_1({uri: ''}, cb));
		getStorageList_1_1_schema.array().parse(storageList);
	});
	it('should return storage list v1.2', async () => {
		const storageList = await apiTest.runCall((cb) => getStorageList_v1_2({uri: ''}, cb));
		getStorageList_1_2_schema.array().parse(storageList);
	});
});

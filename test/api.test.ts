import {describe, expect, it} from 'vitest';
import {z} from 'zod';
import {getAudioMethodTypes} from '../src/api/audio/v1_0/getAudioMethodTypes';
import {getSpeakerSettings} from '../src/api/audio/v1_0/getSpeakerSettings';
import {getGuideMethodTypes} from '../src/api/guide/v1_0/getGuideMethodTypes';
import {getServiceProtocols} from '../src/api/guide/v1_0/getServiceProtocols';
import {getSupportedApiInfo} from '../src/api/guide/v1_0/getSupportedApiInfo';
import {getVersions} from '../src/api/guide/v1_0/getVersions';
import {isResult, isResults} from '../src/lib';
import type {JsonRpcArgs} from '../src/lib/AbstractApi';
import {AudioApiError, isError} from '../src/lib/error';
import {getMethodTypesSchemaV1_0} from './typeValidate/getMethodTypes_1.0';
import {getServiceProtocolsSchemaV1_0} from './typeValidate/getServiceProtocols_1.0';
import {getSpeakerSettingsSchemaV1_0} from './typeValidate/getSpeakerSettings_1.0';
import {getSupportedApiInfoSchemaV1_0} from './typeValidate/getSupportedApiInfo_1.0';
import {getVersionsSchemaV1_0} from './typeValidate/getVersions_1.0';

const audioUrlEnv = process.env.AUDIO_URL ?? 'http://generic_audio:10000/sony';

async function jsonResultsCall<T>({path, method, params, version}: JsonRpcArgs): Promise<T[]> {
	const response = await fetch(`${audioUrlEnv}/${path}`, {
		method: 'POST',
		headers: {'Content-Type': 'application/json'},
		body: JSON.stringify({id: 1, method, params, version}),
		signal: AbortSignal.timeout(5000),
	});
	if (!response.ok) {
		throw new Error(`${method}: HTTP ${response.status}`);
	}
	const payload = await response.json();
	if (isError(payload)) {
		throw new AudioApiError(method, ...payload.error);
	}
	if (isResult(payload) && Array.isArray(payload.result[0])) {
		return payload.result[0];
	}
	if (!isResults(payload)) {
		throw new Error(`${method}: invalid results response: ${JSON.stringify(payload)}`);
	}
	return payload.results;
}

function zodParse<T>(schema: z.ZodType<T>, data: unknown): T {
	const res = schema.safeParse(data);
	if (!res.success) {
		throw new Error(`Zod validation failed: ${z.prettifyError(res.error)}`);
	}
	return res.data;
}

describe('test API calls', () => {
	it('getAudioMethodTypes v1.0 describes getSpeakerSettings', async () => {
		const methods = zodParse(getMethodTypesSchemaV1_0.array(), await getAudioMethodTypes('1.0', jsonResultsCall));
		const method = methods.find(([name]) => name === 'getSpeakerSettings');
		expect(method?.[1]).toEqual(['{"target":"string"}']);
		expect(method?.[3]).toBe('1.0');
		console.info('audio getSpeakerSettings signature:', JSON.stringify(method));
	}, 10000);
	it.each([undefined, 'speakerSelection', 'frontLLevel'])(
		'getSpeakerSettings v1.0 validates target %s',
		async (target) => {
			const settings = zodParse(getSpeakerSettingsSchemaV1_0.array(), await getSpeakerSettings(target, jsonResultsCall));
			expect(settings.length).toBeGreaterThan(0);
			if (target !== undefined) {
				for (const setting of settings) {
					expect(setting.target).toBe(target);
				}
			}
			console.info('audio getSpeakerSettings targets:', JSON.stringify(settings.map((setting) => setting.target)));
		},
		10000,
	);
	it('getServiceProtocols v1.0 returns the amp service protocols', async () => {
		zodParse(getServiceProtocolsSchemaV1_0.array(), await getServiceProtocols(jsonResultsCall));
	}, 10000);
	it('getSupportedApiInfo v1.0 returns the amp supported API information', async () => {
		zodParse(getSupportedApiInfoSchemaV1_0.array(), await getSupportedApiInfo(undefined, jsonResultsCall));
	}, 10000);
	it('getVersions v1.0 returns the guide service versions', async () => {
		const versions = zodParse(getVersionsSchemaV1_0, await getVersions(jsonResultsCall));
		console.info('guide getVersions v1.0:', JSON.stringify(versions));
		expect(versions).toContain('1.0');
	}, 10000);
	it('getMethodTypes v1.0 returns the guide method type tuples', async () => {
		const methods = zodParse(getMethodTypesSchemaV1_0.array(), await getGuideMethodTypes(undefined, jsonResultsCall));
		console.info('guide getMethodTypes v1.0:', JSON.stringify(methods, null, 2));
		expect(methods.map(([method]) => method)).toEqual(expect.arrayContaining(['getMethodTypes', 'getServiceProtocols', 'getSupportedApiInfo', 'getVersions']));
	}, 10000);
	it('getMethodTypes v1.0 accepts an API version filter', async () => {
		const methods = zodParse(getMethodTypesSchemaV1_0.array(), await getGuideMethodTypes('1.0', jsonResultsCall));
		expect(methods.map(([method]) => method)).toEqual(expect.arrayContaining(['getMethodTypes', 'getServiceProtocols', 'getSupportedApiInfo', 'getVersions']));
		for (const [, , , version] of methods) {
			expect(version).toBe('1.0');
		}
	}, 10000);
	it('getMethodTypes v1.0 rejects a method name as an unsupported version', async () => {
		await expect(getGuideMethodTypes('getVersions', jsonResultsCall)).rejects.toMatchObject({
			name: 'AudioApiError',
			message: 'getMethodTypes: getVersions',
			code: 14,
		});
	}, 10000);
});

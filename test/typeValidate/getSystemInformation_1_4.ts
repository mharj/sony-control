import {z} from 'zod';
import type {ISystemInformation} from '../../src/api/system/v1_4/getSystemInformation';

export const getSystemInformation_1_4_schema: z.ZodType<ISystemInformation> = z.object({
	product: z.string().optional(),
	region: z.string().optional(),
	language: z.string().optional(),
	model: z.string().optional(),
	serial: z.string().optional(),
	macAddr: z.string(),
	name: z.string().optional(),
	generation: z.string().optional(),
	area: z.string().optional(),
	cid: z.string().optional(),
	helpUrl: z.string().optional(),
	deviceID: z.string().optional(),
	version: z.string(),
	duid: z.string().optional(),
	wirelessMacAddr: z.string(),
	esn: z.string().optional(),
	iconUrl: z.string().optional(),
	ssid: z.string().optional(),
	bdAddr: z.string(),
	initialPowerOnTime: z.string().optional(),
	lastPowerOnTime: z.string().optional(),
	bleID: z.string().optional(),
}).strict();

import {z} from 'zod';
import type {IApiInfo} from '../../src/api/guide/v1_0/getSupportedApiInfo';

const apiNameVersionsSchema = z.object({
	name: z.string(),
	versions: z.array(z.object({version: z.string()})),
});

export const getSupportedApiInfoSchemaV1_0: z.ZodType<IApiInfo> = z.object({
	apis: apiNameVersionsSchema.array(),
	notifications: apiNameVersionsSchema.array().optional(),
	protocols: z.string().array(),
	service: z.string(),
});

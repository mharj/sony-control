import {z} from 'zod';
import type {StorageListEntry} from '../../src/api/system/v1_1/getStorageList';

export const getStorageList_1_1_schema: z.ZodType<StorageListEntry> = z
	.object({
		deviceName: z.string(),
		formattable: z.string(),
		formatting: z.string(),
		freeCapacityMB: z.number(),
		isAvailable: z.string(),
		mounted: z.string(),
		permission: z.string(),
		position: z.string(),
		systemAreaCapacityMB: z.number(),
		uri: z.string(),
		volumeLabel: z.string(),
		wholeCapacityMB: z.number(),
	})
	.strict();

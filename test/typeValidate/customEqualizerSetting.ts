import {z} from 'zod';
import type { ICustomEqualizerCandidate, ICustomEqualizerSetting } from '../../src/api/audio/v1_0/getCustomEqualizerSettings';

const candidateSchema: z.ZodType<ICustomEqualizerCandidate> = z.object({
	isAvailable: z.boolean(),
	max: z.number(),
	min: z.number(),
	step: z.number(),
	title: z.string().optional(),
	titleTextID: z.string().optional(),
	value: z.string().optional(),
});

export const customEqualizerSetting: z.ZodType<ICustomEqualizerSetting> = z.object({
    candidate: z.array(candidateSchema),
	currentValue: z.string(),
	deviceUIInfo: z.string(),
	isAvailable: z.boolean(),
	target: z.string(),
	title: z.string(),
	titleTextID: z.string(),
	type: z.string(),
});


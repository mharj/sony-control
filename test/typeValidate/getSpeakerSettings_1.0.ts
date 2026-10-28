import {z} from 'zod';
import type {ISpeakerSetting, ISpeakerSettingCandidate} from '../../src/api/audio/v1_0/getSpeakerSettings';

const speakerSettingCandidateSchema: z.ZodType<ISpeakerSettingCandidate> = z.object({
	isAvailable: z.boolean(),
	max: z.number().optional(),
	min: z.number().optional(),
	step: z.number().optional(),
	title: z.string().optional(),
	titleTextID: z.string().optional(),
	value: z.string().optional(),
});

export const getSpeakerSettingsSchemaV1_0: z.ZodType<ISpeakerSetting> = z.object({
	candidate: speakerSettingCandidateSchema.array(),
	currentValue: z.string(),
	deviceUIInfo: z.string().optional(),
	isAvailable: z.boolean(),
	target: z.string(),
	title: z.string(),
	titleTextID: z.string(),
	type: z.string(),
});

import {z} from 'zod';

export const getVersionsSchemaV1_0: z.ZodType<string[]> = z.string().array();

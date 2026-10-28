import {z} from 'zod';
import type {IMethodType} from '../../src/api/guide/v1_0/getGuideMethodTypes';

export const getMethodTypesSchemaV1_0: z.ZodType<IMethodType> = z.tuple([z.string(), z.string().array(), z.string().array(), z.string()]).readonly();

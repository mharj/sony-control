import {z} from 'zod';
import type {ApiProtocol, IServiceProtocol} from '../../src/api/guide/v1_0/getServiceProtocols';

const protocolSchema: z.ZodType<ApiProtocol> = z.enum(['xhrpost:jsonizer', 'websocket:jsonizer']);

export const serviceProtocolSchema: z.ZodType<IServiceProtocol> = z.tuple([z.string(), protocolSchema.array()]);

import {IErrorResponse, IPayloadResponse} from './';

export class AudioApiError extends Error {
	private code: number;
	constructor(command: string, code: number, message: string) {
		super(`${command}: ${message}`);
		this.name = 'AudioApiError';
		this.code = code;
		Error.captureStackTrace(this, this.constructor);
	}
	public getErrorCode(): number {
		return this.code;
	}
}

export function isError(response: any): response is IErrorResponse {
	return 'error' in response;
}

export function haveError(command: string, response: IErrorResponse | IPayloadResponse): response is IPayloadResponse {
	if (isError(response)) {
		const [code, message] = response.error;
		throw new AudioApiError(command, code, message);
	}
	return true;
}

export interface IErrorResponse {
	error: [number, string];
}

export interface IPayloadResponse<T = any> {
	result: [T];
}

export function isResult(response: any): response is IPayloadResponse {
	return 'result' in response && Array.isArray(response.result);
}


export function decodeUri(value: string) {
	const [scheme, device] = value.split(':', 2);
	return {
		scheme,
		device,
	};
}
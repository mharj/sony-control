export interface IErrorResponse {
	error: [number, string];
}

export interface IPayloadResponse<T = any> {
	result: [T];
}

export interface IPayloadResultsResponse<T = any> {
	results: [T];
}

export function isResult(response: any): response is IPayloadResponse {
	return 'result' in response && Array.isArray(response.result);
}

export function isResults(response: any): response is IPayloadResultsResponse {
	return 'results' in response && Array.isArray(response.results);
}

export function decodeUri(value: string) {
	const [scheme, device] = value.split(':', 2);
	return {
		scheme,
		device,
	};
}

// place files you want to import through the `$lib` alias in this folder.

import { PUBLIC_API_BASE_URL } from '$env/static/public';

enum HTTPMethod {
	GET = 'GET',
	POST = 'POST'
}

enum ContentType {
	APP_JSON = 'application/json',
	TEXT_PLAIN = 'text/plain'
}

export async function apiFetch<T, U>(
	url: string,
	method: HTTPMethod,
	contentType: ContentType,
	body: T | undefined = undefined
) {
	const headers: Record<string, string> = {};
	headers['Content-Type'] = contentType;
	const fetchParams: RequestInit = {
		method: method,
		headers: headers,
		body: JSON.stringify(body)
	};

	const response = await fetch(`${PUBLIC_API_BASE_URL}${url}`, fetchParams);
	response.json() as U;

	return null;
}

export async function getCall(url: string) {
	const response = await fetch(url);
	if (response.headers.get('Content-Type') == ContentType.APP_JSON) {
		return await response.json();
	} else {
		return await response.text();
	}
}

export { HTTPMethod, ContentType };

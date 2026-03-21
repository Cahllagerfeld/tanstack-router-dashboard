import { isArray, isString } from "es-toolkit/compat";
import { isRecord } from "./type-guards";
export class FetchError extends Error {
	public status: number;
	public statusText: string;
	public message: string;

	constructor({
		message,
		status,
		statusText,
	}: {
		status: number;
		statusText: string;
		message: string;
	}) {
		super(message);
		this.status = status;
		this.statusText = statusText;
		this.message = message;
	}
}

export function isFetchError(err: unknown): err is FetchError {
	return err instanceof FetchError;
}

export async function throwFetchErrorFromResponse({
	response,
}: {
	response: Response;
}): Promise<never> {
	const errorData = await response.json();

	throw new FetchError({
		status: response.status,
		statusText: response.statusText,
		message: getErrorMessage(errorData),
	});
}

function getErrorMessage(errorData: unknown): string {
	if (isString(errorData) && errorData.trim().length > 0) {
		return errorData;
	}

	if (isArray(errorData)) {
		const message = errorData[1];
		if (isString(message) && message.trim().length > 0) {
			return message;
		}

		const arrayMessage = errorData.find(
			(item): item is string => isString(item) && item.trim().length > 0
		);
		if (arrayMessage) {
			return arrayMessage;
		}

		return "Unknown error";
	}

	if (isRecord(errorData)) {
		const detail = errorData.detail;
		if (isString(detail) && detail.trim().length > 0) {
			return detail;
		}

		if (isArray(detail)) {
			const message = detail[1];
			if (isString(message) && message.trim().length > 0) {
				return message;
			}

			const detailMessage = detail.find(
				(item): item is string => isString(item) && item.trim().length > 0
			);
			if (detailMessage) {
				return detailMessage;
			}
		}
	}

	return "Error while fetching data";
}

type ApiResult<T, E> = {
	data?: T;
	error?: E;
	response: Response;
};

export function expectOptionalData<T, E>(
	result: ApiResult<T, E>
): T | undefined {
	if (result.error !== undefined) {
		throw new Error("Error while unwrapping data");
	}

	return result.data;
}

export function expectData<T, E>(result: ApiResult<T, E>): T {
	const data = expectOptionalData(result);
	if (data !== undefined) {
		return data;
	}

	throw new Error("Error while unwrapping data");
}

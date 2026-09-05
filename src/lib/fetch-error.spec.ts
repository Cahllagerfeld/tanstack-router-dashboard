import { describe, expect, it } from "vitest";

import { m } from "@/paraglide/messages";

import {
	FetchError,
	expectData,
	expectOptionalData,
	isFetchError,
	throwFetchErrorFromResponse,
} from "./fetch-error";

describe("FetchError", () => {
	it("preserves the HTTP status and API message", () => {
		const error = new FetchError({
			status: 403,
			statusText: "Forbidden",
			message: "Project access denied",
		});

		expect(error).toBeInstanceOf(Error);
		expect(isFetchError(error)).toBe(true);
		expect(error).toMatchObject({
			status: 403,
			statusText: "Forbidden",
			message: "Project access denied",
		});
	});
});

describe("throwFetchErrorFromResponse", () => {
	it.each([
		["a string response", "Server unavailable", "Server unavailable"],
		["a detail response", { detail: "Project not found" }, "Project not found"],
		[
			"a validation detail response",
			{ detail: ["name", "Project name is invalid"] },
			"Project name is invalid",
		],
	])("uses the API message from %s", async (_case, body, expectedMessage) => {
		const response = Response.json(body, {
			status: 422,
			statusText: "Unprocessable Entity",
		});

		await expect(
			throwFetchErrorFromResponse({ response })
		).rejects.toMatchObject({
			status: 422,
			statusText: "Unprocessable Entity",
			message: expectedMessage,
		});
	});

	it("uses a translated fallback for an unknown response shape", async () => {
		const response = Response.json({ unexpected: true }, { status: 500 });

		await expect(
			throwFetchErrorFromResponse({ response })
		).rejects.toMatchObject({
			status: 500,
			message: m.common_error_fetch(),
		});
	});

	it("uses the unknown-error fallback when an array has no message", async () => {
		const response = Response.json([null, 42], { status: 400 });

		await expect(
			throwFetchErrorFromResponse({ response })
		).rejects.toMatchObject({
			message: m.common_error_unknown(),
		});
	});
});

describe("API result unwrapping", () => {
	it("returns required and optional response data", () => {
		const response = new Response();

		expect(expectData({ data: "value", response })).toBe("value");
		expect(expectOptionalData({ data: undefined, response })).toBeUndefined();
	});

	it("rejects API errors even when response data is present", () => {
		const result = {
			data: "stale value",
			error: { detail: "failed" },
			response: new Response(),
		};

		expect(() => expectData(result)).toThrow(m.common_error_unwrapping());
	});

	it("rejects a required response without data", () => {
		expect(() =>
			expectData({ data: undefined, response: new Response() })
		).toThrow(m.common_error_unwrapping());
	});
});

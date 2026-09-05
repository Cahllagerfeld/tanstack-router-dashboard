import { describe, expect, it } from "vitest";

import { isSensitiveKey } from "./types";

describe("isSensitiveKey", () => {
	it.each([
		"api_key",
		"ACCESS_TOKEN",
		"clientSecret",
		"database_password",
		"cloudCredential",
		"auth_header",
	])("treats %s as sensitive", (key) => {
		expect(isSensitiveKey(key)).toBe(true);
	});

	it("does not mask ordinary configuration keys", () => {
		expect(isSensitiveKey("region")).toBe(false);
	});
});

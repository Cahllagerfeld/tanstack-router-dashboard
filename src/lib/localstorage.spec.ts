import { describe, expect, it } from "vitest";
import { getLocalStorageKey } from "@/lib/localstorage";

describe("getLocalStorageKey", () => {
	it("returns the fully-qualified key for SELECTED_PROJECT", () => {
		expect(getLocalStorageKey("SELECTED_PROJECT")).toBe(
			"zenml.projects.selected"
		);
	});

	it("returns the fully-qualified key for AUTH_USER", () => {
		expect(getLocalStorageKey("AUTH_USER")).toBe("zenml.auth.user");
	});
});

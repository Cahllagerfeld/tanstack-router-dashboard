import { describe, expect, it } from "vitest";

import type { CurrentIdentity } from "../model";
import { profileChanges, profileFormValues } from "./model";

const identity: CurrentIdentity = {
	id: "user-id",
	name: "ada",
	fullName: "Ada Lovelace",
	resolvedName: "Ada Lovelace",
	email: "ada@example.test",
	isAdmin: false,
};

describe("profileFormValues", () => {
	it("fills blanks for details the account does not have", () => {
		expect(
			profileFormValues({
				...identity,
				fullName: undefined,
				email: undefined,
			})
		).toEqual({ fullName: "", username: "ada", email: "" });
	});
});

describe("profileChanges", () => {
	const saved = profileFormValues(identity);

	it("submits nothing when no field changed", () => {
		expect(profileChanges(saved, saved)).toEqual({});
	});

	it("submits only the changed fields", () => {
		expect(
			profileChanges(saved, {
				fullName: "Ada King",
				username: "ada",
				email: "ada@example.test",
			})
		).toEqual({ full_name: "Ada King" });
	});

	it("submits a renamed username", () => {
		expect(
			profileChanges(saved, {
				...saved,
				username: "countess",
			})
		).toEqual({ name: "countess" });
	});

	it("clears a removed email instead of storing an empty one", () => {
		expect(
			profileChanges(saved, { ...profileFormValues(identity), email: "" })
		).toEqual({ email: null });
	});
});

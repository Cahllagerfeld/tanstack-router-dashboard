import { describe, expect, it } from "vitest";

import { m } from "@/paraglide/messages";

import { profileSchema } from "./schema";

describe("profileSchema", () => {
	it("trims every field", () => {
		expect(
			profileSchema.parse({
				fullName: "  Ada Lovelace ",
				username: " ada ",
				email: " ada@example.test ",
			})
		).toEqual({
			fullName: "Ada Lovelace",
			username: "ada",
			email: "ada@example.test",
		});
	});

	it("allows an empty full name and email", () => {
		expect(
			profileSchema.safeParse({ fullName: "", username: "ada", email: "" })
				.success
		).toBe(true);
	});

	it("requires a username", () => {
		const result = profileSchema.safeParse({
			fullName: "",
			username: "   ",
			email: "",
		});

		expect(result.error?.issues[0]).toMatchObject({
			path: ["username"],
			message: m.session_profile_username_required(),
		});
	});

	it("rejects a malformed email", () => {
		const result = profileSchema.safeParse({
			fullName: "",
			username: "ada",
			email: "ada@",
		});

		expect(result.error?.issues[0]).toMatchObject({
			path: ["email"],
			message: m.session_profile_email_invalid(),
		});
	});
});

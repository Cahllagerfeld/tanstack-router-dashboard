import { describe, expect, it } from "vitest";

import { m } from "@/paraglide/messages";

import { loginSchema } from "./use-login-form";

describe("loginSchema", () => {
	it("normalizes credentials before login", () => {
		expect(
			loginSchema.parse({
				username: "  ada  ",
				password: "  correct horse  ",
			})
		).toEqual({ username: "ada", password: "correct horse" });
	});

	it("requires both credentials", () => {
		const result = loginSchema.safeParse({ username: " ", password: " " });

		expect(result.success).toBe(false);
		if (!result.success) {
			expect(result.error.issues.map((issue) => issue.message)).toEqual([
				m.auth_validation_username_required(),
				m.auth_validation_password_required(),
			]);
		}
	});
});

import { describe, expect, it } from "vitest";

import { m } from "@/paraglide/messages";

import { passwordStepSchema } from "./schema";

describe("passwordStepSchema", () => {
	it("normalizes matching activation credentials", () => {
		expect(
			passwordStepSchema.parse({
				username: "  admin  ",
				password: "  password123  ",
				confirmPassword: "  password123  ",
			})
		).toEqual({
			username: "admin",
			password: "password123",
			confirmPassword: "password123",
		});
	});

	it("requires a meaningful username and password", () => {
		const result = passwordStepSchema.safeParse({
			username: " ",
			password: "short",
			confirmPassword: "short",
		});

		expect(result.success).toBe(false);
		if (!result.success) {
			expect(result.error.issues.map((issue) => issue.message)).toEqual([
				m.server_activation_username_required(),
				m.server_activation_password_minimum(),
			]);
		}
	});

	it("rejects a confirmation that does not match the password", () => {
		const result = passwordStepSchema.safeParse({
			username: "admin",
			password: "password123",
			confirmPassword: "different123",
		});

		expect(result.success).toBe(false);
		if (!result.success) {
			expect(result.error.issues[0]).toMatchObject({
				path: ["confirmPassword"],
				message: m.server_activation_password_mismatch(),
			});
		}
	});
});

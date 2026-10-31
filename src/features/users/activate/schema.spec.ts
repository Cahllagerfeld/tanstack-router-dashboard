import { describe, expect, it } from "vitest";

import { m } from "@/paraglide/messages";

import { activateUserSchema } from "./schema";

describe("activateUserSchema", () => {
	it("trims the full name but keeps the password exactly as typed", () => {
		expect(
			activateUserSchema.parse({
				fullName: "  Ada Lovelace  ",
				password: "  password123  ",
				confirmPassword: "  password123  ",
			})
		).toEqual({
			fullName: "Ada Lovelace",
			password: "  password123  ",
			confirmPassword: "  password123  ",
		});
	});

	it("does not require a full name", () => {
		expect(
			activateUserSchema.safeParse({
				password: "password123",
				confirmPassword: "password123",
			}).success
		).toBe(true);
	});

	it("requires a password of at least eight characters", () => {
		const result = activateUserSchema.safeParse({
			password: "short",
			confirmPassword: "short",
		});

		expect(result.success).toBe(false);
		if (!result.success) {
			expect(result.error.issues[0]).toMatchObject({
				path: ["password"],
				message: m.users_activate_password_minimum(),
			});
		}
	});

	it("rejects a confirmation that differs only by surrounding whitespace", () => {
		const result = activateUserSchema.safeParse({
			password: "password123",
			confirmPassword: "password123 ",
		});

		expect(result.success).toBe(false);
		if (!result.success) {
			expect(result.error.issues[0]).toMatchObject({
				path: ["confirmPassword"],
				message: m.users_activate_password_mismatch(),
			});
		}
	});
});

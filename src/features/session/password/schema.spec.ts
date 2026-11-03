import { describe, expect, it } from "vitest";

import { m } from "@/paraglide/messages";

import { changePasswordSchema } from "./schema";

const valid = {
	currentPassword: "old-password",
	newPassword: "new-password",
	confirmPassword: "new-password",
};

function firstIssue(values: typeof valid) {
	return changePasswordSchema.safeParse(values).error?.issues[0];
}

describe("changePasswordSchema", () => {
	it("keeps passwords exactly as typed", () => {
		const values = {
			currentPassword: " old ",
			newPassword: " new-password ",
			confirmPassword: " new-password ",
		};
		expect(changePasswordSchema.parse(values)).toEqual(values);
	});

	it("requires the current password", () => {
		expect(firstIssue({ ...valid, currentPassword: "" })).toMatchObject({
			path: ["currentPassword"],
			message: m.session_password_current_required(),
		});
	});

	it("requires a new password of at least eight characters", () => {
		expect(
			firstIssue({ ...valid, newPassword: "short", confirmPassword: "short" })
		).toMatchObject({
			path: ["newPassword"],
			message: m.session_password_minimum(),
		});
	});

	it("rejects a new password equal to the current one", () => {
		expect(
			firstIssue({
				...valid,
				newPassword: "old-password",
				confirmPassword: "old-password",
			})
		).toMatchObject({
			path: ["newPassword"],
			message: m.session_password_unchanged(),
		});
	});

	it("rejects a confirmation that differs", () => {
		expect(
			firstIssue({ ...valid, confirmPassword: "new-password " })
		).toMatchObject({
			path: ["confirmPassword"],
			message: m.session_password_mismatch(),
		});
	});
});

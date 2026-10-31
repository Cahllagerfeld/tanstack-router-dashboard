import { describe, expect, it } from "vitest";

import { m } from "@/paraglide/messages";

import { inviteMemberSchema } from "./schema";

describe("inviteMemberSchema", () => {
	it("normalizes a valid invitation", () => {
		expect(
			inviteMemberSchema.parse({ username: "  ada  ", isAdmin: true })
		).toEqual({ username: "ada", isAdmin: true });
	});

	it("requires a username that is more than whitespace", () => {
		const result = inviteMemberSchema.safeParse({
			username: "   ",
			isAdmin: false,
		});

		expect(result.success).toBe(false);
		if (!result.success) {
			expect(result.error.issues.map((issue) => issue.message)).toEqual([
				m.users_invite_username_required(),
			]);
		}
	});
});

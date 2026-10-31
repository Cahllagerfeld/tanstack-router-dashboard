import { describe, expect, it } from "vitest";

import type { UserDto } from "./dto";
import { userFromApi } from "./map";

const userResponse = {
	id: "user-id",
	name: "ada",
	permission_denied: false,
	body: {
		created: "2026-08-20T10:00:00",
		updated: "2026-08-21T10:00:00",
		active: true,
		full_name: "Ada Lovelace",
		is_service_account: false,
		is_admin: true,
	},
	metadata: {
		email: "ada@example.test",
		user_metadata: {},
		oidc_claims: {},
	},
} satisfies UserDto;

describe("userFromApi", () => {
	it("maps identity, permissions, contact details, and dates", () => {
		expect(userFromApi(userResponse)).toEqual({
			id: "user-id",
			name: "ada",
			resolvedName: "Ada Lovelace",
			fullName: "Ada Lovelace",
			isAdmin: true,
			isActive: true,
			created: new Date("2026-08-20T10:00:00Z"),
			email: "ada@example.test",
		});
	});

	it("uses the account name when optional user data is unavailable", () => {
		expect(
			userFromApi({
				id: "service-id",
				name: "automation",
				permission_denied: true,
			})
		).toEqual({
			id: "service-id",
			name: "automation",
			resolvedName: "automation",
			fullName: undefined,
			isAdmin: undefined,
			isActive: undefined,
			created: undefined,
			email: undefined,
		});
	});
});

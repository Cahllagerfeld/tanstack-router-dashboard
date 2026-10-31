import { describe, expect, it } from "vitest";

import { currentIdentityFromApi } from "./map";

describe("currentIdentityFromApi", () => {
	it("maps the display name, contact details, and admin flag", () => {
		expect(
			currentIdentityFromApi({
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
			})
		).toEqual({
			id: "user-id",
			resolvedName: "Ada Lovelace",
			email: "ada@example.test",
			isAdmin: true,
		});
	});

	it("uses the account name when optional data is unavailable", () => {
		expect(
			currentIdentityFromApi({
				id: "service-id",
				name: "automation",
				permission_denied: true,
			})
		).toEqual({
			id: "service-id",
			resolvedName: "automation",
			email: undefined,
			isAdmin: undefined,
		});
	});
});

import { describe, expect, it } from "vitest";

import { stackFromApi } from "./map";

describe("stackFromApi", () => {
	it("maps the Stack creator's account name and normalizes backend dates", () => {
		expect(
			stackFromApi({
				id: "stack-id",
				name: "production",
				permission_denied: false,
				body: {
					created: "2026-08-20T10:00:00",
					updated: "2026-08-21T10:00:00",
				},
				resources: {
					active: true,
					user: {
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
					},
				},
			})
		).toEqual({
			id: "stack-id",
			name: "production",
			creatorName: "ada",
			created: new Date("2026-08-20T10:00:00Z"),
		});
	});

	it("leaves optional values absent for a permission-denied body", () => {
		expect(
			stackFromApi({
				id: "stack-id",
				name: "production",
				permission_denied: true,
			})
		).toEqual({
			id: "stack-id",
			name: "production",
			creatorName: undefined,
			created: undefined,
		});
	});

	it("leaves the creator absent when the Stack has no user", () => {
		expect(
			stackFromApi({
				id: "stack-id",
				name: "production",
				permission_denied: false,
				resources: { active: false, user: null },
			}).creatorName
		).toBeUndefined();
	});
});

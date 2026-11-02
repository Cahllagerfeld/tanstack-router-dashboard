import { describe, expect, it } from "vitest";

import { secretFromApi } from "./map";

describe("secretFromApi", () => {
	it("maps visibility, the creator's account name, and backend dates without values", () => {
		expect(
			secretFromApi({
				id: "secret-id",
				name: "aws-credentials",
				permission_denied: false,
				body: {
					created: "2026-08-20T10:00:00",
					updated: "2026-08-21T10:00:00",
					private: true,
					values: { aws_secret_access_key: "do-not-leak" },
				},
				resources: {
					user: {
						id: "user-id",
						name: "ada",
						permission_denied: false,
					},
				},
			})
		).toEqual({
			id: "secret-id",
			name: "aws-credentials",
			isPrivate: true,
			creatorName: "ada",
			created: new Date("2026-08-20T10:00:00Z"),
		});
	});

	it("leaves optional values absent for a permission-denied Secret", () => {
		expect(
			secretFromApi({
				id: "secret-id",
				name: "aws-credentials",
				permission_denied: true,
			})
		).toEqual({
			id: "secret-id",
			name: "aws-credentials",
			isPrivate: undefined,
			creatorName: undefined,
			created: undefined,
		});
	});
});

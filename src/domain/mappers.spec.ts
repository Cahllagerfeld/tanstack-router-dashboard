import { describe, expect, it } from "vitest";

import type { components as ApiComponents } from "@/shared/api/generated";

import { componentFromApi } from "./components";
import { flavorFromApi } from "./flavors";
import { projectFromApi } from "./projects";
import { stackFromApi } from "./stacks";
import { userFromApi } from "./users";

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
	},
} satisfies ApiComponents["schemas"]["UserResponse"];

describe("projectFromApi", () => {
	it("uses the display name supplied by the API", () => {
		expect(
			projectFromApi({
				id: "project-id",
				name: "fraud-detection",
				permission_denied: false,
				body: {
					created: "2026-08-20T10:00:00Z",
					updated: "2026-08-21T10:00:00Z",
					display_name: "Fraud Detection",
				},
			})
		).toEqual({
			id: "project-id",
			name: "fraud-detection",
			displayName: "Fraud Detection",
		});
	});

	it("falls back to the Project name when the response body is unavailable", () => {
		expect(
			projectFromApi({
				id: "project-id",
				name: "fraud-detection",
				permission_denied: true,
			})
		).toMatchObject({ displayName: "fraud-detection" });
	});
});

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

describe("flavorFromApi", () => {
	it("maps the Flavor identity and optional logo", () => {
		expect(
			flavorFromApi({
				id: "flavor-id",
				name: "kubernetes",
				permission_denied: false,
				body: {
					created: "2026-08-20T10:00:00Z",
					updated: "2026-08-21T10:00:00Z",
					type: "orchestrator",
					display_name: "Kubernetes",
					integration: "kubernetes",
					source: "zenml.integrations.kubernetes",
					logo_url: "https://example.test/kubernetes.svg",
					is_custom: false,
				},
			})
		).toEqual({
			id: "flavor-id",
			name: "kubernetes",
			logoUrl: "https://example.test/kubernetes.svg",
		});
	});
});

describe("stackFromApi", () => {
	it("maps the Stack creator and normalizes backend dates", () => {
		expect(
			stackFromApi({
				id: "stack-id",
				name: "production",
				permission_denied: false,
				body: {
					created: "2026-08-20T10:00:00",
					updated: "2026-08-21T10:00:00",
				},
				resources: { active: true, user: userResponse },
			})
		).toMatchObject({
			id: "stack-id",
			name: "production",
			user: { id: "user-id", resolvedName: "Ada Lovelace" },
			created: new Date("2026-08-20T10:00:00Z"),
		});
	});
});

describe("componentFromApi", () => {
	it("maps Component configuration, Flavor, creator, and dates", () => {
		const flavor = {
			id: "flavor-id",
			name: "local",
			permission_denied: false,
		} satisfies ApiComponents["schemas"]["FlavorResponse"];

		expect(
			componentFromApi({
				id: "component-id",
				name: "artifact-store",
				permission_denied: false,
				body: {
					created: "2026-08-20T10:00:00",
					updated: "2026-08-21T11:30:00Z",
					type: "artifact_store",
					flavor_name: "local",
					logo_url: null,
				},
				metadata: {
					configuration: { path: "/tmp/artifacts" },
					environment: { REGION: "local" },
					secrets: ["access_token"],
				},
				resources: { flavor, user: userResponse },
			})
		).toEqual({
			id: "component-id",
			name: "artifact-store",
			type: "artifact_store",
			logoUrl: undefined,
			created: new Date("2026-08-20T10:00:00Z"),
			updated: new Date("2026-08-21T11:30:00Z"),
			flavor: { id: "flavor-id", name: "local", logoUrl: undefined },
			user: expect.objectContaining({
				id: "user-id",
				resolvedName: "Ada Lovelace",
			}),
			configuration: { path: "/tmp/artifacts" },
			environment: { REGION: "local" },
			secrets: ["access_token"],
		});
	});
});

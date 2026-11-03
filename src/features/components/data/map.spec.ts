import { describe, expect, expectTypeOf, it } from "vitest";

import type { ComponentType } from "../type/model";
import type { ComponentTypeDto, FlavorDto } from "./dto";
import {
	componentFromApi,
	flavorDetailFromApi,
	flavorFromApi,
	flavorSummaryFromApi,
} from "./map";

const s3Flavor = {
	id: "flavor-id",
	name: "s3",
	permission_denied: false,
	body: {
		created: "2026-08-20T10:00:00Z",
		updated: "2026-08-21T10:00:00Z",
		type: "artifact_store",
		display_name: "S3",
		integration: "s3",
		source: "zenml.integrations.s3",
		logo_url: "https://example.test/s3.png",
		is_custom: false,
	},
	metadata: {
		config_schema: {
			type: "object",
			properties: { path: { type: "string" } },
			required: ["path"],
		},
		docs_url: "https://docs.zenml.io/s3",
	},
} satisfies FlavorDto;

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

describe("flavorSummaryFromApi", () => {
	it("maps what the wizard lists about a Flavor", () => {
		expect(flavorSummaryFromApi(s3Flavor)).toEqual({
			id: "flavor-id",
			name: "s3",
			logoUrl: "https://example.test/s3.png",
			type: "artifact_store",
			displayName: "S3",
			integration: "s3",
			isCustom: false,
		});
	});

	it("falls back to the name without a display name or integration", () => {
		expect(
			flavorSummaryFromApi({
				...s3Flavor,
				body: { ...s3Flavor.body, display_name: "", integration: null },
			})
		).toMatchObject({ displayName: "s3", integration: undefined });
		expect(
			flavorSummaryFromApi({
				id: "flavor-id",
				name: "s3",
				permission_denied: true,
			})
		).toMatchObject({ displayName: "s3", type: undefined, isCustom: false });
	});
});

describe("flavorDetailFromApi", () => {
	it("maps the configuration schema and docs link", () => {
		expect(flavorDetailFromApi(s3Flavor)).toMatchObject({
			name: "s3",
			displayName: "S3",
			configSchema: s3Flavor.metadata.config_schema,
			docsUrl: "https://docs.zenml.io/s3",
		});
	});

	it("uses an empty schema when the Flavor is not hydrated", () => {
		expect(
			flavorDetailFromApi({ ...s3Flavor, metadata: undefined })
		).toMatchObject({ configSchema: {}, docsUrl: undefined });
	});
});

describe("componentFromApi", () => {
	it("maps Component configuration, Flavor, creator, and dates", () => {
		const flavor = {
			id: "flavor-id",
			name: "local",
			permission_denied: false,
		} satisfies FlavorDto;

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
					environment: {},
					secrets: [],
					labels: { team: "platform" },
				},
				resources: {
					flavor,
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
			id: "component-id",
			name: "artifact-store",
			type: "artifact_store",
			logoUrl: undefined,
			created: new Date("2026-08-20T10:00:00Z"),
			updated: new Date("2026-08-21T11:30:00Z"),
			flavor: { id: "flavor-id", name: "local", logoUrl: undefined },
			creatorName: "ada",
			configuration: { path: "/tmp/artifacts" },
			labels: { team: "platform" },
		});
	});

	it("leaves optional values absent for a permission-denied body", () => {
		expect(
			componentFromApi({
				id: "component-id",
				name: "artifact-store",
				permission_denied: true,
			})
		).toEqual({
			id: "component-id",
			name: "artifact-store",
			type: undefined,
			logoUrl: undefined,
			created: undefined,
			updated: undefined,
			flavor: undefined,
			creatorName: undefined,
			configuration: undefined,
			labels: undefined,
		});
	});

	it("keeps the handwritten Component types equal to the backend's", () => {
		expectTypeOf<ComponentType>().toEqualTypeOf<ComponentTypeDto>();
	});
});

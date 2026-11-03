import { beforeEach, describe, expect, it, vi } from "vitest";

import {
	createComponent,
	fetchFlavorDetail,
	fetchFlavorList,
	updateComponent,
} from "./requests";

const { get, post, put } = vi.hoisted(() => ({
	get: vi.fn(),
	post: vi.fn(),
	put: vi.fn(),
}));

vi.mock("@/shared/api/client", () => ({
	apiClient: { GET: get, POST: post, PUT: put },
}));

function ok(data: unknown) {
	return { data, error: undefined, response: new Response() };
}

const savedComponent = {
	id: "component-id",
	name: "s3-store",
	permission_denied: false,
	body: {
		created: "2026-08-20T10:00:00",
		updated: "2026-08-21T10:00:00",
		type: "artifact_store",
		flavor_name: "s3",
	},
	metadata: {
		configuration: { path: "s3://bucket" },
		environment: {},
		secrets: [],
	},
};

const flavor = {
	id: "flavor-id",
	name: "s3",
	permission_denied: false,
	body: {
		created: "2026-08-20T10:00:00",
		updated: "2026-08-21T10:00:00",
		type: "artifact_store",
		display_name: "S3",
		integration: "s3",
		source: "zenml.integrations.s3",
		is_custom: false,
	},
	metadata: { config_schema: { required: ["path"] } },
};

describe("component requests", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it("lists and maps Flavors with the given filters", async () => {
		get.mockResolvedValue(
			ok({
				index: 1,
				max_size: 1000,
				total: 1,
				total_pages: 1,
				items: [flavor],
			})
		);

		const page = await fetchFlavorList({ type: "artifact_store", size: 1000 });

		expect(page.items).toEqual([
			expect.objectContaining({ name: "s3", displayName: "S3" }),
		]);
		expect(get).toHaveBeenCalledWith("/api/v1/flavors", {
			params: { query: { type: "artifact_store", size: 1000 } },
		});
	});

	it("fetches a hydrated Flavor with its configuration schema", async () => {
		get.mockResolvedValue(ok(flavor));

		await expect(fetchFlavorDetail("flavor-id")).resolves.toMatchObject({
			name: "s3",
			configSchema: { required: ["path"] },
		});
		expect(get).toHaveBeenCalledWith("/api/v1/flavors/{flavor_id}", {
			params: { path: { flavor_id: "flavor-id" }, query: { hydrate: true } },
		});
	});

	it("creates a Component and maps the stored one", async () => {
		post.mockResolvedValue(ok(savedComponent));
		const body = {
			name: "s3-store",
			type: "artifact_store",
			flavor: "s3",
			configuration: { path: "s3://bucket" },
		} as const;

		await expect(createComponent(body)).resolves.toMatchObject({
			id: "component-id",
			configuration: { path: "s3://bucket" },
		});
		expect(post).toHaveBeenCalledWith("/api/v1/components", { body });
	});

	it("updates a Component and maps the stored one", async () => {
		put.mockResolvedValue(ok(savedComponent));

		await expect(
			updateComponent({
				componentId: "component-id",
				body: { name: "s3-store" },
			})
		).resolves.toMatchObject({ id: "component-id", name: "s3-store" });
		expect(put).toHaveBeenCalledWith("/api/v1/components/{component_id}", {
			params: { path: { component_id: "component-id" } },
			body: { name: "s3-store" },
		});
	});
});

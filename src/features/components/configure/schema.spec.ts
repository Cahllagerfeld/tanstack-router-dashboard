import { describe, expect, it } from "vitest";

import { m } from "@/paraglide/messages";

import { buildComponentFormSchema } from "./schema";

const s3Schema = {
	type: "object",
	title: "S3ArtifactStoreConfig",
	properties: {
		path: { type: "string", title: "Path" },
		key: {
			anyOf: [{ type: "string" }, { type: "null" }],
			default: null,
			title: "Key",
		},
	},
	required: ["path"],
};

const schema = buildComponentFormSchema(s3Schema);

function issues(values: unknown) {
	const result = schema.safeParse(values);
	return result.success
		? []
		: result.error.issues.map(({ path, message }) => ({ path, message }));
}

describe("buildComponentFormSchema", () => {
	it("accepts a valid Component and trims its name", () => {
		expect(
			schema.parse({
				name: "  s3-store ",
				configuration: { path: "s3://bucket" },
			})
		).toEqual({ name: "s3-store", configuration: { path: "s3://bucket" } });
	});

	it("leaves an optional field unset", () => {
		expect(
			issues({ name: "s3-store", configuration: { path: "s3://bucket" } })
		).toEqual([]);
	});

	it("requires a name of at most 255 characters", () => {
		expect(
			issues({ name: "   ", configuration: { path: "s3://bucket" } })
		).toEqual([
			{ path: ["name"], message: m.components_configure_name_required() },
		]);
		expect(
			issues({ name: "a".repeat(256), configuration: { path: "s3://bucket" } })
		).toEqual([{ path: ["name"], message: m.components_configure_name_max() }]);
	});

	it("reports a configuration issue at its field", () => {
		expect(issues({ name: "s3-store", configuration: {} })).toEqual([
			{
				path: ["configuration", "path"],
				message: m.schema_form_validation_required(),
			},
		]);
		expect(
			issues({ name: "s3-store", configuration: { path: "s3://b", key: 1 } })
		).toEqual([
			{
				path: ["configuration", "key"],
				message: m.schema_form_validation_type_string(),
			},
		]);
	});

	it("accepts any configuration for a Flavor without a schema", () => {
		expect(
			buildComponentFormSchema({}).safeParse({
				name: "custom",
				configuration: { anything: [1, 2] },
			}).success
		).toBe(true);
	});
});

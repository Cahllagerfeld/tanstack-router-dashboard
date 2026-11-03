import { describe, expect, it } from "vitest";
import { z } from "zod";

import { m } from "@/paraglide/messages";

import { schemaRecord } from "./schema-record";

const s3Schema = {
	type: "object",
	properties: {
		path: { type: "string" },
		key: { anyOf: [{ type: "string" }, { type: "null" }], default: null },
		client_kwargs: {
			type: "object",
			properties: { retries: { type: "integer" } },
		},
	},
	required: ["path"],
};

function issues(schema: z.ZodType, data: unknown) {
	const result = schema.safeParse(data);
	return result.success
		? []
		: result.error.issues.map(({ path, message }) => ({ path, message }));
}

describe("schemaRecord", () => {
	it("accepts valid data and leaves an optional field unset", () => {
		expect(schemaRecord(s3Schema).parse({ path: "s3://bucket" })).toEqual({
			path: "s3://bucket",
		});
	});

	it("reports each schema issue at its path inside the record", () => {
		expect(
			issues(schemaRecord(s3Schema), {
				key: 1,
				client_kwargs: { retries: "many" },
			})
		).toEqual([
			{ path: ["path"], message: m.schema_form_validation_required() },
			{ path: ["key"], message: m.schema_form_validation_type_string() },
			{
				path: ["client_kwargs", "retries"],
				message: m.schema_form_validation_type_integer(),
			},
		]);
	});

	it("nests its issues under the key of a parent object", () => {
		const form = z.object({ configuration: schemaRecord(s3Schema) });

		expect(issues(form, { configuration: {} })).toEqual([
			{
				path: ["configuration", "path"],
				message: m.schema_form_validation_required(),
			},
		]);
	});

	it("rejects data that is not a record", () => {
		expect(schemaRecord(s3Schema).safeParse(["s3://bucket"]).success).toBe(
			false
		);
	});
});

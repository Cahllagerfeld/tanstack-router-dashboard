import { afterEach, describe, expect, it } from "vitest";

import { m } from "@/paraglide/messages";
import { getLocale, overwriteGetLocale } from "@/paraglide/runtime";

import { normalizeSchema, type JsonSchema } from "./normalize";
import { validateSchemaData } from "./validate";

const baseGetLocale = getLocale;

afterEach(() => {
	overwriteGetLocale(baseGetLocale);
});

/** Trimmed from the ZenML 0.98 `kubernetes` orchestrator and `s3` flavors. */
const schema = normalizeSchema({
	$defs: {
		KubernetesPodSettings: {
			additionalProperties: true,
			properties: {
				tolerations: {
					default: [],
					items: { additionalProperties: true, type: "object" },
					type: "array",
				},
				scheduler_name: {
					anyOf: [{ type: "string" }, { type: "null" }],
					default: null,
				},
			},
			type: "object",
		},
		Compression: { enum: ["none", "gzip"], type: "string" },
	},
	properties: {
		path: { type: "string" },
		key: {
			anyOf: [{ type: "string" }, { type: "null" }],
			default: null,
			sensitive: true,
		},
		pod_settings: {
			anyOf: [{ $ref: "#/$defs/KubernetesPodSettings" }, { type: "null" }],
			default: null,
		},
		compression: { $ref: "#/$defs/Compression", default: "none" },
		interrupt_check_interval: {
			exclusiveMinimum: 0,
			minimum: 0.5,
			type: "number",
		},
		port_range: {
			maxItems: 2,
			minItems: 2,
			prefixItems: [{ type: "integer" }, { type: "integer" }],
			type: "array",
		},
		cpus: {
			anyOf: [{ type: "integer" }, { type: "string" }, { type: "null" }],
			default: null,
		},
		name: { maxLength: 3, minLength: 2, pattern: "^[a-z]+$", type: "string" },
		endpoint: { format: "uri", type: "string" },
		count: { maximum: 10, exclusiveMaximum: 20, type: "integer" },
	},
	required: ["path"],
	type: "object",
});

describe("validateSchemaData", () => {
	it("accepts valid data and unset optional fields", () => {
		expect(
			validateSchemaData(schema, {
				path: "s3://bucket",
				pod_settings: { tolerations: [{ key: "gpu" }], extra: true },
				compression: "gzip",
				port_range: [8000, 9000],
				cpus: "4",
			})
		).toEqual([]);
	});

	it("reports a missing required field at its own path", () => {
		expect(validateSchemaData(schema, {})).toEqual([
			{ path: ["path"], message: m.schema_form_validation_required() },
		]);
	});

	it("reports one type issue for a wrong optional value", () => {
		expect(validateSchemaData(schema, { path: "p", key: 42 })).toEqual([
			{ path: ["key"], message: m.schema_form_validation_type_string() },
		]);
	});

	it("reports nested failures at their full path, including array indexes", () => {
		expect(
			validateSchemaData(schema, {
				path: "p",
				pod_settings: { tolerations: ["gpu"], scheduler_name: 1 },
			})
		).toEqual([
			{
				path: ["pod_settings", "tolerations", "0"],
				message: m.schema_form_validation_type_object(),
			},
			{
				path: ["pod_settings", "scheduler_name"],
				message: m.schema_form_validation_type_string(),
			},
		]);
	});

	it("keeps the first issue per path", () => {
		expect(
			validateSchemaData(schema, { path: "p", interrupt_check_interval: 0 })
		).toEqual([
			{
				path: ["interrupt_check_interval"],
				message: m.schema_form_validation_minimum({ limit: 0.5 }),
			},
		]);
	});

	it("validates tuple members with JSON Schema 2020-12 prefixItems (docker port_range)", () => {
		expect(
			validateSchemaData(schema, { path: "p", port_range: ["a", 9000] })
		).toEqual([
			{
				path: ["port_range", "0"],
				message: m.schema_form_validation_type_integer(),
			},
		]);
	});

	it("reports a failed union once at its own path", () => {
		expect(validateSchemaData(schema, { path: "p", cpus: [4] })).toEqual([
			{ path: ["cpus"], message: m.schema_form_validation_union() },
		]);
	});

	it("localizes each supported keyword", () => {
		const issues = (data: Record<string, unknown>) =>
			validateSchemaData(schema, { path: "p", ...data }).map(
				(issue) => issue.message
			);

		expect(issues({ compression: "zip" })).toEqual([
			m.schema_form_validation_enum(),
		]);
		expect(issues({ port_range: [1] })).toEqual([
			m.schema_form_validation_min_items({ count: 2 }),
		]);
		expect(issues({ port_range: [1, 2, 3] })).toEqual([
			m.schema_form_validation_max_items({ count: 2 }),
		]);
		expect(issues({ name: "a" })).toEqual([
			m.schema_form_validation_min_length({ count: 2 }),
		]);
		expect(issues({ name: "abcd" })).toEqual([
			m.schema_form_validation_max_length({ count: 3 }),
		]);
		expect(issues({ name: "A1" })).toEqual([
			m.schema_form_validation_pattern({ pattern: "^[a-z]+$" }),
		]);
		expect(issues({ endpoint: "not a uri" })).toEqual([
			m.schema_form_validation_format({ format: "uri" }),
		]);
		expect(issues({ count: 11 })).toEqual([
			m.schema_form_validation_maximum({ limit: 10 }),
		]);
		expect(issues({ count: 1.5 })).toEqual([
			m.schema_form_validation_type_integer(),
		]);
	});

	it("formats numbers for the active locale", () => {
		overwriteGetLocale(() => "de");

		expect(
			validateSchemaData(schema, { path: "p", interrupt_check_interval: 0.1 })
		).toEqual([
			{
				path: ["interrupt_check_interval"],
				message: "Muss mindestens 0,5 sein",
			},
		]);
	});

	it("localizes exclusive bounds", () => {
		const bounded: JsonSchema = {
			properties: {
				ratio: { exclusiveMaximum: 1, exclusiveMinimum: 0, type: "number" },
			},
		};

		expect(validateSchemaData(bounded, { ratio: 1 })).toEqual([
			{
				path: ["ratio"],
				message: m.schema_form_validation_exclusive_maximum({ limit: 1 }),
			},
		]);
		expect(validateSchemaData(bounded, { ratio: 0 })).toEqual([
			{
				path: ["ratio"],
				message: m.schema_form_validation_exclusive_minimum({ limit: 0 }),
			},
		]);
	});
});

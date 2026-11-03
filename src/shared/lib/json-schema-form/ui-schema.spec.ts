import { describe, expect, it } from "vitest";

import { normalizeSchema, type JsonSchema } from "./normalize";
import { buildUiSchema, JSON_FIELD } from "./ui-schema";

const optional = (schema: JsonSchema): JsonSchema => ({
	anyOf: [schema, { type: "null" }],
	default: null,
});

const jsonField = { "ui:field": JSON_FIELD };
const jsonUnionField = {
	"ui:field": JSON_FIELD,
	"ui:fieldReplacesAnyOrOneOf": true,
};
const notExpandable = { "ui:options": { expandable: false } };

describe("buildUiSchema", () => {
	it("masks sensitive strings and renders free-form dicts as JSON (s3)", () => {
		const schema = normalizeSchema({
			properties: {
				path: { title: "Path", type: "string" },
				key: { ...optional({ type: "string" }), sensitive: true },
				secret: { ...optional({ type: "string" }), sensitive: true },
				client_kwargs: optional({ additionalProperties: true, type: "object" }),
			},
			required: ["path"],
			type: "object",
		});

		expect(buildUiSchema(schema)).toEqual({
			...notExpandable,
			key: { "ui:widget": "password" },
			secret: { "ui:widget": "password" },
			client_kwargs: jsonField,
		});
	});

	it("masks write-only password strings and keeps referenced enums native (datadog)", () => {
		const schema = normalizeSchema({
			$defs: {
				Compression: { enum: ["none", "deflate", "gzip"], type: "string" },
			},
			properties: {
				api_key: { format: "password", type: "string", writeOnly: true },
				compression: { $ref: "#/$defs/Compression", default: "none" },
				headers: optional({
					additionalProperties: { type: "string" },
					type: "object",
				}),
			},
			type: "object",
		});

		expect(buildUiSchema(schema)).toEqual({
			...notExpandable,
			api_key: { "ui:widget": "password" },
			headers: jsonField,
		});
	});

	it("renders one nested group and anything deeper as JSON (kubernetes pod_settings)", () => {
		const schema = normalizeSchema({
			$defs: {
				KubernetesPodSettings: {
					additionalProperties: true,
					properties: {
						node_selectors: {
							additionalProperties: { type: "string" },
							type: "object",
						},
						affinity: { additionalProperties: true, type: "object" },
						tolerations: {
							items: { additionalProperties: true, type: "object" },
							type: "array",
						},
						host_ipc: { default: false, type: "boolean" },
						scheduler_name: optional({ type: "string" }),
						image_pull_secrets: { items: { type: "string" }, type: "array" },
						security: { $ref: "#/$defs/Security" },
						legacy: { deprecated: true, type: "string" },
					},
					type: "object",
				},
				Security: {
					properties: { run_as_user: { type: "integer" } },
					type: "object",
				},
			},
			properties: {
				pod_settings: {
					...optional({ $ref: "#/$defs/KubernetesPodSettings" }),
					description: "Pod configuration for step execution containers.",
				},
				pod_stop_grace_period: {
					exclusiveMinimum: 0,
					type: "integer",
				},
				timeout: { ...optional({ type: "integer" }), deprecated: true },
			},
			type: "object",
		});

		expect(buildUiSchema(schema)).toEqual({
			...notExpandable,
			pod_settings: {
				...notExpandable,
				node_selectors: jsonField,
				affinity: jsonField,
				tolerations: jsonField,
				security: jsonField,
				legacy: { "ui:widget": "hidden" },
			},
			timeout: { "ui:widget": "hidden" },
		});
	});

	it("renders tuples as JSON (docker port_range)", () => {
		const schema = normalizeSchema({
			properties: {
				port_range: {
					default: [8000, 65535],
					maxItems: 2,
					minItems: 2,
					prefixItems: [{ type: "integer" }, { type: "integer" }],
					type: "array",
				},
				run_args: { additionalProperties: true, default: {}, type: "object" },
			},
			type: "object",
		});

		expect(buildUiSchema(schema)).toEqual({
			...notExpandable,
			port_range: jsonField,
			run_args: jsonField,
		});
	});

	it("renders unions as JSON that replaces rjsf's option picker (vm_gcp)", () => {
		const schema = normalizeSchema({
			properties: {
				cpus: optional({
					anyOf: [{ type: "integer" }, { type: "string" }],
				}),
				ports: {
					anyOf: [
						{ type: "integer" },
						{ items: { type: "string" }, type: "array" },
						{ type: "null" },
					],
				},
				disk_tier: optional({ enum: ["high", "low"], type: "string" }),
				docker_run_args: { items: { type: "string" }, type: "array" },
				any_of: optional({
					items: { additionalProperties: true, type: "object" },
					type: "array",
				}),
			},
			type: "object",
		});

		expect(buildUiSchema(schema)).toEqual({
			...notExpandable,
			cpus: jsonUnionField,
			ports: jsonUnionField,
			any_of: jsonField,
		});
	});

	it("keeps required deprecated fields visible, at the root and in a nested group", () => {
		const schema = normalizeSchema({
			$defs: {
				Settings: {
					properties: {
						legacy_required: { deprecated: true, type: "string" },
						legacy_optional: { deprecated: true, type: "string" },
					},
					required: ["legacy_required"],
					type: "object",
				},
			},
			properties: {
				old_token: { deprecated: true, sensitive: true, type: "string" },
				old_flag: { deprecated: true, type: "boolean" },
				settings: { $ref: "#/$defs/Settings" },
			},
			required: ["old_token", "settings"],
			type: "object",
		});

		expect(buildUiSchema(schema)).toEqual({
			...notExpandable,
			old_token: { "ui:widget": "password" },
			old_flag: { "ui:widget": "hidden" },
			settings: {
				...notExpandable,
				legacy_optional: { "ui:widget": "hidden" },
			},
		});
	});

	it("hides a deprecated structured field and still keeps it off the native renderer", () => {
		const schema = normalizeSchema({
			properties: {
				old_settings: {
					additionalProperties: true,
					deprecated: true,
					type: "object",
				},
			},
		});

		expect(buildUiSchema(schema)).toEqual({
			...notExpandable,
			old_settings: { ...jsonField, "ui:widget": "hidden" },
		});
	});
});

import { describe, expect, it } from "vitest";

import {
	isJsonEqual,
	normalizeData,
	normalizeSchema,
	type JsonSchema,
} from "./normalize";

/** Trimmed from the ZenML 0.98 `kubernetes` orchestrator, `s3`, and `vm_gcp` flavors. */
const kubernetesSchema: JsonSchema = {
	$defs: {
		KubernetesPodSettings: {
			additionalProperties: true,
			properties: {
				scheduler_name: {
					anyOf: [{ type: "string" }, { type: "null" }],
					default: null,
					title: "Scheduler Name",
				},
				node_selectors: {
					additionalProperties: { type: "string" },
					default: {},
					title: "Node Selectors",
					type: "object",
				},
			},
			title: "KubernetesPodSettings",
			type: "object",
		},
	},
	properties: {
		pod_settings: {
			anyOf: [{ $ref: "#/$defs/KubernetesPodSettings" }, { type: "null" }],
			default: null,
			description: "Pod configuration for step execution containers.",
		},
		timeout: {
			anyOf: [{ type: "integer" }, { type: "null" }],
			default: null,
			deprecated: true,
			title: "Timeout",
		},
		pod_stop_grace_period: {
			default: 30,
			exclusiveMinimum: 0,
			title: "Pod Stop Grace Period",
			type: "integer",
		},
	},
	title: "KubernetesOrchestratorConfig",
	type: "object",
};

describe("normalizeSchema", () => {
	it("collapses an optional scalar into its type and drops the null default", () => {
		const result = normalizeSchema({
			properties: {
				key: {
					anyOf: [{ type: "string" }, { type: "null" }],
					default: null,
					description: "AWS access key ID.",
					sensitive: true,
					title: "Key",
				},
			},
			type: "object",
		});

		expect(result.properties).toEqual({
			key: {
				description: "AWS access key ID.",
				sensitive: true,
				title: "Key",
				type: "string",
			},
		});
	});

	it("keeps a non-null default of an optional field", () => {
		const result = normalizeSchema({
			properties: {
				idle_minutes_to_autostop: {
					anyOf: [{ type: "integer" }, { type: "null" }],
					default: 30,
					title: "Idle Minutes To Autostop",
				},
			},
		});

		expect(result.properties).toEqual({
			idle_minutes_to_autostop: {
				default: 30,
				title: "Idle Minutes To Autostop",
				type: "integer",
			},
		});
	});

	it("keeps an optional model reference unresolved beside its annotations, inside $defs too", () => {
		const result = normalizeSchema(kubernetesSchema);

		expect(result).toEqual({
			$defs: {
				KubernetesPodSettings: {
					additionalProperties: true,
					properties: {
						scheduler_name: { title: "Scheduler Name", type: "string" },
						node_selectors: {
							additionalProperties: { type: "string" },
							default: {},
							title: "Node Selectors",
							type: "object",
						},
					},
					title: "KubernetesPodSettings",
					type: "object",
				},
			},
			properties: {
				pod_settings: {
					$ref: "#/$defs/KubernetesPodSettings",
					description: "Pod configuration for step execution containers.",
				},
				timeout: { deprecated: true, title: "Timeout", type: "integer" },
				pod_stop_grace_period: {
					default: 30,
					exclusiveMinimum: 0,
					title: "Pod Stop Grace Period",
					type: "integer",
				},
			},
			title: "KubernetesOrchestratorConfig",
			type: "object",
		});
	});

	it("lets the field's annotations win over the collapsed member's", () => {
		const result = normalizeSchema({
			anyOf: [{ title: "Inner", type: "string" }, { type: "null" }],
			title: "Outer",
		});

		expect(result).toEqual({ title: "Outer", type: "string" });
	});

	it("collapses an inline enum member", () => {
		const result = normalizeSchema({
			anyOf: [
				{ enum: ["high", "medium", "low"], type: "string" },
				{ type: "null" },
			],
			default: null,
			title: "Disk Tier",
		});

		expect(result).toEqual({
			enum: ["high", "medium", "low"],
			title: "Disk Tier",
			type: "string",
		});
	});

	it("keeps a union of several non-null members without its null member", () => {
		const result = normalizeSchema({
			anyOf: [
				{ type: "integer" },
				{ type: "number" },
				{ type: "string" },
				{ type: "null" },
			],
			default: null,
			title: "Cpus",
		});

		expect(result).toEqual({
			anyOf: [{ type: "integer" }, { type: "number" }, { type: "string" }],
			title: "Cpus",
		});
	});

	it("leaves a union without a null member untouched", () => {
		const schema = { anyOf: [{ type: "integer" }, { type: "string" }] };

		expect(normalizeSchema(schema)).toEqual(schema);
	});

	it("normalizes array items, tuple members, and typed additional properties", () => {
		const optionalString = { anyOf: [{ type: "string" }, { type: "null" }] };
		const result = normalizeSchema({
			properties: {
				names: { items: optionalString, type: "array" },
				port_range: { prefixItems: [optionalString], type: "array" },
				labels: { additionalProperties: optionalString, type: "object" },
				free_form: { additionalProperties: true, type: "object" },
			},
		});

		expect(result.properties).toEqual({
			names: { items: { type: "string" }, type: "array" },
			port_range: { prefixItems: [{ type: "string" }], type: "array" },
			labels: { additionalProperties: { type: "string" }, type: "object" },
			free_form: { additionalProperties: true, type: "object" },
		});
	});

	it("does not mutate its input", () => {
		const snapshot = structuredClone(kubernetesSchema);

		normalizeSchema(kubernetesSchema);

		expect(kubernetesSchema).toEqual(snapshot);
	});

	it("returns the same object for the same input, without mutating it", () => {
		const input = structuredClone(kubernetesSchema);

		const first = normalizeSchema(input);

		expect(normalizeSchema(input)).toBe(first);
		expect(input).toEqual(kubernetesSchema);
		expect(normalizeSchema(structuredClone(kubernetesSchema))).not.toBe(first);
	});
});

describe("normalizeData", () => {
	it("drops null and undefined entries at any depth and cleans inside arrays", () => {
		expect(
			normalizeData({
				path: "s3://bucket",
				key: null,
				secret: undefined,
				client_kwargs: { region_name: undefined, verify: false, retries: 0 },
				tags: ["a", null, { name: "b", value: null }],
			})
		).toEqual({
			path: "s3://bucket",
			client_kwargs: { verify: false, retries: 0 },
			tags: ["a", null, { name: "b" }],
		});
	});

	it("copies nested records instead of sharing them", () => {
		const input = { kwargs: { region: "eu" }, tags: [{ a: 1 }] };

		const result = normalizeData(input);

		expect(result).toEqual(input);
		expect(result.kwargs).not.toBe(input.kwargs);
		expect(result.tags).not.toBe(input.tags);
	});
});

describe("isJsonEqual", () => {
	it("compares JSON values structurally", () => {
		expect(isJsonEqual({ a: [1, { b: "c" }] }, { a: [1, { b: "c" }] })).toBe(
			true
		);
		expect(isJsonEqual({ a: [1, 2] }, { a: [2, 1] })).toBe(false);
		expect(isJsonEqual({ a: 1 }, { a: 1, b: 2 })).toBe(false);
	});
});

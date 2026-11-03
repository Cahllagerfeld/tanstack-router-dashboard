import { describe, expect, test } from "vitest";

import { fieldErrorsToErrorSchema } from "./error-schema";

describe("fieldErrorsToErrorSchema", () => {
	test("maps nested React Hook Form errors onto rjsf error lists", () => {
		expect(
			fieldErrorsToErrorSchema({
				path: { type: "custom", message: "Required" },
				pod_settings: {
					tolerations: { type: "custom", message: "Must be an array" },
				},
			})
		).toEqual({
			path: { __errors: ["Required"] },
			pod_settings: { tolerations: { __errors: ["Must be an array"] } },
		});
	});

	test("keeps array item indices and the array's own root error", () => {
		const items = Object.assign(
			[undefined, { type: "custom", message: "Too long" }],
			{ root: { type: "custom", message: "Too many items" } }
		);

		expect(fieldErrorsToErrorSchema({ image_pull_secrets: items })).toEqual({
			image_pull_secrets: {
				__errors: ["Too many items"],
				1: { __errors: ["Too long"] },
			},
		});
	});

	test("reads a message and its criteria from the same error", () => {
		expect(
			fieldErrorsToErrorSchema({
				path: {
					type: "custom",
					message: "Required",
					types: { pattern: ["Bad pattern", "Required"] },
					ref: { name: "configuration.path" },
				},
			})
		).toEqual({ path: { __errors: ["Required", "Bad pattern"] } });
	});

	test("treats properties named like FieldError keys as properties", () => {
		expect(
			fieldErrorsToErrorSchema({
				type: { type: "custom", message: "Unknown type" },
				message: { type: "custom", message: "Too short" },
			})
		).toEqual({
			type: { __errors: ["Unknown type"] },
			message: { __errors: ["Too short"] },
		});
	});

	test("puts an error on the value itself at the root", () => {
		expect(
			fieldErrorsToErrorSchema({ type: "custom", message: "Invalid" })
		).toEqual({
			__errors: ["Invalid"],
		});
	});

	test("returns undefined when there is nothing to show", () => {
		expect(fieldErrorsToErrorSchema(undefined)).toBeUndefined();
		expect(fieldErrorsToErrorSchema({})).toBeUndefined();
		expect(
			fieldErrorsToErrorSchema({ path: undefined, pod: {} })
		).toBeUndefined();
	});
});

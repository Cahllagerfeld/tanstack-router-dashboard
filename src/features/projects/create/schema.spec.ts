import { describe, expect, it } from "vitest";

import { m } from "@/paraglide/messages";

import { createProjectSchema } from "./schema";

describe("createProjectSchema", () => {
	it("normalizes a valid Project form", () => {
		expect(
			createProjectSchema.parse({
				name: "  fraud_detection  ",
				displayName: "  Fraud Detection  ",
				description: "  Detect suspicious transactions  ",
			})
		).toEqual({
			name: "fraud_detection",
			displayName: "Fraud Detection",
			description: "Detect suspicious transactions",
		});
	});

	it("rejects a Project name that cannot be used by the API", () => {
		const result = createProjectSchema.safeParse({
			name: "Fraud Detection",
			displayName: "Fraud Detection",
			description: "",
		});

		expect(result.success).toBe(false);
		if (!result.success) {
			expect(result.error.issues[0]?.message).toBe(
				m.projects_validation_name_format()
			);
		}
	});

	it("reports required names without rejecting an optional description", () => {
		const result = createProjectSchema.safeParse({
			name: " ",
			displayName: " ",
			description: "",
		});

		expect(result.success).toBe(false);
		if (!result.success) {
			expect(result.error.issues.map((issue) => issue.message)).toEqual([
				m.projects_validation_name_required(),
				m.projects_validation_name_format(),
				m.projects_validation_display_name_required(),
			]);
		}
	});
});

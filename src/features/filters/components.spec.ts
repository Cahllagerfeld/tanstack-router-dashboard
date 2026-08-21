import { getComponentTypeLabel } from "@/features/filters/components";
import type { ComponentType } from "@/types/components";
import { afterEach, describe, expect, it, vi } from "vitest";

describe("getComponentTypeLabel", () => {
	afterEach(() => {
		vi.restoreAllMocks();
	});

	it("returns 'Type' when no type is provided", () => {
		expect(getComponentTypeLabel()).toBe("Type");
	});

	it("converts snake_case to Title Case for simple values", () => {
		const input: ComponentType = "data_validator";
		expect(getComponentTypeLabel(input)).toBe("Data Validator");
	});

	it("returns Title Case for a single word", () => {
		const input: ComponentType = "model_registry";
		expect(getComponentTypeLabel(input)).toBe("Model Registry");
	});

	it("handles multiple underscores", () => {
		const input = "a_b_c" as unknown as ComponentType;
		expect(getComponentTypeLabel(input)).toBe("A B C");
	});
});

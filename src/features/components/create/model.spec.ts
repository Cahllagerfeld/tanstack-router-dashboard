import { describe, expect, it } from "vitest";

import {
	createStepFor,
	createStepStates,
	filterFlavors,
	selectableFlavorId,
} from "./model";

describe("createStepFor", () => {
	it("asks for the type, then the Flavor, then the configuration", () => {
		expect(createStepFor({ type: undefined, flavorId: undefined })).toBe(
			"type"
		);
		expect(createStepFor({ type: undefined, flavorId: "flavor-id" })).toBe(
			"type"
		);
		expect(createStepFor({ type: "orchestrator", flavorId: undefined })).toBe(
			"flavor"
		);
		expect(createStepFor({ type: "orchestrator", flavorId: "flavor-id" })).toBe(
			"configure"
		);
	});
});

describe("createStepStates", () => {
	it("marks earlier steps done and later ones upcoming", () => {
		expect(createStepStates("flavor")).toEqual([
			{ step: "type", state: "done" },
			{ step: "flavor", state: "current" },
			{ step: "configure", state: "upcoming" },
		]);
	});
});

describe("selectableFlavorId", () => {
	const flavor = { id: "flavor-id", type: "orchestrator" } as const;

	it("accepts a Flavor of the chosen type", () => {
		expect(selectableFlavorId(flavor, "orchestrator")).toBe("flavor-id");
	});

	it("rejects a missing Flavor or one of another type", () => {
		expect(selectableFlavorId(undefined, "orchestrator")).toBeUndefined();
		expect(selectableFlavorId(flavor, "artifact_store")).toBeUndefined();
		expect(selectableFlavorId(flavor, undefined)).toBeUndefined();
	});
});

describe("filterFlavors", () => {
	const flavors = [
		{ displayName: "Local Docker", integration: "built-in" },
		{ displayName: "Kubernetes", integration: "kubernetes" },
		{ displayName: "Custom", integration: undefined },
	];

	it("matches display name or integration, ignoring case", () => {
		expect(filterFlavors(flavors, " DOCKER ")).toEqual([flavors[0]]);
		expect(filterFlavors(flavors, "built")).toEqual([flavors[0]]);
	});

	it("keeps every Flavor for an empty query", () => {
		expect(filterFlavors(flavors, "  ")).toBe(flavors);
	});
});

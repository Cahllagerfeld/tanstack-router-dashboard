import {
	Box,
	FolderKanban,
	History,
	Layers,
	Package,
	Workflow,
} from "lucide-react";
import { describe, expect, it } from "vitest";
import { getEntityIcon } from "./entity-icons";

describe("getEntityIcon", () => {
	it("maps project to FolderKanban", () => {
		expect(getEntityIcon("project")).toBe(FolderKanban);
	});

	it("maps component to Box", () => {
		expect(getEntityIcon("component")).toBe(Box);
	});

	it("maps stack to Layers", () => {
		expect(getEntityIcon("stack")).toBe(Layers);
	});

	it("maps pipeline to Workflow", () => {
		expect(getEntityIcon("pipeline")).toBe(Workflow);
	});

	it("maps run to History", () => {
		expect(getEntityIcon("run")).toBe(History);
	});

	it("maps artifact to Package (shared with artifact versions)", () => {
		expect(getEntityIcon("artifact")).toBe(Package);
	});
});

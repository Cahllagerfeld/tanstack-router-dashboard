import {
	Box,
	CirclePlay,
	Cpu,
	FileBox,
	FolderKanban,
	Layers,
	Rocket,
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

	it("maps run to CirclePlay", () => {
		expect(getEntityIcon("run")).toBe(CirclePlay);
	});

	it("maps model to Cpu", () => {
		expect(getEntityIcon("model")).toBe(Cpu);
	});

	it("maps artifact to FileBox (shared with artifact versions)", () => {
		expect(getEntityIcon("artifact")).toBe(FileBox);
	});

	it("maps deployment to Rocket", () => {
		expect(getEntityIcon("deployment")).toBe(Rocket);
	});
});

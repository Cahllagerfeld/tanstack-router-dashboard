import { beforeEach, describe, expect, it, vi } from "vitest";

import type { Project } from "@/domain/projects";

const { getItem, removeItem, setItem } = vi.hoisted(() => ({
	getItem: vi.fn(),
	removeItem: vi.fn(),
	setItem: vi.fn(),
}));

vi.stubGlobal("localStorage", { getItem, removeItem, setItem });

const {
	getProjectFromLocalStorage,
	getProjectLabel,
	resolveProject,
	resolveUnscopedProject,
	setProjectToLocalStorage,
} = await import("./projects");

describe("selected Project storage", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it("persists and reads the selected Project", () => {
		getItem.mockReturnValue("fraud-detection");

		setProjectToLocalStorage("fraud-detection");

		expect(setItem).toHaveBeenCalledWith(
			"zenml.projects.selected",
			"fraud-detection"
		);
		expect(getProjectFromLocalStorage()).toBe("fraud-detection");
	});

	it("removes the selection when no Project is active", () => {
		setProjectToLocalStorage(null);

		expect(removeItem).toHaveBeenCalledWith("zenml.projects.selected");
		expect(setItem).not.toHaveBeenCalled();
	});
});

describe("resolveProject", () => {
	const projects = [
		{ id: "id-1", name: "newest" },
		{ id: "id-2", name: "older" },
	] as Project[];

	it("opens the last opened Project when it is still listed", () => {
		expect(resolveProject(projects, "id-2")).toBe(projects[1]);
	});

	it("matches a last opened Project stored by name", () => {
		expect(resolveProject(projects, "older")).toBe(projects[1]);
	});

	it.each([
		["nothing was opened yet", null],
		["the last opened Project no longer exists", "deleted-id"],
	])("opens the first Project when %s", (_, lastOpened) => {
		expect(resolveProject(projects, lastOpened)).toBe(projects[0]);
	});

	it("resolves to nothing without Projects", () => {
		expect(resolveProject([], "id-1")).toBeUndefined();
	});
});

describe("resolveUnscopedProject", () => {
	const projects = [
		{ id: "id-1", name: "newest" },
		{ id: "id-2", name: "older" },
	] as Project[];

	it("keeps a listed Project whatever the list state", () => {
		expect(resolveUnscopedProject(projects, "id-2", false)).toBe(projects[1]);
	});

	it("does not replace a missing Project until the list is current", () => {
		expect(resolveUnscopedProject(projects, "id-3", false)).toBeUndefined();
	});

	it("opens the first Project once a current list confirms it is gone", () => {
		expect(resolveUnscopedProject(projects, "id-3", true)).toBe(projects[0]);
	});

	it("opens the first Project when nothing was opened yet", () => {
		expect(resolveUnscopedProject(projects, null, false)).toBe(projects[0]);
	});
});

describe("getProjectLabel", () => {
	it("prefers the display name", () => {
		expect(
			getProjectLabel({ id: "id", name: "fraud", displayName: "Fraud" })
		).toBe("Fraud");
	});

	it("falls back to the name", () => {
		expect(
			getProjectLabel({ id: "id", name: "fraud", displayName: undefined })
		).toBe("fraud");
	});
});

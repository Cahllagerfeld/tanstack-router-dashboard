import { beforeEach, describe, expect, it, vi } from "vitest";

const { getItem, removeItem, setItem } = vi.hoisted(() => ({
	getItem: vi.fn(),
	removeItem: vi.fn(),
	setItem: vi.fn(),
}));

vi.stubGlobal("localStorage", { getItem, removeItem, setItem });

const {
	getProjectFromLocalStorage,
	rememberOpenedProject,
	setProjectToLocalStorage,
} = await import("./storage");

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

	it("remembers a Project the user opened", () => {
		rememberOpenedProject("project-id", false);

		expect(setItem).toHaveBeenCalledWith(
			"zenml.projects.selected",
			"project-id"
		);
	});

	it("does not treat a hover preload as opening the Project", () => {
		rememberOpenedProject("project-id", true);

		expect(setItem).not.toHaveBeenCalled();
	});
});

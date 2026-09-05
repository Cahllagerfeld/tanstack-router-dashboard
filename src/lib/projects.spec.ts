import { beforeEach, describe, expect, it, vi } from "vitest";

const { getItem, removeItem, setItem } = vi.hoisted(() => ({
	getItem: vi.fn(),
	removeItem: vi.fn(),
	setItem: vi.fn(),
}));

vi.stubGlobal("localStorage", { getItem, removeItem, setItem });

const { getProjectFromLocalStorage, setProjectToLocalStorage } =
	await import("./projects");

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

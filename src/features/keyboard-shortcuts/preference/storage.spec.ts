import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import {
	getKeyboardShortcutsEnabled,
	setKeyboardShortcutsEnabled,
	subscribeToKeyboardShortcutsEnabled,
} from "./storage";

const key = "zenml.keyboard-shortcuts.enabled";

describe("keyboard shortcuts preference", () => {
	beforeEach(() => {
		const values = new Map<string, string>();
		vi.stubGlobal("localStorage", {
			getItem: (name: string) => values.get(name) ?? null,
			setItem: (name: string, value: string) => values.set(name, value),
		});
		vi.stubGlobal("window", {
			addEventListener: vi.fn(),
			removeEventListener: vi.fn(),
		});
	});

	afterEach(() => {
		vi.unstubAllGlobals();
	});

	it("defaults to on", () => {
		expect(getKeyboardShortcutsEnabled()).toBe(true);
	});

	it("persists turning shortcuts off and on", () => {
		setKeyboardShortcutsEnabled(false);
		expect(localStorage.getItem(key)).toBe("false");
		expect(getKeyboardShortcutsEnabled()).toBe(false);

		setKeyboardShortcutsEnabled(true);
		expect(getKeyboardShortcutsEnabled()).toBe(true);
	});

	it("treats an unrecognized stored value as on", () => {
		localStorage.setItem(key, "unexpected");

		expect(getKeyboardShortcutsEnabled()).toBe(true);
	});

	it("notifies subscribers until they unsubscribe", () => {
		const listener = vi.fn();
		const unsubscribe = subscribeToKeyboardShortcutsEnabled(listener);

		setKeyboardShortcutsEnabled(false);
		expect(listener).toHaveBeenCalledOnce();

		unsubscribe();
		setKeyboardShortcutsEnabled(true);
		expect(listener).toHaveBeenCalledOnce();
	});

	it("follows changes from other tabs", () => {
		const unsubscribe = subscribeToKeyboardShortcutsEnabled(vi.fn());

		expect(window.addEventListener).toHaveBeenCalledWith(
			"storage",
			expect.any(Function)
		);

		unsubscribe();
		expect(window.removeEventListener).toHaveBeenCalledWith(
			"storage",
			expect.any(Function)
		);
	});
});

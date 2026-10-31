import { afterEach, expect, test, vi } from "vitest";
import { render } from "vitest-browser-react";

import { RippleBackground } from "./ripple-background";

function preferReducedMotion(matches: boolean) {
	const listeners = new Set<() => void>();
	const query = {
		addEventListener: (_: string, listener: () => void) =>
			listeners.add(listener),
		matches,
		removeEventListener: (_: string, listener: () => void) =>
			listeners.delete(listener),
	};
	vi.spyOn(window, "matchMedia").mockReturnValue(
		query as unknown as MediaQueryList
	);
	return (nextMatches: boolean) => {
		query.matches = nextMatches;
		for (const listener of listeners) listener();
	};
}

function fakeWebGl() {
	return new Proxy(
		{},
		{ get: () => () => 1 }
	) as unknown as WebGLRenderingContext;
}

function mockWebGl(context: WebGLRenderingContext | null) {
	return vi
		.spyOn(HTMLCanvasElement.prototype, "getContext")
		.mockReturnValue(context);
}

async function renderCanvas() {
	const screen = await render(<RippleBackground />);
	const canvas = screen.container.querySelector("canvas");
	if (!canvas) throw new Error("Expected the background canvas");
	return canvas;
}

afterEach(() => {
	vi.restoreAllMocks();
});

test("the shader replaces the static grid when WebGL is available", async () => {
	preferReducedMotion(false);
	mockWebGl(fakeWebGl());

	const canvas = await renderCanvas();

	expect(canvas.hasAttribute("data-running")).toBe(true);
});

test("devices without accelerated WebGL keep the static grid", async () => {
	preferReducedMotion(false);
	mockWebGl(null);

	const canvas = await renderCanvas();

	expect(canvas.hasAttribute("data-running")).toBe(false);
});

test("users who prefer reduced motion never start the shader", async () => {
	preferReducedMotion(true);
	const getContext = mockWebGl(fakeWebGl());

	const canvas = await renderCanvas();

	expect(canvas.hasAttribute("data-running")).toBe(false);
	expect(getContext).not.toHaveBeenCalled();
});

test("turning on reduced motion stops a running shader", async () => {
	const setReducedMotion = preferReducedMotion(false);
	mockWebGl(fakeWebGl());
	const canvas = await renderCanvas();

	setReducedMotion(true);

	expect(canvas.hasAttribute("data-running")).toBe(false);
});

test("losing the GPU context falls back to the static grid", async () => {
	preferReducedMotion(false);
	mockWebGl(fakeWebGl());
	const canvas = await renderCanvas();

	canvas.dispatchEvent(new Event("webglcontextlost"));

	expect(canvas.hasAttribute("data-running")).toBe(false);
});

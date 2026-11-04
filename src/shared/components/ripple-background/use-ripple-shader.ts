import { useEffect, useRef } from "react";

import { startRippleShader } from "./ripple-shader";

const RUNNING_ATTRIBUTE = "data-running";

/** Runs the shader on the returned canvas unless the user prefers less motion. */
export function useRippleShader() {
	const canvasRef = useRef<HTMLCanvasElement>(null);

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;

		const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
		const shader: { stop: (() => void) | null } = { stop: null };

		function markStopped() {
			shader.stop = null;
			canvas?.removeAttribute(RUNNING_ATTRIBUTE);
		}

		function sync() {
			shader.stop?.();
			markStopped();
			if (reducedMotion.matches || !canvas) return;
			shader.stop = startRippleShader(canvas, markStopped);
			if (shader.stop) canvas.setAttribute(RUNNING_ATTRIBUTE, "");
		}

		sync();
		reducedMotion.addEventListener("change", sync);
		return () => {
			reducedMotion.removeEventListener("change", sync);
			shader.stop?.();
		};
	}, []);

	return canvasRef;
}

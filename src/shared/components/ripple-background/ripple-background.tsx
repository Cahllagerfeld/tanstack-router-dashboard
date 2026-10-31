import { useRippleShader } from "./use-ripple-shader";

/**
 * Decorative dot grid that ripples around the pointer. A static CSS grid stands
 * in whenever the shader is not running.
 */
export function RippleBackground() {
	const canvasRef = useRippleShader();

	return (
		<div aria-hidden className="pointer-events-none absolute inset-0 z-0">
			<canvas
				ref={canvasRef}
				className="peer block size-full opacity-0 transition-opacity duration-700 data-running:opacity-100 dark:invert"
			/>
			<div className="absolute inset-0 bg-[radial-gradient(circle,var(--foreground)_1px,transparent_1px)] bg-size-[14px_14px] opacity-15 peer-data-running:hidden" />
		</div>
	);
}

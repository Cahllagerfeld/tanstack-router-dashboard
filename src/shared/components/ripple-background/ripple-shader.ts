const MAX_PIXEL_RATIO = 2;
const POINTER_EASING_PER_SECOND = 6;

const VERTEX_SHADER = `
attribute vec2 position;

void main() {
	gl_Position = vec4(position, 0.0, 1.0);
}
`;

// Outputs black dots with alpha; the canvas applies theme colour through CSS.
const FRAGMENT_SHADER = `
precision highp float;

uniform vec2 uPointer;
uniform float uPixelRatio;
uniform float uTime;

const float cellSize = 14.0;

void main() {
	vec2 position = gl_FragCoord.xy / uPixelRatio;
	vec2 cellCenter = (floor(position / cellSize) + 0.5) * cellSize;
	vec2 cellOffset = fract(position / cellSize) - 0.5;

	float pointerDistance = distance(cellCenter, uPointer);
	float glow = exp(-pointerDistance * pointerDistance / 18000.0);
	float ripple = 0.5 + 0.5 * sin(pointerDistance * 0.05 - uTime * 2.0);
	float strength = max(glow, ripple * exp(-pointerDistance / 220.0) * 0.5);

	float radius = 0.07 + 0.3 * strength;
	float dotMask = 1.0 - smoothstep(radius - 0.1, radius, length(cellOffset));

	gl_FragColor = vec4(0.0, 0.0, 0.0, dotMask * (0.1 + 0.35 * strength));
}
`;

function createProgram(gl: WebGLRenderingContext) {
	const program = gl.createProgram();
	const vertexShader = gl.createShader(gl.VERTEX_SHADER);
	const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
	if (!program || !vertexShader || !fragmentShader) return null;

	gl.shaderSource(vertexShader, VERTEX_SHADER);
	gl.shaderSource(fragmentShader, FRAGMENT_SHADER);
	gl.compileShader(vertexShader);
	gl.compileShader(fragmentShader);
	gl.attachShader(program, vertexShader);
	gl.attachShader(program, fragmentShader);
	gl.linkProgram(program);
	gl.deleteShader(vertexShader);
	gl.deleteShader(fragmentShader);

	if (gl.getProgramParameter(program, gl.LINK_STATUS)) return program;
	gl.deleteProgram(program);
	return null;
}

/**
 * Starts the animation and returns its stop function, or null when the device
 * cannot run it with hardware acceleration. `onContextLost` fires if the
 * browser takes the GPU context away after a successful start.
 */
export function startRippleShader(
	canvas: HTMLCanvasElement,
	onContextLost: () => void
) {
	const gl = canvas.getContext("webgl", {
		antialias: false,
		depth: false,
		failIfMajorPerformanceCaveat: true,
		powerPreference: "low-power",
		stencil: false,
	});
	if (!gl) return null;

	const program = createProgram(gl);
	const buffer = gl.createBuffer();
	if (!program || !buffer) return null;

	gl.useProgram(program);
	gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
	gl.bufferData(
		gl.ARRAY_BUFFER,
		new Float32Array([-1, -1, 3, -1, -1, 3]),
		gl.STATIC_DRAW
	);
	const position = gl.getAttribLocation(program, "position");
	gl.enableVertexAttribArray(position);
	gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

	const uPointer = gl.getUniformLocation(program, "uPointer");
	const uPixelRatio = gl.getUniformLocation(program, "uPixelRatio");
	const uTime = gl.getUniformLocation(program, "uTime");

	let width = 0;
	let height = 0;
	let pointerTarget: { clientX: number; clientY: number } | null = null;

	function resize() {
		const pixelRatio = Math.min(window.devicePixelRatio, MAX_PIXEL_RATIO);
		width = canvas.clientWidth;
		height = canvas.clientHeight;
		canvas.width = Math.round(width * pixelRatio);
		canvas.height = Math.round(height * pixelRatio);
		gl?.viewport(0, 0, canvas.width, canvas.height);
		gl?.uniform1f(uPixelRatio, pixelRatio);
	}
	resize();
	const resizeObserver = new ResizeObserver(resize);
	resizeObserver.observe(canvas);

	function handlePointerMove(event: PointerEvent) {
		if (event.pointerType === "mouse") pointerTarget = event;
	}
	function handlePointerLeave() {
		pointerTarget = null;
	}
	window.addEventListener("pointermove", handlePointerMove);
	document.documentElement.addEventListener("pointerleave", handlePointerLeave);

	// Requires no visibility handling: browsers suspend animation frames in
	// hidden tabs.
	let animationFrame = 0;
	let previousTime = performance.now();
	let pointerX = width / 2;
	let pointerY = height / 2;

	function draw(time: number) {
		const seconds = time / 1000;
		const elapsedSeconds = (time - previousTime) / 1000;
		previousTime = time;

		const rect = canvas.getBoundingClientRect();
		const targetX = pointerTarget
			? pointerTarget.clientX - rect.left
			: width / 2 + Math.cos(seconds * 0.35) * width * 0.36;
		const targetY = pointerTarget
			? rect.bottom - pointerTarget.clientY
			: height / 2 + Math.sin(seconds * 0.45) * height * 0.34;

		const easing = 1 - Math.exp(-elapsedSeconds * POINTER_EASING_PER_SECOND);
		pointerX += (targetX - pointerX) * easing;
		pointerY += (targetY - pointerY) * easing;

		gl?.uniform2f(uPointer, pointerX, pointerY);
		gl?.uniform1f(uTime, seconds);
		gl?.drawArrays(gl.TRIANGLES, 0, 3);
		animationFrame = requestAnimationFrame(draw);
	}
	animationFrame = requestAnimationFrame(draw);

	function release() {
		cancelAnimationFrame(animationFrame);
		resizeObserver.disconnect();
		window.removeEventListener("pointermove", handlePointerMove);
		document.documentElement.removeEventListener(
			"pointerleave",
			handlePointerLeave
		);
		canvas.removeEventListener("webglcontextlost", handleContextLost);
	}

	function handleContextLost() {
		release();
		onContextLost();
	}
	canvas.addEventListener("webglcontextlost", handleContextLost);

	return () => {
		release();
		gl.deleteBuffer(buffer);
		gl.deleteProgram(program);
	};
}

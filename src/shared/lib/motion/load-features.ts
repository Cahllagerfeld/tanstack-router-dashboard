/** Loads Motion's animation features in a separate chunk, for `LazyMotion`. */
export const loadMotionFeatures = () =>
	import("./features").then((module) => module.default);

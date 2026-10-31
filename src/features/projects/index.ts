export { projectQueries } from "./data/queries";
export type { Project } from "./model";
export { getProjectLabel } from "./model";
export { getIllustrationUrl, resolveProject } from "./selection/model";
export {
	getProjectFromLocalStorage,
	rememberOpenedProject,
} from "./selection/storage";

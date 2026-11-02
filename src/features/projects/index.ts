export { projectQueries } from "./data/queries";
export { getProjectLabel, type Project, type ProjectDetail } from "./model";
export { getIllustrationUrl, resolveProject } from "./selection/model";
export {
	getProjectFromLocalStorage,
	rememberOpenedProject,
} from "./selection/storage";

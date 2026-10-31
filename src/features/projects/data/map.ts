import type { Project } from "../model";
import type { ProjectDto } from "./dto";

export function projectFromApi(apiProject: ProjectDto): Project {
	return {
		id: apiProject.id,
		name: apiProject.name,
		displayName: apiProject.body?.display_name ?? apiProject.name,
	};
}

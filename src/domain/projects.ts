import { components } from "@/types/core";

export type Project = {
	id: string;
	name: string;
	displayName: string | undefined;
};

export function projectFromApi(
	apiProject: components["schemas"]["ProjectResponse"]
): Project {
	return {
		id: apiProject.id,
		name: apiProject.name,
		displayName: apiProject.body?.display_name ?? apiProject.name,
	};
}

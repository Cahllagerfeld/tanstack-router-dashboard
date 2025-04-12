import { apiPaths } from "../../api";
import { ProjectList } from "@/types/projects";
import { apiClient } from "../../api-client";

export async function fetchProjectList() {
	const data = await apiClient<ProjectList>(apiPaths.projects.base);
	return data;
}

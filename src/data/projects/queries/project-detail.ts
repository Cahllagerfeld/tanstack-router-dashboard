import { Project } from "@/types/projects";
import { apiPaths } from "../../api";
import { apiClient } from "../../api-client";

type Args = {
	projectId: string;
};

export async function fetchProjectDetail({ projectId }: Args) {
	const url = apiPaths.projects.detail(projectId);
	const data = await apiClient<Project>(url);
	return data;
}

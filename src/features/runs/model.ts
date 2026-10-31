import { snakeCaseToTitleCase } from "@/shared/lib/strings";

export type Run = {
	id: string;
	index: number | undefined;
	status: string | undefined;
	pipelineName: string | undefined;
	stackName: string | undefined;
	authorName: string | undefined;
	created: Date | undefined;
};

/** Mirrors the backend's list query, so its field names stay as they are. */
export type ProjectRunListInput = {
	project: string;
	project_name_or_id?: string | null;
	hydrate?: boolean;
	include_full_metadata?: boolean;
	sort_by?: string;
	logical_operator?: "and" | "or";
	page?: number;
	size?: number;
	id?: string | string[] | null;
	created?: string | string[] | null;
	updated?: string | string[] | null;
	run_metadata?: string | string[] | null;
	tags?: string | string[] | null;
	scope_user?: string | null;
	user?: string | string[] | null;
	name?: string | string[] | null;
	index?: number | string | (number | string)[] | null;
	orchestrator_run_id?: string | string[] | null;
	pipeline_id?: string | string[] | null;
	stack_id?: string | string[] | null;
	schedule_id?: string | string[] | null;
	build_id?: string | string[] | null;
	snapshot_id?: string | string[] | null;
	code_repository_id?: string | string[] | null;
	template_id?: string | string[] | null;
	source_snapshot_id?: string | string[] | null;
	model_version_id?: string | string[] | null;
	linked_to_model_version_id?: string | string[] | null;
	status?: string | string[] | null;
	in_progress?: boolean | null;
	start_time?: string | string[] | null;
	end_time?: string | string[] | null;
	pipeline_name?: string | string[] | null;
	pipeline?: string | string[] | null;
	stack?: string | string[] | null;
	code_repository?: string | string[] | null;
	model?: string | string[] | null;
	stack_component?: string | string[] | null;
	templatable?: boolean | null;
	triggered_by_step_run_id?: string | string[] | null;
	triggered_by_deployment_id?: string | string[] | null;
	trigger_id?: string | string[] | null;
	parent_run_id?: string | string[] | null;
	root_runs_only?: boolean | null;
};

export type RunPage = {
	index: number;
	max_size: number;
	total: number;
	total_pages: number;
	items: Run[];
};

export function formatRunIndex(index: number): string {
	return `#${String(index).padStart(4, "0")}`;
}

export function formatRunStatus(status: string): string {
	return snakeCaseToTitleCase(status);
}

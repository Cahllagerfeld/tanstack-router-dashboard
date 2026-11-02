import type { ReactNode } from "react";

import { m } from "@/paraglide/messages";
import { CopyButton } from "@/shared/components/copy-button";

import type { ProjectDetail } from "../model";

/** Read-only facts that identify a Project. */
export function ProjectDetailsSetting({ project }: { project: ProjectDetail }) {
	return (
		<dl className="@container flex flex-col gap-4 text-sm">
			<Fact label={m.projects_settings_display_name()}>
				{project.displayName ?? project.name}
			</Fact>
			<Fact label={m.projects_settings_name()}>
				<span className="font-mono">{project.name}</span>
			</Fact>
			<Fact label={m.projects_settings_id()}>
				<span className="flex min-w-0 items-center gap-1">
					<span className="truncate font-mono">{project.id}</span>
					<CopyButton value={project.id} />
				</span>
			</Fact>
			<Fact label={m.projects_settings_description()}>
				{project.description ?? (
					<span className="text-muted-foreground">
						{m.projects_settings_no_description()}
					</span>
				)}
			</Fact>
		</dl>
	);
}

function Fact({ label, children }: { label: string; children: ReactNode }) {
	return (
		<div className="grid gap-1 @sm:grid-cols-[9rem_minmax(0,1fr)] @sm:gap-6">
			<dt className="text-muted-foreground">{label}</dt>
			<dd className="min-w-0">{children}</dd>
		</div>
	);
}

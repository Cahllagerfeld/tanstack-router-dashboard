import { m } from "@/paraglide/messages";
import { Avatar, AvatarImage } from "@/shared/ui/avatar";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/shared/ui/select";

import { getProjectLabel, type Project } from "../model";
import { getIllustrationUrl } from "./model";

type Props = {
	projects: Project[];
	value: Project | undefined;
	onSelect: (project: Project) => void;
	"aria-label": string;
	className?: string;
};

/** Picks one Project from a list. The caller decides what selecting one does. */
export function ProjectSelect({
	projects,
	value,
	onSelect,
	"aria-label": ariaLabel,
	className,
}: Props) {
	return (
		<Select
			value={value?.id ?? null}
			onValueChange={(id) => {
				const project = projects.find((candidate) => candidate.id === id);
				if (project) onSelect(project);
			}}
		>
			<SelectTrigger aria-label={ariaLabel} className={className}>
				<SelectValue>
					{(id: string | null) => {
						const project = projects.find((candidate) => candidate.id === id);
						return project ? (
							<ProjectOption project={project} />
						) : (
							m.projects_switcher_select()
						);
					}}
				</SelectValue>
			</SelectTrigger>
			<SelectContent alignItemWithTrigger={false} align="start">
				{projects.map((project) => (
					<SelectItem key={project.id} value={project.id}>
						<ProjectOption project={project} />
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	);
}

function ProjectOption({ project }: { project: Project }) {
	return (
		<>
			<Avatar className="size-5 shrink-0 rounded-sm after:rounded-sm">
				<AvatarImage
					src={getIllustrationUrl(project.name)}
					className="rounded-sm"
				/>
			</Avatar>
			<span className="truncate">{getProjectLabel(project)}</span>
		</>
	);
}

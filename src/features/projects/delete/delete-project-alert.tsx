import { m } from "@/paraglide/messages";
import { DeleteAlert } from "@/shared/components/delete-alert";

import { getProjectLabel, type Project } from "../model";
import { useDeleteProject } from "./use-delete-project";

type Props = {
	project: Project;
	onClose: () => void;
};

export function DeleteProjectAlert({ project, onClose }: Props) {
	const { mutate, isPending } = useDeleteProject({
		onSuccess: onClose,
	});

	return (
		<DeleteAlert
			description={m.projects_delete_description({
				name: getProjectLabel(project),
			})}
			isPending={isPending}
			onConfirm={() => mutate({ projectId: project.id })}
			onClose={onClose}
		/>
	);
}

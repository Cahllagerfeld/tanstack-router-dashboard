import {
	ResponsiveAlertDialog,
	ResponsiveAlertDialogAction,
	ResponsiveAlertDialogCancel,
	ResponsiveAlertDialogContent,
	ResponsiveAlertDialogDescription,
	ResponsiveAlertDialogFooter,
	ResponsiveAlertDialogHeader,
	ResponsiveAlertDialogTitle,
} from "@/components/ui/responsive-alert-dialog";
import { useDeleteProject } from "@/data/projects/mutations/delete-project";
import type { Project } from "@/domain/projects";
import { getProjectLabel } from "@/lib/projects";
import { m } from "@/paraglide/messages";

type Props = {
	project: Project;
	onClose: () => void;
};

export function DeleteProjectAlert({ project, onClose }: Props) {
	const { mutate, isPending } = useDeleteProject({
		onSuccess: onClose,
	});

	return (
		<ResponsiveAlertDialog
			open
			onOpenChange={(open) => {
				if (!open) onClose();
			}}
		>
			<ResponsiveAlertDialogContent>
				<ResponsiveAlertDialogHeader>
					<ResponsiveAlertDialogTitle>
						{m.projects_delete_title()}
					</ResponsiveAlertDialogTitle>
					<ResponsiveAlertDialogDescription>
						{m.projects_delete_description({ name: getProjectLabel(project) })}
					</ResponsiveAlertDialogDescription>
				</ResponsiveAlertDialogHeader>
				<ResponsiveAlertDialogFooter className="max-md:py-2">
					<ResponsiveAlertDialogCancel>
						{m.common_action_cancel()}
					</ResponsiveAlertDialogCancel>
					<ResponsiveAlertDialogAction
						variant="destructive"
						disabled={isPending}
						onClick={() => mutate({ projectId: project.id })}
					>
						{isPending ? m.projects_delete_pending() : m.common_action_delete()}
					</ResponsiveAlertDialogAction>
				</ResponsiveAlertDialogFooter>
			</ResponsiveAlertDialogContent>
		</ResponsiveAlertDialog>
	);
}

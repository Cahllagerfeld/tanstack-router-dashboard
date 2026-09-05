import type { Dispatch, SetStateAction } from "react";

import { useDeleteProject } from "@/data/projects/mutations/delete-project";
import { m } from "@/paraglide/messages";
import {
	ResponsiveAlertDialog,
	ResponsiveAlertDialogAction,
	ResponsiveAlertDialogCancel,
	ResponsiveAlertDialogContent,
	ResponsiveAlertDialogDescription,
	ResponsiveAlertDialogFooter,
	ResponsiveAlertDialogHeader,
	ResponsiveAlertDialogTitle,
} from "@/shared/components/ui/responsive-alert-dialog";

type Props = {
	projectId: string;
	open: boolean;
	setOpen: Dispatch<SetStateAction<boolean>>;
};

export function DeleteProjectAlert({ projectId, open, setOpen }: Props) {
	const { mutate, isPending } = useDeleteProject({
		onSuccess: () => {
			setOpen(false);
		},
	});

	return (
		<ResponsiveAlertDialog open={open} onOpenChange={setOpen}>
			<ResponsiveAlertDialogContent>
				<ResponsiveAlertDialogHeader>
					<ResponsiveAlertDialogTitle>
						{m.projects_delete_title()}
					</ResponsiveAlertDialogTitle>
					<ResponsiveAlertDialogDescription>
						{m.projects_delete_description()}
					</ResponsiveAlertDialogDescription>
				</ResponsiveAlertDialogHeader>
				<ResponsiveAlertDialogFooter className="max-md:py-2">
					<ResponsiveAlertDialogCancel>
						{m.common_action_cancel()}
					</ResponsiveAlertDialogCancel>
					<ResponsiveAlertDialogAction
						variant="destructive"
						disabled={isPending}
						onClick={() => mutate({ projectId })}
					>
						{isPending ? m.projects_delete_pending() : m.common_action_delete()}
					</ResponsiveAlertDialogAction>
				</ResponsiveAlertDialogFooter>
			</ResponsiveAlertDialogContent>
		</ResponsiveAlertDialog>
	);
}

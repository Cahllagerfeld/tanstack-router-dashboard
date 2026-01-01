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
import { Dispatch, SetStateAction } from "react";

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
						Are you absolutely sure?
					</ResponsiveAlertDialogTitle>
					<ResponsiveAlertDialogDescription>
						This action cannot be undone. This will permanently delete your
						project and remove all associated data.
					</ResponsiveAlertDialogDescription>
				</ResponsiveAlertDialogHeader>
				<ResponsiveAlertDialogFooter className="max-md:py-2">
					<ResponsiveAlertDialogCancel>Cancel</ResponsiveAlertDialogCancel>
					<ResponsiveAlertDialogAction
						variant="destructive"
						disabled={isPending}
						onClick={() => mutate({ projectId })}
					>
						{isPending ? "Deleting..." : "Delete"}
					</ResponsiveAlertDialogAction>
				</ResponsiveAlertDialogFooter>
			</ResponsiveAlertDialogContent>
		</ResponsiveAlertDialog>
	);
}

import {
	AlertDialog,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
} from "@/components/ui/drawer";
import { useDeleteProject } from "@/data/projects/mutations/delete-project";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Dispatch, SetStateAction } from "react";

type Props = {
	projectId: string;
	open: boolean;
	setOpen: Dispatch<SetStateAction<boolean>>;
};

export function DeleteProjectAlert({ projectId, open, setOpen }: Props) {
	const isDesktop = useMediaQuery("(min-width: 768px)");
	const { mutate, isPending } = useDeleteProject({
		onSuccess: () => {
			setOpen(false);
		},
	});

	if (isDesktop) {
		return (
			<AlertDialog open={open} onOpenChange={setOpen}>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
						<AlertDialogDescription>
							This action cannot be undone. This will permanently delete your
							project and remove all associated data.
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel>Cancel</AlertDialogCancel>
						<Button
							variant="destructive"
							disabled={isPending}
							onClick={() => mutate({ projectId })}
						>
							{isPending ? "Deleting..." : "Delete"}
						</Button>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		);
	}

	return (
		<Drawer open={open} onOpenChange={setOpen}>
			<DrawerContent>
				<DrawerHeader className="text-left">
					<DrawerTitle>Delete Project</DrawerTitle>
					<DrawerDescription>
						This action cannot be undone. This will permanently delete your
						project and remove all associated data.
					</DrawerDescription>
				</DrawerHeader>

				<DrawerFooter className="py-2">
					<Button
						variant="destructive"
						className="w-full"
						disabled={isPending}
						onClick={() => mutate({ projectId })}
					>
						{isPending ? "Deleting..." : "Delete Project"}
					</Button>
					<DrawerClose asChild>
						<Button variant="outline">Cancel</Button>
					</DrawerClose>
				</DrawerFooter>
			</DrawerContent>
		</Drawer>
	);
}

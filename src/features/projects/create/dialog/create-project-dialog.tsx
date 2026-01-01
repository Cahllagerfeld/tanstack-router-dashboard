import {
	ResponsiveDialog,
	ResponsiveDialogBody,
	ResponsiveDialogContent,
	ResponsiveDialogDescription,
	ResponsiveDialogHeader,
	ResponsiveDialogTitle,
	ResponsiveDialogTrigger,
	ResponsiveDialogFooter,
	ResponsiveDialogClose,
} from "@/components/ui/responsive-dialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";
import { CreateProjectForm } from "./form";

type Props = {
	open: boolean;
	setOpen: Dispatch<SetStateAction<boolean>>;
};

export function CreateProjectDialog({ open, setOpen }: Props) {
	return (
		<ResponsiveDialog open={open} onOpenChange={setOpen}>
			<ResponsiveDialogContent className="sm:max-w-[425px]">
				<ResponsiveDialogHeader>
					<ResponsiveDialogTitle>Create Project</ResponsiveDialogTitle>
					<ResponsiveDialogDescription>
						Create a new project to start collaborating with your team.
					</ResponsiveDialogDescription>
				</ResponsiveDialogHeader>
				<ResponsiveDialogBody>
					<CreateProjectForm setOpen={setOpen} />
				</ResponsiveDialogBody>
				<ResponsiveDialogFooter className="max-md:pt-2">
					<ResponsiveDialogClose>Cancel</ResponsiveDialogClose>
				</ResponsiveDialogFooter>
			</ResponsiveDialogContent>
		</ResponsiveDialog>
	);
}

export function CreateProjectDialogWithTrigger() {
	const [open, setOpen] = useState(false);

	return (
		<ResponsiveDialog open={open} onOpenChange={setOpen}>
			<ResponsiveDialogTrigger>
				<Button>
					<Plus />
					Create Project
				</Button>
			</ResponsiveDialogTrigger>
			<ResponsiveDialogContent className="sm:max-w-[425px]">
				<ResponsiveDialogHeader>
					<ResponsiveDialogTitle>Create Project</ResponsiveDialogTitle>
					<ResponsiveDialogDescription>
						Create a new project to start collaborating with your team.
					</ResponsiveDialogDescription>
				</ResponsiveDialogHeader>
				<ResponsiveDialogBody>
					<CreateProjectForm setOpen={setOpen} />
				</ResponsiveDialogBody>
				<ResponsiveDialogFooter className="max-md:pt-2">
					<ResponsiveDialogClose>Cancel</ResponsiveDialogClose>
				</ResponsiveDialogFooter>
			</ResponsiveDialogContent>
		</ResponsiveDialog>
	);
}

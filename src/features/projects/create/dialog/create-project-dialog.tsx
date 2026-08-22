import { CreateProjectForm } from "./form";
import { Button } from "@/components/ui/button";
import {
	ResponsiveDialog,
	ResponsiveDialogBody,
	ResponsiveDialogClose,
	ResponsiveDialogContent,
	ResponsiveDialogDescription,
	ResponsiveDialogFooter,
	ResponsiveDialogHeader,
	ResponsiveDialogTitle,
	ResponsiveDialogTrigger,
} from "@/components/ui/responsive-dialog";
import { Plus } from "lucide-react";
import { type Dispatch, type SetStateAction, useState } from "react";

const FORM_ID = "create-project-form";

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
					<CreateProjectForm id={FORM_ID} setOpen={setOpen} />
				</ResponsiveDialogBody>
				<ResponsiveDialogFooter className="max-md:pt-2">
					<ResponsiveDialogClose>Cancel</ResponsiveDialogClose>
					<Button type="submit" form={FORM_ID}>
						Create Project
					</Button>
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
					<CreateProjectForm id={FORM_ID} setOpen={setOpen} />
				</ResponsiveDialogBody>
				<ResponsiveDialogFooter className="max-md:pt-2">
					<ResponsiveDialogClose>Cancel</ResponsiveDialogClose>
					<Button type="submit" form={FORM_ID}>
						Create Project
					</Button>
				</ResponsiveDialogFooter>
			</ResponsiveDialogContent>
		</ResponsiveDialog>
	);
}

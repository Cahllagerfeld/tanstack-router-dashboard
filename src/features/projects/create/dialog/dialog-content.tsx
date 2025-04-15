import { Button } from "@/components/ui/button";
import {
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import {
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
} from "@/components/ui/drawer";
import { Dispatch, SetStateAction } from "react";
import { CreateProjectForm } from "./form";

type Props = {
	setOpen: Dispatch<SetStateAction<boolean>>;
};

export function CreateProjectDialogContent({ setOpen }: Props) {
	return (
		<DialogContent className="sm:max-w-[425px]">
			<DialogHeader>
				<DialogTitle>Create Project</DialogTitle>
				<DialogDescription>
					Create a new project to start collaborating with your team.
				</DialogDescription>
			</DialogHeader>
			<CreateProjectForm setOpen={setOpen} />
		</DialogContent>
	);
}

export function CreateProjectDrawerContent({ setOpen }: Props) {
	return (
		<DrawerContent>
			<DrawerHeader className="text-left">
				<DrawerTitle>Create Project</DrawerTitle>
				<DrawerDescription>
					Create a new project to start collaborating with your team.
				</DrawerDescription>
			</DrawerHeader>
			<CreateProjectForm setOpen={setOpen} className="px-4" />
			<DrawerFooter className="pt-2">
				<DrawerClose asChild>
					<Button variant="outline">Cancel</Button>
				</DrawerClose>
			</DrawerFooter>
		</DrawerContent>
	);
}

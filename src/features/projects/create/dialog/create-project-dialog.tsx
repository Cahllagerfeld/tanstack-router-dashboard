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
import { m } from "@/paraglide/messages";
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
					<ResponsiveDialogTitle>
						{m.projects_create_title()}
					</ResponsiveDialogTitle>
					<ResponsiveDialogDescription>
						{m.projects_create_description()}
					</ResponsiveDialogDescription>
				</ResponsiveDialogHeader>
				<ResponsiveDialogBody>
					<CreateProjectForm id={FORM_ID} setOpen={setOpen} />
				</ResponsiveDialogBody>
				<ResponsiveDialogFooter className="max-md:pt-2">
					<ResponsiveDialogClose>
						{m.common_action_cancel()}
					</ResponsiveDialogClose>
					<Button type="submit" form={FORM_ID}>
						{m.projects_create_submit()}
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
					{m.projects_create_submit()}
				</Button>
			</ResponsiveDialogTrigger>
			<ResponsiveDialogContent className="sm:max-w-[425px]">
				<ResponsiveDialogHeader>
					<ResponsiveDialogTitle>
						{m.projects_create_title()}
					</ResponsiveDialogTitle>
					<ResponsiveDialogDescription>
						{m.projects_create_description()}
					</ResponsiveDialogDescription>
				</ResponsiveDialogHeader>
				<ResponsiveDialogBody>
					<CreateProjectForm id={FORM_ID} setOpen={setOpen} />
				</ResponsiveDialogBody>
				<ResponsiveDialogFooter className="max-md:pt-2">
					<ResponsiveDialogClose>
						{m.common_action_cancel()}
					</ResponsiveDialogClose>
					<Button type="submit" form={FORM_ID}>
						{m.projects_create_submit()}
					</Button>
				</ResponsiveDialogFooter>
			</ResponsiveDialogContent>
		</ResponsiveDialog>
	);
}

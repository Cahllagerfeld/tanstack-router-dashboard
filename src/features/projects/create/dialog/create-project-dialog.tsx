import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Drawer, DrawerTrigger } from "@/components/ui/drawer";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Dispatch, SetStateAction, useState } from "react";
import {
	CreateProjectDialogContent,
	CreateProjectDrawerContent,
} from "./dialog-content";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

type Props = {
	open: boolean;
	setOpen: Dispatch<SetStateAction<boolean>>;
};
export function CreateProjectDialog({ open, setOpen }: Props) {
	const isDesktop = useMediaQuery("(min-width: 768px)");

	if (isDesktop) {
		return (
			<Dialog open={open} onOpenChange={setOpen}>
				<CreateProjectDialogContent setOpen={setOpen} />
			</Dialog>
		);
	}

	return (
		<Drawer open={open} onOpenChange={setOpen}>
			<CreateProjectDrawerContent setOpen={setOpen} />
		</Drawer>
	);
}

export function CreateProjectDialogWithTrigger() {
	const isDesktop = useMediaQuery("(min-width: 768px)");
	const [open, setOpen] = useState(false);

	if (isDesktop) {
		return (
			<Dialog open={open} onOpenChange={setOpen}>
				<DialogTrigger
					render={
						<Button>
							<Plus />
							Create Project
						</Button>
					}
				></DialogTrigger>
				<CreateProjectDialogContent setOpen={setOpen} />
			</Dialog>
		);
	}

	return (
		<Drawer open={open} onOpenChange={setOpen}>
			<DrawerTrigger asChild>
				<Button>
					<Plus />
					Create Project
				</Button>
			</DrawerTrigger>
			<CreateProjectDrawerContent setOpen={setOpen} />
		</Drawer>
	);
}

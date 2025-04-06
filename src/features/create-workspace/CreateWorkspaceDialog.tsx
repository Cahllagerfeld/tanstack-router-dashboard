import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
} from "@/components/ui/drawer";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useCreateProject } from "@/data/projects/mutations/create-project";
import { useMediaQuery } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dispatch, HTMLAttributes, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import { CreateWorkspaceForm, createWorkspaceSchema } from "./schema";

type Props = {
	open: boolean;
	setOpen: Dispatch<SetStateAction<boolean>>;
};
export function CreateWorkspaceDialog({ open, setOpen }: Props) {
	const isDesktop = useMediaQuery("(min-width: 768px)");

	if (isDesktop) {
		return (
			<Dialog open={open} onOpenChange={setOpen}>
				<DialogContent className="sm:max-w-[425px]">
					<DialogHeader>
						<DialogTitle>Create Workspace</DialogTitle>
						<DialogDescription>
							Create a new workspace to start collaborating with your team.
						</DialogDescription>
					</DialogHeader>
					<ProfileForm setOpen={setOpen} />
				</DialogContent>
			</Dialog>
		);
	}

	return (
		<Drawer open={open} onOpenChange={setOpen}>
			<DrawerContent>
				<DrawerHeader className="text-left">
					<DrawerTitle>Create Workspace</DrawerTitle>
					<DrawerDescription>
						Create a new workspace to start collaborating with your team.
					</DrawerDescription>
				</DrawerHeader>
				<ProfileForm setOpen={setOpen} className="px-4" />
				<DrawerFooter className="pt-2">
					<DrawerClose asChild>
						<Button variant="outline">Cancel</Button>
					</DrawerClose>
				</DrawerFooter>
			</DrawerContent>
		</Drawer>
	);
}

function ProfileForm({
	className,
	setOpen,
	...rest
}: HTMLAttributes<HTMLFormElement> & {
	setOpen: Dispatch<SetStateAction<boolean>>;
}) {
	const form = useForm<CreateWorkspaceForm>({
		resolver: zodResolver(createWorkspaceSchema),
		defaultValues: {
			name: "",
			description: "",
		},
	});

	const { mutate } = useCreateProject({
		onSuccess: () => {
			setOpen(false);
		},
	});

	function handleCreateWorkspace(vals: CreateWorkspaceForm) {
		mutate({
			name: vals.name,
			description: vals.description,
			display_name: vals.name,
		});
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(handleCreateWorkspace)}
				className={cn("space-y-4", className)}
				id="password"
				{...rest}
			>
				<FormField
					control={form.control}
					name="name"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Workspace Name</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				></FormField>
				<FormField
					control={form.control}
					name="description"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Description (optional)</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				></FormField>
				<Button className="w-full" type="submit">
					Create Workspace
				</Button>
			</form>
		</Form>
	);
}

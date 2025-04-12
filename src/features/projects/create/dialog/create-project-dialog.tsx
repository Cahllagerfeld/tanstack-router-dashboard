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
import { isFetchError } from "@/lib/fetch-error";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dispatch, HTMLAttributes, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { type CreateProjectForm, createProjectSchema } from "./schema";

type Props = {
	open: boolean;
	setOpen: Dispatch<SetStateAction<boolean>>;
};
export function CreateProjectDialog({ open, setOpen }: Props) {
	const isDesktop = useMediaQuery("(min-width: 768px)");

	if (isDesktop) {
		return (
			<Dialog open={open} onOpenChange={setOpen}>
				<DialogContent className="sm:max-w-[425px]">
					<DialogHeader>
						<DialogTitle>Create Project</DialogTitle>
						<DialogDescription>
							Create a new project to start collaborating with your team.
						</DialogDescription>
					</DialogHeader>
					<CreateProjectForm setOpen={setOpen} />
				</DialogContent>
			</Dialog>
		);
	}

	return (
		<Drawer open={open} onOpenChange={setOpen}>
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
		</Drawer>
	);
}

function CreateProjectForm({
	className,
	setOpen,
	...rest
}: HTMLAttributes<HTMLFormElement> & {
	setOpen: Dispatch<SetStateAction<boolean>>;
}) {
	const form = useForm<CreateProjectForm>({
		resolver: zodResolver(createProjectSchema),
		defaultValues: {
			name: "",
			displayName: "",
			description: "",
		},
	});

	const { mutate } = useCreateProject({
		onSuccess: () => {
			setOpen(false);
		},
		onError: (error) => {
			if (isFetchError(error)) {
				toast.error(error.message);
			}
		},
	});

	function handleCreateProject(vals: CreateProjectForm) {
		mutate({
			name: vals.name,
			description: vals.description,
			display_name: vals.displayName,
		});
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(handleCreateProject)}
				className={cn("space-y-4", className)}
				{...rest}
			>
				<FormField
					control={form.control}
					name="displayName"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Display Name</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				></FormField>
				<FormField
					control={form.control}
					name="name"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Project Name</FormLabel>
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
					Create Project
				</Button>
			</form>
		</Form>
	);
}

import { Button } from "@/components/ui/button";
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
import { isFetchError } from "@/lib/fetch-error";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dispatch, HTMLAttributes, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { type CreateProjectForm, createProjectSchema } from "./schema";

export function CreateProjectForm({
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

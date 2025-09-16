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
import { cn } from "@/lib/utils";
import { Dispatch, HTMLAttributes, SetStateAction } from "react";
import { useCreateProjectForm } from "./use-create-project-form";

export function CreateProjectForm({
	className,
	setOpen,
	...rest
}: HTMLAttributes<HTMLFormElement> & {
	setOpen: Dispatch<SetStateAction<boolean>>;
}) {
	const { form, handleCreateProject } = useCreateProjectForm(setOpen);

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

import { Button } from "@/components/ui/button";
import {
	Field,
	FieldError,
	FieldGroup,
	FieldLabel,
	FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Dispatch, HTMLAttributes, SetStateAction } from "react";
import { Controller } from "react-hook-form";
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
		<form
			onSubmit={form.handleSubmit(handleCreateProject)}
			className={cn("space-y-4", className)}
			{...rest}
		>
			<FieldSet>
				<FieldGroup>
					<Controller
						name="displayName"
						control={form.control}
						render={({ field, fieldState }) => (
							<Field data-invalid={fieldState.invalid}>
								<FieldLabel htmlFor="create-project-display-name">
									Display Name
								</FieldLabel>
								<Input
									{...field}
									id="create-project-display-name"
									aria-invalid={fieldState.invalid}
								/>
								{fieldState.invalid && (
									<FieldError errors={[fieldState.error]} />
								)}
							</Field>
						)}
					/>
					<Controller
						name="name"
						control={form.control}
						render={({ field, fieldState }) => (
							<Field data-invalid={fieldState.invalid}>
								<FieldLabel htmlFor="create-project-name">
									Project Name
								</FieldLabel>
								<Input
									{...field}
									id="create-project-name"
									aria-invalid={fieldState.invalid}
								/>
								{fieldState.invalid && (
									<FieldError errors={[fieldState.error]} />
								)}
							</Field>
						)}
					/>
					<Controller
						name="description"
						control={form.control}
						render={({ field, fieldState }) => (
							<Field data-invalid={fieldState.invalid}>
								<FieldLabel htmlFor="create-project-description">
									Description (optional)
								</FieldLabel>
								<Input
									{...field}
									id="create-project-description"
									aria-invalid={fieldState.invalid}
								/>
								{fieldState.invalid && (
									<FieldError errors={[fieldState.error]} />
								)}
							</Field>
						)}
					/>
				</FieldGroup>
			</FieldSet>
			<Button className="w-full" type="submit">
				Create Project
			</Button>
		</form>
	);
}

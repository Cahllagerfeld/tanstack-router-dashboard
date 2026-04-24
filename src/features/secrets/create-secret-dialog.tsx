import {
	Field,
	FieldError,
	FieldGroup,
	FieldLabel,
	FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
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
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useCreateSecret } from "@/data/secrets/mutations/create-secret";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

const FORM_ID = "create-secret-form";

const schema = z.object({
	name: z.string().min(1, "Name is required"),
	private: z.boolean(),
});

type FormValues = z.infer<typeof schema>;

export function CreateSecretDialogWithTrigger() {
	const [open, setOpen] = useState(false);
	const { mutate, isPending } = useCreateSecret();
	const form = useForm<FormValues>({
		resolver: zodResolver(schema),
		defaultValues: {
			name: "",
			private: false,
		},
	});

	function onSubmit(values: FormValues) {
		mutate(
			{
				name: values.name,
				private: values.private,
			},
			{
				onSuccess: () => {
					setOpen(false);
					form.reset();
				},
			}
		);
	}

	return (
		<ResponsiveDialog open={open} onOpenChange={setOpen}>
			<ResponsiveDialogTrigger>
				<Button>
					<Plus />
					New Secret
				</Button>
			</ResponsiveDialogTrigger>
			<ResponsiveDialogContent className="sm:max-w-[425px]">
				<ResponsiveDialogHeader>
					<ResponsiveDialogTitle>Create secret</ResponsiveDialogTitle>
					<ResponsiveDialogDescription>
						Create a named secret. You can add key-value pairs on the detail
						page.
					</ResponsiveDialogDescription>
				</ResponsiveDialogHeader>
				<ResponsiveDialogBody>
					<form
						id={FORM_ID}
						onSubmit={form.handleSubmit(onSubmit)}
						className="space-y-4"
					>
						<FieldSet>
							<FieldGroup>
								<Controller
									name="name"
									control={form.control}
									render={({ field, fieldState }) => (
										<Field data-invalid={fieldState.invalid}>
											<FieldLabel htmlFor="create-secret-name">Name</FieldLabel>
											<Input
												{...field}
												id="create-secret-name"
												autoComplete="off"
												aria-invalid={fieldState.invalid}
											/>
											{fieldState.invalid && (
												<FieldError errors={[fieldState.error]} />
											)}
										</Field>
									)}
								/>
								<Controller
									name="private"
									control={form.control}
									render={({ field }) => (
										<Field orientation="horizontal">
											<Checkbox
												id="create-secret-private"
												checked={field.value}
												onCheckedChange={(v) => field.onChange(v === true)}
											/>
											<FieldLabel
												htmlFor="create-secret-private"
												className="font-normal"
											>
												Private (only visible to you)
											</FieldLabel>
										</Field>
									)}
								/>
							</FieldGroup>
						</FieldSet>
					</form>
				</ResponsiveDialogBody>
				<ResponsiveDialogFooter className="max-md:pt-2">
					<ResponsiveDialogClose>Cancel</ResponsiveDialogClose>
					<Button type="submit" form={FORM_ID} disabled={isPending}>
						{isPending ? "Creating…" : "Create"}
					</Button>
				</ResponsiveDialogFooter>
			</ResponsiveDialogContent>
		</ResponsiveDialog>
	);
}

import { Controller } from "react-hook-form";

import { m } from "@/paraglide/messages";
import { Button } from "@/shared/ui/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/shared/ui/field";
import { Input } from "@/shared/ui/input";

import type { ActivateUserInput } from "../model";
import { useActivateUserForm } from "./use-activate-user-form";

type Props = {
	userId: string;
	token: string;
	isPending: boolean;
	onActivate: (input: ActivateUserInput) => void;
};

export function ActivateUserForm({
	userId,
	token,
	isPending,
	onActivate,
}: Props) {
	const { form, handleActivate } = useActivateUserForm({
		userId,
		token,
		onActivate,
	});

	return (
		<form
			onSubmit={form.handleSubmit(handleActivate)}
			className="space-y-4"
			id="activate-user-form"
		>
			<FieldGroup>
				<Controller
					name="fullName"
					control={form.control}
					render={({ field, fieldState }) => (
						<Field data-invalid={fieldState.invalid}>
							<FieldLabel htmlFor="activate-user-full-name">
								{m.users_activate_full_name()}
							</FieldLabel>
							<Input
								{...field}
								id="activate-user-full-name"
								autoComplete="name"
								aria-invalid={fieldState.invalid}
							/>
							{fieldState.invalid && <FieldError errors={[fieldState.error]} />}
						</Field>
					)}
				/>
				<Controller
					name="password"
					control={form.control}
					render={({ field, fieldState }) => (
						<Field data-invalid={fieldState.invalid}>
							<FieldLabel htmlFor="activate-user-password">
								{m.common_field_password()}
							</FieldLabel>
							<Input
								{...field}
								id="activate-user-password"
								type="password"
								autoComplete="new-password"
								aria-invalid={fieldState.invalid}
							/>
							{fieldState.invalid && <FieldError errors={[fieldState.error]} />}
						</Field>
					)}
				/>
				<Controller
					name="confirmPassword"
					control={form.control}
					render={({ field, fieldState }) => (
						<Field data-invalid={fieldState.invalid}>
							<FieldLabel htmlFor="activate-user-confirm-password">
								{m.common_field_confirm_password()}
							</FieldLabel>
							<Input
								{...field}
								id="activate-user-confirm-password"
								type="password"
								autoComplete="new-password"
								aria-invalid={fieldState.invalid}
							/>
							{fieldState.invalid && <FieldError errors={[fieldState.error]} />}
						</Field>
					)}
				/>
			</FieldGroup>
			<Button type="submit" className="w-full" disabled={isPending}>
				{m.users_activate_submit()}
			</Button>
		</form>
	);
}

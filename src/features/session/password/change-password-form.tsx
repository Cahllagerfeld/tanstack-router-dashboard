import { Controller } from "react-hook-form";

import { m } from "@/paraglide/messages";
import { Button } from "@/shared/ui/button";
import {
	Field,
	FieldError,
	FieldGroup,
	FieldLabel,
	FieldSet,
} from "@/shared/ui/field";
import { Input } from "@/shared/ui/input";

import { useChangePasswordForm } from "./use-change-password-form";

/** Replaces the signed-in account's password after confirming the current one. */
export function ChangePasswordForm() {
	const { form, isPending, handleSubmit } = useChangePasswordForm();

	return (
		<form
			onSubmit={form.handleSubmit(handleSubmit)}
			className="flex flex-col gap-6"
		>
			<FieldSet disabled={isPending}>
				<FieldGroup>
					<Controller
						name="currentPassword"
						control={form.control}
						render={({ field, fieldState }) => (
							<Field data-invalid={fieldState.invalid}>
								<FieldLabel htmlFor="password-current">
									{m.session_password_current()}
								</FieldLabel>
								<Input
									{...field}
									id="password-current"
									type="password"
									autoComplete="current-password"
									aria-invalid={fieldState.invalid}
								/>
								{fieldState.invalid && (
									<FieldError errors={[fieldState.error]} />
								)}
							</Field>
						)}
					/>
					<Controller
						name="newPassword"
						control={form.control}
						render={({ field, fieldState }) => (
							<Field data-invalid={fieldState.invalid}>
								<FieldLabel htmlFor="password-new">
									{m.session_password_new()}
								</FieldLabel>
								<Input
									{...field}
									id="password-new"
									type="password"
									autoComplete="new-password"
									aria-invalid={fieldState.invalid}
								/>
								{fieldState.invalid && (
									<FieldError errors={[fieldState.error]} />
								)}
							</Field>
						)}
					/>
					<Controller
						name="confirmPassword"
						control={form.control}
						render={({ field, fieldState }) => (
							<Field data-invalid={fieldState.invalid}>
								<FieldLabel htmlFor="password-confirm">
									{m.session_password_confirm()}
								</FieldLabel>
								<Input
									{...field}
									id="password-confirm"
									type="password"
									autoComplete="new-password"
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
			<Button type="submit" className="self-end" disabled={isPending}>
				{m.session_password_submit()}
			</Button>
		</form>
	);
}

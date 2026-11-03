import { Controller } from "react-hook-form";

import { m } from "@/paraglide/messages";
import { Button } from "@/shared/ui/button";
import {
	Field,
	FieldDescription,
	FieldError,
	FieldGroup,
	FieldLabel,
	FieldSet,
} from "@/shared/ui/field";
import { Input } from "@/shared/ui/input";

import type { CurrentIdentity } from "../model";
import { useProfileForm } from "./use-profile-form";

/** Edits the signed-in account's display name, username, and email. */
export function ProfileForm({ identity }: { identity: CurrentIdentity }) {
	const { form, isPending, handleSubmit } = useProfileForm(identity);

	return (
		<form
			onSubmit={form.handleSubmit(handleSubmit)}
			className="flex flex-col gap-6"
			noValidate
		>
			<FieldSet disabled={isPending}>
				<FieldGroup>
					<Controller
						name="fullName"
						control={form.control}
						render={({ field, fieldState }) => (
							<Field data-invalid={fieldState.invalid}>
								<FieldLabel htmlFor="profile-full-name">
									{m.session_profile_full_name()}
								</FieldLabel>
								<Input
									{...field}
									id="profile-full-name"
									autoComplete="name"
									aria-invalid={fieldState.invalid}
								/>
								{fieldState.invalid && (
									<FieldError errors={[fieldState.error]} />
								)}
							</Field>
						)}
					/>
					<Controller
						name="username"
						control={form.control}
						render={({ field, fieldState }) => (
							<Field data-invalid={fieldState.invalid}>
								<FieldLabel htmlFor="profile-username">
									{m.common_field_username()}
								</FieldLabel>
								<Input
									{...field}
									id="profile-username"
									autoComplete="username"
									aria-invalid={fieldState.invalid}
								/>
								<FieldDescription>
									{m.session_profile_username_description()}
								</FieldDescription>
								{fieldState.invalid && (
									<FieldError errors={[fieldState.error]} />
								)}
							</Field>
						)}
					/>
					<Controller
						name="email"
						control={form.control}
						render={({ field, fieldState }) => (
							<Field data-invalid={fieldState.invalid}>
								<FieldLabel htmlFor="profile-email">
									{m.session_profile_email()}
								</FieldLabel>
								<Input
									{...field}
									id="profile-email"
									type="email"
									autoComplete="email"
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
			<Button
				type="submit"
				className="self-end"
				disabled={isPending || !form.formState.isDirty}
			>
				{m.session_profile_submit()}
			</Button>
		</form>
	);
}

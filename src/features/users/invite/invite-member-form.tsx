import type { SubmitEventHandler } from "react";
import { Controller, type UseFormReturn } from "react-hook-form";

import { m } from "@/paraglide/messages";
import {
	Field,
	FieldError,
	FieldGroup,
	FieldLabel,
	FieldSet,
} from "@/shared/ui/field";
import { Input } from "@/shared/ui/input";
import { Switch } from "@/shared/ui/switch";

import type { InviteMemberValues } from "./schema";

type Props = {
	id: string;
	form: UseFormReturn<InviteMemberValues>;
	onSubmit: SubmitEventHandler;
};

export function InviteMemberForm({ id, form, onSubmit }: Props) {
	return (
		<form id={id} onSubmit={onSubmit}>
			<FieldSet>
				<FieldGroup>
					<Controller
						name="username"
						control={form.control}
						render={({ field, fieldState }) => (
							<Field data-invalid={fieldState.invalid}>
								<FieldLabel htmlFor="invite-member-username">
									{m.common_field_username()}
								</FieldLabel>
								<Input
									{...field}
									id="invite-member-username"
									aria-invalid={fieldState.invalid}
								/>
								{fieldState.invalid && (
									<FieldError errors={[fieldState.error]} />
								)}
							</Field>
						)}
					/>
					<Controller
						name="isAdmin"
						control={form.control}
						render={({ field }) => (
							<Field orientation="horizontal">
								<FieldLabel htmlFor="invite-member-is-admin">
									{m.users_invite_is_admin()}
								</FieldLabel>
								<Switch
									id="invite-member-is-admin"
									checked={field.value}
									onCheckedChange={field.onChange}
									onBlur={field.onBlur}
								/>
							</Field>
						)}
					/>
				</FieldGroup>
			</FieldSet>
		</form>
	);
}

import { Controller } from "react-hook-form";

import { m } from "@/paraglide/messages";
import { Button } from "@/shared/ui/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/shared/ui/field";
import { Input } from "@/shared/ui/input";

import { useLoginForm } from "./use-login-form";

export function LoginForm() {
	const { handleLogin, form } = useLoginForm();

	return (
		<form
			onSubmit={form.handleSubmit(handleLogin)}
			className="space-y-4"
			id="password"
		>
			<FieldGroup>
				<Controller
					name="username"
					control={form.control}
					render={({ field, fieldState }) => (
						<Field data-invalid={fieldState.invalid}>
							<FieldLabel htmlFor="login-username">
								{m.common_field_username()}
							</FieldLabel>
							<Input
								{...field}
								id="login-username"
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
							<FieldLabel htmlFor="login-password">
								{m.common_field_password()}
							</FieldLabel>
							<Input
								{...field}
								id="login-password"
								type="password"
								aria-invalid={fieldState.invalid}
							/>
							{fieldState.invalid && <FieldError errors={[fieldState.error]} />}
						</Field>
					)}
				/>
			</FieldGroup>
			<Button type="submit" className="w-full">
				{m.common_action_login()}
			</Button>
		</form>
	);
}

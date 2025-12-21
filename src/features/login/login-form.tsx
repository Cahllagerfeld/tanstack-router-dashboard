import { Button } from "@/components/ui/button";
import {
	Field,
	FieldError,
	FieldGroup,
	FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Controller } from "react-hook-form";
import { useLoginForm } from "./hooks/use-login-form";

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
							<FieldLabel htmlFor="login-username">Username</FieldLabel>
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
							<FieldLabel htmlFor="login-password">Password</FieldLabel>
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
			<Button className="w-full">Login</Button>
		</form>
	);
}

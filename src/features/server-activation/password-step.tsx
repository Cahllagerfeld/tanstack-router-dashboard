import {
	Field,
	FieldError,
	FieldGroup,
	FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Controller } from "react-hook-form";
import { usePasswordStep } from "./use-password-step";

export function PasswordStep() {
	const { form, activationHandler } = usePasswordStep();

	return (
		<form
			onSubmit={form.handleSubmit(activationHandler)}
			className="space-y-4"
			id="server-activation-form"
		>
			<FieldGroup>
				<Controller
					name="username"
					control={form.control}
					render={({ field, fieldState }) => (
						<Field data-invalid={fieldState.invalid}>
							<FieldLabel htmlFor="server-activation-username">
								Username
							</FieldLabel>
							<Input
								{...field}
								id="server-activation-username"
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
							<FieldLabel htmlFor="server-activation-password">
								Password
							</FieldLabel>
							<Input
								{...field}
								id="server-activation-password"
								type="password"
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
							<FieldLabel htmlFor="server-activation-confirm-password">
								Confirm Password
							</FieldLabel>
							<Input
								{...field}
								id="server-activation-confirm-password"
								type="password"
								aria-invalid={fieldState.invalid}
							/>
							{fieldState.invalid && <FieldError errors={[fieldState.error]} />}
						</Field>
					)}
				/>
			</FieldGroup>
		</form>
	);
}

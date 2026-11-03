import { CircleAlert } from "lucide-react";
import { useRef } from "react";
import type { UseFormReturn } from "react-hook-form";
import { Controller } from "react-hook-form";

import { m } from "@/paraglide/messages";
import { SchemaForm } from "@/shared/components/schema-form/schema-form";
import { Alert, AlertDescription, AlertTitle } from "@/shared/ui/alert";
import {
	Field,
	FieldError,
	FieldGroup,
	FieldLabel,
	FieldLegend,
	FieldSet,
} from "@/shared/ui/field";
import { Input } from "@/shared/ui/input";

import type { FlavorDetail } from "../model";
import type { ComponentFormValues } from "./schema";

type ComponentConfigureFormProps = {
	/** DOM id of the form, so a submit button in the flow footer can use `form={id}`. */
	id: string;
	form: UseFormReturn<ComponentFormValues>;
	flavor: FlavorDetail;
	onSubmit: (values: ComponentFormValues) => void;
	/** Backend rejection to show above the fields, verbatim (pydantic messages span several lines). */
	submitError?: string;
	disabled?: boolean;
};

/**
 * The Configure step's form: the Name field and the Flavor's settings rendered by `SchemaForm` from
 * `flavor.configSchema`, wired to `form` through a Controller.
 */
export function ComponentConfigureForm({
	id,
	form,
	flavor,
	onSubmit,
	submitError,
	disabled,
}: ComponentConfigureFormProps) {
	const nameId = `${id}-name`;
	// JSON fields whose text does not parse keep their last valid value, so submitting is refused while any remain.
	// Only read on submit; React Hook Form's re-validation after submit replaces the errors set here.
	const invalidJsonPaths = useRef<string[][]>([]);

	function handleInvalidJsonChange(paths: string[][]) {
		invalidJsonPaths.current = paths;
	}

	function handleValid(values: ComponentFormValues) {
		if (invalidJsonPaths.current.length === 0) {
			onSubmit(values);
			return;
		}
		for (const path of invalidJsonPaths.current) {
			form.setError(`configuration.${path.join(".")}`, {
				type: "invalid_json",
				message: m.schema_form_invalid_json(),
			});
		}
	}

	return (
		<form
			id={id}
			// Bound per submit, since `handleValid` reads the invalid JSON paths ref.
			onSubmit={(event) => void form.handleSubmit(handleValid)(event)}
			noValidate
			className="flex flex-col gap-6"
		>
			{submitError ? (
				<Alert variant="destructive">
					<CircleAlert aria-hidden />
					<AlertTitle>{m.components_configure_submit_error()}</AlertTitle>
					<AlertDescription className="font-mono text-xs break-words whitespace-pre-wrap">
						{submitError}
					</AlertDescription>
				</Alert>
			) : null}
			<FieldGroup>
				<Controller
					name="name"
					control={form.control}
					disabled={disabled}
					render={({ field, fieldState }) => (
						<Field data-invalid={fieldState.invalid}>
							<FieldLabel htmlFor={nameId}>
								{m.components_configure_name()}
							</FieldLabel>
							<Input
								{...field}
								id={nameId}
								className="font-mono"
								placeholder={m.components_configure_name_placeholder()}
								autoComplete="off"
								spellCheck={false}
								aria-invalid={fieldState.invalid}
							/>
							{fieldState.invalid && <FieldError errors={[fieldState.error]} />}
						</Field>
					)}
				/>
			</FieldGroup>
			<FieldSet>
				<FieldLegend>{m.components_configure_settings()}</FieldLegend>
				<Controller
					name="configuration"
					control={form.control}
					render={({ field }) => (
						<SchemaForm
							schema={flavor.configSchema}
							value={field.value}
							onChange={field.onChange}
							errors={form.formState.errors.configuration}
							disabled={disabled}
							onInvalidJsonChange={handleInvalidJsonChange}
						/>
					)}
				/>
			</FieldSet>
		</form>
	);
}

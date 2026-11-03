import { CircleAlert, ExternalLink } from "lucide-react";
import { useRef } from "react";
import type { UseFormReturn } from "react-hook-form";
import { Controller } from "react-hook-form";

import { m } from "@/paraglide/messages";
import { SchemaForm } from "@/shared/components/schema-form/schema-form";
import { Alert, AlertDescription, AlertTitle } from "@/shared/ui/alert";
import { Button } from "@/shared/ui/button";
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
import { getComponentTypeLabel } from "../type/model";
import type { ComponentFormValues } from "./schema";

type ComponentConfigureFormProps = {
	/** DOM id of the form, so a submit button in the flow footer can use `form={id}`. */
	id: string;
	form: UseFormReturn<ComponentFormValues>;
	flavor: FlavorDetail;
	onSubmit: (values: ComponentFormValues) => void;
	/** Create only: shows "Change" on the Type · Flavor summary. Absent in edit, where type and Flavor are locked. */
	onChangeFlavor?: () => void;
	/** Backend rejection to show above the fields, verbatim (pydantic messages span several lines). */
	submitError?: string;
	disabled?: boolean;
};

/**
 * The Configure step: a Type · Flavor summary with a docs link, the Name field, and the Flavor's configuration
 * rendered by `SchemaForm` from `flavor.configSchema`, wired to `form` through a Controller.
 */
export function ComponentConfigureForm({
	id,
	form,
	flavor,
	onSubmit,
	onChangeFlavor,
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
			<div className="flex flex-col gap-2">
				<div className="flex items-center gap-3 rounded-lg border px-3 py-2">
					{flavor.logoUrl ? (
						<img
							src={flavor.logoUrl}
							alt=""
							width={24}
							height={24}
							className="size-6 shrink-0 object-contain"
						/>
					) : null}
					<p className="min-w-0 flex-1 truncate text-sm font-medium">
						{flavor.type
							? m.components_configure_summary({
									type: getComponentTypeLabel(flavor.type),
									flavor: flavor.displayName,
								})
							: flavor.displayName}
					</p>
					{onChangeFlavor ? (
						<Button
							type="button"
							variant="ghost"
							size="sm"
							onClick={onChangeFlavor}
							disabled={disabled}
						>
							{m.common_action_change()}
						</Button>
					) : null}
				</div>
				{flavor.docsUrl ? (
					<a
						href={flavor.docsUrl}
						target="_blank"
						rel="noreferrer"
						className="inline-flex items-center gap-1 self-start text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
					>
						{m.components_configure_docs()}
						<ExternalLink aria-hidden className="size-3.5" />
					</a>
				) : null}
			</div>
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
							<FieldLabel htmlFor={nameId}>{m.common_label_name()}</FieldLabel>
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
				<FieldLegend>{m.components_configure_configuration()}</FieldLegend>
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

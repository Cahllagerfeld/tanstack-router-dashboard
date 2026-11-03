import Form from "@rjsf/core";
import type {
	RegistryFieldsType,
	RegistryWidgetsType,
	RJSFSchema,
	TemplatesType,
} from "@rjsf/utils";
import { useId, useMemo, useRef } from "react";
import type { FieldErrors } from "react-hook-form";

import {
	normalizeSchema,
	type JsonSchema,
} from "@/shared/lib/json-schema-form/normalize";
import {
	buildUiSchema,
	JSON_FIELD,
} from "@/shared/lib/json-schema-form/ui-schema";
import { schemaValidator } from "@/shared/lib/json-schema-form/validator";

import { fieldErrorsToErrorSchema } from "./error-schema";
import { JsonField, type JsonFieldContext } from "./json-field";
import {
	ArrayFieldItemTemplate,
	ArrayFieldTemplate,
	BaseInputTemplate,
	FieldTemplate,
	ObjectFieldTemplate,
	SubmitButton,
} from "./templates";
import { translateString } from "./translate-string";
import {
	CheckboxWidget,
	PasswordWidget,
	SelectWidget,
	TextareaWidget,
} from "./widgets";

type SchemaFormProps = {
	/** Raw backend schema; the form normalizes it and derives the uiSchema itself. */
	schema: JsonSchema;
	value: Record<string, unknown>;
	onChange: (value: Record<string, unknown>) => void;
	/** React Hook Form's nested errors for the field that holds `value`, shown on the matching inputs. */
	errors?: FieldErrors;
	disabled?: boolean;
	/**
	 * Called with the paths of every JSON field whose text does not parse, whenever that set changes.
	 * Such a field keeps its last valid value, so the surrounding form should refuse to submit while any remain.
	 */
	onInvalidJsonChange?: (paths: string[][]) => void;
};

type Data = Record<string, unknown>;

const templates: Partial<Omit<TemplatesType<Data>, "ButtonTemplates">> & {
	ButtonTemplates: Partial<TemplatesType<Data>["ButtonTemplates"]>;
} = {
	ArrayFieldItemTemplate,
	ArrayFieldTemplate,
	BaseInputTemplate,
	FieldTemplate,
	ObjectFieldTemplate,
	ButtonTemplates: { SubmitButton },
};

const widgets: RegistryWidgetsType<Data> = {
	CheckboxWidget,
	PasswordWidget,
	SelectWidget,
	TextareaWidget,
};

const fields: RegistryFieldsType<Data> = { [JSON_FIELD]: JsonField };

/** Defaults stay with the backend: the form shows them as placeholders but never writes them. */
const defaultFormStateBehavior = { emptyObjectFields: "skipDefaults" } as const;

/**
 * Renders a JSON Schema as form fields with rjsf and the shadcn primitives.
 * Controlled, with no form element or submit button of its own: it sits inside a React Hook Form,
 * which owns validation. Required fields show first; optional ones sit behind a disclosure
 * that starts open when any of them holds a value. Keys the schema does not describe stay in
 * the value untouched. `errors` is read by reference, as React Hook Form's resolver replaces it.
 */
export function SchemaForm({
	schema,
	value,
	onChange,
	errors,
	disabled,
	onInvalidJsonChange,
}: SchemaFormProps) {
	const idPrefix = useId();
	const invalidJson = useRef(new Map<string, string[]>());
	// rjsf recomputes its state when `schema` changes identity; `normalizeSchema` returns the same
	// object for the same raw schema, so a re-render keeps it stable.
	const normalized = normalizeSchema(schema) as RJSFSchema;
	// Resolving every property's `$ref`s is real work, so it runs only for a new schema.
	const uiSchema = useMemo(() => buildUiSchema(normalized), [normalized]);
	const extraErrors = useMemo(() => fieldErrorsToErrorSchema(errors), [errors]);
	const formContext: JsonFieldContext = {
		reportJsonValidity(id, path, invalid) {
			if (invalid === invalidJson.current.has(id)) return;
			if (invalid) invalidJson.current.set(id, path);
			else invalidJson.current.delete(id);
			onInvalidJsonChange?.([...invalidJson.current.values()]);
		},
	};

	return (
		<Form<Data>
			tagName="div"
			schema={normalized}
			uiSchema={uiSchema}
			formData={value}
			onChange={(event) => onChange(event.formData ?? {})}
			validator={schemaValidator}
			templates={templates}
			widgets={widgets}
			fields={fields}
			translateString={translateString}
			formContext={formContext}
			extraErrors={extraErrors}
			experimental_defaultFormStateBehavior={defaultFormStateBehavior}
			idPrefix={idPrefix}
			disabled={disabled}
			noHtml5Validate
			showErrorList={false}
			liveValidate={false}
		/>
	);
}

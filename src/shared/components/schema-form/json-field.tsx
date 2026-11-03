import {
	ariaDescribedByIds,
	deepEquals,
	descriptionId,
	getUiOptions,
	type FieldProps,
} from "@rjsf/utils";
import { useEffect, useEffectEvent, useState } from "react";

import { m } from "@/paraglide/messages";
import { Field, FieldDescription, FieldLabel } from "@/shared/ui/field";
import { Textarea } from "@/shared/ui/textarea";

import { formatJson, parseJsonText } from "./json-text";
import { labelId, RequiredMarker, SchemaFieldError } from "./templates";

/** What the Schema Form hands its JSON fields through rjsf's `formContext`. */
export type JsonFieldContext = {
	/**
	 * Called when the text of the field with DOM id `id` at `path` starts or stops parsing,
	 * and with `false` when the field unmounts. `id` changes exactly when `path` does.
	 */
	reportJsonValidity?: (id: string, path: string[], invalid: boolean) => void;
};

/**
 * A structured value the form has no inputs for, edited as JSON text.
 * Text that does not parse keeps the last valid value and is reported through `formContext`,
 * so the surrounding form can refuse to submit; a schema that also accepts strings would
 * otherwise take the raw text as valid.
 */
export function JsonField(props: FieldProps) {
	const {
		formData,
		onChange,
		onBlur,
		onFocus,
		fieldPathId,
		schema,
		uiSchema,
		name,
		required,
		disabled,
		readonly,
		rawErrors,
		registry,
	} = props;
	const id = fieldPathId.$id;
	const options = getUiOptions(uiSchema);
	const label = options.title ?? schema.title ?? name;
	const description = options.description ?? schema.description;

	// `value` is what `text` stands for, so new data from outside resets the text
	// while the user's own edits, echoed back, keep their formatting. Formatted data always parses.
	const [draft, setDraft] = useState(() => ({
		text: formatJson(formData),
		value: formData as unknown,
		invalid: false,
	}));
	if (formData !== draft.value && !deepEquals(draft.value, formData)) {
		setDraft({ text: formatJson(formData), value: formData, invalid: false });
	}

	const messages = draft.invalid ? [m.schema_form_invalid_json()] : rawErrors;

	const context: JsonFieldContext | undefined = registry.formContext;
	const currentPath = useEffectEvent(() => fieldPathId.path.map(String));
	const reportValidity = useEffectEvent(
		(fieldId: string, path: string[], invalid: boolean) =>
			context?.reportJsonValidity?.(fieldId, path, invalid)
	);
	useEffect(() => {
		if (!draft.invalid) return;
		const path = currentPath();
		reportValidity(id, path, true);
		return () => reportValidity(id, path, false);
	}, [draft.invalid, id]);

	function handleChange(text: string) {
		const parsed = parseJsonText(text);
		if (parsed.kind === "invalid") {
			setDraft({ text, value: draft.value, invalid: true });
			return;
		}
		const value = parsed.kind === "valid" ? parsed.value : undefined;
		setDraft({ text, value, invalid: false });
		onChange(value, fieldPathId.path, undefined, id);
	}

	return (
		<Field data-invalid={Boolean(messages?.length)} data-disabled={disabled}>
			<FieldLabel id={labelId(id)} htmlFor={id}>
				{label}
				{required && <RequiredMarker />}
			</FieldLabel>
			<Textarea
				id={id}
				name={id}
				value={draft.text}
				spellCheck={false}
				className="min-h-20 font-mono text-xs md:text-xs"
				disabled={disabled}
				readOnly={readonly}
				aria-required={required || undefined}
				aria-invalid={messages?.length ? true : undefined}
				aria-describedby={ariaDescribedByIds(id)}
				onChange={(event) => handleChange(event.target.value)}
				onBlur={() => onBlur(id, draft.value)}
				onFocus={() => onFocus(id, draft.value)}
			/>
			{description && (
				<FieldDescription id={descriptionId(id)}>
					{description}
				</FieldDescription>
			)}
			<SchemaFieldError id={id} messages={messages} />
		</Field>
	);
}

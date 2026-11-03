import {
	ADDITIONAL_PROPERTY_FLAG,
	ariaDescribedByIds,
	descriptionId,
	errorId,
	getInputProps,
	getSchemaType,
	getUiOptions,
	toErrorList,
	TranslatableString,
	type ArrayFieldItemTemplateProps,
	type ArrayFieldTemplateProps,
	type BaseInputTemplateProps,
	type FieldTemplateProps,
	type ObjectFieldTemplatePropertyType,
	type ObjectFieldTemplateProps,
	type RJSFSchema,
} from "@rjsf/utils";
import { ChevronRightIcon, PlusIcon, XIcon } from "lucide-react";
import { useState, type ChangeEvent, type ComponentProps } from "react";

import { m } from "@/paraglide/messages";
import { JSON_FIELD } from "@/shared/lib/json-schema-form/ui-schema";
import { isRecord } from "@/shared/lib/type-guards";
import { Button } from "@/shared/ui/button";
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/shared/ui/collapsible";
import {
	Field,
	FieldContent,
	FieldDescription,
	FieldError,
	FieldGroup,
	FieldLabel,
	FieldLegend,
	FieldSet,
} from "@/shared/ui/field";
import { Input } from "@/shared/ui/input";

/** Id of a field's label, for controls that a `<label for>` cannot name, such as a select trigger. */
export function labelId(id: string) {
	return `${id}__label`;
}

/** Visual required marker; the control itself carries `aria-required`. */
export function RequiredMarker() {
	return (
		<span aria-hidden className="text-destructive">
			*
		</span>
	);
}

/** Field errors as the shadcn `FieldError` takes them. */
export function SchemaFieldError({
	id,
	messages,
}: {
	id: string;
	messages: string[] | undefined;
}) {
	if (!messages?.length) return null;
	return (
		<FieldError
			id={errorId(id)}
			errors={messages.map((message) => ({ message }))}
		/>
	);
}

/** The first paragraph of a description; pydantic model docstrings continue with an attribute list. */
function firstParagraph(description: string) {
	return description.split(/\n\s*\n/)[0]?.trim() ?? description;
}

/** Wraps every field in shadcn `Field` primitives with its label, description, and errors. */
export function FieldTemplate(props: FieldTemplateProps) {
	const {
		id,
		label,
		children,
		rawErrors,
		rawDescription,
		hidden,
		required,
		disabled,
		displayLabel,
		schema,
		uiSchema,
		fieldPathId,
	} = props;

	if (hidden) return <div className="hidden">{children}</div>;
	// The JSON field renders its own label and errors, since it knows when its text does not parse.
	if (uiSchema?.["ui:field"] === JSON_FIELD) return children;

	const invalid = Boolean(rawErrors?.length);
	const errors = <SchemaFieldError id={id} messages={rawErrors} />;
	const type = getSchemaType(schema);

	if (type === "object" || (type === "array" && !displayLabel)) {
		return (
			<div className="flex flex-col gap-2">
				{children}
				{errors}
			</div>
		);
	}

	// An array row's legend already names the list; its label stays for assistive technology.
	const arrayItem = typeof fieldPathId.path.at(-1) === "number";
	const labelContent = (
		<FieldLabel
			id={labelId(id)}
			htmlFor={id}
			className={arrayItem ? "sr-only" : undefined}
		>
			{label}
			{required && !arrayItem && <RequiredMarker />}
		</FieldLabel>
	);
	const description = rawDescription ? (
		<FieldDescription id={descriptionId(id)}>{rawDescription}</FieldDescription>
	) : null;

	if (type === "boolean" && !uiSchema?.["ui:widget"]) {
		return (
			<Field
				orientation="horizontal"
				data-invalid={invalid}
				data-disabled={disabled}
			>
				<FieldContent>
					{labelContent}
					{description}
					{errors}
				</FieldContent>
				{children}
			</Field>
		);
	}

	return (
		<Field data-invalid={invalid} data-disabled={disabled}>
			{displayLabel && labelContent}
			{children}
			{displayLabel && description}
			{errors}
		</Field>
	);
}

function hasValue(value: unknown) {
	if (value === undefined || value === null || value === "") return false;
	if (Array.isArray(value)) return value.length > 0;
	if (typeof value === "object") return Object.keys(value).length > 0;
	return true;
}

/** Root properties and unknown keys, which stay in the data without a field of their own. */
function describedProperties(
	properties: ObjectFieldTemplatePropertyType[],
	schema: RJSFSchema
) {
	return properties.filter((property) => {
		const propertySchema = schema.properties?.[property.name];
		return !(
			typeof propertySchema === "object" &&
			ADDITIONAL_PROPERTY_FLAG in propertySchema
		);
	});
}

function OptionalFields({
	count,
	initiallyOpen,
	forceOpen,
	children,
}: {
	count: number;
	initiallyOpen: boolean;
	forceOpen: boolean;
	children: React.ReactNode;
}) {
	const [open, setOpen] = useState(initiallyOpen);

	return (
		<Collapsible
			open={open || forceOpen}
			onOpenChange={setOpen}
			className="flex flex-col gap-5"
		>
			<CollapsibleTrigger
				render={
					<Button
						type="button"
						variant="ghost"
						size="sm"
						className="-ml-2.5 w-fit [&[data-panel-open]>svg]:rotate-90"
					/>
				}
			>
				<ChevronRightIcon className="transition-transform duration-200" />
				{m.schema_form_optional_settings({ count })}
			</CollapsibleTrigger>
			<CollapsibleContent keepMounted className="flex flex-col gap-5">
				{children}
			</CollapsibleContent>
		</Collapsible>
	);
}

/**
 * The root lists required fields first and puts optional ones behind a disclosure
 * that starts open when one of them holds a value. A nested model becomes a fieldset.
 */
export function ObjectFieldTemplate(props: ObjectFieldTemplateProps) {
	const {
		properties,
		schema,
		fieldPathId,
		title,
		description,
		required,
		formData,
		errorSchema,
	} = props;
	const described = describedProperties(properties, schema);

	if (fieldPathId.path.length > 0) {
		return (
			<FieldSet>
				{title && (
					<FieldLegend>
						{title}
						{required && <RequiredMarker />}
					</FieldLegend>
				)}
				{typeof description === "string" && description && (
					<FieldDescription>{firstParagraph(description)}</FieldDescription>
				)}
				<FieldGroup>{described.map((property) => property.content)}</FieldGroup>
			</FieldSet>
		);
	}

	const requiredNames = new Set(schema.required ?? []);
	const requiredFields = described.filter((p) => requiredNames.has(p.name));
	const optionalFields = described.filter((p) => !requiredNames.has(p.name));
	const shownOptional = optionalFields.filter((p) => !p.hidden);
	const hiddenOptional = optionalFields.filter((p) => p.hidden);
	const data = isRecord(formData) ? formData : {};

	return (
		<FieldGroup>
			{requiredFields.map((property) => property.content)}
			{shownOptional.length > 0 && (
				<OptionalFields
					count={shownOptional.length}
					initiallyOpen={
						requiredFields.length === 0 ||
						shownOptional.some((p) => hasValue(data[p.name]))
					}
					forceOpen={shownOptional.some(
						(p) => toErrorList(errorSchema?.[p.name]).length > 0
					)}
				>
					{shownOptional.map((property) => property.content)}
				</OptionalFields>
			)}
			{hiddenOptional.map((property) => property.content)}
		</FieldGroup>
	);
}

/** An array of scalars: one input per row with a remove button, and an add button below. */
export function ArrayFieldTemplate(props: ArrayFieldTemplateProps) {
	const {
		canAdd,
		disabled,
		items,
		onAddClick,
		readonly,
		registry,
		required,
		schema,
		title,
		uiSchema,
	} = props;
	const options = getUiOptions(uiSchema);
	const description = options.description ?? schema.description;

	return (
		<FieldSet className="gap-2">
			<FieldLegend variant="label">
				{options.title ?? title}
				{required && <RequiredMarker />}
			</FieldLegend>
			{description && <FieldDescription>{description}</FieldDescription>}
			{items.length > 0 && <div className="flex flex-col gap-2">{items}</div>}
			{canAdd && (
				<Button
					type="button"
					variant="outline"
					size="sm"
					className="w-fit"
					onClick={onAddClick}
					disabled={disabled || readonly}
				>
					<PlusIcon />
					{registry.translateString(TranslatableString.AddItemButton)}
				</Button>
			)}
		</FieldSet>
	);
}

export function ArrayFieldItemTemplate(props: ArrayFieldItemTemplateProps) {
	const { children, buttonsProps, hasToolbar, registry } = props;

	return (
		<div className="flex items-start gap-2">
			<div className="min-w-0 flex-1">{children}</div>
			{hasToolbar && buttonsProps.hasRemove && (
				<Button
					type="button"
					variant="ghost"
					size="icon"
					aria-label={registry.translateString(TranslatableString.RemoveButton)}
					onClick={buttonsProps.onRemoveItem}
					disabled={buttonsProps.disabled || buttonsProps.readonly}
				>
					<XIcon />
				</Button>
			)}
		</div>
	);
}

/** A schema default shown as the placeholder, since the form leaves defaults to the backend. */
function defaultPlaceholder(schema: RJSFSchema) {
	const value = schema.default;
	return typeof value === "string" || typeof value === "number"
		? String(value)
		: undefined;
}

/** Props for the shadcn `Input` behind the text, number, and password widgets. */
export function baseInputProps(
	props: BaseInputTemplateProps
): ComponentProps<"input"> {
	const {
		id,
		htmlName,
		value,
		readonly,
		disabled,
		autofocus,
		onBlur,
		onFocus,
		onChange,
		onChangeOverride,
		options,
		schema,
		type,
		placeholder,
		required,
		rawErrors,
		label,
		hideLabel,
		className,
		autoComplete,
	} = props;
	const inputProps = getInputProps(schema, type, options);
	const numeric = inputProps.type === "number";
	const inputValue = numeric
		? value || value === 0
			? value
			: ""
		: (value ?? "");

	function handleChange(event: ChangeEvent<HTMLInputElement>) {
		const next = event.target.value;
		onChange(next === "" ? options.emptyValue : next);
	}

	return {
		...inputProps,
		id,
		name: htmlName || id,
		className,
		autoComplete: autoComplete ?? inputProps.autoComplete,
		value: inputValue,
		readOnly: readonly,
		disabled,
		autoFocus: autofocus,
		placeholder: placeholder || defaultPlaceholder(schema),
		"aria-label": hideLabel ? label : undefined,
		"aria-required": required || undefined,
		"aria-invalid": rawErrors?.length ? true : undefined,
		"aria-describedby": ariaDescribedByIds(id),
		onChange: onChangeOverride ?? handleChange,
		onBlur: (event) => onBlur(id, event.target.value),
		onFocus: (event) => onFocus(id, event.target.value),
	};
}

/** The shadcn `Input` behind the text and number widgets. */
export function BaseInputTemplate(props: BaseInputTemplateProps) {
	return <Input {...baseInputProps(props)} />;
}

/** The Schema Form sits inside another form and never submits on its own. */
export function SubmitButton() {
	return null;
}

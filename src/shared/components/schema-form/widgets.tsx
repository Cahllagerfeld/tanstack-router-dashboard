import {
	ariaDescribedByIds,
	enumOptionsIndexForValue,
	enumOptionsValueForIndex,
	type WidgetProps,
} from "@rjsf/utils";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

import { m } from "@/paraglide/messages";
import { IconSwap } from "@/shared/components/icon-swap";
import {
	InputGroup,
	InputGroupAddon,
	InputGroupButton,
	InputGroupInput,
} from "@/shared/ui/input-group";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/shared/ui/select";
import { Switch } from "@/shared/ui/switch";
import { Textarea } from "@/shared/ui/textarea";

import { baseInputProps, labelId } from "./templates";

function invalid(rawErrors: string[] | undefined) {
	return rawErrors?.length ? true : undefined;
}

/** A boolean as a `Switch`; an unset value shows the schema default. */
export function CheckboxWidget(props: WidgetProps) {
	const {
		id,
		value,
		schema,
		disabled,
		readonly,
		required,
		rawErrors,
		onChange,
		onBlur,
		onFocus,
	} = props;
	const checked = typeof value === "boolean" ? value : schema.default === true;

	return (
		<Switch
			id={id}
			checked={checked}
			onCheckedChange={(next) => onChange(next)}
			disabled={disabled || readonly}
			aria-required={required || undefined}
			aria-invalid={invalid(rawErrors)}
			aria-describedby={ariaDescribedByIds(id)}
			onBlur={() => onBlur(id, value)}
			onFocus={() => onFocus(id, value)}
		/>
	);
}

/** An enum as a shadcn `Select`. Options are addressed by index, so any JSON value works. */
export function SelectWidget(props: WidgetProps) {
	const {
		id,
		options,
		value,
		schema,
		required,
		disabled,
		readonly,
		multiple,
		placeholder,
		rawErrors,
		onChange,
	} = props;
	const enumOptions = options.enumOptions ?? [];
	const labelOf = (index: string) => enumOptions[Number(index)]?.label ?? index;
	const defaultIndex = enumOptionsIndexForValue(schema.default, enumOptions);
	const emptyLabel =
		placeholder ||
		(typeof defaultIndex === "string"
			? labelOf(defaultIndex)
			: m.schema_form_select_placeholder());

	const triggerProps = {
		id,
		className: "w-full",
		"aria-labelledby": labelId(id),
		"aria-required": required || undefined,
		"aria-invalid": invalid(rawErrors),
		"aria-describedby": ariaDescribedByIds(id),
	};
	const items = enumOptions.map((option, index) => (
		<SelectItem key={index} value={String(index)}>
			{option.label}
		</SelectItem>
	));

	if (multiple) {
		const selected = enumOptionsIndexForValue(
			Array.isArray(value) ? value : [],
			enumOptions,
			true
		);
		return (
			<Select
				multiple
				value={Array.isArray(selected) ? selected : []}
				onValueChange={(next: string[]) =>
					onChange(enumOptionsValueForIndex(next, enumOptions))
				}
				disabled={disabled || readonly}
			>
				<SelectTrigger {...triggerProps}>
					<SelectValue>
						{(current: string[]) =>
							current.length > 0 ? current.map(labelOf).join(", ") : emptyLabel
						}
					</SelectValue>
				</SelectTrigger>
				<SelectContent>{items}</SelectContent>
			</Select>
		);
	}

	const selectedIndex = enumOptionsIndexForValue(value, enumOptions);
	return (
		<Select
			value={typeof selectedIndex === "string" ? selectedIndex : null}
			onValueChange={(next: string | null) =>
				onChange(
					next === null
						? options.emptyValue
						: enumOptionsValueForIndex(next, enumOptions)
				)
			}
			disabled={disabled || readonly}
		>
			<SelectTrigger {...triggerProps}>
				<SelectValue>
					{(current: string | null) =>
						current === null ? emptyLabel : labelOf(current)
					}
				</SelectValue>
			</SelectTrigger>
			<SelectContent>
				{!required && (
					<SelectItem value={null}>{m.schema_form_select_unset()}</SelectItem>
				)}
				{items}
			</SelectContent>
		</Select>
	);
}

/** A secret as a password input with a toggle that reveals it. */
export function PasswordWidget(props: WidgetProps) {
	const [revealed, setRevealed] = useState(false);
	const { disabled } = props;

	return (
		<InputGroup>
			<InputGroupInput
				{...baseInputProps({
					...props,
					type: revealed ? "text" : "password",
					autoComplete: "new-password",
				})}
			/>
			<InputGroupAddon align="inline-end">
				<InputGroupButton
					size="icon-xs"
					aria-label={
						revealed
							? m.common_action_hide_value()
							: m.common_action_show_value()
					}
					onClick={() => setRevealed(!revealed)}
					disabled={disabled}
				>
					<IconSwap swapKey={revealed ? "hide" : "show"}>
						{revealed ? <EyeOff /> : <Eye />}
					</IconSwap>
				</InputGroupButton>
			</InputGroupAddon>
		</InputGroup>
	);
}

/** Long text as a shadcn `Textarea`. */
export function TextareaWidget(props: WidgetProps) {
	const {
		id,
		value,
		options,
		disabled,
		readonly,
		required,
		placeholder,
		rawErrors,
		onChange,
		onBlur,
		onFocus,
	} = props;

	return (
		<Textarea
			id={id}
			value={value ?? ""}
			rows={typeof options.rows === "number" ? options.rows : undefined}
			placeholder={placeholder}
			disabled={disabled}
			readOnly={readonly}
			aria-required={required || undefined}
			aria-invalid={invalid(rawErrors)}
			aria-describedby={ariaDescribedByIds(id)}
			onChange={(event) =>
				onChange(
					event.target.value === "" ? options.emptyValue : event.target.value
				)
			}
			onBlur={(event) => onBlur(id, event.target.value)}
			onFocus={(event) => onFocus(id, event.target.value)}
		/>
	);
}

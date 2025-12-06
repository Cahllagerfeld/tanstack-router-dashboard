import { debounce } from "es-toolkit";
import { ComponentProps, useEffect, useState } from "react";
import { Input } from "./ui/input";

type Props = Omit<ComponentProps<typeof Input>, "onChange"> & {
	debounceMs?: number;
	onChange?: (value: string) => void;
};

export function DebouncedInput({
	debounceMs = 300,
	value,
	onChange,
	...props
}: Props) {
	const [localValue, setLocalValue] = useState(value);

	// Update local state when value prop changes
	useEffect(() => {
		setLocalValue(value);
	}, [value]);

	// Create debounced onChange handler
	const debouncedOnChange = debounce((newValue: string) => {
		onChange?.(newValue);
	}, debounceMs);

	// Cleanup debounced function on unmount
	useEffect(() => {
		return () => {
			debouncedOnChange.cancel();
		};
	}, [debouncedOnChange]);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newValue = e.target.value;
		setLocalValue(newValue);
		debouncedOnChange(newValue);
	};

	return <Input {...props} value={localValue} onChange={handleChange} />;
}

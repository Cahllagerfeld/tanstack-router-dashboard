import { DebouncedInput } from "@/components/debounced-input";

type Props = {
	searchValue: string;
	onChange: (value: string) => void;
};

export function UserListSearchbar({ searchValue, onChange }: Props) {
	return (
		<DebouncedInput
			debounceMs={500}
			placeholder="Search"
			value={searchValue}
			onChange={onChange}
		/>
	);
}

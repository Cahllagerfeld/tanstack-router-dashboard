import { DebouncedInput } from "@/components/debounced-input";
import { m } from "@/paraglide/messages";

type Props = {
	searchValue: string;
	onChange: (value: string) => void;
};

export function UserListSearchbar({ searchValue, onChange }: Props) {
	return (
		<DebouncedInput
			debounceMs={500}
			placeholder={m.users_search_placeholder()}
			value={searchValue}
			onChange={onChange}
		/>
	);
}

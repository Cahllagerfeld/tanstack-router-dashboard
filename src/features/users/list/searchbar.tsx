import { m } from "@/paraglide/messages";
import { DebouncedInput } from "@/shared/components/debounced-input";

type Props = {
	searchValue: string;
	onChange: (value: string) => void;
};

export function UserListSearchbar({ searchValue, onChange }: Props) {
	return (
		<DebouncedInput
			className="max-w-xs"
			debounceMs={500}
			placeholder={m.users_search_placeholder()}
			value={searchValue}
			onChange={onChange}
		/>
	);
}

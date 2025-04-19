import { DebouncedInput } from "@/components/debounced-input";

type Props = {
	searchValue: string;
	onChange: (value: string) => void;
};

export function UserListSearchbar({ searchValue, onChange }: Props) {
	return (
		<div className="flex items-center justify-between">
			<div>
				<DebouncedInput
					debounceMs={500}
					placeholder="Search"
					value={searchValue}
					onChange={onChange}
				/>
			</div>
		</div>
	);
}

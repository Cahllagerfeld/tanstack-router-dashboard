import { CreateProjectDialogWithTrigger } from "../create/dialog/create-project-dialog";
import { DebouncedInput } from "@/components/debounced-input";

type Props = {
	value: string;
	onChange: (value: string) => void;
};

export function ProjectSearchbar({ value, onChange }: Props) {
	return (
		<div className="flex items-center justify-between">
			<div>
				<DebouncedInput
					debounceMs={500}
					placeholder="Search"
					value={value}
					onChange={onChange}
				/>
			</div>
			<CreateProjectDialogWithTrigger />
		</div>
	);
}

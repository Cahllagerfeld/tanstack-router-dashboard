import { m } from "@/paraglide/messages";
import { DebouncedInput } from "@/shared/components/debounced-input";

import { CreateProjectDialogWithTrigger } from "../create/dialog/create-project-dialog";

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
					placeholder={m.common_search_placeholder()}
					value={value}
					onChange={onChange}
				/>
			</div>
			<CreateProjectDialogWithTrigger />
		</div>
	);
}

import { Button } from "@/components/ui/button";
import { COMPONENT_TYPES } from "@/lib/constants/component-types";
import { snakeCaseToTitleCase } from "@/lib/strings";

type Props = {
	setSelectedType: (val: string) => void;
};

export function TypeList({ setSelectedType }: Props) {
	return (
		<div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
			{COMPONENT_TYPES.map((c) => (
				<Button
					key={c}
					onClick={() => setSelectedType(c)}
					variant="outline"
					type="button"
				>
					{snakeCaseToTitleCase(c)}
				</Button>
			))}
		</div>
	);
}

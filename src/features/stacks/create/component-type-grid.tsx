import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { COMPONENT_TYPES } from "@/lib/constants/component-types";
import { snakeCaseToTitleCase } from "@/lib/strings";

export function ComponentTypeGrid() {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Stack Components</CardTitle>
			</CardHeader>
			<CardContent className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
				{COMPONENT_TYPES.map((type) => (
					<div className="rounded-sm border p-2 text-sm">
						{snakeCaseToTitleCase(type)}
					</div>
				))}
			</CardContent>
		</Card>
	);
}

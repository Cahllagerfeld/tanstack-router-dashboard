import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { COMPONENT_TYPES } from "@/lib/constants/component-types";
import { ComponentTypeGridItem } from "./component-type-grid-item";

export function ComponentTypeGrid() {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Stack Components</CardTitle>
			</CardHeader>
			<CardContent className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
				{COMPONENT_TYPES.map((type) => (
					<ComponentTypeGridItem key={type} type={type} />
				))}
			</CardContent>
		</Card>
	);
}

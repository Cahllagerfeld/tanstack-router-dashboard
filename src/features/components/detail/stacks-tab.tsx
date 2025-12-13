import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

interface ComponentStacksTabProps {
	componentId: string;
}

export function ComponentStacksTab({ componentId }: ComponentStacksTabProps) {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Stacks</CardTitle>
			</CardHeader>
			<CardContent>
				<p className="text-muted-foreground text-sm">
					Stacks using this component will be displayed here.
				</p>
				<p className="text-muted-foreground mt-2 text-xs">
					Component ID: {componentId}
				</p>
			</CardContent>
		</Card>
	);
}

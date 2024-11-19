import { createLazyFileRoute } from "@tanstack/react-router";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PasswordStep } from "@/features/server-activation/PasswordStep";

export const Route = createLazyFileRoute(
	"/(public)/_grid-layout/server-activation"
)({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<Card className="w-[500px]">
			<CardHeader>
				<CardTitle>Activate Server</CardTitle>
				<CardDescription>Activate your new ZenML Server</CardDescription>
			</CardHeader>
			<CardContent>
				<PasswordStep />
			</CardContent>
			<CardFooter className="flex justify-end">
				<Button form="password">Activate</Button>
			</CardFooter>
		</Card>
	);
}

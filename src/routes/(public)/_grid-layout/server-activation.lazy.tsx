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
import { PasswordStep } from "@/features/server-activation/password-step";

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
				<Button type="submit" form="server-activation-form">
					Activate
				</Button>
			</CardFooter>
		</Card>
	);
}

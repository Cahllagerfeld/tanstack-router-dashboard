import { createFileRoute, redirect } from "@tanstack/react-router";
import { serverQueries } from "@/data/server";
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

export const Route = createFileRoute(
	"/(public)/_grid-layout/server-activation"
)({
	loader: async ({ context: { queryClient } }) => {
		const serverInfo = await queryClient.ensureQueryData(
			serverQueries.serverInfo()
		);

		if (serverInfo.active) throw redirect({ to: "/" });
	},
	head: () => ({
		meta: [{ title: "Server Activation" }],
	}),
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

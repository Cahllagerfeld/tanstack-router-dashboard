import { createFileRoute, redirect } from "@tanstack/react-router";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { serverQueries } from "@/data/server";
import { PasswordStep } from "@/features/server-activation/password-step";
import { m } from "@/paraglide/messages";

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
		meta: [{ title: m.server_activation_route_title() }],
	}),
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<Card className="w-[500px]">
			<CardHeader>
				<CardTitle>{m.server_activation_title()}</CardTitle>
				<CardDescription>{m.server_activation_description()}</CardDescription>
			</CardHeader>
			<CardContent>
				<PasswordStep />
			</CardContent>
			<CardFooter className="flex justify-end">
				<Button type="submit" form="server-activation-form">
					{m.server_activation_submit()}
				</Button>
			</CardFooter>
		</Card>
	);
}

import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

import { useUserActivation } from "@/app/workflows/user-activation/use-user-activation";
import { ActivateUserForm } from "@/features/users/ui";
import { m } from "@/paraglide/messages";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/shared/ui/card";

const querySchema = z.object({
	user: z.string().optional().catch(undefined),
	token: z.string().optional().catch(undefined),
});

export const Route = createFileRoute("/(public)/_grid-layout/activate-user")({
	validateSearch: querySchema,
	head: () => ({
		meta: [{ title: m.users_activate_route_title() }],
	}),
	component: RouteComponent,
});

function RouteComponent() {
	const { user, token } = Route.useSearch();
	const { activate, isPending } = useUserActivation();

	if (!user || !token) {
		return (
			<Card className="mx-auto md:w-[500px]">
				<CardHeader>
					<CardTitle>{m.users_activate_invalid_link_title()}</CardTitle>
					<CardDescription>
						{m.users_activate_invalid_link_description()}
					</CardDescription>
				</CardHeader>
			</Card>
		);
	}

	return (
		<Card className="mx-auto md:w-[500px]">
			<CardHeader>
				<CardTitle>{m.users_activate_title()}</CardTitle>
				<CardDescription>{m.users_activate_description()}</CardDescription>
			</CardHeader>
			<CardContent>
				<ActivateUserForm
					userId={user}
					token={token}
					isPending={isPending}
					onActivate={activate}
				/>
			</CardContent>
		</Card>
	);
}

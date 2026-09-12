import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

import { LoginForm } from "@/features/login/login-form";
import { m } from "@/paraglide/messages";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/shared/components/ui/card";

const querySchema = z.object({
	next: z.string().optional(),
});

export const Route = createFileRoute("/(public)/_grid-layout/login")({
	validateSearch: querySchema,
	head: () => ({
		meta: [{ title: m.auth_route_title() }],
	}),
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<Card className="mx-auto md:w-[400px]">
			<CardHeader>
				<CardTitle className="text-2xl">{m.auth_login_title()}</CardTitle>
				<CardDescription>{m.auth_login_description()}</CardDescription>
			</CardHeader>
			<CardContent>
				<LoginForm />
			</CardContent>
		</Card>
	);
}

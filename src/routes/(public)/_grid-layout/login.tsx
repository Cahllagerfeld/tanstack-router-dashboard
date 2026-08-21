import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { LoginForm } from "@/features/login/login-form";
import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

const querySchema = z.object({
	next: z.string().optional(),
});

export const Route = createFileRoute("/(public)/_grid-layout/login")({
	validateSearch: querySchema,
	head: () => ({
		meta: [{ title: "Login" }],
	}),
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<Card className="mx-auto md:w-[400px]">
			<CardHeader>
				<CardTitle className="text-2xl">Login</CardTitle>
				<CardDescription>Use your credentials to log in.</CardDescription>
			</CardHeader>
			<CardContent>
				<LoginForm />
			</CardContent>
		</Card>
	);
}

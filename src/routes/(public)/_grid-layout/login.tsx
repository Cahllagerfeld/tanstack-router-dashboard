import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/(public)/_grid-layout/login")({
	beforeLoad: ({ context }) => {
		if (context.auth.isAuthenticated) throw redirect({ to: "/" });
	},
});

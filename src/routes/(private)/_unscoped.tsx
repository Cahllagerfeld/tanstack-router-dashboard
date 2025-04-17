import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/(private)/_unscoped")({
	beforeLoad: ({ context }) => {
		if (!context.auth.isAuthenticated) throw redirect({ to: "/login" });
	},
});

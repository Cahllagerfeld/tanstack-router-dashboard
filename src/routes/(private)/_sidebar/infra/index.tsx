import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/(private)/_sidebar/infra/")({
	beforeLoad: () => {
		throw redirect({ to: "/infra/stacks", replace: true });
	},
});

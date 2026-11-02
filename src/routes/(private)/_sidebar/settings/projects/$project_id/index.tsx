import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute(
	"/(private)/_sidebar/settings/projects/$project_id/"
)({
	beforeLoad: ({ params }) => {
		throw redirect({
			to: "/settings/projects/$project_id/general",
			params,
			replace: true,
		});
	},
});

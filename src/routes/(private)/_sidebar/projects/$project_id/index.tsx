import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute(
	"/(private)/_sidebar/projects/$project_id/"
)({
	beforeLoad: ({ params }) => {
		throw redirect({
			to: "/projects/$project_id/runs",
			params,
			replace: true,
		});
	},
});

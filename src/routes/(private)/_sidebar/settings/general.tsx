import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(private)/_sidebar/settings/general")({
	loader: () => ({ crumb: "General" }),
	component: RouteComponent,
	head: () => ({
		meta: [{ title: "General Settings" }],
	}),
});

function RouteComponent() {
	return (
		<div className="space-y-4">
			<div>
				<h1 className="text-2xl font-bold">General</h1>
				<p className="text-muted-foreground text-sm">
					Server-wide preferences and configuration.
				</p>
			</div>
		</div>
	);
}

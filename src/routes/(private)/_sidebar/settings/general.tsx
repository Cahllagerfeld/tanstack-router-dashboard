import { m } from "@/paraglide/messages";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(private)/_sidebar/settings/general")({
	loader: () => ({ crumb: m.settings_general_title() }),
	component: RouteComponent,
	head: () => ({
		meta: [{ title: m.settings_general_title() }],
	}),
});

function RouteComponent() {
	return (
		<div className="space-y-4">
			<div>
				<h1 className="text-2xl font-bold">{m.settings_general_title()}</h1>
				<p className="text-muted-foreground text-sm">
					{m.settings_general_description()}
				</p>
			</div>
		</div>
	);
}

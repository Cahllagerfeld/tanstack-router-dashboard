import { createFileRoute } from "@tanstack/react-router";

import { ContentInset } from "@/components/content-inset";
import { m } from "@/paraglide/messages";

export const Route = createFileRoute("/(private)/_sidebar/settings/general")({
	loader: () => ({ crumb: m.settings_general_title() }),
	component: RouteComponent,
	head: () => ({
		meta: [{ title: m.settings_general_title() }],
	}),
});

function RouteComponent() {
	return (
		<ContentInset>
			<h1 className="text-2xl font-bold">{m.settings_general_title()}</h1>
			<p className="text-sm text-muted-foreground">
				{m.settings_general_description()}
			</p>
		</ContentInset>
	);
}

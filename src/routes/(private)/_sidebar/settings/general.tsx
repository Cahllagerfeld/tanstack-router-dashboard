import { createFileRoute } from "@tanstack/react-router";

import { m } from "@/paraglide/messages";
import { ContentInset } from "@/shared/components/content-inset";

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

import { createFileRoute } from "@tanstack/react-router";

import { InfraLayout } from "@/app/layouts/infra-layout";
import { m } from "@/paraglide/messages";

export const Route = createFileRoute("/(private)/_sidebar/infra")({
	loader: () => ({ crumb: m.infra_navigation_label() }),
	component: InfraLayout,
});

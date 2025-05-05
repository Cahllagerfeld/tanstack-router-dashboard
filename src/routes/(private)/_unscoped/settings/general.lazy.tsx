import { GeneralSettingsForm } from "@/features/settings/general/form/general-settings-form";
import { createLazyFileRoute } from "@tanstack/react-router";
import { Suspense } from "react";

export const Route = createLazyFileRoute(
	"/(private)/_unscoped/settings/general"
)({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div className="space-y-4">
			<div>
				<h1 className="text-2xl font-bold">General Settings</h1>
				<p className="text-sm text-muted-foreground">
					Manage your server settings.
				</p>
			</div>
			<Suspense fallback={<div>Loading...</div>}>
				<GeneralSettingsForm />
			</Suspense>
		</div>
	);
}

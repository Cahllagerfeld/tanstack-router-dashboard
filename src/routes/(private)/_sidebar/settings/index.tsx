import { Navigate, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(private)/_sidebar/settings/")({
	component: SettingsIndexRedirect,
});

function SettingsIndexRedirect() {
	return <Navigate to="/settings/general" replace />;
}

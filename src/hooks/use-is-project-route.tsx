import { useMatch } from "@tanstack/react-router";

export function useIsProjectRoute() {
	const matchRoute = useMatch({
		from: "/(private)/_sidebar/projects/$project_id",
		shouldThrow: false,
	});

	return matchRoute !== undefined;
}

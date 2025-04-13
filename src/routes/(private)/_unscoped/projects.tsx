import { projectQueries } from "@/data/projects";
import { filterSchema } from "@/features/filters/filter";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { z } from "zod";

const querySchema = z.object({
	name: filterSchema.optional().catch(undefined),
});

export const Route = createFileRoute("/(private)/_unscoped/projects")({
	validateSearch: (search) => querySchema.parse(search),
	loaderDeps: ({ search: { name } }) => ({ name }),
	beforeLoad: ({ context }) => {
		if (!context.auth.isAuthenticated) throw redirect({ to: "/login" });
	},
	loader: async ({ context: { queryClient }, deps: { name } }) => {
		await queryClient.ensureQueryData(projectQueries.projectList({ name }));
	},
});

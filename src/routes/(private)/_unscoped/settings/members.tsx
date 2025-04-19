import { userQueries } from "@/data/user";
import { filterSchema } from "@/features/filters/filter";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { z } from "zod";

const querySchema = z.object({
	name: filterSchema.optional().catch(undefined),
	page: z.number().optional().catch(1),
});

export const Route = createFileRoute("/(private)/_unscoped/settings/members")({
	validateSearch: (search) => querySchema.parse(search),
	loaderDeps: ({ search: { name, page } }) => ({ name, page }),
	beforeLoad: ({ context }) => {
		if (!context.auth.isAuthenticated) throw redirect({ to: "/login" });
	},
	loader: async ({ context: { queryClient }, deps: { name, page } }) => {
		await Promise.all([
			queryClient.ensureQueryData(userQueries.userList({ name, page })),
			queryClient.ensureQueryData(userQueries.currentUser()),
		]);
	},
});

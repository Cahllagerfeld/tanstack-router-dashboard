import { z } from "zod";

export const createWorkspaceSchema = z.object({
	name: z.string().trim().min(1),
	description: z.string().trim(),
});

export type CreateWorkspaceForm = z.infer<typeof createWorkspaceSchema>;

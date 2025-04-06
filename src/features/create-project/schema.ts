import { z } from "zod";

export const createProjectSchema = z.object({
	name: z.string().trim().min(1),
	description: z.string().trim(),
});

export type CreateProjectForm = z.infer<typeof createProjectSchema>;

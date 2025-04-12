import { z } from "zod";

export const createProjectSchema = z.object({
	name: z
		.string()
		.trim()
		.min(1, "Name is required")
		.max(50, "Name must be less than 50 characters")
		.regex(
			/^[a-z0-9_-]+$/,
			"Name must contain only lowercase letters, numbers, underscores, and hyphens"
		),
	displayName: z
		.string()
		.trim()
		.min(1, "Display name is required")
		.max(255, "Display name must be less than 255 characters"),

	description: z
		.string()
		.trim()
		.max(255, "Description must be less than 255 characters"),
});

export type CreateProjectForm = z.infer<typeof createProjectSchema>;

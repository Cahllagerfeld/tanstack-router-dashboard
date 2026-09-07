import { z } from "zod";

import { m } from "@/paraglide/messages";

export const createProjectSchema = z.object({
	name: z
		.string()
		.trim()
		.min(1, m.projects_validation_name_required())
		.max(50, m.projects_validation_name_max())
		.regex(/^[a-z0-9_-]+$/, m.projects_validation_name_format()),
	displayName: z
		.string()
		.trim()
		.min(1, m.projects_validation_display_name_required())
		.max(255, m.projects_validation_display_name_max()),

	description: z
		.string()
		.trim()
		.max(255, m.projects_validation_description_max()),
});

export type CreateProjectForm = z.infer<typeof createProjectSchema>;

import { z } from "zod";

import { m } from "@/paraglide/messages";

export const profileSchema = z.object({
	fullName: z.string().trim().max(255, m.session_profile_full_name_max()),
	username: z
		.string()
		.trim()
		.min(1, m.session_profile_username_required())
		.max(255, m.session_profile_username_max()),
	email: z
		.string()
		.trim()
		.pipe(z.union([z.literal(""), z.email(m.session_profile_email_invalid())])),
});

export type ProfileFormValues = z.infer<typeof profileSchema>;

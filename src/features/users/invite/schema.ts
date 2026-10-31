import { z } from "zod";

import { m } from "@/paraglide/messages";

export const inviteMemberSchema = z.object({
	username: z.string().trim().min(1, m.users_invite_username_required()),
	isAdmin: z.boolean(),
});

export type InviteMemberValues = z.infer<typeof inviteMemberSchema>;

import { z } from "zod";

export const envSchema = z.object({
	VITE_BACKEND_URL: z.url().trim().optional(),
});

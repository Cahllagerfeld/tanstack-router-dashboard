import { z } from "zod";

export const commonFilterSchema = z.object({
	page: z.number().int().positive().optional().catch(undefined),
	size: z.literal([5, 10, 20, 50, 100]).optional().catch(undefined),
});

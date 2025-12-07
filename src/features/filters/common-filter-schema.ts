import z from "zod";

export const commonFilterSchema = z.object({
	page: z.number().int().positive().optional().catch(undefined),
	size: z
		.union([
			z.literal(5),
			z.literal(10),
			z.literal(20),
			z.literal(50),
			z.undefined(),
		])
		.catch(20),
});

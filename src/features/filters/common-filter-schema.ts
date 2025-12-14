import z from "zod";

export const commonFilterSchema = z.object({
	page: z.number().int().positive().optional().catch(undefined),
	size: z
		.number()
		.int()
		.positive()
		.optional()
		.transform((val) => {
			if (val === undefined) return undefined;
			if ([5, 10, 20, 50].includes(val)) return val as 5 | 10 | 20 | 50;
		}),
});

import { z } from "zod";

import { typeFilterSchema } from "../type/schema";

/**
 * The create flow's step state, kept in the URL so reload and Back keep the step.
 * An invalid value drops out, which sends the user back to the step that picks it.
 */
export const createComponentSearchSchema = z.object({
	type: typeFilterSchema.catch(undefined),
	/** Flavor id. Only a well-formed id reaches the backend. */
	flavor: z.guid().optional().catch(undefined),
});

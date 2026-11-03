import { z } from "zod";

import { m } from "@/paraglide/messages";
import type { JsonSchema } from "@/shared/lib/json-schema-form/normalize";
import { schemaRecord } from "@/shared/lib/json-schema-form/schema-record";

export type ComponentFormValues = {
	name: string;
	configuration: Record<string, unknown>;
};

/**
 * Validates a Component's name and its configuration against the Flavor's schema.
 * Configuration issues land at `["configuration", ...issue.path]`.
 */
export function buildComponentFormSchema(
	configSchema: JsonSchema
): z.ZodType<ComponentFormValues, ComponentFormValues> {
	return z.object({
		name: z
			.string()
			.trim()
			.min(1, m.components_configure_name_required())
			.max(255, m.components_configure_name_max()),
		configuration: schemaRecord(configSchema),
	});
}

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import type { JsonSchema } from "@/shared/lib/json-schema-form/normalize";

import { buildComponentFormSchema, type ComponentFormValues } from "./schema";

/**
 * The form for a Component's name and configuration, validated against the Flavor's raw `configSchema`.
 * Pass the schema object from the query cache: normalization is cached by its identity,
 * so the form and SchemaForm share one normalized schema and one Ajv compile.
 */
export function useComponentForm({
	configSchema,
	defaultValues,
}: {
	configSchema: JsonSchema;
	defaultValues: ComponentFormValues;
}) {
	return useForm<ComponentFormValues>({
		resolver: zodResolver(buildComponentFormSchema(configSchema)),
		defaultValues,
	});
}

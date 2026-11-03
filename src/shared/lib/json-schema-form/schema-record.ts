import { z } from "zod";

import { type JsonSchema, normalizeSchema } from "./normalize";
import { validateSchemaData } from "./validate";

/**
 * A Zod record validated against a backend JSON Schema, such as a Flavor's `config_schema`.
 * Normalizes `schema` with `normalizeSchema` and reports each `SchemaIssue` as a custom issue
 * at its path inside the record, so a parent object nests it under the record's key.
 * Pass the raw schema: `normalizeSchema` caches by identity, so every record built from one
 * schema object, and the form rendering it, shares one normalized object and one Ajv compile.
 */
export function schemaRecord(schema: JsonSchema) {
	const normalized = normalizeSchema(schema);

	return z.record(z.string(), z.unknown()).superRefine((data, context) => {
		for (const issue of validateSchemaData(normalized, data)) {
			context.addIssue({
				code: "custom",
				message: issue.message,
				path: issue.path,
			});
		}
	});
}

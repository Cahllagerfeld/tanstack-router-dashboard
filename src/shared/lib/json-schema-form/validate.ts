import type { RJSFSchema } from "@rjsf/utils";

import { m } from "@/paraglide/messages";

import type { JsonSchema } from "./normalize";
import { schemaValidator } from "./validator";

/** One validation failure, at the property path inside the validated data. */
export type SchemaIssue = {
	/** Property keys from the data root, e.g. `["pod_settings", "tolerations"]`; `[]` for the root. Array indexes are decimal strings. */
	path: string[];
	/** Localized through Paraglide. */
	message: string;
};

/** The fields of an ajv `ErrorObject` this module reads. */
type AjvError = {
	keyword: string;
	instancePath: string;
	params: Record<string, unknown>;
};

const unionKeywords = new Set(["anyOf", "oneOf"]);

/**
 * Validates data against a normalized schema with `schemaValidator` (JSON Schema 2020-12).
 * Pass the output of `normalizeSchema`: against raw pydantic output, a wrong optional value
 * fails every `anyOf` branch, and `null` is not an unset value.
 * Returns one localized issue per failing property; an empty array means valid.
 * The first failure at a path wins. A failed `anyOf` or `oneOf` reports one issue at its own
 * path in place of its branches' failures.
 * Compiled validators are cached by schema object identity, so pass a stable, memoized schema.
 */
export function validateSchemaData(
	schema: JsonSchema,
	data: Record<string, unknown>
): SchemaIssue[] {
	// `JsonSchema` is the structural shape of `RJSFSchema`; rjsf types it as draft-07.
	const { errors = [], validationError } =
		schemaValidator.rawValidation<AjvError>(schema as RJSFSchema, data);
	if (validationError) {
		return [{ path: [], message: m.schema_form_validation_schema_invalid() }];
	}

	const unionPaths = errors
		.filter((error) => unionKeywords.has(error.keyword))
		.map((error) => error.instancePath);
	const issues = new Map<string, SchemaIssue>();

	for (const error of errors) {
		if (error.keyword === "if") continue;
		if (
			!unionKeywords.has(error.keyword) &&
			unionPaths.some((path) => isAtOrBelow(error.instancePath, path))
		) {
			continue;
		}
		const path = issuePath(error);
		const key = JSON.stringify(path);
		if (!issues.has(key)) issues.set(key, { path, message: message(error) });
	}
	return [...issues.values()];
}

function isAtOrBelow(instancePath: string, ancestor: string): boolean {
	return instancePath === ancestor || instancePath.startsWith(`${ancestor}/`);
}

/** Decodes the JSON Pointer, then appends the key a `required` or `additionalProperties` error names. */
function issuePath(error: AjvError): string[] {
	const path = error.instancePath
		.split("/")
		.slice(1)
		.map((segment) => segment.replaceAll("~1", "/").replaceAll("~0", "~"));
	const named = error.params.missingProperty ?? error.params.additionalProperty;
	if (typeof named === "string") path.push(named);
	return path;
}

/** Keywords whose message shows ajv's numeric `limit` as a bound. */
const limitMessages = new Map<string, (inputs: { limit: number }) => string>([
	["minimum", m.schema_form_validation_minimum],
	["maximum", m.schema_form_validation_maximum],
	["exclusiveMinimum", m.schema_form_validation_exclusive_minimum],
	["exclusiveMaximum", m.schema_form_validation_exclusive_maximum],
]);

/** Keywords whose message shows ajv's numeric `limit` as a count of characters or items. */
const countMessages = new Map<string, (inputs: { count: number }) => string>([
	["minLength", m.schema_form_validation_min_length],
	["maxLength", m.schema_form_validation_max_length],
	["minItems", m.schema_form_validation_min_items],
	["maxItems", m.schema_form_validation_max_items],
]);

function message(error: AjvError): string {
	const { keyword, params } = error;

	if (typeof params.limit === "number") {
		const limitMessage = limitMessages.get(keyword);
		if (limitMessage) return limitMessage({ limit: params.limit });
		const countMessage = countMessages.get(keyword);
		if (countMessage) return countMessage({ count: params.limit });
	}

	switch (keyword) {
		case "required":
		case "dependentRequired":
		case "dependencies":
			return m.schema_form_validation_required();
		case "type":
			return typeMessage(params.type);
		case "multipleOf":
			if (typeof params.multipleOf === "number") {
				return m.schema_form_validation_multiple_of({
					limit: params.multipleOf,
				});
			}
			break;
		case "pattern":
			if (typeof params.pattern === "string") {
				return m.schema_form_validation_pattern({ pattern: params.pattern });
			}
			break;
		case "format":
			if (typeof params.format === "string") {
				return m.schema_form_validation_format({ format: params.format });
			}
			break;
		case "enum":
		case "const":
			return m.schema_form_validation_enum();
		case "anyOf":
		case "oneOf":
			return m.schema_form_validation_union();
		case "additionalProperties":
			return m.schema_form_validation_additional_property();
	}
	return m.schema_form_validation_invalid();
}

function typeMessage(type: unknown): string {
	switch (type) {
		case "string":
			return m.schema_form_validation_type_string();
		case "integer":
			return m.schema_form_validation_type_integer();
		case "number":
			return m.schema_form_validation_type_number();
		case "boolean":
			return m.schema_form_validation_type_boolean();
		case "object":
			return m.schema_form_validation_type_object();
		case "array":
			return m.schema_form_validation_type_array();
		case "null":
			return m.schema_form_validation_type_null();
		default:
			return m.schema_form_validation_type();
	}
}

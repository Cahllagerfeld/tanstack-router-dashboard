import { isEqual } from "es-toolkit";

import { isRecord } from "@/shared/lib/type-guards";

/** A JSON Schema object as the backend sends it, such as a Flavor's `config_schema`. */
export type JsonSchema = Record<string, unknown>;

/** Keywords whose value is a map of name to subschema. */
const schemaMapKeywords = [
	"$defs",
	"definitions",
	"properties",
	"patternProperties",
	"dependentSchemas",
];

/** Keywords whose value is a single subschema. */
const schemaKeywords = [
	"items",
	"additionalProperties",
	"additionalItems",
	"unevaluatedProperties",
	"unevaluatedItems",
	"contains",
	"propertyNames",
	"not",
	"if",
	"then",
	"else",
];

/** Keywords whose value is a list of subschemas. */
const schemaListKeywords = ["prefixItems", "allOf", "anyOf", "oneOf"];

/** Normalized schemas by input object, so one raw schema always yields one normalized object. */
const normalizedSchemas = new WeakMap<object, JsonSchema>();

/**
 * Rewrites pydantic output into the shape the form renders.
 * Collapses every `anyOf [X, {type: "null"}]` into `X` and drops its `default: null`,
 * at any depth and inside `$defs`, so an optional field is just an unset field.
 * The field's own keywords, such as `title` and `description`, win over `X`'s when both set one.
 * A union with several non-null members stays an `anyOf` without its null member.
 * Leaves every other keyword, `$ref` included, untouched. Never mutates its input.
 *
 * Results are cached by input object identity: the same `schema` object, such as a Flavor's
 * `config_schema` from the query cache, always returns the same normalized object. Ajv caches
 * compiled validators by schema identity, so every consumer of that schema shares one compile.
 * Treat the result as read-only.
 */
export function normalizeSchema(schema: JsonSchema): JsonSchema {
	const cached = normalizedSchemas.get(schema);
	if (cached) return cached;
	const result = normalizeSchemaUncached(schema);
	normalizedSchemas.set(schema, result);
	return result;
}

/**
 * Copies form data without `undefined` or `null` object entries at any depth; arrays keep their
 * items, cleaned inside. The data counterpart of `normalizeSchema`: the normalized schema has no
 * null branch, so an unset field is absent rather than `null`. Never mutates its input.
 */
export function normalizeData(
	record: Record<string, unknown>
): Record<string, unknown> {
	return Object.fromEntries(
		Object.entries(record)
			.filter(([, value]) => value !== undefined && value !== null)
			.map(([key, value]) => [key, normalizeDataValue(value)])
	);
}

/** Structural equality for JSON values, such as two `normalizeData` results. */
export function isJsonEqual(left: unknown, right: unknown): boolean {
	return isEqual(left, right);
}

function normalizeDataValue(value: unknown): unknown {
	if (Array.isArray(value)) return value.map(normalizeDataValue);
	if (isRecord(value)) return normalizeData(value);
	return value;
}

function normalizeSchemaUncached(schema: JsonSchema): JsonSchema {
	const result: JsonSchema = {};
	for (const [keyword, value] of Object.entries(schema)) {
		result[keyword] = normalizeKeyword(keyword, value);
	}
	return collapseNullableUnion(result);
}

function normalizeKeyword(keyword: string, value: unknown): unknown {
	if (schemaMapKeywords.includes(keyword) && isRecord(value)) {
		return Object.fromEntries(
			Object.entries(value).map(([name, subschema]) => [
				name,
				normalizeSubschema(subschema),
			])
		);
	}
	if (schemaKeywords.includes(keyword)) {
		// Draft-7 tuple `items` is a list of subschemas.
		return Array.isArray(value)
			? value.map(normalizeSubschema)
			: normalizeSubschema(value);
	}
	if (schemaListKeywords.includes(keyword) && Array.isArray(value)) {
		return value.map(normalizeSubschema);
	}
	return value;
}

/** Boolean schemas and other non-object values pass through. */
function normalizeSubschema(value: unknown): unknown {
	return isRecord(value) ? normalizeSchema(value) : value;
}

function isNullSchema(value: unknown): boolean {
	return (
		isRecord(value) && value.type === "null" && Object.keys(value).length === 1
	);
}

/** Collapses an already normalized schema's `anyOf [..., {type: "null"}]`. */
function collapseNullableUnion(schema: JsonSchema): JsonSchema {
	const { anyOf } = schema;
	if (!Array.isArray(anyOf) || !anyOf.some(isNullSchema)) return schema;

	const members = anyOf.filter((member) => !isNullSchema(member));
	const siblings = Object.fromEntries(
		Object.entries(schema).filter(
			([keyword, value]) =>
				keyword !== "anyOf" && !(keyword === "default" && value === null)
		)
	);

	if (members.length === 0) return { ...siblings, type: "null" };
	const [only] = members;
	if (members.length > 1 || !isRecord(only)) {
		return { ...siblings, anyOf: members };
	}
	return { ...only, ...siblings };
}

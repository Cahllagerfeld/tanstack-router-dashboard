import { retrieveSchema, type RJSFSchema, type UiSchema } from "@rjsf/utils";

import { isRecord } from "@/shared/lib/type-guards";

import type { JsonSchema } from "./normalize";
import { schemaValidator } from "./validator";

/** Name the Schema Form registers its JSON text field under, for `ui:field`. */
export const JSON_FIELD = "json";

const scalarTypes = new Set(["string", "number", "integer", "boolean", "null"]);

type FieldKind = "scalar" | "scalar-array" | "model" | "structured";

/**
 * Derives the rjsf uiSchema for a normalized root schema.
 * - `sensitive`, `format: "password"`, or `writeOnly` strings use the `password` widget.
 * - `deprecated` properties are hidden unless their model requires them, so a required
 *   error never points at a field the user cannot fill.
 * - Nesting depth: root properties are depth 0. A root property that is an object model
 *   with its own `properties` (after resolving `$ref`) renders as one nested group, depth 1.
 *   Any structured value that is not a scalar, enum, or array of scalars at depth 0 or 1 uses `JSON_FIELD`:
 *   free-form dicts, unions, tuples, arrays of objects, and models nested deeper than one level.
 *   A `JSON_FIELD` that replaces a union also sets `ui:fieldReplacesAnyOrOneOf`, so rjsf
 *   renders no option picker beside it.
 * - The root and each nested group set `expandable: false`: extra keys that pydantic models
 *   allow get no "add property" control.
 */
export function buildUiSchema(schema: JsonSchema): UiSchema {
	return {
		...propertiesUi(resolve(schema, schema), schema, 0),
		"ui:options": { expandable: false },
	};
}

function propertiesUi(
	model: JsonSchema,
	root: JsonSchema,
	depth: number
): UiSchema {
	const uiSchema: UiSchema = {};
	const properties = isRecord(model.properties) ? model.properties : {};
	const required = Array.isArray(model.required) ? model.required : [];
	for (const [name, property] of Object.entries(properties)) {
		if (!isRecord(property)) continue;
		const fieldUi = propertyUi(property, root, depth, required.includes(name));
		if (Object.keys(fieldUi).length > 0) uiSchema[name] = fieldUi;
	}
	return uiSchema;
}

function propertyUi(
	property: JsonSchema,
	root: JsonSchema,
	depth: number,
	required: boolean
): UiSchema {
	const schema = resolve(property, root);
	const kind = classify(schema, root);
	let uiSchema: UiSchema = {};

	if (kind === "model" && depth === 0) {
		uiSchema = {
			...propertiesUi(schema, root, depth + 1),
			"ui:options": { expandable: false },
		};
	} else if (kind === "model" || kind === "structured") {
		uiSchema["ui:field"] = JSON_FIELD;
		if ("anyOf" in schema || "oneOf" in schema) {
			uiSchema["ui:fieldReplacesAnyOrOneOf"] = true;
		}
	} else if (kind === "scalar" && isSensitiveString(schema)) {
		uiSchema["ui:widget"] = "password";
	}

	if (schema.deprecated === true && !required) {
		uiSchema["ui:widget"] = "hidden";
	}
	return uiSchema;
}

/** Resolves `$ref` and `allOf` the way rjsf does before it renders a field. */
function resolve(schema: JsonSchema, root: JsonSchema): JsonSchema {
	// `JsonSchema` is the structural shape of `RJSFSchema`; rjsf types it as draft-07.
	const resolved: unknown = retrieveSchema(
		schemaValidator,
		schema as RJSFSchema,
		root as RJSFSchema
	);
	return isRecord(resolved) ? resolved : {};
}

function classify(schema: JsonSchema, root: JsonSchema): FieldKind {
	if (isScalar(schema)) return "scalar";
	if ("anyOf" in schema || "oneOf" in schema) return "structured";

	const type = singleType(schema.type);
	if (type === "array") {
		const { items, prefixItems } = schema;
		if (prefixItems !== undefined || !isRecord(items)) return "structured";
		return isScalar(resolve(items, root)) ? "scalar-array" : "structured";
	}
	if (
		(type === "object" || type === undefined) &&
		isRecord(schema.properties) &&
		Object.keys(schema.properties).length > 0
	) {
		return "model";
	}
	return "structured";
}

function isScalar(schema: JsonSchema): boolean {
	if ("anyOf" in schema || "oneOf" in schema) return false;
	if (Array.isArray(schema.enum) || "const" in schema) return true;
	const type = singleType(schema.type);
	return type !== undefined && scalarTypes.has(type);
}

/** The one non-null type a `type` keyword names, if it names exactly one. */
function singleType(type: unknown): string | undefined {
	if (typeof type === "string") return type;
	if (!Array.isArray(type)) return undefined;
	const named = type.filter((entry) => entry !== "null");
	return named.length === 1 && typeof named[0] === "string"
		? named[0]
		: undefined;
}

function isSensitiveString(schema: JsonSchema): boolean {
	return (
		singleType(schema.type) === "string" &&
		(schema.sensitive === true ||
			schema.format === "password" ||
			schema.writeOnly === true)
	);
}

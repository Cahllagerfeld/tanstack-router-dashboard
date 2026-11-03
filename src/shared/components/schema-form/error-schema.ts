import { ErrorSchemaBuilder, type ErrorSchema } from "@rjsf/utils";

type ErrorNode = Record<string, unknown>;

function isNode(value: unknown): value is ErrorNode {
	return typeof value === "object" && value !== null;
}

/** Messages a React Hook Form `FieldError` holds: its `message` and, with `criteriaMode: "all"`, its `types`. */
function ownMessages(node: ErrorNode): string[] {
	const messages = typeof node.message === "string" ? [node.message] : [];
	if (typeof node.type === "string" && isNode(node.types)) {
		for (const entry of Object.values(node.types)) {
			const values = Array.isArray(entry) ? entry : [entry];
			messages.push(
				...values.filter((value): value is string => typeof value === "string")
			);
		}
	}
	return messages;
}

/** Keys of a `FieldError` itself rather than of the property tree below it. */
function isFieldErrorKey(node: ErrorNode, key: string): boolean {
	const isFieldError =
		typeof node.message === "string" || typeof node.type === "string";
	if (!isFieldError) return false;
	if (key === "message") return typeof node.message === "string";
	if (key === "type") return typeof node.type === "string";
	return key === "ref" || key === "types";
}

/** Adds the messages of `node` and everything below it to `builder`, at their paths from the root. */
function collect(
	builder: ErrorSchemaBuilder,
	node: ErrorNode,
	path: string[]
): boolean {
	const messages = ownMessages(node);
	let found = false;

	for (const [key, child] of Object.entries(node)) {
		if (isFieldErrorKey(node, key) || !isNode(child)) continue;
		// React Hook Form keeps an array's own error under `root`.
		if (Array.isArray(node) && key === "root") {
			messages.push(...ownMessages(child));
			continue;
		}
		if (collect(builder, child, [...path, key])) found = true;
	}

	if (messages.length === 0) return found;
	builder.addErrors(messages, path);
	return true;
}

/**
 * Converts React Hook Form's nested errors for a schema-backed value into an rjsf `ErrorSchema`,
 * e.g. `{ path: { message } }` into `{ path: { __errors: [message] } }`.
 * Array errors keep their item indices as keys. Returns `undefined` when there is no message.
 */
export function fieldErrorsToErrorSchema(
	errors: unknown
): ErrorSchema | undefined {
	if (!isNode(errors)) return undefined;
	const builder = new ErrorSchemaBuilder();
	return collect(builder, errors, []) ? builder.ErrorSchema : undefined;
}

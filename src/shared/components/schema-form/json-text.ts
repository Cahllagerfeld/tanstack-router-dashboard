export type JsonText =
	| { kind: "empty" }
	| { kind: "valid"; value: unknown }
	| { kind: "invalid" };

/** Pretty-prints a value for the JSON text field; an unset value is an empty text. */
export function formatJson(value: unknown): string {
	return value === undefined ? "" : JSON.stringify(value, null, 2);
}

/** Parses what a user typed into the JSON text field. Whitespace only counts as empty. */
export function parseJsonText(text: string): JsonText {
	if (text.trim() === "") return { kind: "empty" };
	try {
		return { kind: "valid", value: JSON.parse(text) };
	} catch {
		return { kind: "invalid" };
	}
}

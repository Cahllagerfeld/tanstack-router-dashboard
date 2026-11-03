import {
	isJsonEqual,
	normalizeData,
} from "@/shared/lib/json-schema-form/normalize";

import type {
	Component,
	CreateComponentInput,
	UpdateComponentInput,
} from "../model";
import type { ComponentType } from "../type/model";
import type { ComponentFormValues } from "./schema";

type SavedComponent = Pick<Component, "name" | "configuration">;

/**
 * Form state for a new Component (no `component`) or for editing a stored one.
 * Stored `null`s mean unset, so they drop out: the normalized schema has no null branch to accept them.
 */
export function componentFormValues(
	component?: SavedComponent
): ComponentFormValues {
	return {
		name: component?.name ?? "",
		configuration: normalizeData(component?.configuration ?? {}),
	};
}

/**
 * The create request for validated form values, whose `name` the form schema already trimmed.
 * `flavorName` is the Flavor's `name`, which the backend expects. Unset fields are not sent.
 */
export function buildCreateComponentBody({
	type,
	flavorName,
	values,
}: {
	type: ComponentType;
	flavorName: string;
	values: ComponentFormValues;
}): CreateComponentInput {
	return {
		name: values.name,
		type,
		flavor: flavorName,
		configuration: normalizeData(values.configuration),
	};
}

/**
 * The update request for validated form values, or `null` when nothing changed.
 * Sends `name` only when it changed. Sends the whole `configuration` when it changed, because the backend replaces it.
 */
export function buildUpdateComponentBody({
	saved,
	values,
}: {
	saved: SavedComponent;
	values: ComponentFormValues;
}): UpdateComponentInput["body"] | null {
	const body: UpdateComponentInput["body"] = {};
	if (values.name !== saved.name) body.name = values.name;

	const configuration = normalizeData(values.configuration);
	if (!isJsonEqual(configuration, normalizeData(saved.configuration ?? {})))
		body.configuration = configuration;

	return Object.keys(body).length > 0 ? body : null;
}

/** The message a failed submission shows: the backend's own message, else `fallback`. `undefined` while nothing failed. */
export function submitErrorMessage(
	error: { message: string } | null | undefined,
	fallback: string
): string | undefined {
	if (!error) return undefined;
	return error.message || fallback;
}

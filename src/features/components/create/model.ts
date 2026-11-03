import type { FlowStep } from "../configure/component-flow-layout";
import type { FlavorDetail, FlavorSummary } from "../model";
import type { ComponentType } from "../type/model";

const CREATE_STEPS = ["type", "flavor", "configure"] as const;

export type CreateStep = (typeof CREATE_STEPS)[number];

/** The step a search shows: a missing type picks the type, a missing Flavor picks the Flavor. */
export function createStepFor({
	type,
	flavorId,
}: {
	type: ComponentType | undefined;
	flavorId: string | undefined;
}): CreateStep {
	if (!type) return "type";
	if (!flavorId) return "flavor";
	return "configure";
}

/** Each step's state relative to `current`, in flow order. */
export function createStepStates(
	current: CreateStep
): { step: CreateStep; state: FlowStep["state"] }[] {
	const currentIndex = CREATE_STEPS.indexOf(current);
	return CREATE_STEPS.map((step, index) => ({
		step,
		state:
			index < currentIndex
				? "done"
				: index === currentIndex
					? "current"
					: "upcoming",
	}));
}

/**
 * The Flavor a search may configure: it must exist and belong to the chosen type.
 * Anything else falls back to the Flavor step.
 */
export function selectableFlavorId(
	flavor: Pick<FlavorDetail, "id" | "type"> | undefined,
	type: ComponentType | undefined
): string | undefined {
	return flavor && type && flavor.type === type ? flavor.id : undefined;
}

/** Flavors whose display name or integration contains `query`, ignoring case and surrounding whitespace. */
export function filterFlavors<
	T extends Pick<FlavorSummary, "displayName" | "integration">,
>(flavors: T[], query: string): T[] {
	const needle = query.trim().toLocaleLowerCase();
	if (!needle) return flavors;
	return flavors.filter(
		(flavor) =>
			flavor.displayName.toLocaleLowerCase().includes(needle) ||
			(flavor.integration?.toLocaleLowerCase().includes(needle) ?? false)
	);
}

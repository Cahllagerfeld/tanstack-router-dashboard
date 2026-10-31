import type { ComponentType } from "@/features/components";
import { m } from "@/paraglide/messages";
import { snakeCaseToTitleCase } from "@/shared/lib/strings";

export function getComponentTypeLabel(type?: ComponentType) {
	return type ? snakeCaseToTitleCase(type) : m.components_filter_type();
}

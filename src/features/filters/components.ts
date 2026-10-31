import { m } from "@/paraglide/messages";
import { snakeCaseToTitleCase } from "@/shared/lib/strings";
import type { ComponentType } from "@/types/components";

export function getComponentTypeLabel(type?: ComponentType) {
	return type ? snakeCaseToTitleCase(type) : m.components_filter_type();
}

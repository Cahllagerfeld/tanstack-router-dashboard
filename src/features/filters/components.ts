import { snakeCaseToTitleCase } from "@/lib/strings";
import type { ComponentType } from "@/types/components";

export function getComponentTypeLabel(type?: ComponentType) {
	return type ? snakeCaseToTitleCase(type) : "Type";
}

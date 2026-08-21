import { ComponentType } from "@/types/components";
import { snakeCaseToTitleCase } from "@/lib/strings";

export function getComponentTypeLabel(type?: ComponentType) {
	return type ? snakeCaseToTitleCase(type) : "Type";
}

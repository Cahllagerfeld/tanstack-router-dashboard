import { snakeCaseToTitleCase } from "@/shared/lib/strings";

export const COMPONENT_TYPES = [
	"alerter",
	"annotator",
	"artifact_store",
	"container_registry",
	"data_validator",
	"experiment_tracker",
	"feature_store",
	"image_builder",
	"model_deployer",
	"model_registry",
	"orchestrator",
	"step_operator",
	"deployer",
	"log_store",
	"sandbox",
] as const;

export type ComponentType = (typeof COMPONENT_TYPES)[number];

export function getComponentTypeLabel(type: ComponentType) {
	return snakeCaseToTitleCase(type);
}

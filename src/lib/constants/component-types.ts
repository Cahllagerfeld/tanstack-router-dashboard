import { ComponentType } from "@/types/components";

// generate an array with all possible values from ComponentType
export const COMPONENT_TYPES = [
	"orchestrator",
	"artifact_store",
	"deployer",
	"container_registry",
	"alerter",
	"annotator",
	"data_validator",
	"experiment_tracker",
	"feature_store",
	"image_builder",
	"model_deployer",
	"model_registry",
	"step_operator",
	"log_store",
] as const satisfies ComponentType[];

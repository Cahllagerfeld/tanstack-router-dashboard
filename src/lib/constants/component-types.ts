import { ComponentType } from "@/types/components";

// generate an array with all possible values from ComponentType
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
] as const satisfies ComponentType[];

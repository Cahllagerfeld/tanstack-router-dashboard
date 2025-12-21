import type { ComponentType } from "@/types/components";
import {
	Bell,
	BookOpen,
	Container,
	Database,
	FileText,
	FlaskConical,
	Image as ImageIcon,
	Layers,
	type LucideIcon,
	type LucideProps,
	Pencil,
	Rocket,
	ShieldCheck,
	Workflow,
	Wrench,
} from "lucide-react";

const COMPONENT_TYPE_TO_ICON: Record<ComponentType, LucideIcon> = {
	orchestrator: Workflow,
	artifact_store: Database,
	container_registry: Container,
	step_operator: Wrench,
	experiment_tracker: FlaskConical,
	image_builder: ImageIcon,
	alerter: Bell,
	annotator: Pencil,
	data_validator: ShieldCheck,
	feature_store: Layers,
	model_deployer: Rocket,
	model_registry: BookOpen,
	deployer: Rocket,
	log_store: FileText,
} as const;

export interface ComponentIconProps extends LucideProps {
	type: ComponentType;
}

export function ComponentIcon({ type, ...props }: ComponentIconProps) {
	const Icon = COMPONENT_TYPE_TO_ICON[type];
	return <Icon {...props} />;
}

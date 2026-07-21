import {
	Box,
	FolderKanban,
	History,
	Layers,
	Package,
	Workflow,
	type LucideIcon,
} from "lucide-react";

export type EntityKind =
	"project" | "component" | "stack" | "pipeline" | "run" | "artifact";

export const ENTITY_ICONS = {
	project: FolderKanban,
	component: Box,
	stack: Layers,
	pipeline: Workflow,
	run: History,
	artifact: Package,
} as const satisfies Record<EntityKind, LucideIcon>;

export function getEntityIcon(kind: EntityKind): LucideIcon {
	return ENTITY_ICONS[kind];
}

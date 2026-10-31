import { useState } from "react";

import type { Project } from "@/features/projects";
import { useActiveProject } from "@/hooks/use-active-project";

export function useProjectSwitcher() {
	const [createDialogOpen, setCreateDialogOpen] = useState(false);
	// A snapshot: the confirmation keeps its target if the active Project changes.
	const [projectToDelete, setProjectToDelete] = useState<Project | null>(null);
	const { projects, activeProject } = useActiveProject();

	return {
		projects,
		activeProject,
		createDialogOpen,
		setCreateDialogOpen,
		projectToDelete,
		setProjectToDelete,
	};
}

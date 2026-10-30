import { useState } from "react";

import { useActiveProject } from "@/hooks/use-active-project";

export function useProjectSwitcher() {
	const [createDialogOpen, setCreateDialogOpen] = useState(false);
	const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
	const { projects, activeProject } = useActiveProject();

	return {
		projects,
		activeProject,
		createDialogOpen,
		setCreateDialogOpen,
		deleteDialogOpen,
		setDeleteDialogOpen,
	};
}

import { getEntityIcon } from "@/lib/constants/entity-icons";
import { m } from "@/paraglide/messages";
import { NoItemFallback } from "@/shared/components/no-item-fallback";

import { CreateProjectDialogWithTrigger } from "../create/dialog/create-project-dialog";

export function ProjectListNoItemsFallback() {
	return (
		<NoItemFallback
			icon={getEntityIcon("project")}
			title={m.projects_empty_title()}
			subtitle={m.projects_empty_description()}
			cta={<CreateProjectDialogWithTrigger />}
		/>
	);
}

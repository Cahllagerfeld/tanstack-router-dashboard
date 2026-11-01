import { m } from "@/paraglide/messages";
import { ContentInset } from "@/shared/components/content-inset";
import { TableEmpty } from "@/shared/components/tables/table-empty";
import { getEntityIcon } from "@/shared/lib/entity-icons";

import { CreateProjectDialogWithTrigger } from "../create/create-project-dialog";

export function NoProjectsFallback() {
	return (
		<ContentInset>
			<TableEmpty
				icon={getEntityIcon("project")}
				title={m.projects_empty_title()}
				description={m.projects_empty_description()}
				action={<CreateProjectDialogWithTrigger />}
			/>
		</ContentInset>
	);
}

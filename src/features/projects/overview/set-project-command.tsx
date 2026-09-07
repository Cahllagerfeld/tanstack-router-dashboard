import { Check, Copy } from "lucide-react";

import { useCopy } from "@/hooks/use-copy";
import { m } from "@/paraglide/messages";

export function SetProjectCommand({ projectId }: { projectId: string }) {
	const [copied, copyToClipboard] = useCopy();
	const loginCommand = `zenml project set ${projectId}`;

	return (
		<div className="flex items-center gap-2 truncate text-sm">
			<div className="flex w-full items-center justify-between gap-1 truncate overflow-hidden rounded-md border border-border bg-muted px-2 py-1">
				<code className="truncate">{loginCommand}</code>
				{copied ? (
					<>
						<Check className="size-3 shrink-0 stroke-muted-foreground" />
						<p className="sr-only">{m.projects_copy_success()}</p>
					</>
				) : (
					<button
						className="z-10"
						onClick={() => copyToClipboard(loginCommand)}
					>
						<Copy className="size-3 shrink-0 stroke-muted-foreground" />
						<p className="sr-only">{m.projects_copy_command()}</p>
					</button>
				)}
			</div>
		</div>
	);
}

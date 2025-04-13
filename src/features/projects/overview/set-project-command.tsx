import { useCopy } from "@/hooks/use-copy";
import { Check, Copy } from "lucide-react";

export function SetProjectCommand({ projectId }: { projectId: string }) {
	const { copied, copyToClipboard } = useCopy();
	const loginCommand = `zenml project set ${projectId}`;

	return (
		<div className="flex items-center gap-2 truncate text-sm">
			<div className="flex w-full items-center justify-between gap-1 overflow-hidden truncate rounded-md border border-border bg-muted px-2 py-1">
				<code className="truncate">{loginCommand}</code>
				{copied ? (
					<>
						<Check className="h-3 w-3 shrink-0 stroke-muted-foreground" />
						<p className="sr-only">copied successfully</p>
					</>
				) : (
					<button
						className="z-10"
						onClick={() => copyToClipboard(loginCommand)}
					>
						<Copy className="h-3 w-3 shrink-0 stroke-muted-foreground" />
						<p className="sr-only">Copy tenantUrl</p>
					</button>
				)}
			</div>
		</div>
	);
}

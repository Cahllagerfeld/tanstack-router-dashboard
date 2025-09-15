import { useCopy } from "@/hooks/use-copy";
import { Check, Copy } from "lucide-react";

export function SetProjectCommand({ projectId }: { projectId: string }) {
	const { copied, copyToClipboard } = useCopy();
	const loginCommand = `zenml project set ${projectId}`;

	return (
		<div className="flex items-center gap-2 truncate text-sm">
			<div className="border-border bg-muted flex w-full items-center justify-between gap-1 truncate overflow-hidden rounded-md border px-2 py-1">
				<code className="truncate">{loginCommand}</code>
				{copied ? (
					<>
						<Check className="stroke-muted-foreground size-3 shrink-0" />
						<p className="sr-only">copied successfully</p>
					</>
				) : (
					<button
						className="z-10"
						onClick={() => copyToClipboard(loginCommand)}
					>
						<Copy className="stroke-muted-foreground size-3 shrink-0" />
						<p className="sr-only">Copy tenantUrl</p>
					</button>
				)}
			</div>
		</div>
	);
}

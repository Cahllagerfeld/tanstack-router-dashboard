import { Button } from "@/components/ui/button";
import {
	Empty,
	EmptyContent,
	EmptyDescription,
	EmptyHeader,
	EmptyMedia,
	EmptyTitle,
} from "@/components/ui/empty";
import { m } from "@/paraglide/messages";
import type { ErrorComponentProps } from "@tanstack/react-router";
import { AlertCircle, RefreshCw } from "lucide-react";

export function DefaultErrorPage({ error, reset }: ErrorComponentProps) {
	return (
		<Empty>
			<EmptyHeader className="max-w-md">
				<EmptyMedia
					variant="icon"
					className="bg-destructive/10 text-destructive ring-destructive/20 size-14 rounded-full ring-1"
				>
					<AlertCircle className="size-7" />
				</EmptyMedia>
				<EmptyTitle>{m.common_error_title()}</EmptyTitle>
				<EmptyDescription>
					{m.common_error_try_again_description()}
				</EmptyDescription>
			</EmptyHeader>
			<EmptyContent>
				<div className="border-border text-muted-foreground bg-muted/30 w-full max-w-lg rounded-lg border px-4 py-2 text-left font-mono text-xs">
					{error.message}
				</div>
				<Button onClick={reset}>
					<RefreshCw className="size-4" />
					{m.common_action_try_again()}
				</Button>
			</EmptyContent>
		</Empty>
	);
}

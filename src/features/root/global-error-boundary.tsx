import type { ErrorComponentProps } from "@tanstack/react-router";
import { AlertCircle, RefreshCw } from "lucide-react";

import { m } from "@/paraglide/messages";
import { Button } from "@/shared/components/ui/button";
import {
	Empty,
	EmptyContent,
	EmptyDescription,
	EmptyHeader,
	EmptyMedia,
	EmptyTitle,
} from "@/shared/components/ui/empty";

export function DefaultErrorPage({ error, reset }: ErrorComponentProps) {
	return (
		<Empty>
			<EmptyHeader className="max-w-md">
				<EmptyMedia
					variant="icon"
					className="size-14 rounded-full bg-destructive/10 text-destructive ring-1 ring-destructive/20"
				>
					<AlertCircle className="size-7" />
				</EmptyMedia>
				<EmptyTitle>{m.common_error_title()}</EmptyTitle>
				<EmptyDescription>
					{m.common_error_try_again_description()}
				</EmptyDescription>
			</EmptyHeader>
			<EmptyContent>
				<div className="w-full max-w-lg rounded-lg border border-border bg-muted/30 px-4 py-2 text-left font-mono text-xs text-muted-foreground">
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

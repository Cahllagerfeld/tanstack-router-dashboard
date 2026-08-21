import { Button } from "@/components/ui/button";
import {
	Empty,
	EmptyContent,
	EmptyDescription,
	EmptyHeader,
	EmptyMedia,
	EmptyTitle,
} from "@/components/ui/empty";
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
				<EmptyTitle>Something went wrong</EmptyTitle>
				<EmptyDescription>
					An unexpected error occurred. This has been logged automatically. Try
					again or contact support if the issue persists.
				</EmptyDescription>
			</EmptyHeader>
			<EmptyContent>
				<div className="border-border text-muted-foreground bg-muted/30 w-full max-w-lg rounded-lg border px-4 py-2 text-left font-mono text-xs">
					{error.message}
				</div>
				<Button onClick={reset}>
					<RefreshCw className="size-4" />
					Try again
				</Button>
			</EmptyContent>
		</Empty>
	);
}

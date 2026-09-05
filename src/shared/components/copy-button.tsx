import { Check, Copy } from "lucide-react";

import { m } from "@/paraglide/messages";
import { Button } from "@/shared/components/ui/button";
import { useCopy } from "@/shared/hooks/use-copy";
import { cn } from "@/shared/lib/utils";

interface CopyButtonProps {
	value: string;
	className?: string;
}

export function CopyButton({ value, className }: CopyButtonProps) {
	const [copied, copyToClipboard] = useCopy();

	return (
		<Button
			variant="ghost"
			size="icon"
			className={cn("size-6", className)}
			onClick={() => copyToClipboard(value)}
			aria-label={
				copied ? m.common_action_copy_success() : m.common_action_copy()
			}
		>
			{copied ? (
				<Check className="size-3.5 text-green-500" />
			) : (
				<Copy className="size-3.5" />
			)}
		</Button>
	);
}

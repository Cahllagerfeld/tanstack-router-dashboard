import { Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCopy } from "@/hooks/use-copy";
import { cn } from "@/lib/utils";

interface CopyButtonProps {
	value: string;
	className?: string;
}

export function CopyButton({ value, className }: CopyButtonProps) {
	const { copied, copyToClipboard } = useCopy();

	return (
		<Button
			variant="ghost"
			size="icon"
			className={cn("size-6", className)}
			onClick={() => copyToClipboard(value)}
			aria-label={copied ? "Copied" : "Copy to clipboard"}
		>
			{copied ? (
				<Check className="size-3.5 text-green-500" />
			) : (
				<Copy className="size-3.5" />
			)}
		</Button>
	);
}

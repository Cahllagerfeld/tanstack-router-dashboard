import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SecretValueProps {
	value: string;
	maskLength?: number;
	className?: string;
}

export function SecretValue({
	value,
	maskLength = 8,
	className,
}: SecretValueProps) {
	const [revealed, setRevealed] = useState(false);

	return (
		<div className={cn("flex items-center gap-2", className)}>
			<span className="font-mono text-sm">
				{revealed ? value : "•".repeat(maskLength)}
			</span>
			<Button
				variant="ghost"
				size="icon"
				className="size-6"
				onClick={() => setRevealed(!revealed)}
				aria-label={revealed ? "Hide value" : "Show value"}
			>
				{revealed ? (
					<EyeOff className="size-3.5" />
				) : (
					<Eye className="size-3.5" />
				)}
			</Button>
		</div>
	);
}

import { ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { NotAvailableTag } from "@/components/not-available-tag";
import { SecretValue } from "@/components/secret-value";
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
	isString,
	isNumber,
	isBoolean,
	isArray,
	isObject,
} from "@/lib/type-guards";
import type { ValueRendererProps } from "./types";
import { isSensitiveKey } from "./types";
import { ObjectRenderer } from "./object-renderer";

export function ValueRenderer({
	value,
	keyName,
	depth,
	maxDepth,
}: ValueRendererProps) {
	// Check if this is a sensitive key (keyword-based)
	if (isSensitiveKey(keyName) && isString(value)) {
		return <SecretValue value={value} />;
	}

	// Null/undefined
	if (value === null || value === undefined) {
		return <NotAvailableTag />;
	}

	// Boolean
	if (isBoolean(value)) {
		return (
			<Badge variant={value ? "default" : "secondary"}>
				{value ? "True" : "False"}
			</Badge>
		);
	}

	// String
	if (isString(value)) {
		if (value === "") {
			return <NotAvailableTag />;
		}
		return <span className="break-all font-mono text-sm">{value}</span>;
	}

	// Number
	if (isNumber(value)) {
		return <span className="font-mono text-sm">{value.toLocaleString()}</span>;
	}

	// Array - collapsible
	if (isArray(value)) {
		if (value.length === 0) {
			return (
				<span className="text-muted-foreground text-sm">Empty array</span>
			);
		}

		return (
			<Collapsible defaultOpen={false}>
				<CollapsibleTrigger className="group flex items-center gap-1 text-sm hover:underline">
					<ChevronRight className="size-4 transition-transform group-data-[state=open]:rotate-90" />
					<span className="text-muted-foreground">
						Array ({value.length} {value.length === 1 ? "item" : "items"})
					</span>
				</CollapsibleTrigger>
				<CollapsibleContent className="mt-2">
					<ul className="list-inside list-disc space-y-1 pl-5">
						{value.map((item, i) => (
							<li key={i} className="text-sm">
								<ValueRenderer
									value={item}
									keyName={`${keyName}[${i}]`}
									depth={depth}
									maxDepth={maxDepth}
								/>
							</li>
						))}
					</ul>
				</CollapsibleContent>
			</Collapsible>
		);
	}

	// Nested object - collapsible
	if (isObject(value) && depth < maxDepth) {
		const keys = Object.keys(value);
		if (keys.length === 0) {
			return (
				<span className="text-muted-foreground text-sm">Empty object</span>
			);
		}

		return (
			<Collapsible defaultOpen={false}>
				<CollapsibleTrigger className="group flex items-center gap-1 text-sm hover:underline">
					<ChevronRight className="size-4 transition-transform group-data-[state=open]:rotate-90" />
					<span className="text-muted-foreground">
						Object ({keys.length} {keys.length === 1 ? "key" : "keys"})
					</span>
				</CollapsibleTrigger>
				<CollapsibleContent className="mt-2">
					<ObjectRenderer
						data={value as Record<string, unknown>}
						depth={depth + 1}
						maxDepth={maxDepth}
					/>
				</CollapsibleContent>
			</Collapsible>
		);
	}

	// Fallback for complex values at max depth
	return (
		<span className="text-muted-foreground text-sm">[Complex value]</span>
	);
}

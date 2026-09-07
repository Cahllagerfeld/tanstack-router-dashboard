import {
	isArray,
	isBoolean,
	isNumber,
	isObject,
	isString,
} from "es-toolkit/compat";
import { ChevronRight } from "lucide-react";

import { NotAvailableTag } from "@/components/not-available-tag";
import { SecretValue } from "@/components/secret-value";
import { Badge } from "@/components/ui/badge";
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { m } from "@/paraglide/messages";
import { getLocale } from "@/paraglide/runtime";

import { ObjectRenderer } from "./object-renderer";
import type { ValueRendererProps } from "./types";
import { isSensitiveKey } from "./types";

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
				{value ? m.common_boolean_true() : m.common_boolean_false()}
			</Badge>
		);
	}

	// String
	if (isString(value)) {
		if (value === "") {
			return <NotAvailableTag />;
		}
		return <span className="font-mono text-sm break-all">{value}</span>;
	}

	// Number
	if (isNumber(value)) {
		return (
			<span className="font-mono text-sm">
				{value.toLocaleString(getLocale())}
			</span>
		);
	}

	// Array - collapsible
	if (isArray(value)) {
		if (value.length === 0) {
			return (
				<span className="text-sm text-muted-foreground">
					{m.common_value_empty_array()}
				</span>
			);
		}

		return (
			<Collapsible defaultOpen={false}>
				<CollapsibleTrigger className="group flex items-center gap-1 text-sm hover:underline">
					<ChevronRight className="size-4 transition-transform group-data-[state=open]:rotate-90" />
					<span className="text-muted-foreground">
						{m.common_value_array_count({ count: value.length })}
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
				<span className="text-sm text-muted-foreground">
					{m.common_value_empty_object()}
				</span>
			);
		}

		return (
			<Collapsible defaultOpen={false}>
				<CollapsibleTrigger className="group flex items-center gap-1 text-sm hover:underline">
					<ChevronRight className="size-4 transition-transform group-data-[state=open]:rotate-90" />
					<span className="text-muted-foreground">
						{m.common_value_object_count({ count: keys.length })}
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
		<span className="text-sm text-muted-foreground">
			{m.common_value_complex()}
		</span>
	);
}

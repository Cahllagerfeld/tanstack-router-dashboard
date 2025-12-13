import { cn } from "@/lib/utils";
import { snakeCaseToTitleCase } from "@/lib/strings";
import { NotAvailableTag } from "@/components/not-available-tag";
import { isArray, isObject } from "@/lib/type-guards";
import type { ObjectRendererProps } from "./types";
import { ValueRenderer } from "./value-renderer";

function isComplexValue(value: unknown): boolean {
	return isArray(value) || isObject(value);
}

function sortEntries(entries: [string, unknown][]): [string, unknown][] {
	return entries.sort((a, b) => {
		const aIsComplex = isComplexValue(a[1]);
		const bIsComplex = isComplexValue(b[1]);

		// Simple values come first
		if (aIsComplex !== bIsComplex) {
			return aIsComplex ? 1 : -1;
		}

		// Within same type, sort alphabetically by key
		return a[0].localeCompare(b[0]);
	});
}

export function ObjectRenderer({
	data,
	depth = 0,
	maxDepth = 5,
	className,
}: ObjectRendererProps) {
	const entries = Object.entries(data);

	if (entries.length === 0) {
		return <NotAvailableTag />;
	}

	const sortedEntries = sortEntries(entries);

	return (
		<dl className={cn("space-y-3", depth > 0 && "border-l pl-4", className)}>
			{sortedEntries.map(([key, value]) => (
				<div key={key} className="space-y-1">
					<dt className="text-muted-foreground text-sm font-medium">
						{snakeCaseToTitleCase(key)}
					</dt>
					<dd>
						<ValueRenderer
							value={value}
							keyName={key}
							depth={depth}
							maxDepth={maxDepth}
						/>
					</dd>
				</div>
			))}
		</dl>
	);
}

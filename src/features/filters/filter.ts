import { z } from "zod";

export const FILTER_OPTIONS = [
	"equals",
	"notequals",
	"contains",
	"startswith",
	"endswith",
	"oneof",
	"gte",
	"gt",
	"lte",
	"lt",
	"in",
] as const;

export type FilterOption = (typeof FILTER_OPTIONS)[number];

export type Filter = `${FilterOption}:${string}`;

export function getFilterValue(filter: Filter | string): string {
	const [_, ...rest] = filter.split(":");
	return rest.join(":");
}

export function createFilter(option: FilterOption, value: string) {
	return `${option}:${value}` as Filter;
}

export const filterSchema = z.string().refine(
	(value): value is Filter => {
		const [option, ...rest] = value.split(":");
		return FILTER_OPTIONS.includes(option as FilterOption) && rest.length > 0;
	},
	{
		message:
			"Filter must be in the format 'option:value' where option is one of the valid filter options",
	}
);

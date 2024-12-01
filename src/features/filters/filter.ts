import { COMPONENT_TYPES } from "@/lib/constants/component-types";
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

export const typeFilterSchema = z.enum(COMPONENT_TYPES).optional();

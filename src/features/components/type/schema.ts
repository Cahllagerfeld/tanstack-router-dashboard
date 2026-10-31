import { z } from "zod";

import { COMPONENT_TYPES } from "./model";

export const typeFilterSchema = z.enum(COMPONENT_TYPES).optional();

export const typeFilterFormSchema = z.object({ type: typeFilterSchema });

export type TypeFilterForm = z.infer<typeof typeFilterFormSchema>;

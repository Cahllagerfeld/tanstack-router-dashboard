import { z } from "zod";

import { COMPONENT_TYPES } from "@/features/components";

export const typeFilterSchema = z.enum(COMPONENT_TYPES).optional();

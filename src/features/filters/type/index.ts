import { z } from "zod";

import { COMPONENT_TYPES } from "@/lib/constants/component-types";

export const typeFilterSchema = z.enum(COMPONENT_TYPES).optional();

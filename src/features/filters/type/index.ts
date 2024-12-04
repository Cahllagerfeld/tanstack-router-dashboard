import { COMPONENT_TYPES } from "@/lib/constants/component-types";
import { z } from "zod";

export const typeFilterSchema = z.enum(COMPONENT_TYPES).optional();

import { z } from "zod";

export const urlSchema = z.string().url();

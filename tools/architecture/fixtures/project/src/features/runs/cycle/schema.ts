import type { first } from "@/features/runs/cycle/model";

export const second = (value: typeof first) => value;

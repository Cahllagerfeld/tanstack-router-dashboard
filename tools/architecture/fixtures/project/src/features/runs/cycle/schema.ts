import type { first } from "@/features/runs/cycle/storage";

export const second = (value: typeof first) => value;

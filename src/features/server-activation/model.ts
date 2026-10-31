import type { ApiBody } from "@/shared/api/client";

export type ServerActivationInput = ApiBody<"/api/v1/activate", "put">;

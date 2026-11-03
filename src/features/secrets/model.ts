import type { ApiQuery } from "@/shared/api/client";

/** A listed Secret. Its values stay on the server. */
export type Secret = {
	id: string;
	name: string;
	isPrivate: boolean | undefined;
	creatorName: string | undefined;
	created: Date | undefined;
};

export type SecretListInput = ApiQuery<"/api/v1/secrets">;

export type DeleteSecretInput = {
	secretId: string;
};

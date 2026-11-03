import { apiClient } from "@/shared/api/client";
import { expectData, expectOptionalData } from "@/shared/api/errors";
import { mapPage } from "@/shared/lib/page";

import type { DeleteSecretInput, SecretListInput } from "../model";
import { secretFromApi } from "./map";

export async function fetchSecretList(params: SecretListInput) {
	const response = await apiClient.GET("/api/v1/secrets", {
		params: {
			query: params,
		},
	});
	return mapPage(expectData(response), secretFromApi);
}

export async function deleteSecret({ secretId }: DeleteSecretInput) {
	const response = await apiClient.DELETE("/api/v1/secrets/{secret_id}", {
		params: { path: { secret_id: secretId } },
	});
	expectOptionalData(response);
}

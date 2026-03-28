import { secretFromApi } from "@/domain/secrets";
import { expectData } from "@/lib/fetch-error";
import { apiClient } from "../api-client";

export async function fetchSecretDetail(secretId: string) {
	const response = await apiClient.GET("/api/v1/secrets/{secret_id}", {
		params: {
			path: { secret_id: secretId },
		},
	});
	const data = expectData(response);
	return secretFromApi(data);
}

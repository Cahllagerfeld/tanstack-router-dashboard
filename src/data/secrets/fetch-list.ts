import { secretFromApi } from "@/domain/secrets";
import { expectData } from "@/lib/fetch-error";
import { SecretsListQueryParams } from "@/types/secrets";
import { apiClient } from "../api-client";

export async function fetchSecretList(params: SecretsListQueryParams) {
	const response = await apiClient.GET("/api/v1/secrets", {
		params: {
			query: params,
		},
	});
	const data = expectData(response);

	return {
		...data,
		items: data.items.map(secretFromApi),
	};
}

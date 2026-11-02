import { apiClient } from "@/shared/api/client";
import { expectData } from "@/shared/api/errors";
import { mapPage } from "@/shared/lib/page";

import type { SecretListInput } from "../model";
import { secretFromApi } from "./map";

export async function fetchSecretList(params: SecretListInput) {
	const response = await apiClient.GET("/api/v1/secrets", {
		params: {
			query: params,
		},
	});
	return mapPage(expectData(response), secretFromApi);
}

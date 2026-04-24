import { Secret, secretFromApi } from "@/domain/secrets";
import { expectData, FetchError } from "@/lib/fetch-error";
import { components } from "@/types/core";
import {
	useMutation,
	UseMutationOptions,
	useQueryClient,
} from "@tanstack/react-query";
import { toast } from "sonner";
import { apiClient } from "../../api-client";
import { secretQueries } from "../index";

export type CreateSecretPayload = components["schemas"]["SecretRequest"];

async function createSecretRequest(body: CreateSecretPayload) {
	const response = await apiClient.POST("/api/v1/secrets", {
		body,
	});
	return secretFromApi(expectData(response));
}

export function useCreateSecret(
	options?: UseMutationOptions<Secret, FetchError, CreateSecretPayload, unknown>
) {
	const queryClient = useQueryClient();
	const { onSuccess, onError, ...rest } = options || {};
	return useMutation<Secret, FetchError, CreateSecretPayload, unknown>({
		...rest,
		mutationFn: createSecretRequest,
		onSuccess: (data, variables, onMutateResult, context) => {
			queryClient.invalidateQueries({ queryKey: secretQueries.baseKey });
			toast.success(`Secret "${data.name}" created`);

			onSuccess?.(data, variables, onMutateResult, context);
		},
		onError: (error, variables, onMutateResult, context) => {
			toast.error(error.message);
			onError?.(error, variables, onMutateResult, context);
		},
	});
}

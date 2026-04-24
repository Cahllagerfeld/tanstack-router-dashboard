import { apiClient } from "@/data/api-client";
import { FetchError } from "@/lib/fetch-error";
import {
	useMutation,
	UseMutationOptions,
	useQueryClient,
} from "@tanstack/react-query";
import { toast } from "sonner";
import { secretQueries } from "../index";

interface DeleteSecretParams {
	secretId: string;
}

export async function deleteSecret({ secretId }: DeleteSecretParams) {
	await apiClient.DELETE("/api/v1/secrets/{secret_id}", {
		params: {
			path: {
				secret_id: secretId,
			},
		},
	});
}

export function useDeleteSecret(
	options?: UseMutationOptions<void, FetchError, DeleteSecretParams, unknown>
) {
	const queryClient = useQueryClient();
	const { onSuccess, onError, ...rest } = options || {};
	return useMutation<void, FetchError, DeleteSecretParams, unknown>({
		...rest,
		mutationFn: deleteSecret,
		onSuccess: (data, variables, onMutateResult, context) => {
			queryClient.invalidateQueries({ queryKey: secretQueries.baseKey });
			toast.success("Secret deleted");
			onSuccess?.(data, variables, onMutateResult, context);
		},
		onError: (error, variables, onMutateResult, context) => {
			toast.error(error.message);
			onError?.(error, variables, onMutateResult, context);
		},
	});
}

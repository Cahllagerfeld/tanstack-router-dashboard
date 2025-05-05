import { ServerSettings, ServerSettingsUpdate } from "@/types/server";
import {
	useMutation,
	UseMutationOptions,
	useQueryClient,
} from "@tanstack/react-query";
import { toast } from "sonner";
import { serverQueries } from ".";
import { apiPaths } from "../api";
import { apiClient } from "../api-client";

async function updateServerSettings(payload: ServerSettingsUpdate) {
	const newSettings: ServerSettings = await apiClient(apiPaths.settings, {
		method: "PUT",
		body: JSON.stringify(payload),
	});

	return newSettings;
}

export function useUpdateServerSettings(
	options?: UseMutationOptions<ServerSettings, unknown, ServerSettingsUpdate>
) {
	const queryClient = useQueryClient();
	const { onSuccess, ...rest } = options || {};
	return useMutation({
		...rest,
		mutationFn: updateServerSettings,
		onSuccess: (data, vars, ctx) => {
			queryClient.invalidateQueries({ queryKey: serverQueries.settingsKey });
			queryClient.invalidateQueries({
				queryKey: serverQueries.infoKey,
				type: "all",
			});
			toast.success(`Server settings updated`);
			onSuccess?.(data, vars, ctx);
		},
	});
}

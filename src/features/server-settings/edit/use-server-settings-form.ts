import { zodResolver } from "@hookform/resolvers/zod";
import {
	useMutation,
	useQueryClient,
	useSuspenseQuery,
} from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { m } from "@/paraglide/messages";
import type { ApiClientError } from "@/shared/api/errors";

import { serverSettingsKeys, serverSettingsQueries } from "../data/queries";
import { updateServerSettings } from "../data/requests";
import type { ServerSettings, ServerSettingsUpdateInput } from "../model";
import { buildServerSettingsUpdate, serverSettingsFormValues } from "./model";
import { type ServerSettingsValues, serverSettingsSchema } from "./schema";

export function useServerSettingsForm() {
	const { data: settings } = useSuspenseQuery(serverSettingsQueries.detail());
	const savedValues = serverSettingsFormValues(settings);

	const form = useForm<ServerSettingsValues>({
		resolver: zodResolver(serverSettingsSchema),
		defaultValues: savedValues,
	});

	const queryClient = useQueryClient();
	const { mutate, isPending } = useMutation<
		ServerSettings,
		ApiClientError,
		ServerSettingsUpdateInput
	>({
		mutationFn: updateServerSettings,
		onSuccess: (updated) => {
			queryClient.setQueryData(serverSettingsKeys.all, updated);
			form.reset(serverSettingsFormValues(updated));
			toast.success(m.server_settings_notification_saved());
		},
		onError: (error) => {
			toast.error(error.message || m.server_settings_notification_failed());
		},
	});

	function handleSave(values: ServerSettingsValues) {
		const update = buildServerSettingsUpdate(savedValues, values);
		// Whitespace-only edits trim back to the saved values.
		if (Object.keys(update).length === 0) {
			form.reset(values);
			return;
		}
		mutate(update);
	}

	return { form, handleSave, isPending };
}

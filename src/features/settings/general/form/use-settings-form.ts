import { useUpdateServerSettings } from "@/data/server/update-server-settings";
import { ServerSettingsUpdate } from "@/types/server";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const settingsFormSchema = z.object({
	serverName: z.string().min(1, "Server name needs to be defined"),
	analyticsEnabled: z.boolean(),
});

type SettingsFormSchema = z.infer<typeof settingsFormSchema>;

type Args = {
	defaultValues?: SettingsFormSchema;
};

export function useSettingsForm({
	defaultValues = { serverName: "", analyticsEnabled: false },
}: Args) {
	const form = useForm<SettingsFormSchema>({
		resolver: zodResolver(settingsFormSchema),
		defaultValues,
	});

	const { mutate: updateServerSettings, isPending } = useUpdateServerSettings();

	function handleUpdateServerSettings(data: SettingsFormSchema) {
		const updatedData: ServerSettingsUpdate = {
			server_name: data.serverName,
			enable_analytics: data.analyticsEnabled,
		};

		updateServerSettings(updatedData);
	}

	const isSubmitting = form.formState.isSubmitting || isPending;

	return {
		form,
		handleUpdateServerSettings,
		isSubmitting,
	};
}

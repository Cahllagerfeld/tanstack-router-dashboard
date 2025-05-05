import { useUpdateServerSettings } from "@/data/server/update-server-settings";
import { ServerSettingsUpdate } from "@/types/server";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const settingsFormSchema = z.object({
	serverName: z.string().min(1, "Server name needs to be defined"),
});

type SettingsFormSchema = z.infer<typeof settingsFormSchema>;

type Args = {
	defaultValues?: SettingsFormSchema;
};

export function useSettingsForm({ defaultValues = { serverName: "" } }: Args) {
	const form = useForm<SettingsFormSchema>({
		resolver: zodResolver(settingsFormSchema),
		defaultValues,
	});

	const { mutate: updateServerSettings } = useUpdateServerSettings();

	function handleUpdateServerSettings(data: SettingsFormSchema) {
		const updatedData: ServerSettingsUpdate = {
			server_name: data.serverName,
		};

		updateServerSettings(updatedData);
	}

	return { form, handleUpdateServerSettings };
}

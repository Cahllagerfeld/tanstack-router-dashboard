import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { useSettingsForm } from "./use-settings-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSuspenseQuery } from "@tanstack/react-query";
import { serverQueries } from "@/data/server";

export function GeneralSettingsForm() {
	const { data } = useSuspenseQuery(serverQueries.serverSettings());
	const { form, handleUpdateServerSettings } = useSettingsForm({
		defaultValues: {
			serverName: data.body?.server_name ?? "",
		},
	});

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(handleUpdateServerSettings)}
				className="space-y-4"
			>
				<FormField
					control={form.control}
					name="serverName"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Server Name</FormLabel>
							<FormControl>
								<Input placeholder="Server Name" {...field} />
							</FormControl>
							<FormDescription>
								This is the name of your server.
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				></FormField>
				<div className="flex justify-end">
					<Button type="submit">Update</Button>
				</div>
			</form>
		</Form>
	);
}

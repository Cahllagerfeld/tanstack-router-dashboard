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
import { Switch } from "@/components/ui/switch";

export function GeneralSettingsForm() {
	const { data } = useSuspenseQuery(serverQueries.serverSettings());
	const { form, handleUpdateServerSettings, isSubmitting } = useSettingsForm({
		defaultValues: {
			serverName: data.body?.server_name ?? "",
			analyticsEnabled: data.body?.enable_analytics ?? false,
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
				<FormField
					control={form.control}
					name="analyticsEnabled"
					render={({ field }) => (
						<FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
							<div className="space-y-0.5">
								<FormLabel>Enable Analytics</FormLabel>
								<FormDescription>
									Enable analytics to help us improve the server.
								</FormDescription>
							</div>
							<FormControl>
								<Switch
									checked={field.value}
									onCheckedChange={field.onChange}
								/>
							</FormControl>
						</FormItem>
					)}
				/>
				<div className="flex justify-end">
					<Button disabled={isSubmitting} type="submit">
						{isSubmitting ? "Updating..." : "Update"}
					</Button>
				</div>
			</form>
		</Form>
	);
}

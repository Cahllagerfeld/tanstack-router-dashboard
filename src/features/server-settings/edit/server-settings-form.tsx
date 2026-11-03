import { ImageIcon } from "lucide-react";
import { useId } from "react";
import { Controller } from "react-hook-form";

import { m } from "@/paraglide/messages";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import { Button } from "@/shared/ui/button";
import {
	Field,
	FieldContent,
	FieldDescription,
	FieldError,
	FieldGroup,
	FieldLabel,
	FieldSeparator,
	FieldSet,
} from "@/shared/ui/field";
import { Input } from "@/shared/ui/input";
import { Switch } from "@/shared/ui/switch";

import { useServerSettingsForm } from "./use-server-settings-form";

type ToggleName = "enableAnalytics" | "displayAnnouncements" | "displayUpdates";

/** Edits the server-wide settings; read-only for everyone but admins. */
export function ServerSettingsForm({ canEdit }: { canEdit: boolean }) {
	const id = useId();
	const { form, handleSave, isPending, logo } = useServerSettingsForm();
	const disabled = !canEdit;

	const toggles: { name: ToggleName; label: string; description: string }[] = [
		{
			name: "enableAnalytics",
			label: m.server_settings_analytics_label(),
			description: m.server_settings_analytics_description(),
		},
		{
			name: "displayAnnouncements",
			label: m.server_settings_announcements_label(),
			description: m.server_settings_announcements_description(),
		},
		{
			name: "displayUpdates",
			label: m.server_settings_updates_label(),
			description: m.server_settings_updates_description(),
		},
	];

	return (
		<form
			onSubmit={form.handleSubmit(handleSave)}
			className="flex flex-col gap-6"
		>
			{disabled && (
				<p className="text-sm text-muted-foreground">
					{m.server_settings_admin_only()}
				</p>
			)}
			<FieldSet>
				<FieldGroup>
					<Controller
						name="name"
						control={form.control}
						disabled={disabled}
						render={({ field, fieldState }) => (
							<Field data-invalid={fieldState.invalid}>
								<FieldLabel htmlFor={`${id}-name`}>
									{m.server_settings_name()}
								</FieldLabel>
								<Input
									{...field}
									id={`${id}-name`}
									aria-invalid={fieldState.invalid}
								/>
								{fieldState.invalid && (
									<FieldError errors={[fieldState.error]} />
								)}
							</Field>
						)}
					/>
					<Controller
						name="logoUrl"
						control={form.control}
						disabled={disabled}
						render={({ field, fieldState }) => (
							<Field data-invalid={fieldState.invalid}>
								<FieldLabel htmlFor={`${id}-logo-url`}>
									{m.server_settings_logo_url()}
								</FieldLabel>
								<div className="flex items-center gap-3">
									<Avatar size="lg" className="rounded-lg">
										<AvatarImage
											src={logo.src}
											alt={m.server_settings_logo_preview()}
										/>
										<AvatarFallback>
											{logo.initial ?? <ImageIcon aria-hidden />}
										</AvatarFallback>
									</Avatar>
									<Input
										{...field}
										id={`${id}-logo-url`}
										inputMode="url"
										aria-invalid={fieldState.invalid}
									/>
								</div>
								<FieldDescription>
									{m.server_settings_logo_url_description()}
								</FieldDescription>
								{fieldState.invalid && (
									<FieldError errors={[fieldState.error]} />
								)}
							</Field>
						)}
					/>
					<FieldSeparator />
					{toggles.map((toggle) => (
						<Controller
							key={toggle.name}
							name={toggle.name}
							control={form.control}
							disabled={disabled}
							render={({ field }) => (
								<Field orientation="horizontal">
									<FieldContent>
										<FieldLabel htmlFor={`${id}-${toggle.name}`}>
											{toggle.label}
										</FieldLabel>
										<FieldDescription>{toggle.description}</FieldDescription>
									</FieldContent>
									<Switch
										id={`${id}-${toggle.name}`}
										checked={field.value}
										onCheckedChange={field.onChange}
										onBlur={field.onBlur}
										disabled={field.disabled}
									/>
								</Field>
							)}
						/>
					))}
				</FieldGroup>
			</FieldSet>
			{canEdit && (
				<div className="flex justify-end">
					<Button type="submit" disabled={!form.formState.isDirty || isPending}>
						{m.server_settings_save()}
					</Button>
				</div>
			)}
		</form>
	);
}

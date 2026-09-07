import { CopyButton } from "@/components/copy-button";
import DisplayDate from "@/components/display-date";
import { type KeyValueItem, KeyValueList } from "@/components/key-value-list";
import { NotAvailableTag } from "@/components/not-available-tag";
import { ObjectRenderer } from "@/components/object-renderer";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Component } from "@/domain/components";
import { snakeCaseToTitleCase } from "@/lib/strings";
import { m } from "@/paraglide/messages";

interface ComponentGeneralTabProps {
	component: Component;
}

export function ComponentGeneralTab({ component }: ComponentGeneralTabProps) {
	const {
		type,
		flavor,
		created,
		updated,
		user,
		configuration,
		environment,
		secrets,
	} = component;

	const basicInfoItems: KeyValueItem[] = [
		{
			key: "name",
			label: m.common_label_name(),
			value: component.name,
		},
		{
			key: "id",
			label: m.common_label_id(),
			value: (
				<span className="inline-flex items-center gap-1">
					<code className="rounded bg-muted px-1.5 py-0.5 text-xs">
						{component.id}
					</code>
					<CopyButton value={component.id} />
				</span>
			),
		},
		{
			key: "type",
			label: m.common_label_type(),
			value: type ? (
				<Badge variant="secondary">{snakeCaseToTitleCase(type)}</Badge>
			) : (
				<NotAvailableTag />
			),
		},
		{
			key: "flavor",
			label: m.common_label_flavor(),
			value: flavor ? (
				<div className="flex items-center gap-2">
					{flavor.logoUrl && (
						<img src={flavor.logoUrl} alt={flavor.name} className="size-5" />
					)}
					<span>{flavor.name}</span>
				</div>
			) : (
				<NotAvailableTag />
			),
		},
		{
			key: "created",
			label: m.common_label_created(),
			value: created ? <DisplayDate date={created} /> : <NotAvailableTag />,
		},
		{
			key: "updated",
			label: m.common_label_updated(),
			value: updated ? <DisplayDate date={updated} /> : <NotAvailableTag />,
		},
		{
			key: "user",
			label: m.common_label_created_by(),
			value: user?.name || <NotAvailableTag />,
		},
	];

	const hasConfiguration =
		configuration && Object.keys(configuration).length > 0;

	const hasEnvironment = environment && Object.keys(environment).length > 0;

	const hasSecrets = secrets && secrets.length > 0;

	return (
		<div className="@container">
			<div className="grid gap-6 @3xl:grid-cols-2">
				<Card>
					<CardHeader>
						<CardTitle>{m.components_detail_basic_information()}</CardTitle>
					</CardHeader>
					<CardContent>
						<KeyValueList items={basicInfoItems} />
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle>{m.components_detail_configuration()}</CardTitle>
					</CardHeader>
					<CardContent>
						{hasConfiguration ? (
							<ObjectRenderer data={configuration} />
						) : (
							<p className="text-sm text-muted-foreground">
								{m.components_detail_no_configuration()}
							</p>
						)}
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle>{m.components_detail_environment_variables()}</CardTitle>
					</CardHeader>
					<CardContent>
						{hasEnvironment ? (
							<ObjectRenderer data={environment} />
						) : (
							<p className="text-sm text-muted-foreground">
								{m.components_detail_no_environment_variables()}
							</p>
						)}
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle>{m.components_detail_secret_keys()}</CardTitle>
					</CardHeader>
					<CardContent>
						{hasSecrets ? (
							<ul className="space-y-2">
								{secrets.map((secret) => (
									<li key={secret} className="flex items-center gap-2">
										<code className="rounded bg-muted px-1.5 py-0.5 text-xs">
											{secret}
										</code>
										<span className="text-xs text-muted-foreground">
											{m.components_detail_masked_in_configuration()}
										</span>
									</li>
								))}
							</ul>
						) : (
							<p className="text-sm text-muted-foreground">
								{m.components_detail_no_secrets()}
							</p>
						)}
					</CardContent>
				</Card>
			</div>
		</div>
	);
}

import type { Component } from "@/types/components";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { KeyValueList, type KeyValueItem } from "@/components/key-value-list";
import { ObjectRenderer } from "@/components/object-renderer";
import { CopyButton } from "@/components/copy-button";
import DisplayDate from "@/components/display-date";
import { NotAvailableTag } from "@/components/not-available-tag";
import { Badge } from "@/components/ui/badge";
import { snakeCaseToTitleCase } from "@/lib/strings";

interface ComponentGeneralTabProps {
	component: Component;
}

export function ComponentGeneralTab({ component }: ComponentGeneralTabProps) {
	const { body, metadata, resources } = component;

	const basicInfoItems: KeyValueItem[] = [
		{
			key: "name",
			label: "Name",
			value: component.name,
		},
		{
			key: "id",
			label: "ID",
			value: (
				<span className="inline-flex items-center gap-1">
					<code className="bg-muted rounded px-1.5 py-0.5 text-xs">
						{component.id}
					</code>
					<CopyButton value={component.id} />
				</span>
			),
		},
		{
			key: "type",
			label: "Type",
			value: body?.type ? (
				<Badge variant="secondary">{snakeCaseToTitleCase(body.type)}</Badge>
			) : (
				<NotAvailableTag />
			),
		},
		{
			key: "flavor",
			label: "Flavor",
			value: resources?.flavor ? (
				<div className="flex items-center gap-2">
					{resources.flavor.body?.logo_url && (
						<img
							src={resources.flavor.body.logo_url}
							alt={resources.flavor.name}
							className="size-5"
						/>
					)}
					<span>{resources.flavor.name}</span>
				</div>
			) : (
				<NotAvailableTag />
			),
		},
		{
			key: "integration",
			label: "Integration",
			value: body?.integration || <NotAvailableTag />,
		},
		{
			key: "created",
			label: "Created",
			value: body?.created ? (
				<DisplayDate dateString={body.created} />
			) : (
				<NotAvailableTag />
			),
		},
		{
			key: "updated",
			label: "Updated",
			value: body?.updated ? (
				<DisplayDate dateString={body.updated} />
			) : (
				<NotAvailableTag />
			),
		},
		{
			key: "user",
			label: "Created by",
			value: resources?.user?.name || <NotAvailableTag />,
		},
	];

	const hasConfiguration =
		metadata?.configuration && Object.keys(metadata.configuration).length > 0;

	const hasEnvironment =
		metadata?.environment && Object.keys(metadata.environment).length > 0;

	const hasSecrets = metadata?.secrets && metadata.secrets.length > 0;

	return (
		<div className="@container">
			<div className="grid gap-6 @3xl:grid-cols-2">
				<Card>
					<CardHeader>
						<CardTitle>Basic Information</CardTitle>
					</CardHeader>
					<CardContent>
						<KeyValueList items={basicInfoItems} />
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle>Configuration</CardTitle>
					</CardHeader>
					<CardContent>
						{hasConfiguration ? (
							<ObjectRenderer data={metadata.configuration} />
						) : (
							<p className="text-muted-foreground text-sm">
								No configuration available
							</p>
						)}
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle>Environment Variables</CardTitle>
					</CardHeader>
					<CardContent>
						{hasEnvironment ? (
							<ObjectRenderer data={metadata.environment} />
						) : (
							<p className="text-muted-foreground text-sm">
								No environment variables configured
							</p>
						)}
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle>Secret Keys</CardTitle>
					</CardHeader>
					<CardContent>
						{hasSecrets ? (
							<ul className="space-y-2">
								{metadata.secrets.map((secret) => (
									<li key={secret} className="flex items-center gap-2">
										<code className="bg-muted rounded px-1.5 py-0.5 text-xs">
											{secret}
										</code>
										<span className="text-muted-foreground text-xs">
											(masked in configuration)
										</span>
									</li>
								))}
							</ul>
						) : (
							<p className="text-muted-foreground text-sm">
								No secrets configured
							</p>
						)}
					</CardContent>
				</Card>
			</div>
		</div>
	);
}

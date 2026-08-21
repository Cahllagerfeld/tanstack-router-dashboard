import { CopyButton } from "@/components/copy-button";
import DisplayDate from "@/components/display-date";
import { KeyValueList, type KeyValueItem } from "@/components/key-value-list";
import { NotAvailableTag } from "@/components/not-available-tag";
import { ObjectRenderer } from "@/components/object-renderer";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Component } from "@/domain/components";
import { snakeCaseToTitleCase } from "@/lib/strings";

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
			value: type ? (
				<Badge variant="secondary">{snakeCaseToTitleCase(type)}</Badge>
			) : (
				<NotAvailableTag />
			),
		},
		{
			key: "flavor",
			label: "Flavor",
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
			label: "Created",
			value: created ? <DisplayDate date={created} /> : <NotAvailableTag />,
		},
		{
			key: "updated",
			label: "Updated",
			value: updated ? <DisplayDate date={updated} /> : <NotAvailableTag />,
		},
		{
			key: "user",
			label: "Created by",
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
							<ObjectRenderer data={configuration} />
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
							<ObjectRenderer data={environment} />
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
								{secrets.map((secret) => (
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

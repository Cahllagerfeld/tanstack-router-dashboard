import { m } from "@/paraglide/messages";
import { ContentInset } from "@/shared/components/content-inset";
import { ObjectRenderer } from "@/shared/components/object-renderer";

import type { Component } from "../model";

interface ComponentConfigurationTabProps {
	configuration: Component["configuration"];
}

export function ComponentConfigurationTab({
	configuration,
}: ComponentConfigurationTabProps) {
	const hasConfiguration =
		configuration && Object.keys(configuration).length > 0;

	return (
		<ContentInset>
			{hasConfiguration ? (
				<ObjectRenderer data={configuration} />
			) : (
				<p className="text-sm text-muted-foreground">
					{m.components_detail_no_configuration()}
				</p>
			)}
		</ContentInset>
	);
}

import type { ReactNode } from "react";

import { m } from "@/paraglide/messages";
import { DetailLayout } from "@/shared/components/detail-layout";
import DisplayDate from "@/shared/components/display-date";
import { NotAvailableTag } from "@/shared/components/not-available-tag";
import { snakeCaseToTitleCase } from "@/shared/lib/strings";

import { DeleteComponentAction } from "../delete/delete-component-action";
import type { Component } from "../model";
import { getLabelTags } from "./model";

interface ComponentDetailLayoutProps {
	component: Component;
	stackCount: number;
	children: ReactNode;
}

export function ComponentDetailLayout({
	component,
	stackCount,
	children,
}: ComponentDetailLayoutProps) {
	const { created, creatorName, flavor, id, labels, name, type, updated } =
		component;

	return (
		<DetailLayout
			title={name}
			id={id}
			media={
				flavor?.logoUrl && (
					<img src={flavor.logoUrl} alt="" className="size-7 shrink-0" />
				)
			}
			actions={<DeleteComponentAction component={component} />}
			tags={getLabelTags(labels)}
			facts={[
				{
					label: m.common_label_type(),
					value: type ? snakeCaseToTitleCase(type) : <NotAvailableTag />,
				},
				{
					label: m.common_label_flavor(),
					value: flavor?.name ?? <NotAvailableTag />,
				},
				{
					label: m.common_label_created_by(),
					value: creatorName ?? <NotAvailableTag />,
				},
				{
					label: m.common_label_created(),
					value: created ? (
						<DisplayDate date={created} short />
					) : (
						<NotAvailableTag />
					),
				},
				{
					label: m.common_label_updated(),
					value: updated ? (
						<DisplayDate date={updated} short />
					) : (
						<NotAvailableTag />
					),
				},
			]}
			tabsLabel={m.components_detail_tabs_label()}
			tabs={[
				{
					label: m.components_detail_tab_configuration(),
					to: "/infra/components/$component_id",
					params: { component_id: id },
				},
				{
					label: m.components_detail_tab_stacks(),
					to: "/infra/components/$component_id/stacks",
					params: { component_id: id },
					count: stackCount,
				},
			]}
		>
			{children}
		</DetailLayout>
	);
}

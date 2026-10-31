import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { ReactNode } from "react";
import { expect, test, vi } from "vitest";
import { render } from "vitest-browser-react";
import { page } from "vitest/browser";

import { m } from "@/paraglide/messages";

import type { Component } from "../model";
import { ComponentDetailLayout } from "./component-detail-layout";

vi.mock("@tanstack/react-router", () => ({
	Link: ({
		to,
		params: _params,
		children,
		...props
	}: {
		to: string;
		params: unknown;
		children: ReactNode;
	}) => (
		<a href={to} {...props}>
			{children}
		</a>
	),
	useMatchRoute:
		() =>
		({ to }: { to: string }) =>
			to === "/infra/components/$component_id",
	useNavigate: () => vi.fn(),
}));

const component: Component = {
	id: "component-id",
	name: "local-store",
	type: "artifact_store",
	logoUrl: undefined,
	created: undefined,
	updated: undefined,
	flavor: { id: "flavor-id", name: "local", logoUrl: undefined },
	creatorName: "ada",
	configuration: undefined,
	labels: { team: "platform" },
};

test("shows the identity, facts, labels and stack count", async () => {
	await render(
		<ComponentDetailLayout component={component} stackCount={2}>
			<p>tab body</p>
		</ComponentDetailLayout>
	);

	await expect
		.element(page.getByRole("heading", { name: "local-store" }))
		.toBeVisible();
	await expect
		.element(page.getByText("component-id", { exact: true }))
		.toBeVisible();
	await expect
		.element(page.getByText("Artifact Store", { exact: true }))
		.toBeVisible();
	await expect.element(page.getByText("ada", { exact: true })).toBeVisible();
	await expect
		.element(page.getByText("team: platform", { exact: true }))
		.toBeVisible();
	await expect
		.element(
			page.getByRole("tab", {
				name: `${m.components_detail_tab_stacks()} 2`,
			})
		)
		.toBeVisible();
	await expect.element(page.getByText("tab body")).toBeVisible();
});

test("offers deletion behind a confirmation naming the Component", async () => {
	await render(
		<QueryClientProvider client={new QueryClient()}>
			<ComponentDetailLayout component={component} stackCount={0}>
				<p>tab body</p>
			</ComponentDetailLayout>
		</QueryClientProvider>
	);

	await page
		.getByRole("button", { name: m.components_action_delete() })
		.click();

	await expect
		.element(
			page.getByText(m.components_delete_description({ name: "local-store" }))
		)
		.toBeVisible();

	await page.getByRole("button", { name: m.common_action_cancel() }).click();

	await expect.element(page.getByRole("alertdialog")).not.toBeInTheDocument();
});

test("marks absent facts as unavailable", async () => {
	await render(
		<ComponentDetailLayout
			component={{
				...component,
				type: undefined,
				flavor: undefined,
				creatorName: undefined,
			}}
			stackCount={0}
		>
			<p>tab body</p>
		</ComponentDetailLayout>
	);

	const unavailable = page.getByText(m.common_status_not_available());
	await expect.element(unavailable.first()).toBeVisible();
	expect(unavailable.elements()).toHaveLength(5);
});

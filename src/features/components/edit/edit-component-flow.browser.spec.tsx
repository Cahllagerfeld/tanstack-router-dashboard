import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { ComponentProps } from "react";
import { Suspense } from "react";
import { beforeEach, expect, test, vi } from "vitest";
import { render } from "vitest-browser-react";
import { page } from "vitest/browser";

import { m } from "@/paraglide/messages";

import { componentKeys } from "../data/queries";
import type { Component, FlavorDetail } from "../model";
import { EditComponentFlow } from "./edit-component-flow";

const { navigate, toastError, toastSuccess, updateComponent } = vi.hoisted(
	() => ({
		navigate: vi.fn(),
		toastError: vi.fn(),
		toastSuccess: vi.fn(),
		updateComponent: vi.fn(),
	})
);

vi.mock("../data/requests", async (importOriginal) => ({
	...(await importOriginal<object>()),
	updateComponent,
}));
vi.mock("@tanstack/react-router", () => ({
	Link: ({
		to,
		params: _params,
		...props
	}: ComponentProps<"a"> & { to: string; params?: unknown }) => (
		<a href={to} {...props} />
	),
	useNavigate: () => navigate,
}));
vi.mock("sonner", () => ({
	toast: { error: toastError, success: toastSuccess },
}));

const flavor: FlavorDetail = {
	id: "flavor-id",
	name: "s3",
	displayName: "S3",
	logoUrl: undefined,
	type: "artifact_store",
	integration: "s3",
	isCustom: false,
	docsUrl: undefined,
	configSchema: {
		type: "object",
		properties: {
			path: { type: "string", title: "Path" },
			region: {
				anyOf: [{ type: "string" }, { type: "null" }],
				default: null,
				title: "Region",
			},
			cpus: {
				anyOf: [{ type: "integer" }, { type: "string" }, { type: "null" }],
				default: null,
				title: "Cpus",
			},
		},
		required: ["path"],
	},
};

const component: Component = {
	id: "component-id",
	name: "s3-store",
	type: "artifact_store",
	logoUrl: undefined,
	created: undefined,
	updated: undefined,
	flavor: { id: flavor.id, name: flavor.name, logoUrl: undefined },
	creatorName: undefined,
	configuration: { path: "s3://bucket", region: "eu-central-1" },
	labels: undefined,
};

const backToDetail = {
	to: "/infra/components/$component_id",
	params: { component_id: "component-id" },
};

beforeEach(() => {
	vi.clearAllMocks();
});

function renderFlow(stored: Component = component) {
	const queryClient = new QueryClient({
		defaultOptions: { mutations: { retry: false } },
	});
	queryClient.setQueryData(componentKeys.detail(stored.id), stored);
	queryClient.setQueryData(componentKeys.flavorDetail(flavor.id), flavor);
	return render(
		<QueryClientProvider client={queryClient}>
			<Suspense>
				<EditComponentFlow componentId={stored.id} />
			</Suspense>
		</QueryClientProvider>
	);
}

const nameField = () =>
	page.getByRole("textbox", { name: m.components_configure_name() });
const pathField = () => page.getByRole("textbox", { name: /Path/ });
const saveButton = () =>
	page.getByRole("button", { name: m.components_edit_save() });

test("prefills the stored name and configuration", async () => {
	await renderFlow();

	await expect
		.element(
			page.getByRole("heading", {
				name: m.components_edit_title({ name: "s3-store" }),
			})
		)
		.toBeVisible();
	await expect.element(nameField()).toHaveValue("s3-store");
	await expect.element(pathField()).toHaveValue("s3://bucket");
	await expect
		.element(page.getByRole("textbox", { name: /Region/ }))
		.toHaveValue("eu-central-1");
	await expect.element(saveButton()).toBeDisabled();
	await expect
		.element(page.getByRole("link", { name: m.common_action_cancel() }))
		.toHaveAttribute("href", "/infra/components/$component_id");
	await expect
		.element(
			page.getByRole("navigation", { name: m.components_flow_steps_label() })
		)
		.not.toBeInTheDocument();
});

test("returns to the detail without a request when the edit trims back to the stored values", async () => {
	await renderFlow();

	await nameField().fill("s3-store ");
	await saveButton().click();

	await expect.poll(() => navigate.mock.calls).toEqual([[backToDetail]]);
	expect(updateComponent).not.toHaveBeenCalled();
});

test("saves the whole configuration when a field changed", async () => {
	updateComponent.mockResolvedValue({
		...component,
		configuration: { path: "s3://other", region: "eu-central-1" },
	});
	await renderFlow();

	await pathField().fill("s3://other");
	await saveButton().click();

	await expect
		.poll(() => updateComponent.mock.calls.map(([input]) => input))
		.toEqual([
			{
				componentId: "component-id",
				body: {
					configuration: { path: "s3://other", region: "eu-central-1" },
				},
			},
		]);
	await expect.poll(() => navigate.mock.calls).toEqual([[backToDetail]]);
	expect(toastSuccess).toHaveBeenCalledWith(
		m.components_edit_success({ name: "s3-store" })
	);
});

test("refuses to save while a JSON field holds text that does not parse", async () => {
	updateComponent.mockResolvedValue(component);
	await renderFlow();
	const cpusField = page.getByRole("textbox", { name: /Cpus/ });

	await pathField().fill("s3://other");
	await cpusField.fill('{"invalid JSON":');
	await saveButton().click();

	await expect
		.element(page.getByText(m.schema_form_invalid_json()))
		.toBeVisible();
	expect(updateComponent).not.toHaveBeenCalled();

	await cpusField.fill("4");
	await saveButton().click();

	await expect
		.poll(() => updateComponent.mock.calls.map(([input]) => input))
		.toEqual([
			{
				componentId: "component-id",
				body: {
					configuration: {
						path: "s3://other",
						region: "eu-central-1",
						cpus: 4,
					},
				},
			},
		]);
});

test("keeps the edit and shows the backend error when saving fails", async () => {
	updateComponent.mockRejectedValue(
		new Error("1 validation error for S3Config\npath\n  Invalid path")
	);
	await renderFlow();

	await pathField().fill("not-a-path");
	await saveButton().click();

	await expect
		.element(page.getByText(/1 validation error for S3Config/))
		.toBeVisible();
	await expect.element(pathField()).toHaveValue("not-a-path");
	expect(toastError).toHaveBeenCalledWith(m.components_edit_failed());
	expect(navigate).not.toHaveBeenCalled();
});

test("explains that a Component without its Flavor cannot be edited", async () => {
	await renderFlow({ ...component, flavor: undefined });

	await expect
		.element(page.getByText(m.components_edit_flavor_missing_title()))
		.toBeVisible();
	await expect.element(nameField()).not.toBeInTheDocument();
	await expect
		.element(page.getByRole("link", { name: m.common_action_cancel() }))
		.toHaveAttribute("href", "/infra/components/$component_id");
});

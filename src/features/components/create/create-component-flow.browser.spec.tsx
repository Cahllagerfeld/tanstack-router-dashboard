import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { ComponentProps } from "react";
import { beforeEach, expect, test, vi } from "vitest";
import { render } from "vitest-browser-react";

import { m } from "@/paraglide/messages";
import { FetchError } from "@/shared/api/errors";
import { mapPage } from "@/shared/lib/page";

import { componentQueries } from "../data/queries";
import type { Component, FlavorDetail, FlavorSummary } from "../model";
import type { ComponentType } from "../type/model";
import { CreateComponentFlow } from "./create-component-flow";

const { createComponent, navigate, toastError, toastSuccess } = vi.hoisted(
	() => ({
		createComponent: vi.fn(),
		navigate: vi.fn(),
		toastError: vi.fn(),
		toastSuccess: vi.fn(),
	})
);

vi.mock("../data/requests", async (importOriginal) => ({
	...(await importOriginal<typeof import("../data/requests")>()),
	createComponent,
}));
vi.mock("@tanstack/react-router", () => ({
	Link: ({
		to,
		search,
		...props
	}: ComponentProps<"a"> & { to: string; search?: unknown }) => (
		<a
			href={to}
			data-search={search === undefined ? undefined : JSON.stringify(search)}
			onClick={(event) => event.preventDefault()}
			{...props}
		/>
	),
	useNavigate: () => navigate,
}));
vi.mock("sonner", () => ({
	toast: { error: toastError, success: toastSuccess },
}));

const kubernetes: FlavorSummary = {
	id: "8c7b0c55-5d0e-4a39-9a1d-2a1f4b8b1a01",
	name: "kubernetes",
	displayName: "Kubernetes",
	logoUrl: undefined,
	type: "orchestrator",
	integration: "kubernetes",
	isCustom: false,
};
const docker: FlavorSummary = {
	id: "249b9ee9-4e3a-44d5-9fc2-9622850e5f0a",
	name: "local_docker",
	displayName: "Local Docker",
	logoUrl: undefined,
	type: "orchestrator",
	integration: "built-in",
	isCustom: false,
};
const kubernetesDetail: FlavorDetail = {
	...kubernetes,
	docsUrl: "https://docs.zenml.io/stacks/orchestrators/kubernetes",
	configSchema: {
		type: "object",
		properties: {
			kubernetes_namespace: { type: "string", title: "Kubernetes Namespace" },
		},
		required: ["kubernetes_namespace"],
	},
};

beforeEach(() => {
	vi.clearAllMocks();
});

function page(items: FlavorSummary[]) {
	return mapPage(
		{ index: 1, max_size: 1000, total_pages: 1, total: items.length, items },
		(item) => item
	);
}

async function renderFlow({
	type,
	flavorId,
}: {
	type?: ComponentType;
	flavorId?: string;
}) {
	const queryClient = new QueryClient({
		defaultOptions: { mutations: { retry: false } },
	});
	queryClient.setQueryData(
		componentQueries.flavorList({ type: "orchestrator" }).queryKey,
		page([docker, kubernetes])
	);
	queryClient.setQueryData(
		componentQueries.flavorList({ type: "sandbox" }).queryKey,
		page([])
	);
	queryClient.setQueryData(
		componentQueries.flavorDetail(kubernetes.id).queryKey,
		kubernetesDetail
	);
	const invalidateQueries = vi.spyOn(queryClient, "invalidateQueries");
	const screen = await render(
		<QueryClientProvider client={queryClient}>
			<CreateComponentFlow type={type} flavorId={flavorId} />
		</QueryClientProvider>
	);
	return { invalidateQueries, screen };
}

function searchOf(element: Element) {
	return JSON.parse(element.getAttribute("data-search") ?? "null");
}

test("the Type step links each type to its Flavors and cancels to the list", async () => {
	const { screen } = await renderFlow({});

	await expect
		.element(
			screen
				.getByRole("navigation", { name: m.components_flow_steps_label() })
				.getByRole("listitem")
				.filter({ hasText: m.components_create_step_type() })
		)
		.toHaveAttribute("aria-current", "step");
	const orchestrator = screen.getByRole("link", { name: "Orchestrator" });
	expect(searchOf(orchestrator.element())).toEqual({ type: "orchestrator" });
	await expect
		.element(screen.getByRole("link", { name: m.common_action_cancel() }))
		.toHaveAttribute("href", "/infra/components");
});

test("the Flavor step filters the type's Flavors and links one to the Configure step", async () => {
	const { screen } = await renderFlow({ type: "orchestrator" });

	await expect
		.element(
			screen.getByRole("heading", {
				name: m.components_create_flavor_heading({ type: "Orchestrator" }),
			})
		)
		.toBeVisible();
	await screen
		.getByRole("searchbox", { name: m.components_create_flavor_search() })
		.fill("kube");

	await expect
		.element(screen.getByRole("link", { name: /Local Docker/ }))
		.not.toBeInTheDocument();
	const link = screen.getByRole("link", { name: /Kubernetes/ });
	expect(searchOf(link.element())).toEqual({
		type: "orchestrator",
		flavor: kubernetes.id,
	});
	expect(
		searchOf(
			screen.getByRole("link", { name: m.common_action_back() }).element()
		)
	).toEqual({});
});

test("a type without Flavors says so", async () => {
	const { screen } = await renderFlow({ type: "sandbox" });

	await expect
		.element(screen.getByText(m.components_create_flavor_empty_title()))
		.toBeVisible();
});

test("an incomplete configuration blocks creating the Component", async () => {
	const { screen } = await renderFlow({
		type: "orchestrator",
		flavorId: kubernetes.id,
	});

	await screen
		.getByRole("button", { name: m.components_create_submit() })
		.click();

	await expect
		.element(screen.getByText(m.components_configure_name_required()))
		.toBeVisible();
	await expect
		.element(screen.getByText(m.schema_form_validation_required()))
		.toBeVisible();
	expect(createComponent).not.toHaveBeenCalled();
});

async function fillValidComponent(
	screen: Awaited<ReturnType<typeof renderFlow>>["screen"]
) {
	await screen
		.getByRole("textbox", { name: m.common_label_name() })
		.fill("  k8s ");
	await screen
		.getByRole("textbox", { name: /Kubernetes Namespace/ })
		.fill("zenml");
	await screen
		.getByRole("button", { name: m.components_create_submit() })
		.click();
}

test("a valid configuration creates the Component and opens it", async () => {
	createComponent.mockResolvedValue({
		id: "component-id",
		name: "k8s",
	} satisfies Partial<Component>);
	const { invalidateQueries, screen } = await renderFlow({
		type: "orchestrator",
		flavorId: kubernetes.id,
	});

	await fillValidComponent(screen);

	await expect
		.poll(() => navigate)
		.toHaveBeenCalledWith({
			to: "/infra/components/$component_id",
			params: { component_id: "component-id" },
		});
	expect(createComponent.mock.calls[0]?.[0]).toEqual({
		name: "k8s",
		type: "orchestrator",
		flavor: "kubernetes",
		configuration: { kubernetes_namespace: "zenml" },
	});
	expect(invalidateQueries).toHaveBeenCalledWith({
		queryKey: ["components", "list"],
	});
	expect(toastSuccess).toHaveBeenCalledWith(
		m.components_create_success({ name: "k8s" })
	);
});

test("a rejected configuration keeps the form and shows the backend message", async () => {
	const message = "Invalid configuration:\nkubernetes_namespace: bad value";
	createComponent.mockRejectedValue(
		new FetchError({ status: 422, statusText: "Unprocessable", message })
	);
	const { screen } = await renderFlow({
		type: "orchestrator",
		flavorId: kubernetes.id,
	});

	await fillValidComponent(screen);

	await expect
		.poll(() => screen.getByRole("alert").element().textContent)
		.toContain(message);
	expect(toastError).toHaveBeenCalledWith(m.components_create_failed());
	expect(navigate).not.toHaveBeenCalled();
	await expect
		.element(screen.getByRole("textbox", { name: m.common_label_name() }))
		.toHaveValue("  k8s ");
});

test("Change on the Configure step returns to the Flavor step", async () => {
	const { screen } = await renderFlow({
		type: "orchestrator",
		flavorId: kubernetes.id,
	});

	await screen.getByRole("button", { name: m.common_action_change() }).click();

	expect(navigate).toHaveBeenCalledWith({
		to: "/infra/components/create",
		search: { type: "orchestrator" },
	});
});

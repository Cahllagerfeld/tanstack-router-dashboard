import {
	QueryClient,
	QueryClientProvider,
	QueryObserver,
} from "@tanstack/react-query";
import { beforeEach, expect, onTestFinished, test, vi } from "vitest";
import { render } from "vitest-browser-react";
import { userEvent } from "vitest/browser";

import { m } from "@/paraglide/messages";
import { FetchError } from "@/shared/api/errors";

import { componentKeys, componentQueries } from "../data/queries";
import type { Component } from "../model";
import { DeleteComponentAlert } from "./delete-component-alert";

const { deleteRequest, get, navigate, onClose, toastError, toastSuccess } =
	vi.hoisted(() => ({
		deleteRequest: vi.fn(),
		get: vi.fn(),
		navigate: vi.fn(),
		onClose: vi.fn(),
		toastError: vi.fn(),
		toastSuccess: vi.fn(),
	}));

vi.mock("@/shared/api/client", () => ({
	apiClient: { DELETE: deleteRequest, GET: get },
}));
vi.mock("@tanstack/react-router", () => ({ useNavigate: () => navigate }));
vi.mock("sonner", () => ({
	toast: { error: toastError, success: toastSuccess },
}));

const component: Component = {
	id: "component-id",
	name: "local-store",
	type: "artifact_store",
	logoUrl: undefined,
	created: undefined,
	updated: undefined,
	flavor: undefined,
	creatorName: undefined,
	configuration: undefined,
	labels: undefined,
};

const listParams = { sort_by: "desc:created" };
const deleted = {
	data: undefined,
	error: undefined,
	response: new Response(null, { status: 204 }),
};

beforeEach(() => {
	vi.clearAllMocks();
	navigate.mockResolvedValue(undefined);
});

async function renderDeleteAlert() {
	const queryClient = new QueryClient({
		defaultOptions: { mutations: { retry: false } },
	});
	queryClient.setQueryData(componentQueries.detail(component.id).queryKey, {
		...component,
	});
	queryClient.setQueryData(componentKeys.list(listParams), {
		items: [component],
	});
	// The Detail Screen keeps observing its record until navigation finishes.
	// The stale time only stops the seeded record refetching on subscribe.
	const stopObserving = new QueryObserver(queryClient, {
		...componentQueries.detail(component.id),
		staleTime: Number.POSITIVE_INFINITY,
	}).subscribe(() => {});
	onTestFinished(stopObserving);

	const screen = await render(
		<QueryClientProvider client={queryClient}>
			<DeleteComponentAlert component={component} onClose={onClose} />
		</QueryClientProvider>
	);

	return { queryClient, screen };
}

test("names the Component being deleted without deleting it", async () => {
	const { screen } = await renderDeleteAlert();

	await expect
		.element(
			screen.getByText(m.components_delete_description({ name: "local-store" }))
		)
		.toBeInTheDocument();
	expect(deleteRequest).not.toHaveBeenCalled();
});

test("cancelling closes the alert without deleting the Component", async () => {
	const { screen } = await renderDeleteAlert();

	await screen.getByRole("button", { name: m.common_action_cancel() }).click();

	await expect.poll(() => onClose).toHaveBeenCalledOnce();
	expect(deleteRequest).not.toHaveBeenCalled();
	expect(navigate).not.toHaveBeenCalled();
});

test("confirming deletes the Component, drops its caches and returns to the list", async () => {
	deleteRequest.mockResolvedValue(deleted);
	const { queryClient, screen } = await renderDeleteAlert();

	await screen.getByRole("button", { name: m.common_action_delete() }).click();

	await expect.poll(() => onClose).toHaveBeenCalledOnce();
	expect(deleteRequest.mock.calls[0]?.[1]).toMatchObject({
		params: { path: { component_id: "component-id" } },
	});
	expect(toastSuccess).toHaveBeenCalledWith(m.components_delete_success());
	expect(navigate).toHaveBeenCalledWith({ to: "/infra/components" });
	expect(
		queryClient.getQueryState(componentKeys.list(listParams))
	).toBeUndefined();
	expect(
		queryClient.getQueryState(componentKeys.detail(component.id))
	).toBeUndefined();
});

test("the deleted record is not refetched while its screen is still mounted", async () => {
	deleteRequest.mockResolvedValue(deleted);
	let finishNavigation = () => {};
	navigate.mockReturnValue(
		new Promise<void>((resolve) => {
			finishNavigation = resolve;
		})
	);
	const { queryClient, screen } = await renderDeleteAlert();

	await screen.getByRole("button", { name: m.common_action_delete() }).click();

	await expect.poll(() => navigate).toHaveBeenCalledOnce();
	expect(
		queryClient.getQueryState(componentKeys.list(listParams))
	).toBeUndefined();
	expect(
		queryClient.getQueryData(componentKeys.detail(component.id))
	).toBeDefined();
	expect(get).not.toHaveBeenCalled();
	expect(onClose).not.toHaveBeenCalled();

	finishNavigation();

	await expect.poll(() => onClose).toHaveBeenCalledOnce();
	expect(
		queryClient.getQueryState(componentKeys.detail(component.id))
	).toBeUndefined();
	expect(get).not.toHaveBeenCalled();
});

test("a pending deletion cannot be dismissed or submitted again", async () => {
	let finishDelete = (_result: typeof deleted) => {};
	deleteRequest.mockReturnValue(
		new Promise((resolve) => {
			finishDelete = resolve;
		})
	);
	const { screen } = await renderDeleteAlert();

	await screen.getByRole("button", { name: m.common_action_delete() }).click();

	const pending = screen.getByRole("button", {
		name: m.components_delete_pending(),
	});
	await expect.element(pending).toBeDisabled();

	await userEvent.keyboard("{Escape}");
	await screen.getByRole("button", { name: m.common_action_cancel() }).click();

	expect(onClose).not.toHaveBeenCalled();
	await expect.element(pending).toBeDisabled();
	expect(deleteRequest).toHaveBeenCalledOnce();

	finishDelete(deleted);

	await expect.poll(() => onClose).toHaveBeenCalledOnce();
	expect(deleteRequest).toHaveBeenCalledOnce();
});

test("a rejected deletion keeps the alert usable and shows the API error", async () => {
	const message = "Component is still part of a stack";
	deleteRequest.mockRejectedValueOnce(
		new FetchError({ status: 403, statusText: "Forbidden", message })
	);
	deleteRequest.mockResolvedValueOnce(deleted);
	const { queryClient, screen } = await renderDeleteAlert();

	await screen.getByRole("button", { name: m.common_action_delete() }).click();

	await expect.poll(() => toastError.mock.calls).toEqual([[message]]);
	expect(onClose).not.toHaveBeenCalled();
	expect(navigate).not.toHaveBeenCalled();
	expect(toastSuccess).not.toHaveBeenCalled();
	expect(
		queryClient.getQueryData(componentKeys.list(listParams))
	).toBeDefined();
	expect(
		queryClient.getQueryData(componentKeys.detail(component.id))
	).toBeDefined();

	const retry = screen.getByRole("button", { name: m.common_action_delete() });
	await expect.element(retry).toBeEnabled();
	await retry.click();

	await expect.poll(() => onClose).toHaveBeenCalledOnce();
	expect(deleteRequest).toHaveBeenCalledTimes(2);
});

test("falls back to translated copy when the failure has no message", async () => {
	deleteRequest.mockRejectedValue(new Error(""));
	const { screen } = await renderDeleteAlert();

	await screen.getByRole("button", { name: m.common_action_delete() }).click();

	await expect
		.poll(() => toastError.mock.calls)
		.toEqual([[m.components_delete_failed()]]);
});

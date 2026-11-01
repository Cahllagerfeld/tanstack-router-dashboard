import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import { render } from "vitest-browser-react";
import { page, userEvent } from "vitest/browser";

import { m } from "@/paraglide/messages";
import { FetchError } from "@/shared/api/errors";

import { componentKeys } from "../data/queries";
import { DeleteComponentAlert } from "./delete-component-alert";

const { deleteRequest, onClose, onDeleted, toastError, toastSuccess } =
	vi.hoisted(() => ({
		deleteRequest: vi.fn(),
		onClose: vi.fn(),
		onDeleted: vi.fn(),
		toastError: vi.fn(),
		toastSuccess: vi.fn(),
	}));

vi.mock("@/shared/api/client", () => ({
	apiClient: { DELETE: deleteRequest },
}));
vi.mock("sonner", () => ({
	toast: { error: toastError, success: toastSuccess },
}));

beforeEach(() => {
	vi.clearAllMocks();
});

async function renderDeleteAlert() {
	const queryClient = new QueryClient({
		defaultOptions: { mutations: { retry: false } },
	});
	const screen = await render(
		<QueryClientProvider client={queryClient}>
			<DeleteComponentAlert
				component={{ id: "component-id", name: "local-store" }}
				onDeleted={onDeleted}
				onClose={onClose}
			/>
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
	expect(onDeleted).not.toHaveBeenCalled();
});

const deleted = {
	data: null,
	error: undefined,
	response: new Response(),
};

function deferred<T>() {
	let resolve!: (value: T) => void;
	const promise = new Promise<T>((settle) => {
		resolve = settle;
	});
	return { promise, resolve };
}

test("confirming leaves only after the lists refresh and keeps the detail until it has left", async () => {
	deleteRequest.mockResolvedValue(deleted);
	const { queryClient, screen } = await renderDeleteAlert();
	const detailKey = componentKeys.detail("component-id");
	queryClient.setQueryData(detailKey, { id: "component-id" });
	const listRefresh = deferred<string>();
	const departure = deferred<void>();
	queryClient.setQueryDefaults(componentKeys.lists(), {
		queryFn: () => listRefresh.promise,
	});
	queryClient.setQueryData(componentKeys.list({}), "stale list");
	onDeleted.mockReturnValue(departure.promise);

	await screen.getByRole("button", { name: m.common_action_delete() }).click();

	await expect
		.poll(() => queryClient.isFetching({ queryKey: componentKeys.lists() }))
		.toBe(1);
	expect(onDeleted).not.toHaveBeenCalled();

	listRefresh.resolve("fresh list");

	await expect.poll(() => onDeleted).toHaveBeenCalledOnce();
	expect(queryClient.getQueryData(componentKeys.list({}))).toBe("fresh list");
	expect(queryClient.getQueryData(detailKey)).toBeDefined();

	departure.resolve();

	await expect.poll(() => queryClient.getQueryData(detailKey)).toBeUndefined();
	expect(deleteRequest.mock.calls[0]?.[0]).toBe(
		"/api/v1/components/{component_id}"
	);
	expect(deleteRequest.mock.calls[0]?.[1]).toMatchObject({
		params: { path: { component_id: "component-id" } },
	});
	expect(toastSuccess).toHaveBeenCalledWith(m.components_delete_success());
});

describe("on a desktop viewport", () => {
	const mobileViewport = {
		width: window.innerWidth,
		height: window.innerHeight,
	};

	beforeEach(() => page.viewport(1280, 800));
	afterEach(() => page.viewport(mobileViewport.width, mobileViewport.height));

	test("escape dismisses an idle alert", async () => {
		await renderDeleteAlert();

		await expect.element(page.getByRole("alertdialog")).toBeVisible();
		await userEvent.keyboard("{Escape}");

		await expect.poll(() => onClose).toHaveBeenCalledOnce();
	});

	test("a pending deletion cannot be dismissed", async () => {
		const request = deferred<typeof deleted>();
		deleteRequest.mockReturnValue(request.promise);
		const { screen } = await renderDeleteAlert();

		await screen
			.getByRole("button", { name: m.common_action_delete() })
			.click();
		await expect
			.element(screen.getByRole("button", { name: m.common_action_cancel() }))
			.toBeDisabled();
		await userEvent.keyboard("{Escape}");

		await expect.element(page.getByRole("alertdialog")).toBeVisible();
		expect(onClose).not.toHaveBeenCalled();

		request.resolve(deleted);
		await expect.poll(() => onDeleted).toHaveBeenCalledOnce();
	});
});

test("a failed deletion keeps the alert open and communicates the API error", async () => {
	deleteRequest.mockRejectedValue(
		new FetchError({
			status: 403,
			statusText: "Forbidden",
			message: "Component is still part of a stack",
		})
	);
	const { screen } = await renderDeleteAlert();

	await screen.getByRole("button", { name: m.common_action_delete() }).click();

	await expect
		.poll(() => toastError.mock.calls)
		.toEqual([["Component is still part of a stack"]]);
	expect(onDeleted).not.toHaveBeenCalled();
	await expect
		.element(screen.getByRole("button", { name: m.common_action_delete() }))
		.toBeEnabled();
});

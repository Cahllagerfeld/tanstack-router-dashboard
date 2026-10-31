import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { ReactNode } from "react";
import { beforeEach, expect, test, vi } from "vitest";
import { renderHook } from "vitest-browser-react";

import { sessionQueries } from "../data/queries";
import { useLogoutUser } from "./use-logout-user";

const { get, navigate } = vi.hoisted(() => ({
	get: vi.fn(),
	navigate: vi.fn(),
}));

vi.mock("@/shared/api/client", () => ({ apiClient: { GET: get } }));
vi.mock("@tanstack/react-router", () => ({ useNavigate: () => navigate }));

beforeEach(() => {
	vi.clearAllMocks();
});

async function renderLogout() {
	const queryClient = new QueryClient({
		defaultOptions: { queries: { retry: false }, mutations: { retry: false } },
	});
	const { queryKey } = sessionQueries.currentIdentity();
	queryClient.setQueryData(queryKey, {
		id: "user-id",
		resolvedName: "Ada",
		email: undefined,
		isAdmin: false,
	});
	const { result } = await renderHook(() => useLogoutUser(), {
		wrapper: ({ children }: { children: ReactNode }) => (
			<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
		),
	});

	return {
		logout: () => result.current.mutate(),
		isIdentityStale: () => queryClient.getQueryState(queryKey)?.isInvalidated,
	};
}

test("logging out expires the identity before leaving for the login page", async () => {
	get.mockResolvedValue({
		data: { logged_out: true },
		error: undefined,
		response: new Response(),
	});
	const { logout, isIdentityStale } = await renderLogout();

	logout();

	await expect.poll(() => navigate.mock.calls).toEqual([[{ to: "/login" }]]);
	expect(get).toHaveBeenCalledWith("/api/v1/logout", {});
	expect(isIdentityStale()).toBe(true);
});

test("a failed logout keeps the session and stays on the page", async () => {
	get.mockRejectedValue(new Error("Session unavailable"));
	const { logout, isIdentityStale } = await renderLogout();

	logout();

	await expect.poll(() => get.mock.calls.length).toBe(1);
	await vi.waitFor(() => expect(isIdentityStale()).toBe(false));
	expect(navigate).not.toHaveBeenCalled();
});

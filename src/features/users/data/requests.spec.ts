import { beforeEach, describe, expect, it, vi } from "vitest";

import { m } from "@/paraglide/messages";

import { activateUser, fetchUserList, inviteUser } from "./requests";

const { get, post, put } = vi.hoisted(() => ({
	get: vi.fn(),
	post: vi.fn(),
	put: vi.fn(),
}));

vi.mock("@/shared/api/client", () => ({
	apiClient: { GET: get, POST: post, PUT: put },
}));

describe("inviteUser", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it("creates an inactive user and returns its activation token", async () => {
		post.mockResolvedValue({
			data: {
				id: "user-id",
				name: "ada",
				permission_denied: false,
				body: { activation_token: "secret-token" },
			},
			error: undefined,
			response: new Response(),
		});

		await expect(
			inviteUser({ name: "ada", is_admin: true })
		).resolves.toMatchObject({
			user: { id: "user-id", name: "ada" },
			activationToken: "secret-token",
		});
		expect(post).toHaveBeenCalledWith("/api/v1/users", {
			body: { name: "ada", is_admin: true, full_name: "", active: false },
		});
	});

	it("reports a missing activation token as undefined", async () => {
		post.mockResolvedValue({
			data: { id: "user-id", name: "ada", permission_denied: false },
			error: undefined,
			response: new Response(),
		});

		await expect(
			inviteUser({ name: "ada", is_admin: false })
		).resolves.toMatchObject({ activationToken: undefined });
	});
});

describe("activateUser", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it("activates the user with its token and returns the account", async () => {
		put.mockResolvedValue({
			data: { id: "user-id", name: "ada", permission_denied: false },
			error: undefined,
			response: new Response(),
		});
		const body = { activation_token: "secret-token", password: "password1" };

		await expect(
			activateUser({ userId: "user-id", body })
		).resolves.toMatchObject({ name: "ada" });
		expect(put).toHaveBeenCalledWith(
			"/api/v1/users/{user_name_or_id}/activate",
			{ params: { path: { user_name_or_id: "user-id" } }, body }
		);
	});

	it("rejects an unsuccessful activation response", async () => {
		put.mockResolvedValue({
			data: undefined,
			error: { detail: "Invalid token" },
			response: new Response(null, { status: 401 }),
		});

		await expect(activateUser({ userId: "user-id", body: {} })).rejects.toThrow(
			m.common_error_unwrapping()
		);
	});
});

describe("fetchUserList", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it("requests and maps a filtered user list", async () => {
		get.mockResolvedValue({
			data: {
				index: 1,
				max_size: 10,
				total: 1,
				total_pages: 1,
				items: [{ id: "user-id", name: "ada", permission_denied: true }],
			},
			error: undefined,
			response: new Response(),
		});

		await expect(
			fetchUserList({ name: "contains:ada" })
		).resolves.toMatchObject({
			index: 1,
			total: 1,
			items: [{ id: "user-id", resolvedName: "ada" }],
		});
		expect(get).toHaveBeenCalledWith("/api/v1/users", {
			params: { query: { name: "contains:ada" } },
		});
	});

	it("rejects an unsuccessful list response", async () => {
		get.mockResolvedValue({
			data: undefined,
			error: { detail: "Forbidden" },
			response: new Response(null, { status: 403 }),
		});

		await expect(fetchUserList({})).rejects.toThrow(
			m.common_error_unwrapping()
		);
	});
});

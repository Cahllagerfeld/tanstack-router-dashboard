import { beforeEach, describe, expect, it, vi } from "vitest";

import { m } from "@/paraglide/messages";

import {
	fetchCurrentIdentity,
	loginUserRequest,
	logoutUserRequest,
	updateCurrentUser,
} from "./requests";

const { get, post, put } = vi.hoisted(() => ({
	get: vi.fn(),
	post: vi.fn(),
	put: vi.fn(),
}));

vi.mock("@/shared/api/client", () => ({
	apiClient: { GET: get, POST: post, PUT: put },
}));

describe("loginUserRequest", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it("submits credentials as form data and returns the session", async () => {
		const session = { access_token: "access-token", token_type: "bearer" };
		post.mockResolvedValue({
			data: session,
			error: undefined,
			response: new Response(),
		});

		await expect(
			loginUserRequest({ username: "ada", password: "correct horse" })
		).resolves.toBe(session);

		expect(post).toHaveBeenCalledOnce();
		const [path, options] = post.mock.calls[0]!;
		expect(path).toBe("/api/v1/login");
		expect(options.body.toString()).toBe("username=ada&password=correct+horse");
		// Without this header the client serializes the body as JSON: `{}`.
		expect(options.headers).toEqual({
			"Content-Type": "application/x-www-form-urlencoded",
		});
	});

	it("rejects an API result without a session", async () => {
		post.mockResolvedValue({
			data: undefined,
			error: { detail: "Invalid credentials" },
			response: new Response(null, { status: 401 }),
		});

		await expect(
			loginUserRequest({ username: "ada", password: "wrong" })
		).rejects.toThrow(m.common_error_unwrapping());
	});
});

describe("logoutUserRequest", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it("ends the server session and returns its response", async () => {
		const result = { logged_out: true };
		get.mockResolvedValue({
			data: result,
			error: undefined,
			response: new Response(),
		});

		await expect(logoutUserRequest()).resolves.toBe(result);
		expect(get).toHaveBeenCalledWith("/api/v1/logout", {});
	});

	it("rejects an unsuccessful logout response", async () => {
		get.mockResolvedValue({
			data: undefined,
			error: { detail: "Session unavailable" },
			response: new Response(null, { status: 503 }),
		});

		await expect(logoutUserRequest()).rejects.toThrow(
			m.common_error_unwrapping()
		);
	});
});

describe("fetchCurrentIdentity", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it("fetches and maps the signed-in identity", async () => {
		get.mockResolvedValue({
			data: { id: "user-id", name: "ada", permission_denied: true },
			error: undefined,
			response: new Response(),
		});

		await expect(fetchCurrentIdentity()).resolves.toMatchObject({
			id: "user-id",
			resolvedName: "ada",
		});
		expect(get).toHaveBeenCalledWith("/api/v1/current-user");
	});
});

describe("updateCurrentUser", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it("updates the signed-in account and maps the result", async () => {
		put.mockResolvedValue({
			data: {
				id: "user-id",
				name: "ada",
				permission_denied: false,
				body: {
					created: "2026-08-20T10:00:00",
					updated: "2026-08-21T10:00:00",
					active: true,
					full_name: "Ada King",
					is_service_account: false,
				},
			},
			error: undefined,
			response: new Response(),
		});

		await expect(
			updateCurrentUser({ full_name: "Ada King" })
		).resolves.toMatchObject({ name: "ada", fullName: "Ada King" });
		expect(put).toHaveBeenCalledWith("/api/v1/current-user", {
			body: { full_name: "Ada King" },
		});
	});

	it("rejects a response without the updated account", async () => {
		put.mockResolvedValue({
			data: undefined,
			error: { detail: "Incorrect current password" },
			response: new Response(null, { status: 403 }),
		});

		await expect(
			updateCurrentUser({ old_password: "wrong", password: "new-password" })
		).rejects.toThrow(m.common_error_unwrapping());
	});
});

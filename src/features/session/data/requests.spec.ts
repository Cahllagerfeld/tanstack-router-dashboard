import { beforeEach, describe, expect, it, vi } from "vitest";

import { m } from "@/paraglide/messages";

import {
	fetchCurrentIdentity,
	loginUserRequest,
	logoutUserRequest,
} from "./requests";

const { get, post } = vi.hoisted(() => ({ get: vi.fn(), post: vi.fn() }));

vi.mock("@/shared/api/client", () => ({ apiClient: { GET: get, POST: post } }));

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
		expect(options.body).toBeInstanceOf(URLSearchParams);
		expect(options.body.toString()).toBe("username=ada&password=correct+horse");
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

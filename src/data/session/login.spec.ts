import { beforeEach, describe, expect, it, vi } from "vitest";

import { m } from "@/paraglide/messages";

import { loginUserRequest } from "./login";

const { post } = vi.hoisted(() => ({ post: vi.fn() }));

vi.mock("../api-client", () => ({ apiClient: { POST: post } }));

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

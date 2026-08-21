import { beforeEach, describe, expect, it, vi } from "vitest";
import type { ServerActivation } from "@/types/server";

const { put, loginUserRequest } = vi.hoisted(() => ({
	put: vi.fn(),
	loginUserRequest: vi.fn(),
}));

vi.mock("../api-client", () => ({
	apiClient: { PUT: put },
}));

vi.mock("../session/login", () => ({ loginUserRequest }));

import { activateAndLogin } from "./activate-server";

describe("activateAndLogin", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it("logs in the default admin after activating the server", async () => {
		const activation: ServerActivation = {
			admin_username: "admin",
			admin_password: "password123",
			server_name: "quiet-fox",
		};
		const activationResult = { id: "admin-id" };
		put.mockResolvedValue({
			data: activationResult,
			error: undefined,
			response: new Response(),
		});
		loginUserRequest.mockResolvedValue({
			access_token: "token",
			token_type: "bearer",
		});

		await expect(activateAndLogin(activation)).resolves.toBe(activationResult);

		expect(put).toHaveBeenCalledWith("/api/v1/activate", {
			body: activation,
		});
		expect(loginUserRequest).toHaveBeenCalledWith({
			username: activation.admin_username,
			password: activation.admin_password,
		});
		expect(put.mock.invocationCallOrder[0]).toBeLessThan(
			loginUserRequest.mock.invocationCallOrder[0]
		);
	});

	it("waits for activation before logging in", async () => {
		const activation: ServerActivation = {
			admin_username: "admin",
			admin_password: "password123",
		};
		const activationResult = { id: "admin-id" };
		let resolveActivation!: (value: {
			data: typeof activationResult;
			error: undefined;
			response: Response;
		}) => void;
		put.mockReturnValue(
			new Promise((resolve) => {
				resolveActivation = resolve;
			})
		);

		const activationRequest = activateAndLogin(activation);
		await Promise.resolve();

		expect(loginUserRequest).not.toHaveBeenCalled();
		resolveActivation({
			data: activationResult,
			error: undefined,
			response: new Response(),
		});

		await expect(activationRequest).resolves.toBe(activationResult);
		expect(loginUserRequest).toHaveBeenCalledWith({
			username: activation.admin_username,
			password: activation.admin_password,
		});
	});

	it("does not log in when activation fails", async () => {
		const activation: ServerActivation = {
			admin_username: "admin",
			admin_password: "password123",
		};
		const activationError = new Error("activation failed");
		put.mockRejectedValue(activationError);

		await expect(activateAndLogin(activation)).rejects.toBe(activationError);

		expect(loginUserRequest).not.toHaveBeenCalled();
	});

	it("does not log in when activation creates no default admin", async () => {
		const activation: ServerActivation = { server_name: "quiet-fox" };
		put.mockResolvedValue({
			data: null,
			error: undefined,
			response: new Response(),
		});

		await expect(activateAndLogin(activation)).resolves.toBeNull();

		expect(loginUserRequest).not.toHaveBeenCalled();
	});
});

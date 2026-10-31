import { beforeEach, describe, expect, it, vi } from "vitest";

import type { ServerActivationInput } from "../model";
import { activateAndLogin } from "./use-server-activation";

const { put, loginUserRequest } = vi.hoisted(() => ({
	put: vi.fn(),
	loginUserRequest: vi.fn(),
}));

vi.mock("@/shared/api/client", () => ({
	apiClient: { PUT: put },
}));

vi.mock("@/features/session", () => ({ loginUserRequest }));

describe("activateAndLogin", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it("logs in the default admin after activating the server", async () => {
		const activation: ServerActivationInput = {
			admin_username: "admin",
			admin_password: "password123",
			server_name: "quiet-fox",
		};
		put.mockResolvedValue({
			data: { id: "admin-id" },
			error: undefined,
			response: new Response(),
		});
		loginUserRequest.mockResolvedValue({
			access_token: "token",
			token_type: "bearer",
		});

		await activateAndLogin(activation);

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
		const activation: ServerActivationInput = {
			admin_username: "admin",
			admin_password: "password123",
		};
		let resolveActivation!: (value: {
			data: { id: string };
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
			data: { id: "admin-id" },
			error: undefined,
			response: new Response(),
		});

		await activationRequest;
		expect(loginUserRequest).toHaveBeenCalledWith({
			username: activation.admin_username,
			password: activation.admin_password,
		});
	});

	it("does not log in when activation fails", async () => {
		const activation: ServerActivationInput = {
			admin_username: "admin",
			admin_password: "password123",
		};
		const activationError = new Error("activation failed");
		put.mockRejectedValue(activationError);

		await expect(activateAndLogin(activation)).rejects.toBe(activationError);

		expect(loginUserRequest).not.toHaveBeenCalled();
	});

	it("does not log in when activation creates no default admin", async () => {
		const activation: ServerActivationInput = { server_name: "quiet-fox" };
		put.mockResolvedValue({
			data: null,
			error: undefined,
			response: new Response(),
		});

		await activateAndLogin(activation);

		expect(loginUserRequest).not.toHaveBeenCalled();
	});

	it("rejects when the login after activation fails", async () => {
		const loginError = new Error("login failed");
		put.mockResolvedValue({
			data: { id: "admin-id" },
			error: undefined,
			response: new Response(),
		});
		loginUserRequest.mockRejectedValue(loginError);

		await expect(
			activateAndLogin({
				admin_username: "admin",
				admin_password: "password123",
			})
		).rejects.toBe(loginError);
	});
});

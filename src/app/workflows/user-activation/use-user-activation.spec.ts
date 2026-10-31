import { beforeEach, describe, expect, it, vi } from "vitest";

import type { ActivateUserInput } from "@/features/users";

import { activateAndLogin } from "./use-user-activation";

const { activateUser, loginUserRequest } = vi.hoisted(() => ({
	activateUser: vi.fn(),
	loginUserRequest: vi.fn(),
}));

vi.mock("@/features/users", () => ({ activateUser }));
vi.mock("@/features/session", () => ({ loginUserRequest }));

const input: ActivateUserInput = {
	userId: "user-id",
	body: {
		activation_token: "activation-token",
		password: "password123",
		full_name: "Ada Lovelace",
	},
};

describe("activateAndLogin", () => {
	beforeEach(() => {
		vi.clearAllMocks();
		activateUser.mockResolvedValue({ name: "ada" });
		loginUserRequest.mockResolvedValue({ access_token: "access-token" });
	});

	it("logs in with the name returned by activation", async () => {
		await expect(activateAndLogin(input)).resolves.toEqual({ signedIn: true });

		expect(activateUser).toHaveBeenCalledWith(input);
		expect(loginUserRequest).toHaveBeenCalledWith({
			username: "ada",
			password: "password123",
		});
	});

	it("rejects a failed activation without attempting to log in", async () => {
		const activationError = new Error("token expired");
		activateUser.mockRejectedValue(activationError);

		await expect(activateAndLogin(input)).rejects.toBe(activationError);

		expect(loginUserRequest).not.toHaveBeenCalled();
	});

	it("resolves as not signed in when login fails after activation", async () => {
		loginUserRequest.mockRejectedValue(new Error("login failed"));

		await expect(activateAndLogin(input)).resolves.toEqual({
			signedIn: false,
		});
	});
});

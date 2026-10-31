import { describe, expect, it } from "vitest";

import { buildInviteLink } from "./model";

const origin = "https://dashboard.example.com";

describe("buildInviteLink", () => {
	it("points at the activation page for the invited user", () => {
		expect(
			buildInviteLink({ origin, userId: "user-id", token: "abc123" })
		).toBe(
			"https://dashboard.example.com/activate-user?user=user-id&token=abc123"
		);
	});

	it("keeps reserved characters in the token intact", () => {
		const token = "a+b/c=d&e?f#g h";

		const link = new URL(buildInviteLink({ origin, userId: "user-id", token }));

		expect(link.pathname).toBe("/activate-user");
		expect(link.hash).toBe("");
		expect(link.searchParams.get("user")).toBe("user-id");
		expect(link.searchParams.get("token")).toBe(token);
	});
});

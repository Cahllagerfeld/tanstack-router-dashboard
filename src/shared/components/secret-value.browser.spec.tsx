import { expect, test } from "vitest";
import { render } from "vitest-browser-react";

import { m } from "@/paraglide/messages";

import { SecretValue } from "./secret-value";

test("a user can reveal and hide a secret value", async () => {
	const screen = await render(
		<SecretValue value="super-secret" maskLength={4} />
	);

	await expect.element(screen.getByText("••••")).toBeVisible();

	await screen
		.getByRole("button", { name: m.common_action_show_value() })
		.click();

	await expect.element(screen.getByText("super-secret")).toBeVisible();

	await screen
		.getByRole("button", { name: m.common_action_hide_value() })
		.click();

	await expect.element(screen.getByText("••••")).toBeVisible();
});

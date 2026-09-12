import { expect, test, vi } from "vitest";
import { render } from "vitest-browser-react";

import { m } from "@/paraglide/messages";

import { CopyButton } from "./copy-button";

test("a user can copy a value and receives confirmation", async () => {
	const writeText = vi
		.spyOn(navigator.clipboard, "writeText")
		.mockResolvedValue(undefined);
	const screen = await render(<CopyButton value="pipeline-id" />);

	await screen.getByRole("button", { name: m.common_action_copy() }).click();

	expect(writeText).toHaveBeenCalledWith("pipeline-id");
	await expect
		.element(
			screen.getByRole("button", { name: m.common_action_copy_success() })
		)
		.toBeVisible();
});

import { expect, test } from "vitest";
import { render } from "vitest-browser-react";

import { m } from "@/paraglide/messages";

import { ObjectRenderer } from "./object-renderer";

test("a user can inspect nested values while sensitive values stay masked", async () => {
	const screen = await render(
		<ObjectRenderer
			data={{
				password: "super-secret",
				retries: 3,
				metadata: { region: "eu-central-1" },
			}}
		/>
	);

	await expect.element(screen.getByText("••••••••")).toBeVisible();
	await expect.element(screen.getByText("3")).toBeVisible();
	await expect
		.element(screen.getByText("eu-central-1"))
		.not.toBeInTheDocument();

	await screen
		.getByRole("button", { name: m.common_value_object_count({ count: 1 }) })
		.click();

	await expect.element(screen.getByText("eu-central-1")).toBeVisible();
	await expect
		.element(screen.getByText("super-secret"))
		.not.toBeInTheDocument();
});

test("an empty object communicates that no value is available", async () => {
	const screen = await render(<ObjectRenderer data={{}} />);

	await expect
		.element(screen.getByText(m.common_status_not_available()))
		.toBeVisible();
});

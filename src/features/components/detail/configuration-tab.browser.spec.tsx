import { expect, test } from "vitest";
import { render } from "vitest-browser-react";
import { page } from "vitest/browser";

import { m } from "@/paraglide/messages";

import { ComponentConfigurationTab } from "./configuration-tab";

test("shows the configuration values", async () => {
	await render(
		<ComponentConfigurationTab configuration={{ path: "/tmp/artifacts" }} />
	);

	await expect
		.element(page.getByText("/tmp/artifacts", { exact: true }))
		.toBeVisible();
});

test.each([undefined, {}])(
	"explains when there is no configuration (%o)",
	async (configuration) => {
		await render(<ComponentConfigurationTab configuration={configuration} />);

		await expect
			.element(page.getByText(m.components_detail_no_configuration()))
			.toBeVisible();
	}
);

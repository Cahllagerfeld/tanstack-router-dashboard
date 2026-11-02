import { expect, test, vi } from "vitest";
import { render } from "vitest-browser-react";
import { page } from "vitest/browser";

import { m } from "@/paraglide/messages";

import { ProjectSelect } from "./project-select";

const projects = [
	{ id: "id-1", name: "fraud", displayName: "Fraud Detection" },
	{ id: "id-2", name: "churn", displayName: "Churn Model" },
];

test("shows the selected Project and reports another selection", async () => {
	const onSelect = vi.fn();
	await render(
		<ProjectSelect
			projects={projects}
			value={projects[0]}
			onSelect={onSelect}
			aria-label="Settings project"
		/>
	);

	const trigger = page.getByRole("combobox", { name: "Settings project" });
	await expect.element(trigger.getByText("Fraud Detection")).toBeVisible();

	await trigger.click();
	await page.getByRole("option", { name: "Churn Model" }).click();

	expect(onSelect).toHaveBeenCalledWith(projects[1]);
});

test("asks for a Project when none is selected", async () => {
	await render(
		<ProjectSelect
			projects={projects}
			value={undefined}
			onSelect={vi.fn()}
			aria-label="Settings project"
		/>
	);

	await expect
		.element(
			page
				.getByRole("combobox", { name: "Settings project" })
				.getByText(m.projects_switcher_select())
		)
		.toBeVisible();
});

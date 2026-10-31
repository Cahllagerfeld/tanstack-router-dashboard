import { expect, test } from "vitest";
import { render } from "vitest-browser-react";
import { page } from "vitest/browser";

import { m } from "@/paraglide/messages";

import type { Component } from "../model";
import { ComponentGeneralTab } from "./general-tab";

const component: Component = {
	id: "component-id",
	name: "local-store",
	type: "artifact_store",
	logoUrl: undefined,
	created: undefined,
	updated: undefined,
	flavor: { id: "flavor-id", name: "local", logoUrl: undefined },
	creatorName: "ada",
	configuration: { path: "/tmp/artifacts" },
	environment: {},
	secrets: ["access_token"],
};

test("shows the creator's account name and the available metadata", async () => {
	await render(<ComponentGeneralTab component={component} />);

	await expect.element(page.getByText("ada", { exact: true })).toBeVisible();
	await expect
		.element(page.getByText("access_token", { exact: true }))
		.toBeVisible();
	await expect
		.element(page.getByText(m.components_detail_no_environment_variables()))
		.toBeVisible();
});

test("marks absent optional metadata as unavailable", async () => {
	await render(
		<ComponentGeneralTab
			component={{
				...component,
				type: undefined,
				flavor: undefined,
				creatorName: undefined,
				configuration: undefined,
				environment: undefined,
				secrets: undefined,
			}}
		/>
	);

	const unavailable = page.getByText(m.common_status_not_available());
	await expect.element(unavailable.first()).toBeVisible();
	expect(unavailable.elements()).toHaveLength(5);
	await expect
		.element(page.getByText(m.components_detail_no_configuration()))
		.toBeVisible();
	await expect
		.element(page.getByText(m.components_detail_no_secrets()))
		.toBeVisible();
});

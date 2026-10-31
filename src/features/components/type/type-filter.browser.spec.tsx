import { beforeEach, expect, test, vi } from "vitest";
import { render } from "vitest-browser-react";
import { page } from "vitest/browser";

import { m } from "@/paraglide/messages";

import { TypeFilter } from "./type-filter";

const { navigate } = vi.hoisted(() => ({ navigate: vi.fn() }));

vi.mock("@tanstack/react-router", () => ({
	useNavigate: () => navigate,
}));

beforeEach(() => {
	vi.clearAllMocks();
});

function appliedSearch() {
	const [{ search, replace, to }] = navigate.mock.lastCall as [
		{
			replace: boolean;
			search: (previous: { page: number }) => unknown;
			to: string;
		},
	];
	return { replace, to, search: search({ page: 3 }) };
}

test("labels the trigger with the generic filter name when no type is active", async () => {
	await render(<TypeFilter queryName="type" />);

	await expect
		.element(page.getByRole("button", { name: m.components_filter_type() }))
		.toHaveAttribute("data-state", "inactive");
});

test("a user can apply a Component type", async () => {
	await render(<TypeFilter queryName="type" />);

	await page.getByRole("button", { name: m.components_filter_type() }).click();
	await page.getByRole("combobox").click();
	await page.getByRole("option", { name: "Artifact Store" }).click();
	await page.getByRole("button", { name: m.common_action_apply() }).click();

	expect(appliedSearch()).toEqual({
		replace: true,
		to: ".",
		search: { page: 3, type: "artifact_store" },
	});
});

test("a user can clear the active Component type", async () => {
	await render(<TypeFilter queryName="type" filter="orchestrator" />);

	const trigger = page.getByRole("button", { name: "Orchestrator" });
	await expect.element(trigger).toHaveAttribute("data-state", "active");

	await trigger.click();
	await page.getByRole("button", { name: m.components_filter_clear() }).click();

	expect(appliedSearch()).toEqual({
		replace: true,
		to: ".",
		search: { page: 3, type: undefined },
	});
});

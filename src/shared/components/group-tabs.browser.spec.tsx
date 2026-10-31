import type { ReactNode } from "react";
import { beforeEach, expect, test, vi } from "vitest";
import { render } from "vitest-browser-react";
import { page } from "vitest/browser";

import { GroupTabs } from "./group-tabs";

const { location } = vi.hoisted(() => ({ location: { pathname: "/" } }));

vi.mock("@tanstack/react-router", () => ({
	Link: ({ to, children, ...props }: { to: string; children: ReactNode }) => (
		<a href={to} {...props}>
			{children}
		</a>
	),
	useMatchRoute:
		() =>
		({ to }: { to: string }) =>
			to === location.pathname,
}));

const tabs = [
	{ label: "Stacks", to: "/infra/stacks" },
	{ label: "Components", to: "/infra/components" },
] as const;

beforeEach(() => {
	location.pathname = "/infra/stacks";
});

test("marks the tab of the current page", async () => {
	await render(<GroupTabs label="Infra sections" tabs={[...tabs]} />);

	await expect
		.element(page.getByRole("tab", { name: "Stacks" }))
		.toHaveAttribute("aria-selected", "true");
	await expect
		.element(page.getByRole("tab", { name: "Components" }))
		.toHaveAttribute("href", "/infra/components");
});

test("hides on pages below a tab", async () => {
	location.pathname = "/infra/components/component-id";
	await render(<GroupTabs label="Infra sections" tabs={[...tabs]} />);

	await expect.element(page.getByRole("tablist")).not.toBeInTheDocument();
});

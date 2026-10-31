import type { ReactNode } from "react";
import { beforeEach, expect, test, vi } from "vitest";
import { render } from "vitest-browser-react";
import { page } from "vitest/browser";

import { BreadcrumbsContainer } from "./breadcrumbs";

const IMAGE =
	"data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==";

const { matches } = vi.hoisted(() => ({
	matches: { current: [] as unknown[] },
}));

vi.mock("@tanstack/react-router", async (importOriginal) => ({
	...(await importOriginal<typeof import("@tanstack/react-router")>()),
	Link: ({ to, children, ...props }: { to: string; children: ReactNode }) => (
		<a href={to} {...props}>
			{children}
		</a>
	),
	useMatches: () => matches.current,
}));

beforeEach(() => {
	matches.current = [
		{
			id: "project",
			status: "success",
			fullPath: "/projects/$project_id",
			loaderData: { crumb: "Fraud Detection", crumbImage: IMAGE },
		},
		{
			id: "runs",
			status: "success",
			fullPath: "/projects/$project_id/runs",
			loaderData: { crumb: "Runs" },
		},
	];
});

test("shows a crumb's image next to its link", async () => {
	const screen = await render(<BreadcrumbsContainer />);

	await expect
		.element(screen.getByRole("link", { name: "Fraud Detection" }))
		.toHaveAttribute("href", "/projects/$project_id");
	await expect
		.poll(() => screen.container.querySelectorAll("img").length)
		.toBe(1);
});

test("renders the last crumb as the current page, without an image", async () => {
	await render(<BreadcrumbsContainer />);

	await expect
		.element(page.getByText("Runs"))
		.toHaveAttribute("aria-current", "page");
});

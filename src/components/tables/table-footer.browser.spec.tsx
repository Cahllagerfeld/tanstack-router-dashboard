import type { ReactNode } from "react";
import { expect, test, vi } from "vitest";
import { render } from "vitest-browser-react";
import { page } from "vitest/browser";

import { m } from "@/paraglide/messages";

import { TableFooter } from "./table-footer";

vi.mock("@tanstack/react-router", () => ({
	Link: ({
		search,
		children,
		...props
	}: {
		search: (prev: object) => { page: number };
		children: ReactNode;
	}) => (
		<a href={`?page=${search({}).page}`} {...props}>
			{children}
		</a>
	),
}));

const previous = () =>
	page.getByLabelText(m.common_pagination_previous_label());
const next = () => page.getByLabelText(m.common_pagination_next_label());

test("shows the range and only offers the next page on the first page", async () => {
	await render(
		<TableFooter page={{ index: 1, max_size: 20, total: 45, total_pages: 3 }} />
	);

	await expect
		.element(
			page.getByText(
				m.common_table_range({ start: "1", end: "20", total: "45" })
			)
		)
		.toBeInTheDocument();
	await expect.element(previous()).toBeDisabled();
	await expect.element(next()).toHaveAttribute("href", "?page=2");
});

test("only offers the previous page on the last page", async () => {
	await render(
		<TableFooter page={{ index: 3, max_size: 20, total: 45, total_pages: 3 }} />
	);

	await expect.element(previous()).toHaveAttribute("href", "?page=2");
	await expect.element(next()).toBeDisabled();
});

test("renders nothing for an empty list", async () => {
	const screen = await render(
		<TableFooter page={{ index: 1, max_size: 20, total: 0, total_pages: 0 }} />
	);

	expect(
		screen.container.querySelector('[data-slot="table-footer"]')
	).toBeNull();
});

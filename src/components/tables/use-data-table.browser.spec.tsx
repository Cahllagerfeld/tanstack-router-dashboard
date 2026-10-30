import type { ColumnDef } from "@tanstack/react-table";
import { expect, test } from "vitest";
import { render } from "vitest-browser-react";
import { page } from "vitest/browser";

import { DataTableViewOptions } from "@/components/tables/columns-visibility-toggle";
import { DataTable } from "@/components/tables/data-table";
import type { DataTableFeatures } from "@/components/tables/data-table-features";
import { Checkbox } from "@/components/ui/checkbox";
import { m } from "@/paraglide/messages";

import { useDataTable } from "./use-data-table";

type Row = { id: string; name: string; owner: string };

const columns: ColumnDef<DataTableFeatures, Row>[] = [
	{
		id: "select",
		enableResizing: false,
		cell: ({ row }) => (
			<Checkbox
				aria-label={`Select ${row.original.name}`}
				checked={row.getIsSelected()}
				onCheckedChange={(checked) => row.toggleSelected(checked)}
			/>
		),
	},
	{ id: "name", header: "Name", accessorKey: "name" },
	{
		id: "owner",
		header: "Owner",
		accessorKey: "owner",
		enableHiding: true,
	},
];

const rows: Row[] = [
	{ id: "1", name: "fraud", owner: "ada" },
	{ id: "2", name: "churn", owner: "lin" },
];

function Fixture({
	data = rows,
	defaultColumn,
}: {
	data?: Row[];
	defaultColumn?: { size: number };
}) {
	const table = useDataTable({ data, columns, defaultColumn });

	return (
		<>
			<DataTableViewOptions table={table} />
			<DataTable table={table} />
		</>
	);
}

function header(name: string) {
	return page.getByRole("table").getByText(name, { exact: true });
}

function headerWidth(name: string) {
	return header(name).element().closest("th")?.style.width;
}

test("hides and restores an optional column", async () => {
	await render(<Fixture />);
	await expect.element(header("Owner")).toBeInTheDocument();

	await page.getByRole("button", { name: m.common_table_columns() }).click();
	await page.getByRole("menuitemcheckbox", { name: "Owner" }).click();
	await expect.element(header("Owner")).not.toBeInTheDocument();

	await page.getByRole("menuitemcheckbox", { name: "Owner" }).click();
	await expect.element(header("Owner")).toBeInTheDocument();
});

test("selects rows by id and keeps the selection when the data refreshes", async () => {
	const screen = await render(<Fixture />);

	await page.getByRole("checkbox", { name: "Select churn" }).click();
	await expect
		.element(page.getByRole("row", { name: /churn/ }))
		.toHaveAttribute("data-state", "selected");

	await screen.rerender(
		<Fixture data={[{ id: "2", name: "churn-renamed", owner: "lin" }]} />
	);

	await expect
		.element(page.getByRole("row", { name: /churn-renamed/ }))
		.toHaveAttribute("data-state", "selected");
});

test("resizes a column from its header handle", async () => {
	await render(<Fixture />);
	await expect.element(header("Name")).toBeInTheDocument();
	expect(headerWidth("Name")).toBe("200px");

	const handle = page
		.getByRole("table")
		.getByRole("separator")
		.first()
		.element();
	const { left: clientX } = handle.getBoundingClientRect();
	handle.dispatchEvent(new MouseEvent("mousedown", { bubbles: true, clientX }));
	document.dispatchEvent(
		new MouseEvent("mousemove", { clientX: clientX + 50 })
	);
	document.dispatchEvent(new MouseEvent("mouseup", { clientX: clientX + 50 }));

	await expect.poll(() => headerWidth("Name")).toBe("250px");
});

test("lets a table override the default column size", async () => {
	await render(<Fixture defaultColumn={{ size: 160 }} />);
	await expect.element(header("Owner")).toBeInTheDocument();

	expect(headerWidth("Owner")).toBe("160px");
});

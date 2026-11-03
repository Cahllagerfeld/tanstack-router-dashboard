import type { ColumnDef } from "@tanstack/react-table";
import { expect, test } from "vitest";
import { render } from "vitest-browser-react";
import { page } from "vitest/browser";

import { m } from "@/paraglide/messages";
import { DataTableViewOptions } from "@/shared/components/tables/columns-visibility-toggle";
import { DataTable } from "@/shared/components/tables/data-table";
import type { DataTableFeatures } from "@/shared/components/tables/data-table-features";
import {
	actionsColumn,
	selectColumn,
} from "@/shared/components/tables/edge-columns";
import { Checkbox } from "@/shared/ui/checkbox";

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
		<div style={{ width: tableWidth }}>
			<DataTableViewOptions table={table} />
			<DataTable table={table} empty={null} />
		</div>
	);
}

/** The table's minimum width, so every fixture fills the same space. */
const tableWidth = 800;

function header(name: string) {
	return page.getByRole("table").getByText(name, { exact: true });
}

function headerWidth(name: string) {
	return Number.parseFloat(
		header(name).element().closest("th")?.style.width ?? ""
	);
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
	// The fixed 200px selection column leaves 600px for Name and Owner.
	await expect.poll(() => headerWidth("Name")).toBe(300);

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

	// Name grows to 250 of the 450 flexible size, Owner keeps the rest.
	await expect.poll(() => headerWidth("Name")).toBeCloseTo(333.33);
	expect(headerWidth("Owner")).toBeCloseTo(266.67);
});

test("lets a table override the default column size", async () => {
	await render(<Fixture defaultColumn={{ size: 160 }} />);
	await expect.element(header("Owner")).toBeInTheDocument();

	// The selection column has no size of its own and cannot resize.
	const select = page.getByRole("row").first().element().querySelector("th");
	expect(select?.style.width).toBe("160px");
});

type Named = { id: string; name: string };

function EdgeFixture() {
	const table = useDataTable<Named>({
		data: [{ id: "1", name: "fraud" }],
		columns: [
			selectColumn(),
			{ id: "name", header: "Name", accessorKey: "name" },
			actionsColumn(() => <button type="button">Actions</button>),
		],
	});

	return (
		<div style={{ width: tableWidth + 32 }}>
			<DataTable table={table} empty={null} />
		</div>
	);
}

test("keeps selection first and actions last at their own widths", async () => {
	await render(<EdgeFixture />);
	await expect.element(header("Name")).toBeInTheDocument();

	const widths = () =>
		[...page.getByRole("row").first().element().querySelectorAll("th")].map(
			(th) => th.style.width
		);

	// Only the flexible Name column absorbs the 832px table's spare width.
	await expect.poll(widths).toEqual(["48px", "704px", "80px"]);
	expect(
		page.getByRole("row").last().element().lastElementChild?.textContent
	).toBe("Actions");
});

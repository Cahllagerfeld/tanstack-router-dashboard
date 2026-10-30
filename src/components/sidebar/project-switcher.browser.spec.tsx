import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { ComponentProps } from "react";
import { beforeEach, expect, test, vi } from "vitest";
import { render } from "vitest-browser-react";
import { page } from "vitest/browser";

import { projectQueries } from "@/data/projects";
import { m } from "@/paraglide/messages";

import { RailProjectSwitcher } from "./project-switcher";

const { params } = vi.hoisted(() => ({
	params: { current: undefined as { project_id: string } | undefined },
}));

vi.mock("@tanstack/react-router", () => ({
	Link: ({
		to,
		params,
		onClick,
		...props
	}: ComponentProps<"a"> & {
		to: string;
		params: { project_id: string };
	}) => (
		<a
			href={to.replace("$project_id", params.project_id)}
			onClick={(event) => {
				event.preventDefault();
				onClick?.(event);
			}}
			{...props}
		/>
	),
	useNavigate: () => vi.fn(),
	useParams: () => params.current,
}));

const projects = [
	{ id: "id-1", name: "fraud", displayName: "Fraud Detection" },
	{ id: "id-2", name: "churn", displayName: "Churn Model" },
];

beforeEach(() => {
	vi.clearAllMocks();
	localStorage.clear();
	params.current = { project_id: "fraud" };
});

function renderSwitcher(items: typeof projects = projects) {
	const queryClient = new QueryClient({
		defaultOptions: { queries: { staleTime: Infinity } },
	});
	queryClient.setQueryData(projectQueries.list().queryKey, { items } as never);

	return render(
		<QueryClientProvider client={queryClient}>
			<RailProjectSwitcher />
		</QueryClientProvider>
	);
}

function switcherTrigger(name: string) {
	return page.getByRole("button", {
		name: m.projects_switcher_label({ name }),
	});
}

test("links each Project to its default page and closes on selection", async () => {
	await renderSwitcher();

	await switcherTrigger("Fraud Detection").click();
	const churn = page.getByRole("menuitem", { name: "Churn Model" });
	await expect.element(churn).toHaveAttribute("href", "/projects/churn/runs");

	await churn.click();

	await expect.element(churn).not.toBeInTheDocument();
});

test("shows the last opened Project outside of a Project route", async () => {
	params.current = undefined;
	localStorage.setItem("zenml.projects.selected", "id-2");

	await renderSwitcher();

	await expect.element(switcherTrigger("Churn Model")).toBeInTheDocument();
});

test("deletes the active Project after confirmation", async () => {
	await renderSwitcher();

	await switcherTrigger("Fraud Detection").click();
	await page
		.getByRole("menuitem", { name: m.projects_navigation_delete() })
		.click();

	await expect
		.element(
			page
				.getByRole("dialog", { name: m.projects_delete_title() })
				.getByText(m.projects_delete_description())
		)
		.toBeInTheDocument();
});

test("offers creating a Project even when none exist", async () => {
	params.current = undefined;
	await renderSwitcher([]);

	await page
		.getByRole("button", { name: m.projects_switcher_select() })
		.click();
	await page.getByRole("menuitem", { name: m.projects_create_title() }).click();

	await expect
		.element(page.getByRole("dialog", { name: m.projects_create_title() }))
		.toBeInTheDocument();
});

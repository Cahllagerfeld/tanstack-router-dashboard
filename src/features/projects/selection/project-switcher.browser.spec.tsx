import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { ComponentProps } from "react";
import { beforeEach, expect, test, vi } from "vitest";
import { render } from "vitest-browser-react";
import { page } from "vitest/browser";

import { m } from "@/paraglide/messages";

import { projectQueries } from "../data/queries";
import { RailProjectSwitcher } from "./project-switcher";

type ProjectMatch = {
	status: string;
	loaderData?: { project: (typeof projects)[number] };
};

const { getRequest, match } = vi.hoisted(() => ({
	getRequest: vi.fn(),
	match: { current: undefined as ProjectMatch | undefined },
}));

vi.mock("@/shared/api/client", () => ({ apiClient: { GET: getRequest } }));

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
	useMatch: () => match.current,
	useNavigate: () => vi.fn(),
}));

const projects = [
	{ id: "id-1", name: "fraud", displayName: "Fraud Detection" },
	{ id: "id-2", name: "churn", displayName: "Churn Model" },
];

beforeEach(() => {
	vi.clearAllMocks();
	localStorage.clear();
	match.current = routeMatch(projects[0]!);
});

function routeMatch(project: (typeof projects)[number]) {
	return { status: "success", loaderData: { project } };
}

function renderSwitcher(items: typeof projects = projects) {
	const queryClient = new QueryClient({
		defaultOptions: { queries: { staleTime: Infinity } },
	});
	queryClient.setQueryData(projectQueries.allList().queryKey, {
		items,
	} as never);
	const ui = () => (
		<QueryClientProvider client={queryClient}>
			<RailProjectSwitcher />
		</QueryClientProvider>
	);

	return { queryClient, ui, screen: render(ui()) };
}

function switcherTrigger(name: string) {
	return page.getByRole("button", {
		name: m.projects_switcher_label({ name }),
	});
}

test("links each Project to its default page and closes on selection", async () => {
	await renderSwitcher().screen;

	await switcherTrigger("Fraud Detection").click();
	const churn = page.getByRole("menuitem", { name: "Churn Model" });
	await expect.element(churn).toHaveAttribute("href", "/projects/churn/runs");

	await churn.click();

	await expect.element(churn).not.toBeInTheDocument();
});

test("shows the last opened Project outside of a Project route", async () => {
	match.current = undefined;
	localStorage.setItem("zenml.projects.selected", "id-2");

	await renderSwitcher().screen;

	await expect.element(switcherTrigger("Churn Model")).toBeInTheDocument();
});

function expectDeleteTarget(name: string) {
	return expect
		.element(
			page
				.getByRole("dialog", { name: m.projects_delete_title() })
				.getByText(m.projects_delete_description({ name }))
		)
		.toBeInTheDocument();
}

function openDeleteDialog(name: string) {
	return switcherTrigger(name)
		.click()
		.then(() =>
			page
				.getByRole("menuitem", { name: m.projects_navigation_delete() })
				.click()
		);
}

test("confirms deletion of the active Project by name", async () => {
	await renderSwitcher().screen;

	await openDeleteDialog("Fraud Detection");

	await expectDeleteTarget("Fraud Detection");
});

test("targets the Project in the URL when the list does not contain it", async () => {
	match.current = routeMatch({
		id: "id-3",
		name: "older",
		displayName: "Older",
	});
	await renderSwitcher().screen;

	await openDeleteDialog("Older");

	await expectDeleteTarget("Older");
});

test("keeps the deletion target when the active Project changes", async () => {
	const { screen, ui } = renderSwitcher();
	await screen;
	await openDeleteDialog("Fraud Detection");

	match.current = routeMatch(projects[1]!);
	(await screen).rerender(ui());

	await expect
		.element(
			page.getByRole("button", {
				name: m.projects_switcher_label({ name: "Churn Model" }),
				includeHidden: true,
			})
		)
		.toBeInTheDocument();
	await expectDeleteTarget("Fraud Detection");
});

test.each(["pending", "notFound", "error"])(
	"offers no deletion but keeps Projects reachable when the route is %s",
	async (status) => {
		localStorage.setItem("zenml.projects.selected", "id-2");
		match.current = { status };
		await renderSwitcher().screen;

		await page
			.getByRole("button", { name: m.projects_switcher_select() })
			.click();

		await expect
			.element(page.getByRole("menuitem", { name: "Churn Model" }))
			.toHaveAttribute("href", "/projects/churn/runs");
		await expect
			.element(
				page.getByRole("menuitem", { name: m.projects_navigation_delete() })
			)
			.not.toBeInTheDocument();
	}
);

test("does not replace the last opened Project after a failed list refresh", async () => {
	match.current = undefined;
	localStorage.setItem("zenml.projects.selected", "id-3");
	getRequest.mockRejectedValue(new Error("refresh failed"));
	const { queryClient, screen } = renderSwitcher();
	await screen;

	await queryClient.refetchQueries({
		queryKey: projectQueries.allList().queryKey,
	});

	await page
		.getByRole("button", { name: m.projects_switcher_select() })
		.click();
	await expect
		.element(
			page.getByRole("menuitem", { name: m.projects_navigation_delete() })
		)
		.not.toBeInTheDocument();
});

test("offers creating a Project even when none exist", async () => {
	match.current = undefined;
	await renderSwitcher([]).screen;

	await page
		.getByRole("button", { name: m.projects_switcher_select() })
		.click();
	await page.getByRole("menuitem", { name: m.projects_create_title() }).click();

	await expect
		.element(page.getByRole("dialog", { name: m.projects_create_title() }))
		.toBeInTheDocument();
});

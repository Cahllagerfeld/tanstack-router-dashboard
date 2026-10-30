import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { ReactNode } from "react";
import { beforeEach, expect, test, vi } from "vitest";
import { render } from "vitest-browser-react";
import { page } from "vitest/browser";

import { projectQueries } from "@/data/projects";
import { userQueries } from "@/data/user";
import { m } from "@/paraglide/messages";

import { AppRail } from "./app-rail";

type ProjectMatch = {
	status: string;
	loaderData?: { project: (typeof projects)[number] };
};

const { location, match } = vi.hoisted(() => ({
	location: { pathname: "/infra/components" },
	match: { current: undefined as ProjectMatch | undefined },
}));

vi.mock("@tanstack/react-router", () => ({
	Link: ({ to, children, ...props }: { to: string; children: ReactNode }) => (
		<a href={to} {...props}>
			{children}
		</a>
	),
	useLocation: () => location,
	useMatch: () => match.current,
	useNavigate: () => vi.fn(),
	useRouter: () => ({
		buildLocation: ({
			to,
			params,
		}: {
			to: string;
			params: { project_id: string };
		}) => ({ pathname: to.replace("$project_id", params.project_id) }),
	}),
}));
vi.mock("@/data/session/logout", () => ({
	useLogoutUser: () => ({ mutate: vi.fn() }),
}));

const projects = [
	{ id: "id-1", name: "fraud", displayName: "Fraud Detection" },
	{ id: "id-2", name: "churn", displayName: "Churn Model" },
];

beforeEach(() => {
	localStorage.clear();
	location.pathname = "/infra/components";
	match.current = undefined;
});

function renderRail(items: typeof projects = projects) {
	const queryClient = new QueryClient({
		defaultOptions: { queries: { staleTime: Infinity } },
	});
	queryClient.setQueryData(projectQueries.allList().queryKey, {
		items,
	} as never);
	queryClient.setQueryData(userQueries.currentUser().queryKey, {
		resolvedName: "Ada",
		email: "ada@example.com",
	} as never);

	return render(
		<QueryClientProvider client={queryClient}>
			<AppRail />
		</QueryClientProvider>
	);
}

function railLink(name: string) {
	return page.getByRole("link", { name, exact: true });
}

test("points project entries at the last opened Project from other pages", async () => {
	localStorage.setItem("zenml.projects.selected", "id-2");
	await renderRail();

	await expect
		.element(railLink(m.common_navigation_runs()))
		.toHaveAttribute(
			"href",
			"/projects/$project_id/runs".replace("$project_id", "churn")
		);
	await expect
		.element(railLink(m.infra_navigation_label()))
		.toHaveAttribute("aria-current", "page");
});

test("marks the project entry for the current page", async () => {
	match.current = { status: "success", loaderData: { project: projects[0]! } };
	location.pathname = "/projects/fraud/pipelines";
	await renderRail();

	await expect
		.element(railLink(m.common_navigation_pipelines()))
		.toHaveAttribute("aria-current", "page");
	await expect
		.element(railLink(m.common_navigation_runs()))
		.not.toHaveAttribute("aria-current");
});

test("targets the Project in the URL when the list does not contain it", async () => {
	match.current = {
		status: "success",
		loaderData: {
			project: { id: "id-3", name: "older", displayName: "Older" },
		},
	};
	location.pathname = "/projects/older/runs";
	await renderRail();

	await expect
		.element(railLink(m.common_navigation_runs()))
		.toHaveAttribute("href", "/projects/older/runs");
});

test("hides project entries while a Project route has no valid Project", async () => {
	localStorage.setItem("zenml.projects.selected", "id-2");
	match.current = { status: "notFound" };
	location.pathname = "/projects/missing/runs";
	await renderRail();

	await expect
		.element(railLink(m.infra_navigation_label()))
		.toBeInTheDocument();
	await expect
		.element(railLink(m.common_navigation_runs()))
		.not.toBeInTheDocument();
});

test("keeps sections current on nested routes", async () => {
	location.pathname = "/infra/components/component-id/stacks";
	await renderRail();

	await expect
		.element(railLink(m.infra_navigation_label()))
		.toHaveAttribute("aria-current", "page");
});

test("hides project entries while no Project exists", async () => {
	await renderRail([]);

	await expect
		.element(railLink(m.infra_navigation_label()))
		.toBeInTheDocument();
	await expect
		.element(railLink(m.common_navigation_runs()))
		.not.toBeInTheDocument();
});

test("places settings between the main entries and the user menu", async () => {
	location.pathname = "/settings/general";
	await renderRail();

	const stacks = railLink(m.infra_navigation_label()).element();
	const settings = railLink(m.settings_navigation_label()).element();
	const userMenu = page
		.getByRole("button", { name: m.common_navigation_user_menu() })
		.element();

	await expect
		.element(railLink(m.settings_navigation_label()))
		.toHaveAttribute("aria-current", "page");
	expect(
		stacks.compareDocumentPosition(settings) & Node.DOCUMENT_POSITION_FOLLOWING
	).toBeTruthy();
	expect(
		settings.compareDocumentPosition(userMenu) &
			Node.DOCUMENT_POSITION_FOLLOWING
	).toBeTruthy();
});

test("does not link to entries under construction", async () => {
	await renderRail();

	const artifacts = railLink(
		m.common_navigation_item_under_construction({
			title: m.common_navigation_artifacts(),
		})
	);
	await expect.element(artifacts).toHaveAttribute("aria-disabled", "true");
	await expect.element(artifacts).not.toHaveAttribute("href");
});

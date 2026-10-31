import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import type { ReactNode } from "react";
import { beforeEach, expect, test, vi } from "vitest";
import { render } from "vitest-browser-react";
import { page, userEvent } from "vitest/browser";

import { KeyboardShortcutsSetting } from "@/features/keyboard-shortcuts/ui";
import { projectQueries } from "@/features/projects";
import { sessionQueries } from "@/features/session";
import { m } from "@/paraglide/messages";
import {
	AlertDialog,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogTitle,
} from "@/shared/ui/alert-dialog";
import { Button } from "@/shared/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogTitle,
} from "@/shared/ui/dialog";
import {
	Drawer,
	DrawerContent,
	DrawerDescription,
	DrawerTitle,
} from "@/shared/ui/drawer";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/shared/ui/select";

import { AppRail } from "./app-rail";

const { navigate } = vi.hoisted(() => ({ navigate: vi.fn() }));

vi.mock("@tanstack/react-router", () => ({
	Link: ({ to, children, ...props }: { to: string; children: ReactNode }) => (
		<a href={to} {...props}>
			{children}
		</a>
	),
	useLocation: () => ({ pathname: "/infra/stacks" }),
	useMatch: () => undefined,
	useNavigate: () => navigate,
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
vi.mock("@/features/session/ui", () => ({
	useLogoutUser: () => ({ mutate: vi.fn() }),
}));

const projects = [
	{ id: "id-1", name: "fraud", displayName: "Fraud Detection" },
];

beforeEach(() => {
	localStorage.clear();
	localStorage.setItem("zenml.projects.selected", "id-1");
	navigate.mockClear();
});

function renderRail(children?: ReactNode, items: typeof projects = projects) {
	const queryClient = new QueryClient({
		defaultOptions: { queries: { staleTime: Infinity } },
	});
	queryClient.setQueryData(projectQueries.allList().queryKey, {
		items,
	} as never);
	queryClient.setQueryData(sessionQueries.currentIdentity().queryKey, {
		resolvedName: "Ada",
		email: "ada@example.com",
	} as never);

	return render(
		<QueryClientProvider client={queryClient}>
			<AppRail />
			{children}
		</QueryClientProvider>
	);
}

function railLink(name: string) {
	return page.getByRole("link", { name, exact: true });
}

function tooltipText() {
	return document.querySelector("[data-slot='tooltip-content']")?.textContent;
}

async function expectRailReady() {
	await expect
		.element(railLink(m.infra_navigation_label()))
		.toBeInTheDocument();
}

function StackedDialogs() {
	const [outerOpen, setOuterOpen] = useState(true);
	const [innerOpen, setInnerOpen] = useState(true);

	return (
		<>
			<Dialog open={outerOpen} onOpenChange={setOuterOpen}>
				<DialogContent showCloseButton={false}>
					<DialogTitle>Outer</DialogTitle>
					<DialogDescription>Outer dialog</DialogDescription>
					<Button onClick={() => setOuterOpen(false)}>Close outer</Button>
					<AlertDialog open={innerOpen} onOpenChange={setInnerOpen}>
						<AlertDialogContent>
							<AlertDialogTitle>Inner</AlertDialogTitle>
							<AlertDialogDescription>Inner dialog</AlertDialogDescription>
							<AlertDialogCancel>Close inner</AlertDialogCancel>
						</AlertDialogContent>
					</AlertDialog>
				</DialogContent>
			</Dialog>
		</>
	);
}

test.each([
	["gp", "/projects/fraud/pipelines"],
	["gr", "/projects/fraud/runs"],
	["gi", "/infra/stacks"],
	["gs", "/settings/general"],
])("%s goes to its rail link's destination", async (keys, url) => {
	await renderRail();
	await expectRailReady();

	await userEvent.keyboard(keys);

	expect(navigate).toHaveBeenCalledExactlyOnceWith({ to: url });
});

test("project shortcuts do nothing without an active Project", async () => {
	await renderRail(undefined, []);
	await expectRailReady();

	await userEvent.keyboard("gp");
	await userEvent.keyboard("gr");
	expect(navigate).not.toHaveBeenCalled();

	await userEvent.keyboard("gi");
	expect(navigate).toHaveBeenCalledExactlyOnceWith({ to: "/infra/stacks" });
});

test("shortcuts do not fire while focus is in a text field", async () => {
	await renderRail(<input aria-label="Notes" />);
	const input = page.getByRole("textbox", { name: "Notes" });

	await input.click();
	await userEvent.keyboard("gp");

	await expect.element(input).toHaveValue("gp");
	expect(navigate).not.toHaveBeenCalled();
});

test("stacked dialogs pause shortcuts until the last one closes", async () => {
	await renderRail(<StackedDialogs />);
	await expect
		.element(page.getByRole("alertdialog", { name: "Inner" }))
		.toBeInTheDocument();

	await userEvent.keyboard("gp");
	expect(navigate).not.toHaveBeenCalled();

	await page.getByRole("button", { name: "Close inner" }).click();
	await expect.element(page.getByRole("alertdialog")).not.toBeInTheDocument();

	await userEvent.keyboard("gp");
	expect(navigate).not.toHaveBeenCalled();

	await page.getByRole("button", { name: "Close outer" }).click();
	await expect.element(page.getByRole("dialog")).not.toBeInTheDocument();

	await userEvent.keyboard("gp");
	expect(navigate).toHaveBeenCalledExactlyOnceWith({
		to: "/projects/fraud/pipelines",
	});
});

test("an open drawer pauses shortcuts until it closes", async () => {
	function OpenDrawer() {
		const [open, setOpen] = useState(true);
		return (
			<Drawer open={open} onOpenChange={setOpen}>
				<DrawerContent>
					<DrawerTitle>Drawer</DrawerTitle>
					<DrawerDescription>Drawer content</DrawerDescription>
					<Button onClick={() => setOpen(false)}>Close drawer</Button>
				</DrawerContent>
			</Drawer>
		);
	}

	await renderRail(<OpenDrawer />);
	const close = page.getByRole("button", { name: "Close drawer" });
	await expect.element(close).toBeInTheDocument();

	await userEvent.keyboard("gp");
	expect(navigate).not.toHaveBeenCalled();

	await close.click();
	await expect.element(page.getByRole("dialog")).not.toBeInTheDocument();

	await userEvent.keyboard("gp");
	expect(navigate).toHaveBeenCalledOnce();
});

test("an open menu keeps its typeahead and blocks shortcuts", async () => {
	await renderRail(
		<DropdownMenu>
			<DropdownMenuTrigger render={<Button>Open menu</Button>} />
			<DropdownMenuContent>
				<DropdownMenuItem>Alpha</DropdownMenuItem>
				<DropdownMenuItem>Gamma</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);

	await page.getByRole("button", { name: "Open menu" }).click();
	const gamma = page.getByRole("menuitem", { name: "Gamma" });
	await expect.element(gamma).toBeInTheDocument();

	await userEvent.keyboard("g");
	await expect.element(gamma).toHaveAttribute("data-highlighted");

	await userEvent.keyboard("p");
	expect(navigate).not.toHaveBeenCalled();
});

test("an open select keeps its typeahead and blocks shortcuts", async () => {
	await renderRail(
		<Select>
			<SelectTrigger aria-label="Choice">
				<SelectValue />
			</SelectTrigger>
			<SelectContent>
				<SelectItem value="alpha">Alpha</SelectItem>
				<SelectItem value="gamma">Gamma</SelectItem>
			</SelectContent>
		</Select>
	);

	await page.getByRole("combobox", { name: "Choice" }).click();
	const gamma = page.getByRole("option", { name: "Gamma" });
	await expect.element(gamma).toBeInTheDocument();

	await userEvent.keyboard("g");
	await expect.element(gamma).toHaveAttribute("data-highlighted");

	await userEvent.keyboard("p");
	expect(navigate).not.toHaveBeenCalled();
});

test("tooltips show keycaps for live items only", async () => {
	await renderRail();

	await railLink(m.common_navigation_pipelines()).hover();
	await expect.poll(tooltipText).toBe(`${m.common_navigation_pipelines()}GP`);
	expect(
		document.querySelector("[data-slot='kbd-group'][aria-hidden='true']")
	).not.toBeNull();

	const disabledLabel = m.common_navigation_item_under_construction({
		title: m.common_navigation_artifacts(),
	});
	await railLink(disabledLabel).hover();
	await expect.poll(tooltipText).toBe(disabledLabel);
});

test("the setting turns shortcuts and keycaps off immediately and persists", async () => {
	const screen = await renderRail(<KeyboardShortcutsSetting />);
	const toggle = page.getByRole("switch", {
		name: m.keyboard_shortcuts_setting_label(),
	});
	await expect.element(toggle).toBeChecked();

	await toggle.click();
	await expect.element(toggle).not.toBeChecked();
	await userEvent.keyboard("gp");
	expect(navigate).not.toHaveBeenCalled();

	await railLink(m.infra_navigation_label()).hover();
	await expect.poll(tooltipText).toBe(m.infra_navigation_label());

	await screen.unmount();
	await renderRail(<KeyboardShortcutsSetting />);
	await expect.element(toggle).not.toBeChecked();

	await toggle.click();
	await expect.element(toggle).toBeChecked();
	(document.activeElement as HTMLElement | null)?.blur();
	await userEvent.keyboard("gi");
	expect(navigate).toHaveBeenCalledExactlyOnceWith({ to: "/infra/stacks" });
});

import path from "node:path";
import { fileURLToPath } from "node:url";

import { RuleTester } from "oxlint/plugins-dev";
import { describe, expect, it } from "vitest";

import { forbiddenEdge, placementFix } from "./classify.js";
import plugin from "./plugin.js";
import { policy } from "./policy.js";

RuleTester.describe = describe;
RuleTester.it = it;

const cwd = fileURLToPath(new URL("fixtures/project", import.meta.url));
const tester = new RuleTester({
	cwd,
	languageOptions: { parserOptions: { lang: "tsx" } },
});
const valid = (file: string, code: string) => ({
	code,
	filename: path.join(cwd, file),
});
const invalid = (file: string, code: string, message: string) => ({
	...valid(file, code),
	errors: [{ message }],
});

const route = "src/routes/route.tsx";
const peer = "src/features/runs/list/view.tsx";
const deep = "@/features/stacks/list/stack-list";
const port = (specifier: string, file: string, to: string) =>
	`"${specifier}" reaches inside another feature. Fix: export the symbol from src/features/stacks/${file}.ts and import it from "${to}".`;
const toUi = (specifier: string) =>
	port(specifier, "ui", "@/features/stacks/ui");
const toIndex = (specifier: string) =>
	port(specifier, "index", "@/features/stacks");

tester.run("public-feature-imports", plugin.rules["public-feature-imports"], {
	valid: [
		valid(route, `import { a } from "@/features/stacks";`),
		valid(route, `import { a } from "@/features/stacks/index";`),
		valid(route, `import { a } from "../features/stacks/ui.ts";`),
		valid(route, `import { a } from "@/shared/lib/deep/path";`),
		valid(route, "const load = (name) => import(`@/features/${name}/x`);"),
		valid("src/features/stacks/a/b.tsx", `import { a } from "${deep}";`),
	],
	invalid: [
		...[
			`import { a } from "${deep}";`,
			`import type { A } from "${deep}";`,
			`export { a } from "${deep}";`,
			`export * from "${deep}";`,
			`const a = import("${deep}");`,
			`const a = import(\`${deep}\`);`,
			`type A = import("${deep}").A;`,
			`type A = typeof import("${deep}");`,
			`import type A = require("${deep}");`,
		].map((code) => invalid(route, code, toUi(deep))),
		...[
			[route, "../features/stacks/list/stack-list.tsx", toUi],
			[route, "@/features/stacks/list/use-missing", toUi],
			[route, "@/features/stacks/list/schema", toIndex],
			["src/main.tsx", "./features/stacks/list/schema", toIndex],
			[peer, "../../stacks/list/schema", toIndex],
			[peer, "@/features/runs/../stacks/list/schema?raw", toIndex],
		].map(([file, specifier, to]) =>
			invalid(
				file as string,
				`import a from "${specifier}";`,
				(to as typeof toUi)(specifier as string)
			)
		),
	],
});

const sharedRule = (specifier: string) =>
	`Shared code cannot import "${specifier}". Fix: accept the value through props or slots, or move this file to the owning feature.`;
const featureRule = (specifier: string) =>
	`A feature cannot import "${specifier}". Fix: accept the value through props or slots from the route, or move the shared part to src/shared.`;

tester.run("dependency-direction", plugin.rules["dependency-direction"], {
	valid: [
		[route, "@/features/stacks/ui"],
		["src/app/shell.tsx", "@/features/stacks/ui"],
		["src/app/shell.tsx", "@/routes/route"],
		["src/shared/lib/a.ts", "@/shared/lib/b"],
		[peer, "@/features/stacks/ui"],
		[peer, "@/shared/lib/dates"],
		["src/app/navigation/use-navbar-items.ts", "@/features/stacks/ui"],
	].map(([file, specifier]) => valid(file, `import "${specifier}";`)),
	invalid: [
		...[
			["src/shared/lib/a.ts", "@/features/stacks"],
			["src/shared/lib/a.ts", "../../app/providers"],
			["src/shared/lib/localstorage.ts", "@/routes/route"],
			["src/shared/lib/localstorage.ts", "@/features/made-up"],
			["src/shared/lib/localstorage.ts", "@/app"],
		].map(([file, specifier]) =>
			invalid(file, `import "${specifier}";`, sharedRule(specifier))
		),
		...[
			[peer, "@/routes/route"],
			[peer, "@/routeTree.gen"],
			[peer, "@/main"],
			[peer, "../../../app/navigation/app-rail"],
			[peer, "../../../app/navigation/use-navbar-items"],
			[peer, "@/app/providers"],
		].map(([file, specifier]) =>
			invalid(file, `import "${specifier}";`, featureRule(specifier))
		),
		invalid(
			"src/shared/lib/localstorage.ts",
			`type A = import("@/features/stacks").A;`,
			sharedRule("@/features/stacks")
		),
	],
});

const generated = "@/shared/api/generated";
const dtoLeak = (specifier: string, fix: string) =>
	`"${specifier}" leaks API types. Fix: ${fix}.`;
const toDto = dtoLeak(
	generated,
	"add the alias to src/features/projects/data/dto.ts and import it from there"
);
const toModel = dtoLeak(
	generated,
	"use a handwritten type from the owning feature's model.ts; generated aliases stay in its data/dto.ts"
);
const privateDto = (specifier: string) =>
	dtoLeak(
		specifier,
		"keep DTO aliases private: map the value in src/features/projects/data/map.ts and expose a handwritten type from model.ts"
	);

tester.run("dto-funnel", plugin.rules["dto-funnel"], {
	valid: [
		["src/features/projects/data/dto.ts", generated],
		["src/features/runs/data/dto.ts", generated],
		["src/shared/api/client.ts", "./generated"],
		["src/features/projects/data/map.ts", "./dto"],
		["src/features/projects/data/map.spec.ts", "./dto"],
		["src/features/projects/create/form.tsx", "@/shared/api/client"],
	].map(([file, specifier]) => valid(file, `import "${specifier}";`)),
	invalid: [
		...[
			["src/features/projects/data/requests.ts", toDto],
			["src/features/projects/model.ts", toModel],
			["src/features/projects/create/form.tsx", toModel],
			["src/features/runs/list/view.tsx", toModel],
			["src/domain/runs.ts", toModel],
			["src/types/api-example.ts", toModel],
			["src/routes/route.tsx", toModel],
			["src/shared/lib/dates.ts", toModel],
		].map(([file, message]) =>
			invalid(file, `import type { components } from "${generated}";`, message)
		),
		invalid(
			"src/features/projects/data/queries.ts",
			`type A = import("${generated}").components;`,
			toDto
		),
		invalid(
			"src/features/projects/index.ts",
			`export type { ProjectDto } from "./data/dto";`,
			privateDto("./data/dto")
		),
		invalid(
			"src/features/projects/create/form.tsx",
			`import type { ProjectDto } from "../data/dto";`,
			privateDto("../data/dto")
		),
	],
});

const impure = (specifier: string) =>
	`A model cannot import "${specifier}". Fix: keep model.ts pure: use \`import type\`, pass the value in as an argument, or move this code to data/, storage.ts, or a use-*.ts hook.`;

tester.run("pure-model", plugin.rules["pure-model"], {
	valid: [
		["src/features/projects/selection/model.ts", "../model"],
		["src/features/projects/selection/model.ts", "@/shared/lib/localstorage"],
		["src/features/projects/model.ts", "@/shared/lib/dates"],
		["src/features/projects/model.ts", "./selection/model"],
		["src/features/projects/model.spec.ts", "vitest"],
		["src/features/projects/selection/use-active-project.ts", "react"],
	]
		.map(([file, specifier]) => valid(file, `import "${specifier}";`))
		.concat(
			[
				`import type { User } from "@/features/users";`,
				`export type { User } from "@/features/users";`,
				`type User = import("@/features/users").User;`,
			].map((code) => valid("src/features/projects/model.ts", code))
		),
	invalid: [
		"react",
		"@tanstack/react-query",
		"sonner",
		"@/shared/api/client",
		"@/paraglide/messages",
		"@/shared/ui/button",
		"./storage",
		"./use-active-project",
		"../data/queries",
		"./project-switcher",
		"@/lib/constants/storage",
	]
		.map((specifier) =>
			invalid(
				"src/features/projects/selection/model.ts",
				`import { a } from "${specifier}";`,
				impure(specifier)
			)
		)
		.concat(
			invalid(
				"src/features/projects/model.ts",
				`import { type User } from "@/features/users";`,
				impure("@/features/users")
			),
			invalid(
				"src/features/example/model.ts",
				`import { a } from "react";`,
				impure("react")
			)
		),
});

const rootFix = (file: string) =>
	`${file} is not an allowed location. Fix: move it to src/features/<owner>, src/shared, src/app, or src/routes.`;

tester.run("file-placement", plugin.rules["file-placement"], {
	valid: [
		"src/main.tsx",
		"vite.config.ts",
		"src/routes/(private)/route.tsx",
		"src/features/stacks/create/form.browser.spec.tsx",
		"src/features/stacks/data/queries.ts",
		"src/features/stacks/made-up/schema.ts",
		"src/shared/ui/button.tsx",
		"src/shared/api/generated.ts",
		"src/shared/routing/loader-utils.spec.ts",
		"src/shared/filters/filter.ts",
		"src/shared/components/tables/data-table.tsx",
		"src/shared/components/copy-button.browser.spec.tsx",
		"src/shared/lib/cn.ts",
		"src/app/navigation/app-rail.tsx",
		"src/app/workflows/attach-run/use-attach-run.ts",
	].map((file) => valid(file, "")),
	invalid: [
		invalid("src/widgets/a.ts", "", rootFix("src/widgets/a.ts")),
		invalid(
			"src/data/billing/index.ts",
			"",
			rootFix("src/data/billing/index.ts")
		),
		invalid(
			"src/features/billing/index.ts",
			"",
			`src/features/billing/index.ts is not an allowed location. Fix: move it under a registered owner, or add "billing" to owners in tools/architecture/policy.js.`
		),
	],
});

const ROOT_FIX =
	"move it to src/features/<owner>, src/shared, src/app, or src/routes";

describe("placement grammar", () => {
	const feature = (file: string) => `src/features/projects/${file}`;

	it.each([
		"index.ts",
		"model.spec.ts",
		"data/queries.spec.ts",
		"create/schema.ts",
		"create/form.browser.spec.tsx",
		"empty/no-projects-fallback.tsx",
	])("accepts %s for a registered owner", (file) => {
		expect(placementFix(feature(file), policy)).toBeNull();
	});

	it.each([
		"create/utils.ts",
		"create/utils.tsx",
		"create/nested/form.tsx",
		"Create/form.tsx",
		"data/client.ts",
		"data/view.tsx",
	])("rejects %s for a registered owner", (file) => {
		expect(placementFix(feature(file), policy)).toContain("features/projects/");
	});

	it("applies the grammar to a newly registered owner", () => {
		const registered = { ...policy, owners: [...policy.owners, "example"] };

		expect(
			placementFix("src/features/example/index.ts", registered)
		).toBeNull();
		expect(
			placementFix("src/features/example/a/b/c.tsx", registered)
		).toContain("features/example/");
	});

	it.each(
		["components", "data", "domain", "hooks", "lib", "types"].flatMap((root) =>
			["index.ts", "new-helper.ts", "use-thing.ts", "nested/view.tsx"].map(
				(file) => `src/${root}/${file}`
			)
		)
	)("rejects any file in the old root: %s", (file) => {
		expect(placementFix(file, policy)).toBe(ROOT_FIX);
	});

	it.each([
		"src/components/breadcrumb/breadcrumbs.tsx",
		"src/components/copy-button.tsx",
		"src/components/providers.tsx",
		"src/components/sidebar/app-rail.tsx",
		"src/components/sidebar/new-item.tsx",
		"src/components/sidebar/use-navbar-items.ts",
		"src/components/ui/button.tsx",
		"src/data/api-client.ts",
		"src/data/runs/index.ts",
		"src/domain/runs.ts",
		"src/hooks/use-copy.ts",
		"src/lib/constants/entity-icons.ts",
		"src/lib/constants/storage.ts",
		"src/lib/dates.ts",
		"src/lib/localization-policy.ts",
		"src/lib/localstorage.ts",
		"src/lib/query-client.ts",
		"src/types/api.ts",
		"src/types/core.ts",
		"src/types/navbar.ts",
		"src/types/runs.ts",
	])("rejects the moved path %s", (file) => {
		expect(placementFix(file, policy)).toBe(ROOT_FIX);
	});

	it("does not register the former root owner", () => {
		const former = "root";

		expect(policy.owners).not.toContain(former);
		expect(placementFix(`src/features/${former}/index.ts`, policy)).toContain(
			`add "${former}" to owners`
		);
	});

	it("requires a registered Shared unit and a closed App area", () => {
		const units = {
			...policy,
			sharedUnits: { components: ["tables"], lib: ["dates"] },
		};

		expect(
			placementFix("src/shared/components/tables/a.tsx", units)
		).toBeNull();
		expect(placementFix("src/shared/lib/dates.spec.ts", units)).toBeNull();
		expect(placementFix("src/shared/lib/misc.ts", units)).toContain(
			'add "misc" to sharedUnits.lib'
		);
		expect(placementFix("src/shared/misc/a.ts", units)).toContain("move it");
		expect(placementFix("src/app/misc.ts", units)).toContain("move it");
	});
});

it("gives a path outside every layer no layer", () => {
	const outside = "src/data/example/index";

	expect(forbiddenEdge("src/features/runs/model", "src/app/providers")).toBe(
		"feature"
	);
	expect(forbiddenEdge(outside, "src/app/providers")).toBeNull();
	expect(forbiddenEdge("src/features/runs/model", outside)).toBeNull();
	expect(forbiddenEdge("src/shared/lib/dates", outside)).toBeNull();
});

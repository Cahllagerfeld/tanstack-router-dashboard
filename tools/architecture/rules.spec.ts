import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { RuleTester } from "oxlint/plugins-dev";
import { describe, expect, it } from "vitest";

import { placementFix } from "./classify.js";
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
		valid(route, `import { a } from "@/lib/deep/path";`),
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
		["src/components/sidebar/project-switcher.tsx", "@/features/stacks/ui"],
	].map(([file, specifier]) => valid(file, `import "${specifier}";`)),
	invalid: [
		...[
			["src/shared/lib/a.ts", "@/features/stacks"],
			["src/shared/lib/a.ts", "../../app/providers"],
			["src/lib/localstorage.ts", "@/routes/route"],
			["src/lib/localstorage.ts", "@/data/projects"],
			["src/lib/localstorage.ts", "@/app"],
		].map(([file, specifier]) =>
			invalid(file, `import "${specifier}";`, sharedRule(specifier))
		),
		...[
			[peer, "@/routes/route"],
			[peer, "@/routeTree.gen"],
			[peer, "@/main"],
			[peer, "../../../app/navigation/app-rail"],
			[peer, "../../../components/sidebar/project-switcher"],
			["src/data/runs/index.ts", "@/app/providers"],
		].map(([file, specifier]) =>
			invalid(file, `import "${specifier}";`, featureRule(specifier))
		),
		invalid(
			"src/lib/localstorage.ts",
			`type A = import("@/features/stacks").A;`,
			sharedRule("@/features/stacks")
		),
	],
});

const rootFix = (file: string) =>
	`${file} is not an allowed location. Fix: move it to src/features/<owner>, src/shared, src/app, or src/routes.`;

tester.run("file-placement", plugin.rules["file-placement"], {
	valid: [
		"src/main.tsx",
		"vite.config.ts",
		"src/routes/(private)/route.tsx",
		"src/features/stacks/create/form.browser.spec.tsx",
		"src/data/projects/index.ts",
		"src/features/filters/type/index.ts",
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

describe("placement ratchet", () => {
	const strict = { ...policy, enforcedOwners: ["projects"] };
	const feature = (file: string) => `src/features/projects/${file}`;

	it.each([
		"index.ts",
		"model.spec.ts",
		"data/queries.spec.ts",
		"create/schema.ts",
		"create/form.browser.spec.tsx",
		"empty/no-projects-fallback.tsx",
	])("accepts %s for an enforced owner", (file) => {
		expect(placementFix(feature(file), strict)).toBeNull();
	});

	it.each([
		"create/utils.ts",
		"create/utils.tsx",
		"create/nested/form.tsx",
		"Create/form.tsx",
		"data/client.ts",
		"data/view.tsx",
	])("rejects %s for an enforced owner", (file) => {
		expect(placementFix(feature(file), strict)).toContain("features/projects/");
	});

	it("rejects the named legacy paths of enforced owners only", () => {
		const legacy = "src/data/projects/index.ts";

		expect(placementFix(legacy, policy)).toBeNull();
		expect(placementFix(legacy, strict)).toContain("move this legacy path");
		expect(placementFix("src/data/runs/index.ts", strict)).toBeNull();
	});

	it("keeps new work in unenforced owners on target paths", () => {
		expect(placementFix("src/features/runs/a/b/c.tsx", policy)).toContain(
			"features/runs/"
		);
	});

	it.each([
		"src/components/ui/button.tsx",
		"src/components/copy-button.tsx",
		"src/components/sidebar/app-rail.tsx",
		"src/components/sidebar/new-item.tsx",
		"src/data/api-client.ts",
		"src/hooks/use-copy.ts",
		"src/lib/dates.ts",
		"src/lib/new-helper.ts",
		"src/types/core.ts",
	])("rejects the moved or new legacy-area path %s", (file) => {
		expect(placementFix(file, policy)).toContain("move it to");
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

it("maps legacy paths only to known owners and existing files", () => {
	const root = path.resolve(cwd, "../../../..");
	const areas = [...policy.owners, "app", "shared"];
	const exists = (prefix: string) =>
		["", ".ts", ".tsx", ".spec.ts"].some((ext) =>
			existsSync(path.join(root, `${prefix}${ext}`))
		);

	for (const [owner, prefixes] of Object.entries(policy.legacyPaths)) {
		expect(areas).toContain(owner);
		expect(prefixes.filter((prefix) => !exists(prefix))).toEqual([]);
	}
});

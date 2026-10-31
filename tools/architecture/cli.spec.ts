import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

import { describe, expect, it } from "vitest";

const local = (file: string) => fileURLToPath(new URL(file, import.meta.url));
const run = (cwd: string, ...args: string[]) =>
	spawnSync(process.execPath, args, { cwd: local(cwd), encoding: "utf8" });
const lint = (cwd: string) =>
	run(
		cwd,
		local("../../node_modules/oxlint/bin/oxlint"),
		"-c",
		"fixture.oxlintrc.json",
		"--format=json",
		"."
	);

describe("oxlint with the root configuration", () => {
	const result = lint("fixtures/project");
	const { diagnostics } = JSON.parse(result.stdout) as {
		diagnostics: { code: string; filename: string; message: string }[];
	};
	const codes = (file: string) =>
		diagnostics.filter((d) => d.filename === file).map((d) => d.code);

	it.each([
		["src/routes/deep.tsx", "architecture(public-feature-imports)"],
		["src/lib/uses-feature.ts", "architecture(dependency-direction)"],
		["src/misplaced/reported.ts", "architecture(file-placement)"],
		["src/features/unregistered/index.ts", "architecture(file-placement)"],
		["src/features/runs/cycle/model.ts", "import(no-cycle)"],
	])("fails on the violation in %s", (file, code) => {
		expect(result.status).toBe(1);
		expect(codes(file)).toEqual([code]);
	});

	it("accepts code that follows the rules", () => {
		expect(codes("src/routes/clean.tsx")).toEqual([]);
	});

	it("states the fix in every architecture message", () => {
		const custom = diagnostics.filter((d) => d.code.startsWith("architecture"));
		expect(custom.length).toBeGreaterThan(0);
		for (const { message } of custom) expect(message).toContain("Fix: ");
	});

	it("is silenced by a whole-file directive, which the guard rejects", () => {
		expect(codes("src/misplaced/suppressed.ts")).toEqual([]);

		const guard = run("fixtures/project", local("directive-guard.js"), "src");

		expect(guard.status).toBe(1);
		expect(guard.stderr).toContain("src/misplaced/suppressed.ts:1: remove");
		expect(guard.stderr).toContain("src/types/api.ts:1: remove");
		expect(guard.stderr).not.toContain("src/types/core.ts");
	});
});

it("fails the job when the plugin cannot load", () => {
	const result = lint("fixtures/broken-plugin");

	expect(result.status).not.toBe(0);
	expect(result.stdout + result.stderr).toContain("plugin failed to load");
});

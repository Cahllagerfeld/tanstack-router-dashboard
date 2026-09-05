import { readFileSync, readdirSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { describe, expect, it } from "vitest";

import {
	checkLocalizationPolicy,
	type LocalizationSourceFile,
} from "./localization-policy";

const repositoryRoot = resolve(
	dirname(fileURLToPath(import.meta.url)),
	"../.."
);

function sourceFile(path: string, content: string): LocalizationSourceFile {
	return { path, content };
}

describe("checkLocalizationPolicy", () => {
	it("reports catalog parity and naming violations", () => {
		const result = checkLocalizationPolicy({
			catalogs: {
				en: {
					projects_list_title: "Projects",
					common_value_array_count: [
						{ declarations: [], selectors: [], match: {} },
					],
					"projects.list.description": "Projects organize resources.",
				},
				de: {
					projects_list_title: "Projekte",
					common_value_array_count: [
						{ declarations: [], selectors: [], match: {} },
					],
				},
			},
			sourceFiles: [],
		});

		expect(result.issues).toEqual([
			{
				kind: "catalog",
				message:
					'German catalog is missing the key "projects.list.description".',
			},
			{
				kind: "catalog",
				message:
					'Message key "projects.list.description" must use flat snake_case.',
			},
		]);
	});

	it("reports direct product copy at the source seam", () => {
		const result = checkLocalizationPolicy({
			catalogs: {
				en: { common_action_save: "Save" },
				de: { common_action_save: "Speichern" },
			},
			sourceFiles: [
				sourceFile(
					"src/example.tsx",
					[
						"export function Example() {",
						'\treturn <Button aria-label="Save changes">Save</Button>;',
						"}",
						'toast.success("Saved");',
					].join("\n")
				),
			],
		});

		expect(result.issues).toEqual([
			expect.objectContaining({
				kind: "jsx-text",
				file: "src/example.tsx",
				line: 2,
				message: "Direct JSX text must use a Paraglide message.",
			}),
			expect.objectContaining({
				kind: "user-facing-attribute",
				file: "src/example.tsx",
				line: 2,
				message: "Literal user-facing attributes must use a Paraglide message.",
			}),
			expect.objectContaining({
				kind: "notification",
				file: "src/example.tsx",
				line: 4,
				message: "Notification copy must use a Paraglide message.",
			}),
		]);
	});

	it("reports literal strings inside JSX expression attributes", () => {
		const result = checkLocalizationPolicy({
			catalogs: {
				en: { common_action_save: "Save" },
				de: { common_action_save: "Speichern" },
			},
			sourceFiles: [
				sourceFile(
					"src/example.tsx",
					"<Button aria-label={\"Save\"} title={'Save changes'} />"
				),
			],
		});

		expect(result.issues).toEqual([
			expect.objectContaining({
				kind: "user-facing-attribute",
				file: "src/example.tsx",
				line: 1,
				message: "Literal user-facing attributes must use a Paraglide message.",
			}),
			expect.objectContaining({
				kind: "user-facing-attribute",
				file: "src/example.tsx",
				line: 1,
				message: "Literal user-facing attributes must use a Paraglide message.",
			}),
		]);
	});

	it("reports text nested beside an icon", () => {
		const result = checkLocalizationPolicy({
			catalogs: {
				en: { common_action_create: "Create" },
				de: { common_action_create: "Erstellen" },
			},
			sourceFiles: [
				sourceFile(
					"src/example.tsx",
					"<Button><Plus />Create project</Button>"
				),
			],
		});

		expect(result.issues).toEqual([
			expect.objectContaining({
				kind: "jsx-text",
				file: "src/example.tsx",
				message: "Direct JSX text must use a Paraglide message.",
			}),
		]);
	});

	it("allows documented exemptions and ignores generated/test source", () => {
		const result = checkLocalizationPolicy({
			catalogs: {
				en: { common_action_save: "Save" },
				de: { common_action_save: "Speichern" },
			},
			sourceFiles: [
				sourceFile(
					"src/example.tsx",
					[
						"// localization-policy-ignore: test-fixture",
						"const runtimeCopy = <Button>Save</Button>;",
						"const value = <span>{runtimeCopy}</span>;",
					].join("\n")
				),
				sourceFile("src/generated.tsx", "<Button>Generated</Button>"),
				sourceFile("src/example.spec.tsx", "<Button>Fixture</Button>"),
				sourceFile(
					"src/paraglide/messages/example.js",
					"<Button>Generated output</Button>"
				),
			],
		});

		expect(result.issues).toEqual([]);
	});

	it("requires a recognized reason for inline exemptions", () => {
		const result = checkLocalizationPolicy({
			catalogs: {
				en: { common_action_save: "Save" },
				de: { common_action_save: "Speichern" },
			},
			sourceFiles: [
				sourceFile(
					"src/example.tsx",
					[
						"// localization-policy-ignore: because I said so",
						"<Button>Save</Button>",
					].join("\n")
				),
			],
		});

		expect(result.issues).toEqual([
			expect.objectContaining({
				kind: "jsx-text",
				file: "src/example.tsx",
				line: 2,
			}),
		]);
	});

	it("keeps the repository catalogs and application source compliant", () => {
		const sourceFiles = collectSourceFiles(join(repositoryRoot, "src"));
		const result = checkLocalizationPolicy({
			catalogs: {
				en: readCatalog("en"),
				de: readCatalog("de"),
			},
			sourceFiles,
		});

		expect(result.issues).toEqual([]);
	});
});

function readCatalog(locale: "en" | "de"): Record<string, unknown> {
	return JSON.parse(
		readFileSync(join(repositoryRoot, "messages", `${locale}.json`), "utf8")
	) as Record<string, unknown>;
}

function collectSourceFiles(directory: string): LocalizationSourceFile[] {
	return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
		const path = join(directory, entry.name);
		if (entry.isDirectory()) return collectSourceFiles(path);
		if (!entry.name.endsWith(".ts") && !entry.name.endsWith(".tsx")) {
			return [];
		}

		return [
			{
				path: path.slice(repositoryRoot.length + 1),
				content: readFileSync(path, "utf8"),
			},
		];
	});
}

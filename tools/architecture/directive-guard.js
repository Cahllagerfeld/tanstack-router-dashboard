import { readdirSync, readFileSync } from "node:fs";
import path from "node:path";

const root = process.argv[2] ?? "src";
const TOKEN =
	/(?:oxlint|eslint)-(?:disable|enable)|@ts-(?:ignore|nocheck|expect-error)/;
const GENERATED =
	/^(?:routeTree\.gen\.ts|paraglide\/.*|shared\/api\/generated\.ts)$/;
const DIRECTIVE = "// oxlint-disable-next-line react/set-state-in-effect";
const allowed = new Set([
	`shared/components/debounced-input.tsx:${DIRECTIVE}`,
	`shared/hooks/use-mobile.ts:${DIRECTIVE}`,
]);

const files = readdirSync(root, { recursive: true, withFileTypes: true })
	.filter((entry) => entry.isFile() && /\.[cm]?[jt]sx?$/.test(entry.name))
	.map((entry) => path.join(entry.parentPath, entry.name))
	.filter((file) => !GENERATED.test(path.relative(root, file)));
const failures = files.flatMap((file) =>
	readFileSync(file, "utf8")
		.split("\n")
		.flatMap((line, index) => {
			const key = `${path.relative(root, file)}:${line.trim()}`;
			if (!TOKEN.test(line) || allowed.delete(key)) return [];
			return `${file}:${index + 1}: remove this suppression and fix the finding.`;
		})
);
if (failures.length > 0) console.error(failures.join("\n"));
process.exitCode = failures.length > 0 ? 1 : 0;

export type LocalizationCatalog = Record<string, unknown>;

export type LocalizationSourceFile = {
	path: string;
	content: string;
};

export type LocalizationIssue = {
	kind: "catalog" | "jsx-text" | "notification" | "user-facing-attribute";
	file?: string;
	line?: number;
	message: string;
};

export type LocalizationPolicyResult = {
	issues: LocalizationIssue[];
};

type LocalizationPolicyInput = {
	catalogs: {
		en: LocalizationCatalog;
		de: LocalizationCatalog;
	};
	sourceFiles: readonly LocalizationSourceFile[];
};

const schemaKey = "$schema";
const messageKeyPattern = /^[a-z][a-z0-9]*(?:_[a-z0-9]+)+$/;
const directJsxTextPattern = /<([A-Za-z][\w.]*)\b[^>]*>([^<>{}]*)<\/\1>/g;
const nestedJsxTextPattern = /\/>\s*([A-Za-z][^<>{}\n]*)\s*</g;
const userFacingAttributePattern =
	/\b(aria-label|aria-description|aria-roledescription|alt|placeholder|title)\s*=\s*(?:(["'])([^"']+)\2|\{\s*(["'])([^"']+)\4\s*\}|\{\s*(\x60)([^\x60]+)\6\s*\})/g;
const notificationPattern =
	/\btoast(?:\.[A-Za-z][\w]*)?\s*\(\s*(["'`])([\s\S]*?)\1/g;
const policyIgnorePattern =
	/localization-policy-ignore\s*:\s*(?:runtime-data|non-user-facing|generated-output|test-fixture)\b/;

export function checkLocalizationPolicy({
	catalogs,
	sourceFiles,
}: LocalizationPolicyInput): LocalizationPolicyResult {
	const issues = checkCatalogs(catalogs);

	for (const sourceFile of [...sourceFiles].sort((left, right) =>
		left.path.localeCompare(right.path)
	)) {
		if (isIgnoredSourcePath(sourceFile.path)) continue;
		issues.push(...checkSourceFile(sourceFile));
	}

	return {
		issues: issues.sort(compareIssues),
	};
}

function checkCatalogs({
	en,
	de,
}: LocalizationPolicyInput["catalogs"]): LocalizationIssue[] {
	const issues: LocalizationIssue[] = [];
	const englishKeys = getMessageKeys(en);
	const germanKeys = getMessageKeys(de);
	const allKeys = new Set([...englishKeys, ...germanKeys]);

	for (const key of allKeys) {
		if (!germanKeys.has(key)) {
			issues.push({
				kind: "catalog",
				message: `German catalog is missing the key "${key}".`,
			});
		}
		if (!englishKeys.has(key)) {
			issues.push({
				kind: "catalog",
				message: `English catalog is missing the key "${key}".`,
			});
		}
		if (!messageKeyPattern.test(key)) {
			issues.push({
				kind: "catalog",
				message: `Message key "${key}" must use flat snake_case.`,
			});
		}

		for (const [locale, catalog] of [
			["English", en],
			["German", de],
		] as const) {
			if (
				key in catalog &&
				typeof catalog[key] !== "string" &&
				!Array.isArray(catalog[key])
			) {
				issues.push({
					kind: "catalog",
					message: `${locale} catalog value for "${key}" must be a string or complex message array.`,
				});
			}
		}
	}

	return issues;
}

function getMessageKeys(catalog: LocalizationCatalog): Set<string> {
	return new Set(Object.keys(catalog).filter((key) => key !== schemaKey));
}

function checkSourceFile({
	path,
	content,
}: LocalizationSourceFile): LocalizationIssue[] {
	const issues: LocalizationIssue[] = [];

	for (const match of content.matchAll(directJsxTextPattern)) {
		const text = match[2]?.trim();
		if (!text || !/[A-Za-z]/.test(text)) continue;
		const index = match.index ?? 0;
		if (hasDocumentedExemption(content, index)) continue;
		issues.push({
			kind: "jsx-text",
			file: path,
			line: lineNumber(content, index),
			message: "Direct JSX text must use a Paraglide message.",
		});
	}

	for (const match of content.matchAll(nestedJsxTextPattern)) {
		const text = match[1]?.trim();
		if (!text) continue;
		const index = match.index ?? 0;
		if (hasDocumentedExemption(content, index)) continue;
		issues.push({
			kind: "jsx-text",
			file: path,
			line: lineNumber(content, index),
			message: "Direct JSX text must use a Paraglide message.",
		});
	}

	for (const match of content.matchAll(userFacingAttributePattern)) {
		const index = match.index ?? 0;
		if (hasDocumentedExemption(content, index)) continue;
		issues.push({
			kind: "user-facing-attribute",
			file: path,
			line: lineNumber(content, index),
			message: "Literal user-facing attributes must use a Paraglide message.",
		});
	}

	for (const match of content.matchAll(notificationPattern)) {
		const index = match.index ?? 0;
		if (hasDocumentedExemption(content, index)) continue;
		issues.push({
			kind: "notification",
			file: path,
			line: lineNumber(content, index),
			message: "Notification copy must use a Paraglide message.",
		});
	}

	const seenJsxTextLocations = new Set<string>();
	return issues.filter((issue) => {
		if (issue.kind !== "jsx-text") return true;
		const location = (issue.file ?? "") + ":" + (issue.line ?? 0);
		if (seenJsxTextLocations.has(location)) return false;
		seenJsxTextLocations.add(location);
		return true;
	});
}

function isIgnoredSourcePath(path: string): boolean {
	const normalizedPath = path.replaceAll("\\", "/");
	return (
		normalizedPath.includes("/paraglide/") ||
		normalizedPath.includes("/generated/") ||
		/(^|\/)generated\.[^/]+$/.test(normalizedPath) ||
		/(?:\.spec|\.test)\.[^/]+$/.test(normalizedPath) ||
		normalizedPath.endsWith("/routeTree.gen.ts")
	);
}

function hasDocumentedExemption(content: string, index: number): boolean {
	const lineStart = content.lastIndexOf("\n", Math.max(0, index - 1)) + 1;
	const previousLineStart =
		content.lastIndexOf("\n", Math.max(0, lineStart - 2)) + 1;
	const context = content.slice(previousLineStart, lineStart);
	return policyIgnorePattern.test(context);
}

function lineNumber(content: string, index: number): number {
	return content.slice(0, index).split("\n").length;
}

function compareIssues(
	left: LocalizationIssue,
	right: LocalizationIssue
): number {
	if (left.kind === "catalog" && right.kind !== "catalog") return -1;
	if (left.kind !== "catalog" && right.kind === "catalog") return 1;
	if (left.file !== right.file)
		return (left.file ?? "").localeCompare(right.file ?? "");
	if (left.line !== right.line) return (left.line ?? 0) - (right.line ?? 0);
	return issueKindOrder(left.kind) - issueKindOrder(right.kind);
}

function issueKindOrder(kind: LocalizationIssue["kind"]): number {
	return {
		catalog: 0,
		"jsx-text": 1,
		"user-facing-attribute": 2,
		notification: 3,
	}[kind];
}

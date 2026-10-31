import { existsSync } from "node:fs";
import path from "node:path";

const KEBAB = "[a-z0-9]+(?:-[a-z0-9]+)*";
const TEST = "(?:\\.browser)?\\.spec";
const grammar = (...patterns) => new RegExp(`^(?:${patterns.join("|")})$`);

const FORBIDDEN = {
	feature: ["app", "routes"],
	shared: ["app", "feature", "routes"],
};
const KNOWN =
	/^src\/(?:main\.tsx|routeTree\.gen\.ts|vite-env\.d\.ts|test\/browser\.setup\.ts|assets\/.+|paraglide\/.+|routes\/.+)$/;
const FEATURE = grammar(
	"(?:index|ui)\\.ts",
	"model(?:\\.spec)?\\.ts",
	"data/(?:dto|requests|map|queries)(?:\\.spec)?\\.ts",
	`(?!data/)${KEBAB}/(?:model|schema|storage|use-${KEBAB})(?:\\.spec)?\\.ts`,
	`(?!data/)${KEBAB}/(?!(?:utils|helpers|types)\\.)${KEBAB}\\.tsx`,
	`(?!data/)${KEBAB}/${KEBAB}${TEST}\\.tsx?`
);
const APP = grammar(
	`(?:providers|global-error-boundary)(?:${TEST})?\\.tsx`,
	"query-client(?:\\.spec)?\\.ts",
	"(?:layouts|navigation)/.+",
	`workflows/${KEBAB}/.+`
);
const SHARED = grammar(
	"ui/.+",
	`hooks/use-${KEBAB}(?:\\.spec)?\\.ts`,
	"api/(?:client|errors|generated)(?:\\.spec)?\\.ts",
	`(?:routing|filters)/${KEBAB}(?:${TEST})?\\.tsx?`
);
const GENERATED = "src/shared/api/generated";
const DTO_FILE = /^src\/features\/[^/]+\/data\/dto\.ts$/;
const DTO_TARGET = /^src\/features\/([^/]+)\/data\/dto$/;
const MODEL_FILE = /^src\/features\/([^/]+)\/(?:[^/]+\/)?model\.ts$/;
const PURE_TARGET =
	/^src\/(?:shared\/lib\/.+|lib\/constants\/storage|features\/[^/]+\/(?:[^/]+\/)?model)$/;
const APP_FIX =
	"move it to app/{providers.tsx,query-client.ts,global-error-boundary.tsx,layouts,navigation,workflows/<name>}";
const SHARED_FIX =
	"move it to shared/{ui,components,lib,hooks/use-*.ts,api/{client,errors,generated}.ts,routing,filters}";

/** Repository-relative POSIX path of an absolute filename. */
export function relativePath(root, filename) {
	return path.relative(root, filename).split(path.sep).join("/");
}

/** Repository-relative target of an alias or relative specifier, or null. */
export function resolveImport(importer, specifier) {
	const bare = specifier.split("?")[0];
	if (!/^(?:@\/|\.)/.test(bare)) return null;
	const target = bare.startsWith("@/")
		? `src/${bare.slice(2)}`
		: path.posix.join(path.posix.dirname(importer), bare);
	return path.posix
		.normalize(target)
		.replace(/\/$/, "")
		.replace(/\.[cm]?[jt]sx?$/, "");
}

function featureOf(file) {
	const match = /^src\/features\/([^/]+)(?:\/(.*))?$/.exec(file);
	return match && { owner: match[1], rest: match[2] ?? "" };
}

function legacyOwner(file, { legacyPaths }) {
	const matches = Object.entries(legacyPaths).flatMap(([owner, prefixes]) =>
		prefixes
			.filter((prefix) => `${file}/`.startsWith(prefix))
			.map((prefix) => ({ owner, length: prefix.length }))
	);
	return matches.sort((a, b) => b.length - a.length)[0]?.owner ?? null;
}

/** Architecture layer, using the legacy mapping until the code has moved. */
function layerOf(file, policy) {
	if (featureOf(file)) return "feature";
	const root = /^src\/(app|routes|shared)(?:\/|$)/.exec(file)?.[1];
	if (root) return root;
	if (file === "src/main") return "app";
	if (file === "src/routeTree.gen") return "routes";
	const owner = legacyOwner(file, policy);
	return ["app", "shared", null].includes(owner) ? owner : "feature";
}

/** The port that replaces a deep feature import, or null when it is allowed. */
export function requiredPort(root, importer, target) {
	const feature = featureOf(target);
	if (!feature || featureOf(importer)?.owner === feature.owner) return null;
	if (["", "index", "ui"].includes(feature.rest)) return null;
	const isUi =
		path.posix.basename(target).startsWith("use-") ||
		existsSync(path.join(root, `${target}.tsx`));
	return {
		file: `src/features/${feature.owner}/${isUi ? "ui" : "index"}.ts`,
		specifier: `@/features/${feature.owner}${isUi ? "/ui" : ""}`,
	};
}

/** The importer's layer when the edge points the wrong way, otherwise null. */
export function forbiddenEdge(importer, target, policy) {
	const from = layerOf(importer, policy);
	return FORBIDDEN[from]?.includes(layerOf(target, policy)) ? from : null;
}

/** The fix for an import that breaks the DTO funnel, or null when it is allowed. */
export function dtoFix(importer, target, policy) {
	const owner = DTO_TARGET.exec(target)?.[1];
	if (owner) {
		return importer.startsWith(`src/features/${owner}/data/`)
			? null
			: `keep DTO aliases private: map the value in src/features/${owner}/data/map.ts and expose a handwritten type from model.ts`;
	}
	if (target !== GENERATED) return null;
	if (DTO_FILE.test(importer) || importer === "src/shared/api/client.ts") {
		return null;
	}
	const legacy = legacyOwner(importer, policy);
	if (legacy && !policy.enforcedOwners.includes(legacy)) return null;
	const home = featureOf(importer)?.owner ?? "<owner>";
	return `add the alias to src/features/${home}/data/dto.ts and import it from there`;
}

/** The fix for an impure import in an enforced model.ts, or null when it is allowed. */
export function modelFix(importer, target, { enforcedOwners }) {
	const owner = MODEL_FILE.exec(importer)?.[1];
	if (!enforcedOwners.includes(owner) || PURE_TARGET.test(target)) return null;
	return "keep model.ts pure: pass the value in as an argument, or move this code to data/, storage.ts, or a use-*.ts hook";
}

function sharedFix(rest, { sharedUnits }) {
	const unit = /^(components|lib)\/([^/.]+)/.exec(rest);
	if (!unit) return SHARED.test(rest) ? null : SHARED_FIX;
	if (sharedUnits[unit[1]].includes(unit[2])) return null;
	return `add it to a registered unit, or add "${unit[2]}" to sharedUnits.${unit[1]} in tools/architecture/policy.js`;
}

function featureFix({ owner, rest }, { owners }) {
	if (!owners.includes(owner)) {
		return `move it under a registered owner, or add "${owner}" to owners in tools/architecture/policy.js`;
	}
	if (FEATURE.test(rest)) return null;
	return `move it to src/features/${owner}/ as {index,ui,model}.ts, data/{dto,requests,map,queries}.ts, or <behavior>/{model.ts,schema.ts,storage.ts,use-*.ts,<view>.tsx}`;
}

/** The fix for a misplaced file, or null when the path is accepted. */
export function placementFix(file, policy) {
	if (!file.startsWith("src/")) return null;
	const owner = legacyOwner(file, policy);
	if (owner && !policy.enforcedOwners.includes(owner)) return null;
	if (owner) return `move this legacy path into src/features/${owner}/`;
	const feature = featureOf(file);
	if (feature) return featureFix(feature, policy);
	if (file.startsWith("src/shared/")) return sharedFix(file.slice(11), policy);
	if (file.startsWith("src/app/")) {
		return APP.test(file.slice(8)) ? null : APP_FIX;
	}
	if (KNOWN.test(file)) return null;
	return "move it to src/features/<owner>, src/shared, src/app, or src/routes";
}

import {
	forbiddenEdge,
	placementFix,
	relativePath,
	requiredPort,
	resolveImport,
} from "./classify.js";
import { policy } from "./policy.js";

const LAYERS = {
	feature: {
		label: "A feature",
		fix: "accept the value through props or slots from the route, or move the shared part to src/shared",
	},
	shared: {
		label: "Shared code",
		fix: "accept the value through props or slots, or move this file to the owning feature",
	},
};

function literalValue(source) {
	if (source?.type === "Literal") return source.value;
	return source?.type === "TemplateLiteral" && source.expressions.length === 0
		? source.quasis[0].value.cooked
		: null;
}

/** Visits imports, re-exports, literal dynamic imports, and TS import forms. */
function importVisitor(context, check) {
	const importer = relativePath(context.cwd, context.filename);
	const visit = ({ source }) => {
		const specifier = literalValue(source);
		const target = specifier && resolveImport(importer, specifier);
		if (!target) return;
		const message = check(importer, target, specifier);
		if (message) context.report({ node: source, message });
	};
	return {
		ExportAllDeclaration: visit,
		ExportNamedDeclaration: visit,
		ImportDeclaration: visit,
		ImportExpression: visit,
		TSExternalModuleReference: ({ expression }) =>
			visit({ source: expression }),
		TSImportType: visit,
	};
}

export default {
	meta: { name: "architecture" },
	rules: {
		"public-feature-imports": {
			create: (context) =>
				importVisitor(context, (importer, target, specifier) => {
					const port = requiredPort(context.cwd, importer, target);
					return (
						port &&
						`"${specifier}" reaches inside another feature. Fix: export the symbol from ${port.file} and import it from "${port.specifier}".`
					);
				}),
		},
		"dependency-direction": {
			create: (context) =>
				importVisitor(context, (importer, target, specifier) => {
					const layer = LAYERS[forbiddenEdge(importer, target, policy)];
					return (
						layer &&
						`${layer.label} cannot import "${specifier}". Fix: ${layer.fix}.`
					);
				}),
		},
		"file-placement": {
			create: (context) => ({
				Program(node) {
					const file = relativePath(context.cwd, context.filename);
					const fix = placementFix(file, policy);
					if (!fix) return;
					const message = `${file} is not an allowed location. Fix: ${fix}.`;
					context.report({ node, message });
				},
			}),
		},
	},
};

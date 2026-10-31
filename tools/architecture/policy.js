/** Architecture registry. See AGENTS.md and ADR-0002. #560 removes the ratchet. */

const owners = [
	"components",
	"pipelines",
	"projects",
	"runs",
	"server-activation",
	"session",
	"stacks",
	"users",
	// Temporary names, removed by #560.
	"filters",
	"login",
	"root",
];

/** Owners that have migrated: strict grammar, and their legacy paths are rejected. */
const enforcedOwners = [
	// One per line and alphabetical, so parallel migrations rebase cleanly.
	"pipelines",
	"projects",
	"runs",
	"stacks",
];

/** Top-level units allowed under src/shared/{components,lib}. */
const sharedUnits = {
	components: [
		"base-table-actions",
		"content-inset",
		"copy-button",
		"debounced-input",
		"display-date",
		"group-tabs",
		"key-value-list",
		"no-item-fallback",
		"not-available-tag",
		"object-renderer",
		"rail",
		"secret-value",
		"tables",
	],
	lib: [
		"avatar",
		"cn",
		"dates",
		"page-range",
		"strings",
		"table",
		"type-guards",
	],
};

/**
 * Owner to legacy path prefix. A trailing slash names a folder; anything else
 * is a file-stem prefix. The longest prefix wins. `app` and `shared` stand for
 * those areas until #560 moves the remaining code.
 */
const legacyPaths = {
	app: [
		"src/components/breadcrumb/",
		"src/components/providers",
		"src/components/sidebar/use-navbar-items",
		"src/lib/query-client",
		"src/types/navbar",
	],
	filters: ["src/features/filters/"],
	login: ["src/features/login/"],
	root: ["src/features/root/"],
	"server-activation": [
		"src/data/server/",
		"src/features/server-activation/password-step",
		"src/features/server-activation/schema",
		"src/features/server-activation/use-password-step",
		"src/types/server",
	],
	session: [
		"src/data/session/",
		"src/data/user/fetch-current-user",
		"src/types/session",
	],
	shared: [
		"src/lib/constants/entity-icons",
		"src/lib/constants/storage",
		"src/lib/localization-policy",
		"src/lib/localstorage",
		"src/types/api",
	],
	users: [
		"src/data/user/",
		"src/domain/mappers",
		"src/domain/users",
		"src/types/user",
	],
};

export const policy = { owners, enforcedOwners, sharedUnits, legacyPaths };

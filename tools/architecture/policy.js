/** Architecture registry: feature owners and Shared units. See AGENTS.md and ADR-0002. */

const owners = [
	"components",
	"pipelines",
	"projects",
	"runs",
	"server-activation",
	"session",
	"stacks",
	"users",
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
		"entity-icons",
		"localization-policy",
		"localstorage",
		"page-range",
		"strings",
		"type-guards",
	],
};

export const policy = { owners, sharedUnits };

/** Architecture registry: feature owners and Shared units. See AGENTS.md and ADR-0002. */

const owners = [
	"components",
	"keyboard-shortcuts",
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
		"detail-layout",
		"display-date",
		"exclusive-hotkey-scope",
		"group-tabs",
		"no-item-fallback",
		"not-available-tag",
		"object-renderer",
		"rail",
		"ripple-background",
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
		"page",
		"strings",
		"type-guards",
	],
};

export const policy = { owners, sharedUnits };

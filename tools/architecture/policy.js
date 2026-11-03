/** Architecture registry: feature owners and Shared units. See AGENTS.md and ADR-0002. */

const owners = [
	"components",
	"keyboard-shortcuts",
	"pipelines",
	"projects",
	"runs",
	"secrets",
	"server-activation",
	"server-settings",
	"session",
	"stacks",
	"users",
];

/** Top-level units allowed under src/shared/{components,lib}. */
const sharedUnits = {
	components: [
		"actions-menu",
		"active-indicator",
		"content-inset",
		"copy-button",
		"debounced-input",
		"delete-alert",
		"detail-layout",
		"display-date",
		"exclusive-hotkey-scope",
		"group-tabs",
		"icon-swap",
		"not-available-tag",
		"object-renderer",
		"rail",
		"ripple-background",
		"schema-form",
		"secret-value",
		"tables",
	],
	lib: [
		"avatar",
		"cn",
		"dates",
		"entity-icons",
		"json-schema-form",
		"localization-policy",
		"localstorage",
		"motion",
		"page",
		"strings",
		"type-guards",
	],
};

export const policy = { owners, sharedUnits };

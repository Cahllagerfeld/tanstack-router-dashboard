import { describe, expect, it } from "vitest";

import { filterSettingsSections } from "./settings-nav";

const sections = [
	{
		label: "Server",
		items: [{ label: "General" }, { label: "Members" }],
	},
	{ label: "Project", items: [{ label: "General" }] },
];

describe("filterSettingsSections", () => {
	it("keeps every section for a blank filter", () => {
		expect(filterSettingsSections(sections, "  ")).toBe(sections);
	});

	it("keeps matching items regardless of case and drops empty sections", () => {
		expect(filterSettingsSections(sections, "MEM")).toEqual([
			{ label: "Server", items: [{ label: "Members" }] },
		]);
	});

	it("keeps an item that matches in several sections", () => {
		expect(filterSettingsSections(sections, "gen")).toEqual([
			{ label: "Server", items: [{ label: "General" }] },
			{ label: "Project", items: [{ label: "General" }] },
		]);
	});

	it("keeps a whole section when its label matches", () => {
		expect(filterSettingsSections(sections, "serv")).toEqual([sections[0]]);
	});

	it("returns nothing when no section or item matches", () => {
		expect(filterSettingsSections(sections, "billing")).toEqual([]);
	});
});

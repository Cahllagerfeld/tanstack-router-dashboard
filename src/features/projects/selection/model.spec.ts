import { describe, expect, it } from "vitest";

import type { Project } from "../model";
import {
	getIllustrationUrl,
	resolveProject,
	resolveUnscopedProject,
} from "./model";

describe("resolveProject", () => {
	const projects = [
		{ id: "id-1", name: "newest" },
		{ id: "id-2", name: "older" },
	] as Project[];

	it("opens the last opened Project when it is still listed", () => {
		expect(resolveProject(projects, "id-2")).toBe(projects[1]);
	});

	it("matches a last opened Project stored by name", () => {
		expect(resolveProject(projects, "older")).toBe(projects[1]);
	});

	it.each([
		["nothing was opened yet", null],
		["the last opened Project no longer exists", "deleted-id"],
	])("opens the first Project when %s", (_, lastOpened) => {
		expect(resolveProject(projects, lastOpened)).toBe(projects[0]);
	});

	it("resolves to nothing without Projects", () => {
		expect(resolveProject([], "id-1")).toBeUndefined();
	});
});

describe("resolveUnscopedProject", () => {
	const projects = [
		{ id: "id-1", name: "newest" },
		{ id: "id-2", name: "older" },
	] as Project[];

	it("keeps a listed Project whatever the list state", () => {
		expect(resolveUnscopedProject(projects, "id-2", false)).toBe(projects[1]);
	});

	it("does not replace a missing Project until the list is current", () => {
		expect(resolveUnscopedProject(projects, "id-3", false)).toBeUndefined();
	});

	it("opens the first Project once a current list confirms it is gone", () => {
		expect(resolveUnscopedProject(projects, "id-3", true)).toBe(projects[0]);
	});

	it("opens the first Project when nothing was opened yet", () => {
		expect(resolveUnscopedProject(projects, null, false)).toBe(projects[0]);
	});
});

describe("getIllustrationUrl", () => {
	it("uses the configured S3_BASE_URL and correct path/extension", () => {
		expect(getIllustrationUrl("alpha")).toMatch(
			/^https:\/\/public-flavor-logos\.s3\.eu-central-1\.amazonaws\.com\/projects\/\d+\.jpg$/
		);
	});

	it("is deterministic for the same name and number is within 1..49", () => {
		const first = getIllustrationUrl("alpha");
		const second = getIllustrationUrl("alpha");
		expect(first).toBe(second);

		const match = first.match(/\/projects\/(\d+)\.jpg$/);
		expect(match).not.toBeNull();
		const n = Number(match?.[1]);
		expect(Number.isNaN(n)).toBe(false);
		expect(n).toBeGreaterThanOrEqual(1);
		expect(n).toBeLessThanOrEqual(49);
	});
});

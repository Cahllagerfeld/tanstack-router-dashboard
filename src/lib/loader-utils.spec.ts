import { isNotFound } from "@tanstack/react-router";
import { describe, expect, it } from "vitest";

import { FetchError } from "./fetch-error";
import { ensureQueryDataOr404 } from "./loader-utils";

describe("ensureQueryDataOr404", () => {
	it("returns query data unchanged", async () => {
		const project = { id: "project-id", name: "demo" };

		await expect(ensureQueryDataOr404(Promise.resolve(project))).resolves.toBe(
			project
		);
	});

	it("turns a missing resource response into a not-found result", async () => {
		const missing = new FetchError({
			status: 404,
			statusText: "Not Found",
			message: "Project not found",
		});

		await expect(
			ensureQueryDataOr404(Promise.reject(missing))
		).rejects.toSatisfy(isNotFound);
	});

	it("preserves failures other than not found", async () => {
		const unavailable = new FetchError({
			status: 503,
			statusText: "Service Unavailable",
			message: "Try again later",
		});

		await expect(
			ensureQueryDataOr404(Promise.reject(unavailable))
		).rejects.toBe(unavailable);
	});
});

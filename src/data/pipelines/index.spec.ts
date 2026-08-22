import { pipelineKeys, pipelineQueries } from "./index";
import { describe, expect, it } from "vitest";

describe("pipelineQueries", () => {
	it("uses an isolated cache namespace", () => {
		expect(pipelineKeys.all).toEqual(["pipelines"]);
	});

	it("includes the Project filter in the list query identity", () => {
		expect(pipelineQueries.list({ project: "project-name" }).queryKey).toEqual([
			"pipelines",
			"list",
			{ sort_by: "desc:created", project: "project-name" },
		]);
	});
});

import { describe, expect, it } from "vitest";

import { userQueries } from "./queries";

describe("userQueries", () => {
	it("keeps list parameters in the cache identity", () => {
		expect(userQueries.list({ page: 2 }).queryKey).toEqual([
			"users",
			"list",
			{ page: 2, sort_by: "desc:created" },
		]);
	});

	it("lets a caller replace the default sort", () => {
		expect(userQueries.list({ sort_by: "asc:name" }).queryKey).toEqual([
			"users",
			"list",
			{ sort_by: "asc:name" },
		]);
	});
});

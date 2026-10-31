import { describe, expect, it } from "vitest";

import { serverQueries } from "./queries";

describe("serverQueries", () => {
	it("keeps the server info cache identity", () => {
		expect(serverQueries.serverInfo().queryKey).toEqual(["server", "info"]);
	});
});

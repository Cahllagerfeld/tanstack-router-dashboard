import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import { describe, expect, it } from "vitest";

type ShadcnConfig = {
	aliases: Record<string, string>;
};

const repositoryRoot = join(
	dirname(fileURLToPath(import.meta.url)),
	"../../.."
);

describe("shadcn generation configuration", () => {
	it("generates components, utilities, libraries, and hooks into Shared", () => {
		const config = JSON.parse(
			readFileSync(join(repositoryRoot, "components.json"), "utf8")
		) as ShadcnConfig;

		expect(config.aliases).toMatchObject({
			components: "@/shared/components",
			utils: "@/shared/lib/utils",
			ui: "@/shared/components/ui",
			lib: "@/shared/lib",
			hooks: "@/shared/hooks",
		});
	});
});

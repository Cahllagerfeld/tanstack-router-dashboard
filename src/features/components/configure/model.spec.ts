import { describe, expect, it } from "vitest";

import {
	buildCreateComponentBody,
	buildUpdateComponentBody,
	componentFormValues,
	submitErrorMessage,
} from "./model";

const saved = {
	name: "s3-store",
	configuration: {
		path: "s3://bucket",
		client_kwargs: { region_name: "eu-central-1" },
	},
};

describe("componentFormValues", () => {
	it("starts a new Component empty", () => {
		expect(componentFormValues()).toEqual({ name: "", configuration: {} });
	});

	it("edits a copy of the stored configuration", () => {
		const values = componentFormValues(saved);

		expect(values).toEqual(saved);
		expect(values.configuration.client_kwargs).not.toBe(
			saved.configuration.client_kwargs
		);
	});

	it("drops stored nulls, which mean unset", () => {
		expect(
			componentFormValues({
				name: "s3-store",
				configuration: { path: "s3://bucket", key: null, kwargs: { a: null } },
			})
		).toEqual({
			name: "s3-store",
			configuration: { path: "s3://bucket", kwargs: {} },
		});
	});

	it("treats a missing stored configuration as empty", () => {
		expect(
			componentFormValues({ name: "s3-store", configuration: undefined })
		).toEqual({ name: "s3-store", configuration: {} });
	});
});

describe("buildCreateComponentBody", () => {
	it("sends the name, type, Flavor name, and set fields only", () => {
		expect(
			buildCreateComponentBody({
				type: "artifact_store",
				flavorName: "s3",
				values: {
					name: "s3-store",
					configuration: {
						path: "s3://bucket",
						key: undefined,
						client_kwargs: { region_name: undefined, verify: false },
						tags: ["a"],
					},
				},
			})
		).toEqual({
			name: "s3-store",
			type: "artifact_store",
			flavor: "s3",
			configuration: {
				path: "s3://bucket",
				client_kwargs: { verify: false },
				tags: ["a"],
			},
		});
	});
});

describe("buildUpdateComponentBody", () => {
	it("returns null when nothing changed", () => {
		expect(
			buildUpdateComponentBody({
				saved,
				values: {
					name: "s3-store",
					configuration: { ...saved.configuration, key: undefined },
				},
			})
		).toBeNull();
	});

	it("ignores stored nulls when nothing else changed", () => {
		const withNulls = {
			...saved,
			configuration: { ...saved.configuration, key: null },
		};

		expect(
			buildUpdateComponentBody({
				saved: withNulls,
				values: componentFormValues(withNulls),
			})
		).toBeNull();
	});

	it("sends only a changed name", () => {
		expect(
			buildUpdateComponentBody({
				saved,
				values: { ...componentFormValues(saved), name: "renamed" },
			})
		).toEqual({ name: "renamed" });
	});

	it("sends the whole configuration when a nested value changed", () => {
		const values = componentFormValues(saved);
		values.configuration.client_kwargs = { region_name: "us-east-1" };

		expect(buildUpdateComponentBody({ saved, values })).toEqual({
			configuration: {
				path: "s3://bucket",
				client_kwargs: { region_name: "us-east-1" },
			},
		});
	});

	it("sends the configuration when a field was cleared", () => {
		expect(
			buildUpdateComponentBody({
				saved,
				values: {
					name: "s3-store",
					configuration: { path: "s3://bucket", client_kwargs: undefined },
				},
			})
		).toEqual({ configuration: { path: "s3://bucket" } });
	});

	it("sends a first configuration for a Component stored without one", () => {
		expect(
			buildUpdateComponentBody({
				saved: { name: "s3-store", configuration: undefined },
				values: { name: "s3-store", configuration: { path: "s3://bucket" } },
			})
		).toEqual({ configuration: { path: "s3://bucket" } });
	});
});

describe("submitErrorMessage", () => {
	it("shows nothing while nothing failed", () => {
		expect(submitErrorMessage(null, "Failed")).toBeUndefined();
	});

	it("shows the backend message, else the fallback", () => {
		expect(submitErrorMessage(new Error("Name taken"), "Failed")).toBe(
			"Name taken"
		);
		expect(submitErrorMessage(new Error(""), "Failed")).toBe("Failed");
	});
});

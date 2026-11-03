import { useState } from "react";
import type { FieldErrors } from "react-hook-form";
import { describe, expect, test, vi } from "vitest";
import { render } from "vitest-browser-react";

import { m } from "@/paraglide/messages";

import { SchemaForm } from "./schema-form";

/** Trimmed from the s3, datadog, kubernetes, and vm_gcp flavor schemas. */
const schema = {
	$defs: {
		Compression: {
			enum: ["none", "deflate", "gzip"],
			title: "Compression",
			type: "string",
		},
		PodSettings: {
			additionalProperties: true,
			title: "Pod Settings",
			type: "object",
			properties: {
				scheduler_name: {
					anyOf: [{ type: "string" }, { type: "null" }],
					default: null,
					title: "Scheduler Name",
				},
				tolerations: {
					default: [],
					items: { additionalProperties: true, type: "object" },
					title: "Tolerations",
					type: "array",
				},
			},
		},
	},
	additionalProperties: true,
	properties: {
		path: {
			description: "Root path for artifact storage.",
			title: "Path",
			type: "string",
		},
		api_key: {
			format: "password",
			title: "Api Key",
			type: "string",
			writeOnly: true,
		},
		max_queue_size: {
			default: 100000,
			title: "Max Queue Size",
			type: "integer",
		},
		compression: { $ref: "#/$defs/Compression", default: "none" },
		client_kwargs: {
			anyOf: [{ additionalProperties: true, type: "object" }, { type: "null" }],
			default: null,
			title: "Client Kwargs",
		},
		pod_settings: {
			anyOf: [{ $ref: "#/$defs/PodSettings" }, { type: "null" }],
			default: null,
		},
		image_pull_secrets: {
			default: [],
			items: { type: "string" },
			title: "Image Pull Secrets",
			type: "array",
		},
		synchronous: { default: true, title: "Synchronous", type: "boolean" },
		cpus: {
			anyOf: [{ type: "integer" }, { type: "string" }, { type: "null" }],
			default: null,
			title: "Cpus",
		},
	},
	required: ["path", "api_key"],
	title: "TrimmedConfig",
	type: "object",
};

const optionalToggle = m.schema_form_optional_settings({ count: 7 });

async function renderForm({
	value = {},
	errors,
	disabled,
}: {
	value?: Record<string, unknown>;
	errors?: FieldErrors;
	disabled?: boolean;
} = {}) {
	const onChange = vi.fn<(value: Record<string, unknown>) => void>();
	const onInvalidJsonChange = vi.fn<(paths: string[][]) => void>();
	function Harness() {
		const [current, setCurrent] = useState(value);
		return (
			<SchemaForm
				schema={schema}
				value={current}
				errors={errors}
				disabled={disabled}
				onInvalidJsonChange={onInvalidJsonChange}
				onChange={(next) => {
					setCurrent(next);
					onChange(next);
				}}
			/>
		);
	}
	const screen = await render(<Harness />);
	const latest = () => onChange.mock.lastCall?.[0];
	return { screen, onChange, onInvalidJsonChange, latest };
}

describe("SchemaForm", () => {
	test("shows required fields and keeps optional ones behind a closed disclosure", async () => {
		const { screen } = await renderForm();

		await expect.element(screen.getByLabelText(/^Path/)).toBeVisible();
		await expect
			.element(screen.getByLabelText(/^Path/))
			.toHaveAttribute("aria-required", "true");
		await expect.element(screen.getByLabelText(/^Api Key/)).toBeVisible();
		await expect
			.element(screen.getByText("Root path for artifact storage."))
			.toBeVisible();
		await expect
			.element(screen.getByLabelText("Max Queue Size"))
			.not.toBeVisible();

		await screen.getByRole("button", { name: optionalToggle }).click();

		await expect.element(screen.getByLabelText("Max Queue Size")).toBeVisible();
		await expect
			.element(screen.getByLabelText("Max Queue Size"))
			.toHaveAttribute("placeholder", "100000");
		await expect.element(screen.getByText("Pod Settings")).toBeVisible();
		await expect.element(screen.getByLabelText("Scheduler Name")).toBeVisible();
	});

	test("opens the optional settings when one of them holds a value", async () => {
		const { screen } = await renderForm({ value: { max_queue_size: 5 } });

		await expect
			.element(screen.getByLabelText("Max Queue Size"))
			.toHaveValue(5);
	});

	test("reports typed numbers as numbers and an emptied input as unset", async () => {
		const { screen, latest } = await renderForm({
			value: { max_queue_size: 5 },
		});
		const input = screen.getByLabelText("Max Queue Size");

		await input.fill("42");
		await expect.poll(() => latest()?.max_queue_size).toBe(42);

		await input.fill("");
		await expect.poll(() => latest()).toBeDefined();
		await expect.poll(() => latest()?.max_queue_size).toBeUndefined();
	});

	test("keeps keys the schema does not describe through a change", async () => {
		const { screen, latest } = await renderForm({
			value: { legacy_flag: true, pod_settings: { custom: "x" } },
		});

		await screen.getByLabelText(/^Path/).fill("s3://bucket");

		await expect
			.poll(() => latest())
			.toEqual({
				legacy_flag: true,
				pod_settings: { custom: "x" },
				path: "s3://bucket",
			});
	});

	test("reveals and hides a secret", async () => {
		const { screen } = await renderForm();
		const input = screen.getByLabelText(/^Api Key/);

		await expect.element(input).toHaveAttribute("type", "password");
		await screen
			.getByRole("button", { name: m.common_action_show_value() })
			.click();
		await expect.element(input).toHaveAttribute("type", "text");
		await screen
			.getByRole("button", { name: m.common_action_hide_value() })
			.click();
		await expect.element(input).toHaveAttribute("type", "password");
	});

	test("edits structured values as JSON and reports unparsable text", async () => {
		const { screen, latest, onInvalidJsonChange } = await renderForm({
			value: { client_kwargs: { region: "eu" } },
		});
		const textarea = screen.getByLabelText("Client Kwargs");

		await expect
			.element(textarea)
			.toHaveValue(JSON.stringify({ region: "eu" }, null, 2));

		await textarea.fill('{"endpoint_url": "http://minio:9000"}');
		await expect
			.poll(() => latest()?.client_kwargs)
			.toEqual({ endpoint_url: "http://minio:9000" });
		await expect
			.element(screen.getByText(m.schema_form_invalid_json()))
			.not.toBeInTheDocument();

		await textarea.fill('{"endpoint_url": ');
		await expect
			.element(screen.getByText(m.schema_form_invalid_json()))
			.toBeVisible();
		await expect.element(textarea).toHaveValue('{"endpoint_url": ');
		await expect
			.poll(() => onInvalidJsonChange.mock.lastCall?.[0])
			.toEqual([["client_kwargs"]]);
		expect(latest()?.client_kwargs).toEqual({
			endpoint_url: "http://minio:9000",
		});

		await textarea.fill("");
		await expect.poll(() => latest()?.client_kwargs).toBeUndefined();
		await expect.poll(() => onInvalidJsonChange.mock.lastCall?.[0]).toEqual([]);
	});

	test("never passes unparsable text on, even where a string is valid", async () => {
		const { screen, onChange, onInvalidJsonChange } = await renderForm({
			value: { cpus: 2 },
		});
		const textarea = screen.getByRole("textbox", { name: "Cpus" });

		await textarea.fill('{"invalid JSON":');

		await expect
			.poll(() => onInvalidJsonChange.mock.lastCall?.[0])
			.toEqual([["cpus"]]);
		await expect
			.element(screen.getByText(m.schema_form_invalid_json()))
			.toBeVisible();
		expect(onChange).not.toHaveBeenCalled();
	});

	test("shows errors from the surrounding form and opens optional settings for them", async () => {
		const { screen } = await renderForm({
			errors: {
				path: { type: "custom", message: "Path is required" },
				pod_settings: {
					tolerations: { type: "custom", message: "Must be an array" },
				},
			},
		});

		await expect.element(screen.getByText("Path is required")).toBeVisible();
		await expect
			.element(screen.getByLabelText(/^Path/))
			.toHaveAttribute("aria-invalid", "true");
		await expect.element(screen.getByText("Must be an array")).toBeVisible();
	});

	test("adds and removes rows of a scalar array", async () => {
		const { screen, latest } = await renderForm({
			value: { image_pull_secrets: ["one"] },
		});

		await screen
			.getByRole("button", { name: m.schema_form_add_item() })
			.click();
		await screen
			.getByRole("textbox", { name: "Image Pull Secrets-2" })
			.fill("two");
		await expect
			.poll(() => latest()?.image_pull_secrets)
			.toEqual(["one", "two"]);

		await screen
			.getByRole("button", { name: m.schema_form_remove_item() })
			.first()
			.click();
		await expect.poll(() => latest()?.image_pull_secrets).toEqual(["two"]);
	});

	test("picks an enum value from a select", async () => {
		const { screen, latest } = await renderForm({
			value: { compression: "none" },
		});

		await screen.getByRole("combobox", { name: "Compression" }).click();
		await screen.getByRole("option", { name: "gzip" }).click();
		await expect.poll(() => latest()?.compression).toBe("gzip");

		await screen.getByRole("combobox", { name: "Compression" }).click();
		await screen
			.getByRole("option", { name: m.schema_form_select_unset() })
			.click();
		await expect.poll(() => latest()).toBeDefined();
		await expect.poll(() => latest()?.compression).toBeUndefined();
	});

	test("disables every control", async () => {
		const { screen } = await renderForm({
			disabled: true,
			value: { path: "x" },
		});

		await expect.element(screen.getByLabelText(/^Path/)).toBeDisabled();
		await expect.element(screen.getByLabelText(/^Api Key/)).toBeDisabled();
		await screen.getByRole("button", { name: optionalToggle }).click();
		await expect.element(screen.getByLabelText("Client Kwargs")).toBeDisabled();
		await expect
			.element(screen.getByRole("switch", { name: "Synchronous" }))
			.toBeDisabled();
		await expect
			.element(screen.getByRole("button", { name: m.schema_form_add_item() }))
			.toBeDisabled();
	});
});

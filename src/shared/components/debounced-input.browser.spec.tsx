import { expect, test, vi } from "vitest";
import { render } from "vitest-browser-react";

import { DebouncedInput } from "./debounced-input";

test("a user sees input immediately and the consumer receives the settled value", async () => {
	const onChange = vi.fn();
	const screen = await render(
		<DebouncedInput
			aria-label="Project search"
			value=""
			debounceMs={20}
			onChange={onChange}
		/>
	);
	const input = screen.getByRole("textbox", { name: "Project search" });

	await input.fill("fraud");

	await expect.element(input).toHaveValue("fraud");
	await expect.poll(() => onChange.mock.calls).toEqual([["fraud"]]);
});

test("a controlled value replaces the local input value", async () => {
	const screen = await render(
		<DebouncedInput aria-label="Project search" value="fraud" />
	);

	await screen.rerender(
		<DebouncedInput aria-label="Project search" value="pipelines" />
	);

	await expect
		.element(screen.getByRole("textbox", { name: "Project search" }))
		.toHaveValue("pipelines");
});

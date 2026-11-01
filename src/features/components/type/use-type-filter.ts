import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useForm } from "react-hook-form";

import type { ComponentType } from "./model";
import { type TypeFilterForm, typeFilterFormSchema } from "./schema";

/** Pagination restarts because the API rejects a page past the filtered total. */
function useApplyType() {
	const navigate = useNavigate();

	return (type: ComponentType | undefined) =>
		navigate({
			replace: true,
			to: ".",
			search: (prev) => ({ ...prev, type, page: undefined }),
		});
}

export function useClearTypeFilter() {
	const applyType = useApplyType();

	return () => applyType(undefined);
}

export function useTypeFilter(filter: ComponentType | undefined) {
	const [open, setOpen] = useState(false);
	const applyType = useApplyType();
	const form = useForm<TypeFilterForm>({
		resolver: zodResolver(typeFilterFormSchema),
		// The filter can also change outside this form, from the empty state.
		values: { type: filter },
	});

	function handleApplyFilter({ type }: TypeFilterForm) {
		setOpen(false);
		applyType(type);
	}

	function handleClearFilter() {
		form.reset({ type: undefined }, { keepDefaultValues: false });
		handleApplyFilter({ type: undefined });
	}

	return { form, open, setOpen, handleApplyFilter, handleClearFilter };
}

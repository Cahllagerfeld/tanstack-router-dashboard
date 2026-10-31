import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useForm } from "react-hook-form";

import type { ComponentType } from "./model";
import { type TypeFilterForm, typeFilterFormSchema } from "./schema";

export function useTypeFilter(filter: ComponentType | undefined) {
	const [open, setOpen] = useState(false);
	const navigate = useNavigate();
	const form = useForm<TypeFilterForm>({
		resolver: zodResolver(typeFilterFormSchema),
		defaultValues: {
			type: filter,
		},
	});

	function handleApplyFilter({ type }: TypeFilterForm) {
		setOpen(false);
		navigate({
			replace: true,
			to: ".",
			search: (prev) => ({ ...prev, type }),
		});
	}

	function handleClearFilter() {
		form.reset({ type: undefined }, { keepDefaultValues: false });
		handleApplyFilter({ type: undefined });
	}

	return { form, open, setOpen, handleApplyFilter, handleClearFilter };
}

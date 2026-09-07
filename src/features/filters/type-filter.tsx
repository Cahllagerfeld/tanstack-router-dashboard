import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "@tanstack/react-router";
import { Filter, Trash2 } from "lucide-react";
import { type ComponentPropsWithoutRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Field, FieldError } from "@/components/ui/field";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { getComponentTypeLabel } from "@/features/filters/components";
import { COMPONENT_TYPES } from "@/lib/constants/component-types";
import { m } from "@/paraglide/messages";
import type { ComponentType } from "@/types/components";

import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "../../components/ui/popover";

type Props = {
	filter?: ComponentType;
	queryName: string;
};

const filterFormSchema = z.object({
	type: z.enum(COMPONENT_TYPES).optional(),
});

type FilterForm = z.infer<typeof filterFormSchema>;

export function TypeFilter({ filter }: Props) {
	const [open, setOpen] = useState(false);
	const navigate = useNavigate();
	const form = useForm<FilterForm>({
		resolver: zodResolver(filterFormSchema),
		defaultValues: {
			type: filter,
		},
	});

	function handleApplyFilter({ type }: FilterForm) {
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

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger
				render={
					<Button
						data-state={filter ? "active" : "inactive"}
						variant="outline"
						className="h-8 data-[state=active]:border-primary"
					></Button>
				}
			>
				<Filter />
				{getComponentTypeLabel(filter)}
			</PopoverTrigger>
			<PopoverContent align="start" className="space-y-2">
				<div className="flex items-center justify-between">
					<div>{m.components_filter_type()}</div>
					<Button size="icon" variant="ghost" onClick={handleClearFilter}>
						<Trash2 />
						<span className="sr-only">{m.components_filter_clear()}</span>
					</Button>
				</div>
				<form
					onSubmit={form.handleSubmit(handleApplyFilter)}
					className="space-y-4"
				>
					<Controller
						control={form.control}
						name="type"
						render={({ field, fieldState }) => (
							<Field data-invalid={fieldState.invalid}>
								<TypeSelect
									onValueChange={field.onChange}
									value={field.value}
									aria-invalid={fieldState.invalid}
								/>
								{fieldState.invalid && (
									<FieldError errors={[fieldState.error]} />
								)}
							</Field>
						)}
					/>
					<Button className="w-full" type="submit">
						{m.common_action_apply()}
					</Button>
				</form>
			</PopoverContent>
		</Popover>
	);
}

export function TypeSelect({
	...rest
}: ComponentPropsWithoutRef<typeof Select>) {
	return (
		<Select {...rest}>
			<SelectTrigger className="w-full">
				<SelectValue>
					{(value: ComponentType | null) =>
						value ? getComponentTypeLabel(value) : m.components_filter_select()
					}
				</SelectValue>
			</SelectTrigger>
			<SelectContent>
				<SelectGroup>
					{COMPONENT_TYPES.map((value) => (
						<SelectItem value={value} key={value}>
							{getComponentTypeLabel(value)}
						</SelectItem>
					))}
				</SelectGroup>
			</SelectContent>
		</Select>
	);
}

import { Filter, Trash2 } from "lucide-react";
import type { ComponentPropsWithoutRef } from "react";
import { Controller } from "react-hook-form";

import { m } from "@/paraglide/messages";
import { Button } from "@/shared/ui/button";
import { Field, FieldError } from "@/shared/ui/field";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/popover";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/shared/ui/select";

import {
	COMPONENT_TYPES,
	type ComponentType,
	getComponentTypeLabel,
} from "./model";
import { useTypeFilter } from "./use-type-filter";

type Props = {
	filter?: ComponentType;
	queryName: string;
};

export function TypeFilter({ filter }: Props) {
	const { form, open, setOpen, handleApplyFilter, handleClearFilter } =
		useTypeFilter(filter);

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
				{filter ? getComponentTypeLabel(filter) : m.components_filter_type()}
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

function TypeSelect({ ...rest }: ComponentPropsWithoutRef<typeof Select>) {
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

import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from "@/components/ui/form";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { getComponentTypeLabel } from "@/lib/components";
import { COMPONENT_TYPES } from "@/lib/constants/component-types";
import { ComponentType } from "@/types/components";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "@tanstack/react-router";
import { Filter, Trash2 } from "lucide-react";
import { ComponentPropsWithoutRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
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
	type: z.union([z.enum(COMPONENT_TYPES), z.literal("")]),
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
			search: (prev) => ({ ...prev, type: type || undefined }),
		});
	}

	function handleClearFilter() {
		form.reset({ type: "" }, { keepDefaultValues: false });
		handleApplyFilter({ type: "" });
	}

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					data-state={filter ? "active" : "inactive"}
					variant="outline"
					className="data-[state=active]:border-primary"
				>
					<Filter />
					{getComponentTypeLabel(filter) || "Type"}
				</Button>
			</PopoverTrigger>
			<PopoverContent align="start" className="space-y-2">
				<div className="flex items-center justify-between">
					<div>Type</div>
					<Button size="icon" variant="ghost" onClick={handleClearFilter}>
						<Trash2 />
						<span className="sr-only">Clear Filter</span>
					</Button>
				</div>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(handleApplyFilter)}
						className="space-y-4"
					>
						<FormField
							control={form.control}
							name="type"
							render={({ field }) => (
								<FormItem>
									<TypeSelect
										onValueChange={field.onChange}
										value={field.value}
									/>
									<FormMessage />
								</FormItem>
							)}
						></FormField>
						<Button className="w-full" type="submit">
							Apply
						</Button>
					</form>
				</Form>
			</PopoverContent>
		</Popover>
	);
}

export function TypeSelect({
	...rest
}: ComponentPropsWithoutRef<typeof Select>) {
	return (
		<Select {...rest}>
			<SelectTrigger>
				<FormControl>
					<SelectValue placeholder="Select a type..." />
				</FormControl>
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

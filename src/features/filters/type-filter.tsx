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
import { COMPONENT_TYPES } from "@/lib/constants/component-types";
import { ComponentType } from "@/types/components";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "@tanstack/react-router";
import { Trash2 } from "lucide-react";
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
		navigate({
			to: ".",
			search: (prev) => ({ ...prev, type }),
		});
	}

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button variant={!!filter ? "outline" : "ghost"}>
					{filter || "Type"}
				</Button>
			</PopoverTrigger>
			<PopoverContent align="start" className="space-y-2">
				<div className="flex items-center justify-between">
					<div>Type</div>
					<Button
						size="icon"
						variant="ghost"
						onClick={() => {
							handleApplyFilter({ type: undefined });
						}}
					>
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
										value={field.value || ""}
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
							{value}
						</SelectItem>
					))}
				</SelectGroup>
			</SelectContent>
		</Select>
	);
}

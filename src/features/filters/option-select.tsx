import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { ComponentPropsWithoutRef } from "react";
import { FilterOption } from "./filter";

type Props = {
	allowedValues: FilterOption[];
};
export function OptionSelect({
	allowedValues,
	...rest
}: ComponentPropsWithoutRef<typeof Select> & Props) {
	return (
		<Select {...rest}>
			<SelectTrigger>
				<SelectValue placeholder="Select an option" />
			</SelectTrigger>
			<SelectContent>
				<SelectGroup>
					{allowedValues.map((value) => (
						<SelectItem value={value} key={value}>
							{value}
						</SelectItem>
					))}
				</SelectGroup>
			</SelectContent>
		</Select>
	);
}

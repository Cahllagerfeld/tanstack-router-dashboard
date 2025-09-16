import { generateNumberFromSalt } from "@/lib/images";
import { cn } from "@/lib/utils";
import { ComponentProps } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { getClassVariant } from "./fallback-colors";

type CustomProps = {
	username: string;
	avatarUrl: string | undefined;
};

type Props = ComponentProps<"div"> & CustomProps;

export function InlineAvatar({
	username,
	avatarUrl,
	className,
	...rest
}: Props) {
	const salt = generateNumberFromSalt(username ?? "", 4);

	return (
		<div
			className={cn(
				"inline-flex items-center gap-2 whitespace-nowrap",
				className
			)}
			{...rest}
		>
			<Avatar className="size-6 shrink-0">
				<AvatarImage src={avatarUrl} />
				<AvatarFallback className={cn(getClassVariant(salt), "text-sm")}>
					{username[0]}
				</AvatarFallback>
			</Avatar>
			<p className="text-text-sm text-theme-text-primary truncate font-semibold">
				{username}
			</p>
		</div>
	);
}

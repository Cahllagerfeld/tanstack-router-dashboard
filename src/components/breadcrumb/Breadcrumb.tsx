import { Link, isMatch, useMatches } from "@tanstack/react-router";
import { Fragment, type ReactNode } from "react";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export function BreadcrumbsContainer() {
	const matches = useMatches();

	if (matches.some((match) => match.status === "pending")) return null;

	const matchesWithCrumbs = matches.filter((match) =>
		isMatch(match, "loaderData.crumb")
	);

	return (
		<Breadcrumb>
			<BreadcrumbList>
				{matchesWithCrumbs.map((match, index) => {
					const crumb = (
						<Crumb
							image={
								isMatch(match, "loaderData.crumbImage")
									? match.loaderData?.crumbImage
									: undefined
							}
						>
							{match.loaderData?.crumb}
						</Crumb>
					);

					return (
						<Fragment key={match.id}>
							<BreadcrumbItem>
								{index === matchesWithCrumbs.length - 1 ? (
									<BreadcrumbPage className="font-semibold">
										{crumb}
									</BreadcrumbPage>
								) : (
									<BreadcrumbLink render={<Link to={match.fullPath} />}>
										{crumb}
									</BreadcrumbLink>
								)}
							</BreadcrumbItem>
							{index < matchesWithCrumbs.length - 1 ? (
								<BreadcrumbSeparator />
							) : null}
						</Fragment>
					);
				})}
			</BreadcrumbList>
		</Breadcrumb>
	);
}

function Crumb({ image, children }: { image?: string; children: ReactNode }) {
	if (!image) return children;

	return (
		<span className="inline-flex items-center gap-1.5">
			<Avatar className="size-4">
				<AvatarImage className="rounded-sm" src={image} alt="" />
			</Avatar>
			{children}
		</span>
	);
}

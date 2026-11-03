import { useSuspenseQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { ChevronRight, Search } from "lucide-react";
import { useId, useState } from "react";

import { m } from "@/paraglide/messages";
import { TableEmpty } from "@/shared/components/tables/table-empty";
import { getEntityIcon } from "@/shared/lib/entity-icons";
import { buttonVariants } from "@/shared/ui/button";
import {
	InputGroup,
	InputGroupAddon,
	InputGroupInput,
} from "@/shared/ui/input-group";

import { componentQueries } from "../data/queries";
import { type ComponentType, getComponentTypeLabel } from "../type/model";
import { filterFlavors } from "./model";

/** Step 2: the chosen type with a way back, and its Flavors as links to the Configure step. */
export function FlavorStep({ type }: { type: ComponentType }) {
	const headingId = useId();
	const typeLabel = getComponentTypeLabel(type);
	const { data } = useSuspenseQuery(componentQueries.flavorList({ type }));
	const [query, setQuery] = useState("");
	const flavors = filterFlavors(data.items, query);

	return (
		<div className="flex flex-col gap-6">
			<div className="flex items-center gap-3 rounded-lg border px-3 py-2">
				<p className="min-w-0 flex-1 truncate text-sm">
					<span className="text-muted-foreground">{m.common_label_type()}</span>{" "}
					<span className="font-medium">{typeLabel}</span>
				</p>
				<Link
					to="/infra/components/create"
					search={{}}
					className={buttonVariants({ variant: "ghost", size: "sm" })}
				>
					{m.common_action_change()}
				</Link>
			</div>
			<section className="flex flex-col gap-3" aria-labelledby={headingId}>
				<h2 id={headingId} className="text-base font-medium">
					{m.components_create_flavor_heading({ type: typeLabel })}
				</h2>
				{data.items.length === 0 ? (
					<TableEmpty
						icon={getEntityIcon("component")}
						title={m.components_create_flavor_empty_title()}
						description={m.components_create_flavor_empty_description({
							type: typeLabel,
						})}
					/>
				) : (
					<>
						<InputGroup>
							<InputGroupInput
								type="search"
								value={query}
								onChange={(event) => setQuery(event.target.value)}
								placeholder={m.components_create_flavor_search()}
								aria-label={m.components_create_flavor_search()}
							/>
							<InputGroupAddon>
								<Search aria-hidden />
							</InputGroupAddon>
						</InputGroup>
						{flavors.length === 0 ? (
							<p className="py-6 text-center text-sm text-muted-foreground">
								{m.components_create_flavor_no_matches()}
							</p>
						) : (
							<ul className="flex flex-col divide-y rounded-lg border">
								{flavors.map((flavor) => (
									<li key={flavor.id}>
										<Link
											to="/infra/components/create"
											search={{ type, flavor: flavor.id }}
											className="flex items-center gap-3 px-3 py-3 transition-colors outline-none hover:bg-muted/50 focus-visible:bg-muted/50 focus-visible:ring-2 focus-visible:ring-ring/50"
										>
											<span className="flex size-8 shrink-0 items-center justify-center">
												{flavor.logoUrl ? (
													<img
														src={flavor.logoUrl}
														alt=""
														width={28}
														height={28}
														className="size-7 object-contain"
													/>
												) : null}
											</span>
											<span className="flex min-w-0 flex-1 flex-col">
												<span className="truncate text-sm font-medium">
													{flavor.displayName}
												</span>
												{flavor.integration ? (
													<span className="truncate text-xs text-muted-foreground">
														{flavor.integration}
													</span>
												) : null}
											</span>
											<ChevronRight
												aria-hidden
												className="size-4 text-muted-foreground"
											/>
										</Link>
									</li>
								))}
							</ul>
						)}
					</>
				)}
			</section>
		</div>
	);
}

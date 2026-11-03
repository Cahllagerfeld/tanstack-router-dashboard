import { useSuspenseQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { useState } from "react";

import { m } from "@/paraglide/messages";
import { TableEmpty } from "@/shared/components/tables/table-empty";
import { getEntityIcon } from "@/shared/lib/entity-icons";
import {
	InputGroup,
	InputGroupAddon,
	InputGroupInput,
} from "@/shared/ui/input-group";

import { componentQueries } from "../data/queries";
import { type ComponentType, getComponentTypeLabel } from "../type/model";
import { filterFlavors } from "./model";

const FallbackIcon = getEntityIcon("component");

/** Step 2: a search over the type's Flavors, each a tile linking to the Configure step. */
export function FlavorStep({ type }: { type: ComponentType }) {
	const { data } = useSuspenseQuery(componentQueries.flavorList({ type }));
	const [query, setQuery] = useState("");
	const flavors = filterFlavors(data.items, query);

	if (data.items.length === 0)
		return (
			<TableEmpty
				icon={FallbackIcon}
				title={m.components_create_flavor_empty_title()}
				description={m.components_create_flavor_empty_description({
					type: getComponentTypeLabel(type),
				})}
			/>
		);

	return (
		<div className="flex flex-col gap-4">
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
				<ul className="grid grid-cols-1 gap-1.5 sm:grid-cols-2 lg:grid-cols-3">
					{flavors.map((flavor) => (
						<li key={flavor.id} className="min-w-0">
							<Link
								to="/infra/components/create"
								search={{ type, flavor: flavor.id }}
								title={flavor.integration}
								className="flex h-10 items-center gap-2 rounded-lg border px-3 text-left text-sm transition-colors outline-none hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring/50"
							>
								{flavor.logoUrl ? (
									<img
										src={flavor.logoUrl}
										alt=""
										width={16}
										height={16}
										className="size-4 shrink-0 object-contain"
									/>
								) : (
									<FallbackIcon
										aria-hidden
										className="size-4 shrink-0 text-muted-foreground"
									/>
								)}
								<span className="truncate">{flavor.displayName}</span>
							</Link>
						</li>
					))}
				</ul>
			)}
		</div>
	);
}

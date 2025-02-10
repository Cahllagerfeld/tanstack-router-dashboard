import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { flavorQueries } from "@/data/flavors";
import { useSuspenseQuery } from "@tanstack/react-query";

type Props = {
	type: string;
	setFlavor: (val: string) => void;
};

export function FlavorList({ type, setFlavor }: Props) {
	const flavorList = useSuspenseQuery(flavorQueries.flavorList({ type }));

	return (
		<div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
			{flavorList.data.items.map((flavor) => (
				<Button
					key={flavor.id}
					type="button"
					onClick={() => setFlavor(flavor.id)}
					variant="outline"
					className="flex items-center"
				>
					{flavor.body?.logo_url && (
						<img
							src={flavor.body?.logo_url}
							alt={`${flavor.name} logo`}
							className="size-6 shrink-0"
						/>
					)}
					<p>{flavor.name}</p>
				</Button>
			))}
		</div>
	);
}

export function FlavorListSkeleton() {
	return (
		<div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
			{Array.from(
				[1, 2, 3, 4].map((i) => (
					<Skeleton key={i} className="h-12 w-full rounded-md" />
				))
			)}
		</div>
	);
}

import { flavorQueries } from "@/data/flavors";
import { useSuspenseQuery } from "@tanstack/react-query";

type Props = {
	flavorId: string;
};

export function FlavorConfig({ flavorId }: Props) {
	const flavor = useSuspenseQuery(flavorQueries.flavorDetail(flavorId));
	return <p>{flavor.data.body?.type}</p>;
}

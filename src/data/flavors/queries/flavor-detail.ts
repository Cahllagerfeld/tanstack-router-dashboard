import { Flavor } from "@/types/flavor";
import { apiPaths } from "../../api";
import { apiClient } from "../../api-client";

export async function fetchFlavorDetail({ id }: { id: string }) {
	const data = await apiClient<Flavor>(apiPaths.flavors.detail(id));
	return data;
}

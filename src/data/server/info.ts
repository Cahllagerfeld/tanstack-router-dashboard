import { ServerInfo } from "@/types/server";
import { apiPaths, axios } from "../api";

export async function fetchServerInfo(): Promise<ServerInfo> {
	const res = await axios.get<ServerInfo>(apiPaths.info);
	return res.data;
}

import { User } from "@/types/user";
import { apiClient } from "../api-client";
import { apiPaths } from "../api";

export async function fetchCurrentUser() {
	const data = await apiClient<User>(apiPaths.users.currentUser);
	return data;
}

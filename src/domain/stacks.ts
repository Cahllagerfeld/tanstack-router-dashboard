import { parseBackendDate } from "@/lib/dates";
import { components } from "@/types/core";
import { User, userFromApi } from "./users";

export type Stack = {
	id: string;
	name: string;
	user: User | undefined;
	created: Date | undefined;
};

export function stackFromApi(
	apiStack: components["schemas"]["StackResponse"]
): Stack {
	return {
		id: apiStack.id,
		name: apiStack.name,
		user: apiStack.resources?.user
			? userFromApi(apiStack.resources.user)
			: undefined,
		created: apiStack.body?.created
			? parseBackendDate(apiStack.body.created)
			: undefined,
	};
}

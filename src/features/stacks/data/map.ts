import { parseBackendDate } from "@/shared/lib/dates";

import type { Stack } from "../model";
import type { StackDto } from "./dto";

export function stackFromApi(apiStack: StackDto): Stack {
	return {
		id: apiStack.id,
		name: apiStack.name,
		creatorName: apiStack.resources?.user?.name ?? undefined,
		created: apiStack.body?.created
			? parseBackendDate(apiStack.body.created)
			: undefined,
	};
}

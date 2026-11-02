import { parseBackendDate } from "@/shared/lib/dates";

import type { Secret } from "../model";
import type { SecretDto } from "./dto";

export function secretFromApi(apiSecret: SecretDto): Secret {
	return {
		id: apiSecret.id,
		name: apiSecret.name,
		isPrivate: apiSecret.body?.private,
		creatorName: apiSecret.resources?.user?.name ?? undefined,
		created: apiSecret.body?.created
			? parseBackendDate(apiSecret.body.created)
			: undefined,
	};
}

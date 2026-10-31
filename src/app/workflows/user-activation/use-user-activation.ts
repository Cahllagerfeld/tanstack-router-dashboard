import {
	type QueryClient,
	useMutation,
	useQueryClient,
} from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";

import { ensureCurrentIdentity, loginUserRequest } from "@/features/session";
import { type ActivateUserInput, activateUser } from "@/features/users";
import { m } from "@/paraglide/messages";
import type { ApiClientError } from "@/shared/api/errors";

type ActivationResult = { signedIn: boolean };

/**
 * The activation token is single use. Once activation succeeds, a failed login
 * resolves, because retrying the form could only fail on the spent token.
 */
export async function activateAndLogin(
	input: ActivateUserInput
): Promise<ActivationResult> {
	const user = await activateUser(input);
	const { password } = input.body;

	if (!password) return { signedIn: false };

	try {
		await loginUserRequest({ username: user.name, password });
		return { signedIn: true };
	} catch {
		return { signedIn: false };
	}
}

/**
 * A rejection inside `onSuccess` would reach `onError` and offer a retry that
 * can only fail on the spent token, so this reports failure as a value.
 */
async function loadIdentity(queryClient: QueryClient) {
	try {
		await ensureCurrentIdentity(queryClient);
		return true;
	} catch {
		return false;
	}
}

export function useUserActivation() {
	const queryClient = useQueryClient();
	const navigate = useNavigate();

	const { mutate, isPending } = useMutation<
		ActivationResult,
		ApiClientError,
		ActivateUserInput
	>({
		mutationFn: activateAndLogin,
		// The variables hold the token and the password.
		gcTime: 0,
		onSuccess: async ({ signedIn }) => {
			// The visitor may have been signed in as someone else.
			queryClient.clear();

			if (signedIn && (await loadIdentity(queryClient))) {
				toast.success(m.users_activate_success());
				await navigate({ to: "/", replace: true });
				return;
			}

			toast.error(m.users_activate_login_failed());
			await navigate({ to: "/login", replace: true });
		},
		onError: (err) => {
			toast.error(err.message || m.users_activate_failed());
		},
	});

	return { activate: mutate, isPending };
}

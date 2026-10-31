import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { m } from "@/paraglide/messages";

import { userQueries } from "../data/queries";
import { inviteUser } from "../data/requests";
import { buildInviteLink } from "./model";
import { type InviteMemberValues, inviteMemberSchema } from "./schema";

type Options = {
	onInvited: (link: string, name: string) => void;
	onClose: () => void;
};

export function useInviteMemberForm({ onInvited, onClose }: Options) {
	const form = useForm<InviteMemberValues>({
		resolver: zodResolver(inviteMemberSchema),
		defaultValues: {
			username: "",
			isAdmin: false,
		},
	});

	const queryClient = useQueryClient();
	const { mutate, isPending, reset } = useMutation({
		mutationFn: inviteUser,
		// The result holds the activation token, so the cache must not outlive reset.
		gcTime: 0,
		onSuccess: ({ user, activationToken }) => {
			queryClient.invalidateQueries({ queryKey: userQueries.baseKey });
			if (!activationToken) {
				toast.error(m.users_invite_link_missing());
				onClose();
				return;
			}
			onInvited(
				buildInviteLink({
					origin: window.location.origin,
					userId: user.id,
					token: activationToken,
				}),
				user.name
			);
		},
		onError: (err) => {
			toast.error(err.message || m.users_invite_failed());
		},
	});

	function handleInvite({ username, isAdmin }: InviteMemberValues) {
		mutate({ name: username, is_admin: isAdmin });
	}

	/** Forgets the entered values and the mutation result with its token. */
	function resetInvite() {
		form.reset();
		reset();
	}

	return { form, handleInvite, isPending, resetInvite };
}

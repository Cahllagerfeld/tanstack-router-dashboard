import { m } from "@/paraglide/messages";
import {
	ResponsiveAlertDialog,
	ResponsiveAlertDialogAction,
	ResponsiveAlertDialogCancel,
	ResponsiveAlertDialogContent,
	ResponsiveAlertDialogDescription,
	ResponsiveAlertDialogFooter,
	ResponsiveAlertDialogHeader,
	ResponsiveAlertDialogTitle,
} from "@/shared/ui/responsive-alert-dialog";

import type { User } from "../model";
import { useDeleteUser } from "./use-delete-user";

type Props = {
	user: User;
	onClose: () => void;
};

export function DeleteUserAlert({ user, onClose }: Props) {
	const { mutate, isPending } = useDeleteUser({ onDeleted: onClose });

	return (
		<ResponsiveAlertDialog
			open
			onOpenChange={(open) => {
				if (!open) onClose();
			}}
		>
			<ResponsiveAlertDialogContent>
				<ResponsiveAlertDialogHeader>
					<ResponsiveAlertDialogTitle>
						{m.users_delete_title()}
					</ResponsiveAlertDialogTitle>
					<ResponsiveAlertDialogDescription>
						{m.users_delete_description({ name: user.name })}
					</ResponsiveAlertDialogDescription>
				</ResponsiveAlertDialogHeader>
				<ResponsiveAlertDialogFooter className="max-md:py-2">
					<ResponsiveAlertDialogCancel>
						{m.common_action_cancel()}
					</ResponsiveAlertDialogCancel>
					<ResponsiveAlertDialogAction
						variant="destructive"
						disabled={isPending}
						onClick={() => mutate({ userId: user.id })}
					>
						{isPending ? m.users_delete_pending() : m.common_action_delete()}
					</ResponsiveAlertDialogAction>
				</ResponsiveAlertDialogFooter>
			</ResponsiveAlertDialogContent>
		</ResponsiveAlertDialog>
	);
}

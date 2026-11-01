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

type Props = {
	description: string;
	isPending: boolean;
	onConfirm: () => void;
	onClose: () => void;
};

/**
 * Asks for confirmation before a destructive delete. Mount it to open it.
 * A delete cannot be called back once sent, so it stays open while pending.
 */
export function DeleteAlert({
	description,
	isPending,
	onConfirm,
	onClose,
}: Props) {
	return (
		<ResponsiveAlertDialog
			open
			onOpenChange={(open) => {
				if (!open && !isPending) onClose();
			}}
		>
			<ResponsiveAlertDialogContent>
				<ResponsiveAlertDialogHeader>
					<ResponsiveAlertDialogTitle>
						{m.common_delete_title()}
					</ResponsiveAlertDialogTitle>
					<ResponsiveAlertDialogDescription>
						{description}
					</ResponsiveAlertDialogDescription>
				</ResponsiveAlertDialogHeader>
				<ResponsiveAlertDialogFooter className="max-md:py-2">
					<ResponsiveAlertDialogCancel disabled={isPending}>
						{m.common_action_cancel()}
					</ResponsiveAlertDialogCancel>
					<ResponsiveAlertDialogAction
						variant="destructive"
						disabled={isPending}
						onClick={onConfirm}
					>
						{isPending ? m.common_delete_pending() : m.common_action_delete()}
					</ResponsiveAlertDialogAction>
				</ResponsiveAlertDialogFooter>
			</ResponsiveAlertDialogContent>
		</ResponsiveAlertDialog>
	);
}

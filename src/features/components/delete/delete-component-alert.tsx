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

import type { Component } from "../model";
import { useDeleteComponent } from "./use-delete-component";

type Props = {
	component: Component;
	onClose: () => void;
};

export function DeleteComponentAlert({ component, onClose }: Props) {
	const { mutate, isPending } = useDeleteComponent({ onDeleted: onClose });

	return (
		<ResponsiveAlertDialog
			open
			onOpenChange={(open) => {
				// Closing unmounts the mutation, so reopening could submit it again.
				if (!open && !isPending) onClose();
			}}
		>
			<ResponsiveAlertDialogContent>
				<ResponsiveAlertDialogHeader>
					<ResponsiveAlertDialogTitle>
						{m.components_delete_title()}
					</ResponsiveAlertDialogTitle>
					<ResponsiveAlertDialogDescription>
						{m.components_delete_description({ name: component.name })}
					</ResponsiveAlertDialogDescription>
				</ResponsiveAlertDialogHeader>
				<ResponsiveAlertDialogFooter className="max-md:py-2">
					<ResponsiveAlertDialogCancel>
						{m.common_action_cancel()}
					</ResponsiveAlertDialogCancel>
					<ResponsiveAlertDialogAction
						variant="destructive"
						disabled={isPending}
						onClick={() => mutate({ componentId: component.id })}
					>
						{isPending
							? m.components_delete_pending()
							: m.common_action_delete()}
					</ResponsiveAlertDialogAction>
				</ResponsiveAlertDialogFooter>
			</ResponsiveAlertDialogContent>
		</ResponsiveAlertDialog>
	);
}

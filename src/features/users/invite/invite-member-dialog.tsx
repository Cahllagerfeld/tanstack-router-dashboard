import { Plus } from "lucide-react";
import { useState } from "react";

import { m } from "@/paraglide/messages";
import { CopyButton } from "@/shared/components/copy-button";
import { Button } from "@/shared/ui/button";
import { Field, FieldLabel } from "@/shared/ui/field";
import { Input } from "@/shared/ui/input";
import {
	ResponsiveDialog,
	ResponsiveDialogBody,
	ResponsiveDialogClose,
	ResponsiveDialogContent,
	ResponsiveDialogDescription,
	ResponsiveDialogFooter,
	ResponsiveDialogHeader,
	ResponsiveDialogTitle,
	ResponsiveDialogTrigger,
} from "@/shared/ui/responsive-dialog";

import { InviteMemberForm } from "./invite-member-form";
import { useInviteMemberForm } from "./use-invite-member-form";

const FORM_ID = "invite-member-form";

type Invite = {
	link: string;
	name: string;
};

export function InviteMemberDialog() {
	const [open, setOpen] = useState(false);
	const [invite, setInvite] = useState<Invite | null>(null);
	const { form, handleInvite, isPending, resetInvite } = useInviteMemberForm({
		onInvited: (link, name) => setInvite({ link, name }),
		onClose: close,
	});

	function close() {
		setOpen(false);
		setInvite(null);
		resetInvite();
	}

	// The link is only shown once, so a running request must not lose it.
	function handleOpenChange(nextOpen: boolean) {
		if (nextOpen) setOpen(true);
		else if (!isPending) close();
	}

	return (
		<ResponsiveDialog open={open} onOpenChange={handleOpenChange}>
			<ResponsiveDialogTrigger>
				<Button>
					<Plus />
					{m.users_invite_trigger()}
				</Button>
			</ResponsiveDialogTrigger>
			<ResponsiveDialogContent className="sm:max-w-[425px]">
				{invite ? (
					<InviteLink {...invite} />
				) : (
					<>
						<ResponsiveDialogHeader>
							<ResponsiveDialogTitle>
								{m.users_invite_title()}
							</ResponsiveDialogTitle>
							<ResponsiveDialogDescription>
								{m.users_invite_description()}
							</ResponsiveDialogDescription>
						</ResponsiveDialogHeader>
						<ResponsiveDialogBody>
							<InviteMemberForm
								id={FORM_ID}
								form={form}
								onSubmit={form.handleSubmit(handleInvite)}
							/>
						</ResponsiveDialogBody>
						<ResponsiveDialogFooter className="max-md:pt-2">
							<ResponsiveDialogClose asChild>
								<Button variant="outline" disabled={isPending}>
									{m.common_action_cancel()}
								</Button>
							</ResponsiveDialogClose>
							<Button type="submit" form={FORM_ID} disabled={isPending}>
								{m.users_invite_submit()}
							</Button>
						</ResponsiveDialogFooter>
					</>
				)}
			</ResponsiveDialogContent>
		</ResponsiveDialog>
	);
}

function InviteLink({ link, name }: Invite) {
	return (
		<>
			<ResponsiveDialogHeader>
				<ResponsiveDialogTitle>
					{m.users_invite_success_title({ name })}
				</ResponsiveDialogTitle>
				<ResponsiveDialogDescription>
					{m.users_invite_success_description({ name })}
				</ResponsiveDialogDescription>
			</ResponsiveDialogHeader>
			<ResponsiveDialogBody>
				<Field>
					<FieldLabel htmlFor="invite-member-link">
						{m.users_invite_link_label()}
					</FieldLabel>
					<div className="flex items-center gap-2">
						<Input id="invite-member-link" value={link} readOnly />
						<CopyButton value={link} className="size-9 shrink-0" />
					</div>
				</Field>
			</ResponsiveDialogBody>
			<ResponsiveDialogFooter className="max-md:pt-2">
				<ResponsiveDialogClose>{m.common_action_close()}</ResponsiveDialogClose>
			</ResponsiveDialogFooter>
		</>
	);
}

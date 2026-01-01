import * as React from "react";

import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogMedia,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";

// Context for sharing viewport state
type ResponsiveAlertDialogContextValue = {
	isMobile: boolean;
};

const ResponsiveAlertDialogContext =
	React.createContext<ResponsiveAlertDialogContextValue | null>(null);

function useResponsiveAlertDialog() {
	const context = React.useContext(ResponsiveAlertDialogContext);
	if (!context) {
		throw new Error(
			"ResponsiveAlertDialog components must be used within ResponsiveAlertDialog"
		);
	}
	return context;
}

// Root component
type ResponsiveAlertDialogProps = {
	open?: boolean;
	onOpenChange?: (open: boolean) => void;
	children?: React.ReactNode;
	dismissible?: boolean;
};

function ResponsiveAlertDialog({
	open,
	onOpenChange,
	children,
	dismissible = false,
}: ResponsiveAlertDialogProps) {
	const isMobile = useIsMobile();

	return (
		<ResponsiveAlertDialogContext.Provider value={{ isMobile }}>
			{isMobile ? (
				<Drawer
					open={open}
					onOpenChange={onOpenChange}
					dismissible={dismissible}
				>
					{children}
				</Drawer>
			) : (
				<AlertDialog open={open} onOpenChange={onOpenChange}>
					{children}
				</AlertDialog>
			)}
		</ResponsiveAlertDialogContext.Provider>
	);
}

// Trigger component
type ResponsiveAlertDialogTriggerProps = {
	children: React.ReactElement;
};

function ResponsiveAlertDialogTrigger({
	children,
}: ResponsiveAlertDialogTriggerProps) {
	const { isMobile } = useResponsiveAlertDialog();

	if (isMobile) {
		return <DrawerTrigger asChild>{children}</DrawerTrigger>;
	}

	return <AlertDialogTrigger render={children} />;
}

// Content component
type ResponsiveAlertDialogContentProps = {
	className?: string;
	children?: React.ReactNode;
	size?: "default" | "sm";
};

function ResponsiveAlertDialogContent({
	className,
	children,
	size = "default",
}: ResponsiveAlertDialogContentProps) {
	const { isMobile } = useResponsiveAlertDialog();

	if (isMobile) {
		return <DrawerContent className={className}>{children}</DrawerContent>;
	}

	return (
		<AlertDialogContent className={className} size={size}>
			{children}
		</AlertDialogContent>
	);
}

// Header component
function ResponsiveAlertDialogHeader({
	className,
	...props
}: React.ComponentProps<"div">) {
	const { isMobile } = useResponsiveAlertDialog();

	if (isMobile) {
		return <DrawerHeader className={cn("text-left", className)} {...props} />;
	}

	return <AlertDialogHeader className={className} {...props} />;
}

// Footer component
function ResponsiveAlertDialogFooter({
	className,
	...props
}: React.ComponentProps<"div">) {
	const { isMobile } = useResponsiveAlertDialog();

	if (isMobile) {
		return <DrawerFooter className={className} {...props} />;
	}

	return <AlertDialogFooter className={className} {...props} />;
}

// Title component
function ResponsiveAlertDialogTitle({
	className,
	...props
}: React.ComponentProps<"h2">) {
	const { isMobile } = useResponsiveAlertDialog();

	if (isMobile) {
		return <DrawerTitle className={className} {...props} />;
	}

	return <AlertDialogTitle className={className} {...props} />;
}

// Description component
function ResponsiveAlertDialogDescription({
	className,
	...props
}: React.ComponentProps<"p">) {
	const { isMobile } = useResponsiveAlertDialog();

	if (isMobile) {
		return <DrawerDescription className={className} {...props} />;
	}

	return <AlertDialogDescription className={className} {...props} />;
}

// Media component (desktop only - renders nothing on mobile)
function ResponsiveAlertDialogMedia({
	className,
	...props
}: React.ComponentProps<"div">) {
	const { isMobile } = useResponsiveAlertDialog();

	if (isMobile) {
		return null;
	}

	return <AlertDialogMedia className={className} {...props} />;
}

// Action component (primary action button - does NOT close the dialog)
type ResponsiveAlertDialogActionProps = React.ComponentProps<typeof Button>;

function ResponsiveAlertDialogAction({
	className,
	...props
}: ResponsiveAlertDialogActionProps) {
	const { isMobile } = useResponsiveAlertDialog();

	if (isMobile) {
		return <Button className={cn("w-full", className)} {...props} />;
	}

	return <AlertDialogAction className={className} {...props} />;
}

// Cancel component (secondary action - closes the dialog)
type ResponsiveAlertDialogCancelProps = {
	children?: React.ReactNode;
	className?: string;
	variant?: "outline" | "ghost" | "secondary";
};

function ResponsiveAlertDialogCancel({
	children,
	className,
	variant = "outline",
}: ResponsiveAlertDialogCancelProps) {
	const { isMobile } = useResponsiveAlertDialog();

	if (isMobile) {
		return (
			<DrawerClose asChild>
				<Button variant={variant} className={cn("w-full", className)}>
					{children}
				</Button>
			</DrawerClose>
		);
	}

	return (
		<AlertDialogCancel variant={variant} className={className}>
			{children}
		</AlertDialogCancel>
	);
}

// Body component for content between header and footer
function ResponsiveAlertDialogBody({
	className,
	...props
}: React.ComponentProps<"div">) {
	const { isMobile } = useResponsiveAlertDialog();
	return <div className={cn(isMobile ? "px-4" : "", className)} {...props} />;
}

export {
	ResponsiveAlertDialog,
	ResponsiveAlertDialogTrigger,
	ResponsiveAlertDialogContent,
	ResponsiveAlertDialogHeader,
	ResponsiveAlertDialogBody,
	ResponsiveAlertDialogFooter,
	ResponsiveAlertDialogTitle,
	ResponsiveAlertDialogDescription,
	ResponsiveAlertDialogMedia,
	ResponsiveAlertDialogAction,
	ResponsiveAlertDialogCancel,
	useResponsiveAlertDialog,
};

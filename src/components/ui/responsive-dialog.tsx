import * as React from "react";

import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
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
type ResponsiveDialogContextValue = {
	isMobile: boolean;
};

const ResponsiveDialogContext =
	React.createContext<ResponsiveDialogContextValue | null>(null);

function useResponsiveDialog() {
	const context = React.useContext(ResponsiveDialogContext);
	if (!context) {
		throw new Error(
			"ResponsiveDialog components must be used within ResponsiveDialog"
		);
	}
	return context;
}

// Root component
type ResponsiveDialogProps = {
	open?: boolean;
	onOpenChange?: (open: boolean) => void;
	children?: React.ReactNode;
	dismissible?: boolean;
};

function ResponsiveDialog({
	open,
	onOpenChange,
	children,
	dismissible = true,
}: ResponsiveDialogProps) {
	const isMobile = useIsMobile();

	return (
		<ResponsiveDialogContext.Provider value={{ isMobile }}>
			{isMobile ? (
				<Drawer
					open={open}
					onOpenChange={onOpenChange}
					dismissible={dismissible}
				>
					{children}
				</Drawer>
			) : (
				<Dialog open={open} onOpenChange={onOpenChange}>
					{children}
				</Dialog>
			)}
		</ResponsiveDialogContext.Provider>
	);
}

// Trigger component
type ResponsiveDialogTriggerProps = {
	children: React.ReactElement;
};

function ResponsiveDialogTrigger({ children }: ResponsiveDialogTriggerProps) {
	const { isMobile } = useResponsiveDialog();

	if (isMobile) {
		return <DrawerTrigger asChild>{children}</DrawerTrigger>;
	}

	return <DialogTrigger render={children} />;
}

// Content component
type ResponsiveDialogContentProps = {
	className?: string;
	children?: React.ReactNode;
	showCloseButton?: boolean;
};

function ResponsiveDialogContent({
	className,
	children,
	showCloseButton = true,
}: ResponsiveDialogContentProps) {
	const { isMobile } = useResponsiveDialog();

	if (isMobile) {
		return <DrawerContent className={className}>{children}</DrawerContent>;
	}

	return (
		<DialogContent className={className} showCloseButton={showCloseButton}>
			{children}
		</DialogContent>
	);
}

// Header component
function ResponsiveDialogHeader({
	className,
	...props
}: React.ComponentProps<"div">) {
	const { isMobile } = useResponsiveDialog();

	if (isMobile) {
		return <DrawerHeader className={cn("text-left", className)} {...props} />;
	}

	return <DialogHeader className={className} {...props} />;
}

// Footer component
type ResponsiveDialogFooterProps = React.ComponentProps<"div"> & {
	showCloseButton?: boolean;
};

function ResponsiveDialogFooter({
	className,
	showCloseButton = false,
	children,
	...props
}: ResponsiveDialogFooterProps) {
	const { isMobile } = useResponsiveDialog();

	if (isMobile) {
		return (
			<DrawerFooter className={className} {...props}>
				{children}
			</DrawerFooter>
		);
	}

	return (
		<DialogFooter
			className={className}
			showCloseButton={showCloseButton}
			{...props}
		>
			{children}
		</DialogFooter>
	);
}

// Title component
function ResponsiveDialogTitle({
	className,
	...props
}: React.ComponentProps<"h2">) {
	const { isMobile } = useResponsiveDialog();

	if (isMobile) {
		return <DrawerTitle className={className} {...props} />;
	}

	return <DialogTitle className={className} {...props} />;
}

// Description component
function ResponsiveDialogDescription({
	className,
	...props
}: React.ComponentProps<"p">) {
	const { isMobile } = useResponsiveDialog();

	if (isMobile) {
		return <DrawerDescription className={className} {...props} />;
	}

	return <DialogDescription className={className} {...props} />;
}

// Close component
type ResponsiveDialogCloseProps = {
	children?: React.ReactNode;
	className?: string;
	asChild?: boolean;
};

function ResponsiveDialogClose({
	children,
	className,
	asChild = false,
}: ResponsiveDialogCloseProps) {
	const { isMobile } = useResponsiveDialog();

	if (isMobile) {
		if (asChild) {
			return (
				<DrawerClose asChild className={className}>
					{children}
				</DrawerClose>
			);
		}
		return (
			<DrawerClose asChild className={className}>
				<Button variant="outline">{children}</Button>
			</DrawerClose>
		);
	}

	if (asChild) {
		return (
			<DialogClose
				render={children as React.ReactElement}
				className={className}
			/>
		);
	}
	return (
		<DialogClose render={<Button variant="outline" />} className={className}>
			{children}
		</DialogClose>
	);
}

// Body component for content between header and footer
function ResponsiveDialogBody({
	className,
	...props
}: React.ComponentProps<"div">) {
	const { isMobile } = useResponsiveDialog();
	return <div className={cn(isMobile ? "px-4" : "", className)} {...props} />;
}

export {
	ResponsiveDialog,
	ResponsiveDialogTrigger,
	ResponsiveDialogContent,
	ResponsiveDialogHeader,
	ResponsiveDialogBody,
	ResponsiveDialogFooter,
	ResponsiveDialogTitle,
	ResponsiveDialogDescription,
	ResponsiveDialogClose,
	useResponsiveDialog,
};

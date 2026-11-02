import { QueryClientProvider } from "@tanstack/react-query";
import { LazyMotion, MotionConfig } from "motion/react";
import { ThemeProvider } from "next-themes";
import type { ReactNode } from "react";

import { queryClient } from "@/app/query-client";
import { loadMotionFeatures } from "@/shared/lib/motion/load-features";
import { TooltipProvider } from "@/shared/ui/tooltip";

type ProvidersProps = {
	children: ReactNode;
};

export function Providers({ children }: ProvidersProps) {
	return (
		<ThemeProvider attribute="class" defaultTheme="system" enableSystem>
			<QueryClientProvider client={queryClient}>
				<LazyMotion features={loadMotionFeatures} strict>
					<MotionConfig reducedMotion="user">
						<TooltipProvider>{children}</TooltipProvider>
					</MotionConfig>
				</LazyMotion>
			</QueryClientProvider>
		</ThemeProvider>
	);
}

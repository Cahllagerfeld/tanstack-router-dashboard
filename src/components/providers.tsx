import { QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "next-themes";
import type { ReactNode } from "react";
import { queryClient } from "@/lib/query-client";

type ProvidersProps = {
	children: ReactNode;
};

export function Providers({ children }: ProvidersProps) {
	return (
		<ThemeProvider attribute="class" defaultTheme="system" enableSystem>
			<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
		</ThemeProvider>
	);
}

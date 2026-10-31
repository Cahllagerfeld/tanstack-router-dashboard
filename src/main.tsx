import { RouterProvider, createRouter } from "@tanstack/react-router";
import { StrictMode } from "react";

import "@/assets/styles/tailwind.css";
import ReactDOM from "react-dom/client";

import { Providers } from "@/components/providers";
import { DefaultErrorPage } from "@/features/root/ui";
import { queryClient } from "@/lib/query-client";

import { routeTree } from "./routeTree.gen";

const router = createRouter({
	routeTree,
	context: { queryClient },
	defaultPreload: "intent",
	defaultPreloadStaleTime: 0,
	defaultErrorComponent: DefaultErrorPage,
});

declare module "@tanstack/react-router" {
	interface Register {
		router: typeof router;
	}
}

function App() {
	return (
		<Providers>
			<RouterProvider context={{ queryClient }} router={router} />
		</Providers>
	);
}

const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
	const root = ReactDOM.createRoot(rootElement);
	root.render(
		<StrictMode>
			<App />
		</StrictMode>
	);
}

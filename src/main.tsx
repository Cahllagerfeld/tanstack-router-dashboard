import "@/assets/styles/tailwind.css";
import {
	QueryCache,
	QueryClient,
	QueryClientProvider,
} from "@tanstack/react-query";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { StrictMode } from "react";
import ReactDOM from "react-dom/client";

// Import the generated route tree
import { isFetchError } from "./lib/fetch-error";
import { routeTree } from "./routeTree.gen";

// Create a new router instance

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			retry: false,
		},
	},
	queryCache: new QueryCache({
		onError: (error) => {
			if (isFetchError(error)) {
				if (error.status === 401) {
					if (window.location.pathname !== "/login") {
						window.location.assign("/login");
					}
				}
			}
		},
	}),
});

const router = createRouter({
	routeTree,
	context: { queryClient },
	defaultPreload: "intent",
	defaultPreloadStaleTime: 0,
});

// Register the router instance for type safety
declare module "@tanstack/react-router" {
	interface Register {
		router: typeof router;
	}
}

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<RouterProvider context={{ queryClient }} router={router} />
		</QueryClientProvider>
	);
}

// Render the app
const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
	const root = ReactDOM.createRoot(rootElement);
	root.render(
		<StrictMode>
			<App />
		</StrictMode>
	);
}

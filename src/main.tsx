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
import { routeTree } from "./routeTree.gen";
import { AuthProvider, setStoredUser, useAuth } from "./context/auth";
import { isFetchError } from "./lib/fetch-error";

// Create a new router instance

const queryClient = new QueryClient({
	queryCache: new QueryCache({
		onError: (error) => {
			if (isFetchError(error)) {
				if (error.status === 401) {
					setStoredUser(null);
					window.location.assign("/login");
				}
			}
		},
	}),
});

const router = createRouter({
	routeTree,
	context: { queryClient, auth: undefined! },
	defaultPreload: "intent",
	defaultPreloadStaleTime: 0,
});

// Register the router instance for type safety
declare module "@tanstack/react-router" {
	interface Register {
		router: typeof router;
	}
}

function InnerApp() {
	const auth = useAuth();
	return (
		<QueryClientProvider client={queryClient}>
			<RouterProvider context={{ auth }} router={router} />
		</QueryClientProvider>
	);
}

function App() {
	return (
		<AuthProvider>
			<InnerApp />
		</AuthProvider>
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

import {
	Links,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration
} from "@remix-run/react";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Zenml from "~/assets/icons/zenml-icon.svg";
import { queryClient } from "~/lib/query-client";
import { serverQueries } from "./data/server";
import "./tailwind.css";
import { Toaster } from "@zenml-io/react-component-library";

export function Layout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<head>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<Meta />
				<Links />
			</head>
			<body>
				{children}
				<ScrollRestoration />
				<Scripts />
			</body>
		</html>
	);
}

export const clientLoader = async () => {
	const data = await queryClient.ensureQueryData(serverQueries.serverInfo());
	return data;
};

export default function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<Toaster />
			<div className="bg-theme-surface-secondary font-sans font-medium text-theme-text-primary antialiased">
				<Outlet />
			</div>
			<ReactQueryDevtools initialIsOpen={false} buttonPosition="bottom-left" />
		</QueryClientProvider>
	);
}

export function HydrateFallback() {
	return (
		<div className="flex h-screen w-full items-center justify-center">
			<img width={48} height={48} src={Zenml} alt="ZenML Icon" />
		</div>
	);
}

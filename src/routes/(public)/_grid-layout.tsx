import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/(public)/_grid-layout")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div className="relative flex min-h-svh w-full items-center justify-center px-4 lg:px-0">
			<svg
				className="absolute inset-0 z-0 size-full"
				xmlns="http://www.w3.org/2000/svg"
			>
				<defs>
					<pattern
						id="grid"
						width="40"
						height="40"
						patternUnits="userSpaceOnUse"
					>
						<path
							d="M 40 0 L 0 0 0 40"
							fill="none"
							stroke="rgba(0,0,0,0.05)"
							strokeWidth="0.5"
						/>
					</pattern>
				</defs>
				<rect width="100%" height="100%" fill="url(#grid)" />
			</svg>
			<main className="z-10">
				<Outlet />
			</main>
		</div>
	);
}

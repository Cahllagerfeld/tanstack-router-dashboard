import { Outlet } from "@remix-run/react";

export default function GradientLayout() {
	return (
		<div className="relative flex h-full min-h-screen items-center justify-center bg-gradient-light px-4 lg:px-0">
			<div className="flex flex-col items-center pt-7">
				{/* <ZenML className="mb-7 h-7" /> */}
				<Outlet />
			</div>
		</div>
	);
}

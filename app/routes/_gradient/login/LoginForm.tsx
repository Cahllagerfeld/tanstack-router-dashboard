import { Button, Input } from "@zenml-io/react-component-library";

export function LoginForm() {
	return (
		<form className="space-y-5">
			<div className="space-y-2">
				<div className="space-y-0.5">
					<label htmlFor="username" className="text-text-sm">
						Username
					</label>
					<Input id="username" className="w-full" />
				</div>
				<div className="space-y-0.5">
					<label htmlFor="password" className="text-text-sm">
						Password
					</label>
					<Input id="password" type="password" className="w-full" />
				</div>
			</div>
			<Button className="w-full text-center" size="md">
				<span className="w-full">Login</span>
			</Button>
		</form>
	);
}

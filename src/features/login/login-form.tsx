import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useLoginForm } from "./hooks/use-login-form";

export function LoginForm() {
	const { handleLogin, form } = useLoginForm();

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(handleLogin)}
				className="space-y-4"
				id="password"
			>
				<FormField
					control={form.control}
					name="username"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Username</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				></FormField>
				<FormField
					control={form.control}
					name="password"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Password</FormLabel>
							<FormControl>
								<Input type="password" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				></FormField>
				<Button className="w-full">Login</Button>
			</form>
		</Form>
	);
}

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
import { useAuth } from "@/context/auth";
import { useLoginUser } from "@/data/session/login";
import { sleep } from "@/lib/sleep";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const loginSchema = z.object({
	username: z.string().trim().min(1, "Username is required"),
	password: z.string().trim().min(1, "Password is required"),
});

type LoginFormType = z.infer<typeof loginSchema>;

export function LoginForm() {
	const auth = useAuth();
	const router = useRouter();

	const form = useForm<LoginFormType>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			username: "",
			password: "",
		},
	});

	const { mutate } = useLoginUser({
		onSuccess: async (_, { username }) => {
			auth.login(username);
			await router.invalidate();
			// this is a hack to wait for the auth state to update
			await sleep(50);
			router.navigate({ to: "/" });
		},
		onError: (err) => {
			// @ts-expect-error - detail is an array
			toast.error(err.data.detail[1]);
		},
	});

	function handleLogin(values: LoginFormType) {
		mutate(values);
	}

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

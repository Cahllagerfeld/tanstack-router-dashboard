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
import { useLoginUser } from "@/data/session/login";
import { useQueryClient } from "@tanstack/react-query";
import { userQueries } from "@/data/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearch } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const loginSchema = z.object({
	username: z.string().trim().min(1, "Username is required"),
	password: z.string().trim().min(1, "Password is required"),
});

type LoginFormType = z.infer<typeof loginSchema>;

export function LoginForm() {
	const { next } = useSearch({ from: "/(public)/_grid-layout/login" });
	const router = useRouter();
	const queryClient = useQueryClient();

	const form = useForm<LoginFormType>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			username: "",
			password: "",
		},
	});

	const { mutate } = useLoginUser({
		onSuccess: async () => {
			await queryClient.invalidateQueries({ queryKey: ["current-user"] });
			// Ensure cache is warm for guards
			await queryClient.ensureQueryData(userQueries.currentUser());
			router.navigate({ to: next ?? "/" });
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

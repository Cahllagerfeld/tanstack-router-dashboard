import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const passwordStepSchema = z
	.object({
		username: z.string().trim().min(1),
		password: z
			.string()
			.trim()
			.min(8, "Password must be at least 8 characters"),
		confirmPassword: z.string().trim(),
	})
	.refine(
		(data) => {
			return data.password === data.confirmPassword;
		},
		{ path: ["confirmPassword"], message: "Passwords do not match" }
	);
type PasswordForm = z.infer<typeof passwordStepSchema>;

export function PasswordStep() {
	const form = useForm<PasswordForm>({
		resolver: zodResolver(passwordStepSchema),
		defaultValues: {
			username: "",
			password: "",
			confirmPassword: "",
		},
	});

	function handlePasswordStep(values: PasswordForm) {
		toast.success("Server activated!");
		console.log(values);
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(handlePasswordStep)}
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
				<FormField
					control={form.control}
					name="confirmPassword"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Confirm Password</FormLabel>
							<FormControl>
								<Input type="password" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				></FormField>
			</form>
		</Form>
	);
}

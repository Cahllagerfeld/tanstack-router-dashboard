import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useServerActivation } from "@/data/server/activate-server";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import {
	adjectives,
	animals,
	colors,
	uniqueNamesGenerator,
} from "unique-names-generator";
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
	const navigate = useNavigate();
	const form = useForm<PasswordForm>({
		resolver: zodResolver(passwordStepSchema),
		defaultValues: {
			username: "",
			password: "",
			confirmPassword: "",
		},
	});

	const { mutateAsync } = useServerActivation();

	async function handlePasswordStep(values: PasswordForm) {
		try {
			await mutateAsync({
				admin_username: values.username,
				admin_password: values.password,
				server_name: uniqueNamesGenerator({
					dictionaries: [adjectives, colors, animals],
					separator: "-",
				}),
			});
			toast.success("Server activated!");
			navigate({ to: "/" });
		} catch (e) {
			toast.error("Failed to activate server");
		}
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

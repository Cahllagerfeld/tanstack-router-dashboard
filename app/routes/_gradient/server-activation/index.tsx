import { ClientActionFunctionArgs } from "@remix-run/react";
import { SurveyProvider } from "~/components/survey/SurveyContext";
import { updateServerSettings } from "~/data/server/activate-server";
import { loginUser } from "~/data/session/login-user";
import { FetchError, isFetchError } from "~/lib/fetch-error";
import { ServerActivationWizard } from "./Wizard";
import { serverActivationSchema } from "./schema";
import { User } from "~/types/user";

export default function ServerActivation() {
	return (
		<SurveyProvider>
			<ServerActivationWizard />
		</SurveyProvider>
	);
}

type GeneralProps = {
	success: boolean;
} & (ErrorProps | SuccessProps);

type ErrorProps = {
	success: false;
	message: string;
};

type SuccessProps = {
	success: true;
	user: User;
};

export async function clientAction({
	request
}: ClientActionFunctionArgs): Promise<GeneralProps> {
	const formData = await request.formData();
	const parsed = serverActivationSchema.safeParse(Object.fromEntries(formData));
	if (!parsed.success) {
		return { message: "Invalid form data", success: false };
	}
	const { admin_password, admin_username, server_name } = parsed.data;

	try {
		const user = await updateServerSettings({
			admin_password,
			admin_username,
			server_name
		});

		await loginUser({
			username: user.name,
			password: admin_password
		});

		return { success: true, user };
	} catch (e) {
		console.log(isFetchError(e));
		if (isFetchError(e)) {
			return { message: e.message, success: false };
		}
		throw e;
	}
}

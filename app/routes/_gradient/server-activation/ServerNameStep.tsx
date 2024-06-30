import { useToast } from "@zenml-io/react-component-library";
import { Dispatch, SetStateAction, useEffect } from "react";
import { ServerNameForm } from "~/components/survey/ServerName";
import { useSurveyContext } from "~/components/survey/SurveyContext";
import { ServerNameFormType } from "~/components/survey/schemas";
import { useActionData, useSubmit } from "@remix-run/react";
import { clientAction } from ".";
import { useServerActivationContext } from "./ServerActivationContext";

type Props = {
	setUsername: Dispatch<SetStateAction<string>>;
};
export function SetServerNameStep({ setUsername }: Props) {
	const submit = useSubmit();
	const actionData = useActionData<typeof clientAction>();
	const { serverSettings } = useServerActivationContext();
	const { setSurveyStep } = useSurveyContext();

	const { toast } = useToast();

	useEffect(() => {
		if (actionData?.success === false) {
			toast({
				status: "error",
				emphasis: "subtle",
				description: actionData?.message,
				rounded: true
			});
		}
		if (actionData?.success === true) {
			setUsername(actionData.user.name);
			setSurveyStep((prev) => prev + 1);
		}
	}, [actionData]);

	function handlePasswordSubmit({ serverName }: ServerNameFormType) {
		submit(
			{
				...serverSettings,
				server_name: serverName
			} as any,
			{ method: "post" }
		);
	}
	return <ServerNameForm submitHandler={handlePasswordSubmit} />;
}

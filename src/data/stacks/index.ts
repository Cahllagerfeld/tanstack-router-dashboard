import { queryOptions } from "@tanstack/react-query";
import { fetchStacks } from "./queries/stack-list";
import { StackListQueryParams } from "@/types/stacks";

export const stackQueries = {
	stackList: (options: StackListQueryParams = {}) =>
		queryOptions({
			queryFn: () => fetchStacks(options),
			queryKey: ["stacks", options],
		}),
};

import { queryOptions } from "@tanstack/react-query";
import { apiClient } from "./api-client";
import { buildUrlWithQueries } from "@/lib/url";

// ============================================================================
// Types
// ============================================================================

/**
 * Configuration for creating a resource query factory
 */
export type ResourceConfig<
	TListParams extends Record<string, unknown> = Record<string, unknown>,
	TDetailParams extends Record<string, unknown> | undefined = undefined,
> = {
	/** Base key for all queries (e.g., "projects", "users") */
	baseKey: string;
	/** API endpoint paths */
	endpoints: {
		/** Base endpoint for list queries (e.g., "/projects") */
		base: string;
		/** Function to generate detail endpoint, or undefined if no detail query */
		detail?: (id: string) => string;
	};
	/** Default query params for list queries */
	defaultListParams?: Partial<TListParams>;
	/** Default query params for detail queries (only if TDetailParams is provided) */
	defaultDetailParams?: TDetailParams extends Record<string, unknown>
		? Partial<TDetailParams>
		: never;
};

// ============================================================================
// Factory Function
// ============================================================================

/**
 * Creates a query factory for a resource with list and detail queries.
 *
 * @example
 * ```ts
 * // Basic usage (no detail params)
 * export const projectQueries = createResourceQueries<
 *   ProjectList,
 *   Project,
 *   ProjectListParams
 * >({
 *   baseKey: "projects",
 *   endpoints: {
 *     base: "/projects",
 *     detail: (id) => `/projects/${id}`,
 *   },
 *   defaultListParams: { sort_by: "desc:created", size: 10 },
 * });
 *
 * // With detail params
 * export const artifactQueries = createResourceQueries<
 *   ArtifactList,
 *   Artifact,
 *   ArtifactListParams,
 *   ArtifactDetailParams  // Optional 4th type param
 * >({
 *   baseKey: "artifacts",
 *   endpoints: {
 *     base: "/artifacts",
 *     detail: (id) => `/artifacts/${id}`,
 *   },
 *   defaultDetailParams: { hydrate: true },
 * });
 *
 * // Usage
 * projectQueries.detail(id);                    // no params
 * artifactQueries.detail(id, { hydrate: true }); // with params
 * ```
 */
export function createResourceQueries<
	TList,
	TDetail,
	TListParams extends Record<string, unknown> = Record<string, unknown>,
	TDetailParams extends Record<string, unknown> | undefined = undefined,
>(config: ResourceConfig<TListParams, TDetailParams>) {
	const { baseKey, endpoints, defaultListParams } = config;

	// Raw fetchers
	const fetchList = async (params?: TListParams): Promise<TList> => {
		const mergedParams = { ...defaultListParams, ...params };
		const url = buildUrlWithQueries(endpoints.base, mergedParams);
		return apiClient<TList>(url);
	};

	const fetchDetail = async (
		id: string,
		params?: TDetailParams
	): Promise<TDetail> => {
		if (!endpoints.detail) {
			throw new Error(`Detail endpoint not configured for ${baseKey}`);
		}
		const baseUrl = endpoints.detail(id);
		const mergedParams = {
			...(config.defaultDetailParams as Record<string, unknown> | undefined),
			...params,
		};
		const url =
			mergedParams && Object.keys(mergedParams).length > 0
				? buildUrlWithQueries(baseUrl, mergedParams)
				: baseUrl;
		return apiClient<TDetail>(url);
	};

	return {
		/** Base query key for invalidation */
		baseKey: [baseKey] as const,

		/** Query options for fetching a list */
		list: (params?: TListParams) =>
			queryOptions({
				queryKey: [baseKey, params ?? {}] as const,
				queryFn: () => fetchList(params),
			}),

		/** Query options for fetching a single item by ID (optionally with params) */
		detail: (id: string, params?: TDetailParams) =>
			queryOptions({
				queryKey:
					params !== undefined
						? ([baseKey, id, params] as const)
						: ([baseKey, id] as const),
				queryFn: () => fetchDetail(id, params),
			}),

		/** Raw fetch functions for use in mutations or custom queries */
		fetchers: {
			list: fetchList,
			detail: fetchDetail,
		},
	};
}

// ============================================================================
// Mutation Helpers
// ============================================================================

/**
 * Creates a POST mutation function
 */
export function createCreateFn<TPayload, TResponse>(endpoint: string) {
	return async (payload: TPayload): Promise<TResponse> => {
		return apiClient<TResponse>(endpoint, {
			method: "POST",
			body: JSON.stringify(payload),
		});
	};
}

/**
 * Creates a PUT/PATCH mutation function
 */
export function createUpdateFn<TPayload, TResponse>(
	endpoint: (id: string) => string,
	method: "PUT" | "PATCH" = "PUT"
) {
	return async (id: string, payload: TPayload): Promise<TResponse> => {
		return apiClient<TResponse>(endpoint(id), {
			method,
			body: JSON.stringify(payload),
		});
	};
}

/**
 * Creates a DELETE mutation function
 */
export function createDeleteFn(endpoint: (id: string) => string) {
	return async (id: string): Promise<void> => {
		await apiClient<void>(endpoint(id), {
			method: "DELETE",
		});
	};
}

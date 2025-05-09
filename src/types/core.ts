export type paths = {
	"/health": {
		parameters: {
			query?: never;
			header?: never;
			path?: never;
			cookie?: never;
		};
		/**
		 * Health
		 * @description Get health status of the server.
		 *
		 *     Returns:
		 *         String representing the health status of the server.
		 */
		get: operations["health_health_get"];
		put?: never;
		post?: never;
		delete?: never;
		options?: never;
		head?: never;
		patch?: never;
		trace?: never;
	};
	"/api/v1/actions": {
		parameters: {
			query?: never;
			header?: never;
			path?: never;
			cookie?: never;
		};
		/**
		 * List Actions
		 * @description List actions.
		 *
		 *     Args:
		 *         action_filter_model: Filter model used for pagination, sorting,
		 *             filtering.
		 *         hydrate: Flag deciding whether to hydrate the output model(s)
		 *             by including metadata fields in the response.
		 *
		 *     Returns:
		 *         Page of actions.
		 */
		get: operations["list_actions_api_v1_actions_get"];
		put?: never;
		/**
		 * Create Action
		 * @description Creates an action.
		 *
		 *     Args:
		 *         action: Action to create.
		 *
		 *     Raises:
		 *         ValueError: If the action handler for flavor/type is not valid.
		 *
		 *     Returns:
		 *         The created action.
		 */
		post: operations["create_action_api_v1_actions_post"];
		delete?: never;
		options?: never;
		head?: never;
		patch?: never;
		trace?: never;
	};
	"/api/v1/actions/{action_id}": {
		parameters: {
			query?: never;
			header?: never;
			path?: never;
			cookie?: never;
		};
		/**
		 * Get Action
		 * @description Returns the requested action.
		 *
		 *     Args:
		 *         action_id: ID of the action.
		 *         hydrate: Flag deciding whether to hydrate the output model(s)
		 *             by including metadata fields in the response.
		 *
		 *     Raises:
		 *         ValueError: If the action handler for flavor/type is not valid.
		 *
		 *     Returns:
		 *         The requested action.
		 */
		get: operations["get_action_api_v1_actions__action_id__get"];
		/**
		 * Update Action
		 * @description Update an action.
		 *
		 *     Args:
		 *         action_id: ID of the action to update.
		 *         action_update: The action update.
		 *
		 *     Raises:
		 *         ValueError: If the action handler for flavor/type is not valid.
		 *
		 *     Returns:
		 *         The updated action.
		 */
		put: operations["update_action_api_v1_actions__action_id__put"];
		post?: never;
		/**
		 * Delete Action
		 * @description Delete an action.
		 *
		 *     Args:
		 *         action_id: ID of the action.
		 *         force: Flag deciding whether to force delete the action.
		 *
		 *     Raises:
		 *         ValueError: If the action handler for flavor/type is not valid.
		 */
		delete: operations["delete_action_api_v1_actions__action_id__delete"];
		options?: never;
		head?: never;
		patch?: never;
		trace?: never;
	};
	"/api/v1/artifacts": {
		parameters: {
			query?: never;
			header?: never;
			path?: never;
			cookie?: never;
		};
		/**
		 * List Artifacts
		 * @description Get artifacts according to query filters.
		 *
		 *     Args:
		 *         artifact_filter_model: Filter model used for pagination, sorting,
		 *             filtering.
		 *         hydrate: Flag deciding whether to hydrate the output model(s)
		 *             by including metadata fields in the response.
		 *
		 *     Returns:
		 *         The artifacts according to query filters.
		 */
		get: operations["list_artifacts_api_v1_artifacts_get"];
		put?: never;
		/**
		 * Create Artifact
		 * @description Create a new artifact.
		 *
		 *     Args:
		 *         artifact: The artifact to create.
		 *
		 *     Returns:
		 *         The created artifact.
		 */
		post: operations["create_artifact_api_v1_artifacts_post"];
		delete?: never;
		options?: never;
		head?: never;
		patch?: never;
		trace?: never;
	};
	"/api/v1/artifacts/{artifact_id}": {
		parameters: {
			query?: never;
			header?: never;
			path?: never;
			cookie?: never;
		};
		/**
		 * Get Artifact
		 * @description Get an artifact by ID.
		 *
		 *     Args:
		 *         artifact_id: The ID of the artifact to get.
		 *         hydrate: Flag deciding whether to hydrate the output model(s)
		 *             by including metadata fields in the response.
		 *
		 *     Returns:
		 *         The artifact with the given ID.
		 */
		get: operations["get_artifact_api_v1_artifacts__artifact_id__get"];
		/**
		 * Update Artifact
		 * @description Update an artifact by ID.
		 *
		 *     Args:
		 *         artifact_id: The ID of the artifact to update.
		 *         artifact_update: The update to apply to the artifact.
		 *
		 *     Returns:
		 *         The updated artifact.
		 */
		put: operations["update_artifact_api_v1_artifacts__artifact_id__put"];
		post?: never;
		/**
		 * Delete Artifact
		 * @description Delete an artifact by ID.
		 *
		 *     Args:
		 *         artifact_id: The ID of the artifact to delete.
		 */
		delete: operations["delete_artifact_api_v1_artifacts__artifact_id__delete"];
		options?: never;
		head?: never;
		patch?: never;
		trace?: never;
	};
	"/api/v1/artifact_versions": {
		parameters: {
			query?: never;
			header?: never;
			path?: never;
			cookie?: never;
		};
		/**
		 * List Artifact Versions
		 * @description Get artifact versions according to query filters.
		 *
		 *     Args:
		 *         artifact_version_filter_model: Filter model used for pagination,
		 *             sorting, filtering.
		 *         hydrate: Flag deciding whether to hydrate the output model(s)
		 *             by including metadata fields in the response.
		 *         auth_context: The authentication context.
		 *
		 *     Returns:
		 *         The artifact versions according to query filters.
		 */
		get: operations["list_artifact_versions_api_v1_artifact_versions_get"];
		put?: never;
		/**
		 * Create Artifact Version
		 * @description Create a new artifact version.
		 *
		 *     Args:
		 *         artifact_version: The artifact version to create.
		 *
		 *     Returns:
		 *         The created artifact version.
		 */
		post: operations["create_artifact_version_api_v1_artifact_versions_post"];
		/**
		 * Prune Artifact Versions
		 * @description Prunes unused artifact versions and their artifacts.
		 *
		 *     Args:
		 *         project_name_or_id: The project name or ID to prune artifact
		 *             versions for.
		 *         only_versions: Only delete artifact versions, keeping artifacts
		 */
		delete: operations["prune_artifact_versions_api_v1_artifact_versions_delete"];
		options?: never;
		head?: never;
		patch?: never;
		trace?: never;
	};
	"/api/v1/artifact_versions/batch": {
		parameters: {
			query?: never;
			header?: never;
			path?: never;
			cookie?: never;
		};
		get?: never;
		put?: never;
		/**
		 * Batch Create Artifact Version
		 * @description Create a batch of artifact versions.
		 *
		 *     Args:
		 *         artifact_versions: The artifact versions to create.
		 *
		 *     Returns:
		 *         The created artifact versions.
		 */
		post: operations["batch_create_artifact_version_api_v1_artifact_versions_batch_post"];
		delete?: never;
		options?: never;
		head?: never;
		patch?: never;
		trace?: never;
	};
	"/api/v1/artifact_versions/{artifact_version_id}": {
		parameters: {
			query?: never;
			header?: never;
			path?: never;
			cookie?: never;
		};
		/**
		 * Get Artifact Version
		 * @description Get an artifact version by ID.
		 *
		 *     Args:
		 *         artifact_version_id: The ID of the artifact version to get.
		 *         hydrate: Flag deciding whether to hydrate the output model(s)
		 *             by including metadata fields in the response.
		 *
		 *     Returns:
		 *         The artifact version with the given ID.
		 */
		get: operations["get_artifact_version_api_v1_artifact_versions__artifact_version_id__get"];
		/**
		 * Update Artifact Version
		 * @description Update an artifact by ID.
		 *
		 *     Args:
		 *         artifact_version_id: The ID of the artifact version to update.
		 *         artifact_version_update: The update to apply to the artifact version.
		 *
		 *     Returns:
		 *         The updated artifact.
		 */
		put: operations["update_artifact_version_api_v1_artifact_versions__artifact_version_id__put"];
		post?: never;
		/**
		 * Delete Artifact Version
		 * @description Delete an artifact version by ID.
		 *
		 *     Args:
		 *         artifact_version_id: The ID of the artifact version to delete.
		 */
		delete: operations["delete_artifact_version_api_v1_artifact_versions__artifact_version_id__delete"];
		options?: never;
		head?: never;
		patch?: never;
		trace?: never;
	};
	"/api/v1/artifact_versions/{artifact_version_id}/visualize": {
		parameters: {
			query?: never;
			header?: never;
			path?: never;
			cookie?: never;
		};
		/**
		 * Get Artifact Visualization
		 * @description Get the visualization of an artifact.
		 *
		 *     Args:
		 *         artifact_version_id: ID of the artifact version for which to get the visualization.
		 *         index: Index of the visualization to get (if there are multiple).
		 *
		 *     Returns:
		 *         The visualization of the artifact version.
		 */
		get: operations["get_artifact_visualization_api_v1_artifact_versions__artifact_version_id__visualize_get"];
		put?: never;
		post?: never;
		delete?: never;
		options?: never;
		head?: never;
		patch?: never;
		trace?: never;
	};
	"/api/v1/artifact_versions/{artifact_version_id}/download-token": {
		parameters: {
			query?: never;
			header?: never;
			path?: never;
			cookie?: never;
		};
		/**
		 * Get Artifact Download Token
		 * @description Get a download token for the artifact data.
		 *
		 *     Args:
		 *         artifact_version_id: ID of the artifact version for which to get the data.
		 *
		 *     Returns:
		 *         The download token for the artifact data.
		 */
		get: operations["get_artifact_download_token_api_v1_artifact_versions__artifact_version_id__download_token_get"];
		put?: never;
		post?: never;
		delete?: never;
		options?: never;
		head?: never;
		patch?: never;
		trace?: never;
	};
	"/api/v1/artifact_versions/{artifact_version_id}/data": {
		parameters: {
			query?: never;
			header?: never;
			path?: never;
			cookie?: never;
		};
		/**
		 * Download Artifact Data
		 * @description Download the artifact data.
		 *
		 *     Args:
		 *         artifact_version_id: ID of the artifact version for which to get the data.
		 *         token: The token to authenticate the artifact download.
		 *
		 *     Returns:
		 *         The artifact data.
		 */
		get: operations["download_artifact_data_api_v1_artifact_versions__artifact_version_id__data_get"];
		put?: never;
		post?: never;
		delete?: never;
		options?: never;
		head?: never;
		patch?: never;
		trace?: never;
	};
	"/api/v1/login": {
		parameters: {
			query?: never;
			header?: never;
			path?: never;
			cookie?: never;
		};
		get?: never;
		put?: never;
		/**
		 * Token
		 * @description OAuth2 token endpoint.
		 *
		 *     Args:
		 *         request: The request object.
		 *         response: The response object.
		 *         auth_form_data: The OAuth 2.0 authentication form data.
		 *
		 *     Returns:
		 *         An access token or a redirect response.
		 *
		 *     Raises:
		 *         ValueError: If the grant type is invalid.
		 */
		post: operations["token_api_v1_login_post"];
		delete?: never;
		options?: never;
		head?: never;
		patch?: never;
		trace?: never;
	};
	"/api/v1/logout": {
		parameters: {
			query?: never;
			header?: never;
			path?: never;
			cookie?: never;
		};
		/**
		 * Logout
		 * @description Logs out the user.
		 *
		 *     Args:
		 *         response: The response object.
		 */
		get: operations["logout_api_v1_logout_get"];
		put?: never;
		post?: never;
		delete?: never;
		options?: never;
		head?: never;
		patch?: never;
		trace?: never;
	};
	"/api/v1/device_authorization": {
		parameters: {
			query?: never;
			header?: never;
			path?: never;
			cookie?: never;
		};
		get?: never;
		put?: never;
		/**
		 * Device Authorization
		 * @description OAuth2 device authorization endpoint.
		 *
		 *     This endpoint implements the OAuth2 device authorization grant flow as
		 *     defined in https://tools.ietf.org/html/rfc8628. It is called to initiate
		 *     the device authorization flow by requesting a device and user code for a
		 *     given client ID.
		 *
		 *     For a new client ID, a new OAuth device is created, stored in the DB and
		 *     returned to the client along with a pair of newly generated device and user
		 *     codes. If a device for the given client ID already exists, the existing
		 *     DB entry is reused and new device and user codes are generated.
		 *
		 *     Args:
		 *         request: The request object.
		 *         client_id: The client ID.
		 *
		 *     Returns:
		 *         The device authorization response.
		 *
		 *     Raises:
		 *         HTTPException: If the device authorization is not supported.
		 */
		post: operations["device_authorization_api_v1_device_authorization_post"];
		delete?: never;
		options?: never;
		head?: never;
		patch?: never;
		trace?: never;
	};
	"/api/v1/api_token": {
		parameters: {
			query?: never;
			header?: never;
			path?: never;
			cookie?: never;
		};
		/**
		 * Api Token
		 * @description Generate an API token for the current user.
		 *
		 *     Use this endpoint to generate an API token for the current user. Two types
		 *     of API tokens are supported:
		 *
		 *     * Generic API token: This token is short-lived and can be used for
		 *     generic automation tasks. The expiration can be set by the user, but the
		 *     server will impose a maximum expiration time.
		 *     * Workload API token: This token is scoped to a specific pipeline run, step
		 *     run or schedule and is used by pipeline workloads to authenticate with the
		 *     server. A pipeline run ID, step run ID or schedule ID must be provided and
		 *     the generated token will only be valid for the indicated pipeline run, step
		 *     run or schedule. No time limit is imposed on the validity of the token.
		 *     A workload API token can be used to authenticate and generate another
		 *     workload API token, but only for the same schedule, pipeline run ID or step
		 *     run ID, in that order.
		 *
		 *     Args:
		 *         token_type: The type of API token to generate.
		 *         expires_in: The expiration time of the generic API token in seconds.
		 *             If not set, the server will use the default expiration time for
		 *             generic API tokens. The server also imposes a maximum expiration
		 *             time.
		 *         schedule_id: The ID of the schedule to scope the workload API token to.
		 *         pipeline_run_id: The ID of the pipeline run to scope the workload API
		 *             token to.
		 *         auth_context: The authentication context.
		 *
		 *     Returns:
		 *         The API token.
		 *
		 *     Raises:
		 *         AuthorizationException: If not authorized to generate the API token.
		 *         ValueError: If the request is invalid.
		 */
		get: operations["api_token_api_v1_api_token_get"];
		put?: never;
		post?: never;
		delete?: never;
		options?: never;
		head?: never;
		patch?: never;
		trace?: never;
	};
	"/api/v1/devices": {
		parameters: {
			query?: never;
			header?: never;
			path?: never;
			cookie?: never;
		};
		/**
		 * List Authorized Devices
		 * @description Gets a page of OAuth2 authorized devices belonging to the current user.
		 *
		 *     Args:
		 *         filter_model: Filter model used for pagination, sorting,
		 *             filtering.
		 *         hydrate: Flag deciding whether to hydrate the output model(s)
		 *             by including metadata fields in the response.
		 *         auth_context: The current auth context.
		 *
		 *     Returns:
		 *         Page of OAuth2 authorized device objects.
		 */
		get: operations["list_authorized_devices_api_v1_devices_get"];
		put?: never;
		post?: never;
		delete?: never;
		options?: never;
		head?: never;
		patch?: never;
		trace?: never;
	};
	"/api/v1/devices/{device_id}": {
		parameters: {
			query?: never;
			header?: never;
			path?: never;
			cookie?: never;
		};
		/**
		 * Get Authorization Device
		 * @description Gets a specific OAuth2 authorized device using its unique ID.
		 *
		 *     Args:
		 *         device_id: The ID of the OAuth2 authorized device to get.
		 *         user_code: The user code of the OAuth2 authorized device to get. Needs
		 *             to be specified with devices that have not been verified yet.
		 *         hydrate: Flag deciding whether to hydrate the output model(s)
		 *             by including metadata fields in the response.
		 *         auth_context: The current auth context.
		 *
		 *     Returns:
		 *         A specific OAuth2 authorized device object.
		 *
		 *     Raises:
		 *         KeyError: If the device with the given ID does not exist, does not
		 *             belong to the current user or could not be verified using the
		 *             given user code.
		 */
		get: operations["get_authorization_device_api_v1_devices__device_id__get"];
		/**
		 * Update Authorized Device
		 * @description Updates a specific OAuth2 authorized device using its unique ID.
		 *
		 *     Args:
		 *         device_id: The ID of the OAuth2 authorized device to update.
		 *         update: The model containing the attributes to update.
		 *         auth_context: The current auth context.
		 *
		 *     Returns:
		 *         The updated OAuth2 authorized device object.
		 *
		 *     Raises:
		 *         KeyError: If the device with the given ID does not exist or does not
		 *             belong to the current user.
		 */
		put: operations["update_authorized_device_api_v1_devices__device_id__put"];
		post?: never;
		/**
		 * Delete Authorized Device
		 * @description Deletes a specific OAuth2 authorized device using its unique ID.
		 *
		 *     Args:
		 *         device_id: The ID of the OAuth2 authorized device to delete.
		 *         auth_context: The current auth context.
		 *
		 *     Raises:
		 *         KeyError: If the device with the given ID does not exist or does not
		 *             belong to the current user.
		 */
		delete: operations["delete_authorized_device_api_v1_devices__device_id__delete"];
		options?: never;
		head?: never;
		patch?: never;
		trace?: never;
	};
	"/api/v1/devices/{device_id}/verify": {
		parameters: {
			query?: never;
			header?: never;
			path?: never;
			cookie?: never;
		};
		get?: never;
		/**
		 * Verify Authorized Device
		 * @description Verifies a specific OAuth2 authorized device using its unique ID.
		 *
		 *     This endpoint implements the OAuth2 device authorization grant flow as
		 *     defined in https://tools.ietf.org/html/rfc8628. It is called to verify
		 *     the user code for a given device ID.
		 *
		 *     If the user code is valid, the device is marked as verified and associated
		 *     with the user that authorized the device. This association is required to
		 *     be able to issue access tokens or revoke the device later on.
		 *
		 *     Args:
		 *         device_id: The ID of the OAuth2 authorized device to update.
		 *         request: The model containing the verification request.
		 *         auth_context: The current auth context.
		 *
		 *     Returns:
		 *         The updated OAuth2 authorized device object.
		 *
		 *     Raises:
		 *         ValueError: If the device verification request fails.
		 */
		put: operations["verify_authorized_device_api_v1_devices__device_id__verify_put"];
		post?: never;
		delete?: never;
		options?: never;
		head?: never;
		patch?: never;
		trace?: never;
	};
	"/api/v1/code_repositories": {
		parameters: {
			query?: never;
			header?: never;
			path?: never;
			cookie?: never;
		};
		/**
		 * List Code Repositories
		 * @description Gets a page of code repositories.
		 *
		 *     Args:
		 *         filter_model: Filter model used for pagination, sorting,
		 *             filtering.
		 *         project_name_or_id: Optional name or ID of the project.
		 *         hydrate: Flag deciding whether to hydrate the output model(s)
		 *             by including metadata fields in the response.
		 *
		 *     Returns:
		 *         Page of code repository objects.
		 */
		get: operations["list_code_repositories_api_v1_code_repositories_get"];
		put?: never;
		/**
		 * Create Code Repository
		 * @description Creates a code repository.
		 *
		 *     Args:
		 *         code_repository: Code repository to create.
		 *         project_name_or_id: Optional name or ID of the project.
		 *
		 *     Returns:
		 *         The created code repository.
		 */
		post: operations["create_code_repository_api_v1_code_repositories_post"];
		delete?: never;
		options?: never;
		head?: never;
		patch?: never;
		trace?: never;
	};
	"/api/v1/code_repositories/{code_repository_id}": {
		parameters: {
			query?: never;
			header?: never;
			path?: never;
			cookie?: never;
		};
		/**
		 * Get Code Repository
		 * @description Gets a specific code repository using its unique ID.
		 *
		 *     Args:
		 *         code_repository_id: The ID of the code repository to get.
		 *         hydrate: Flag deciding whether to hydrate the output model(s)
		 *             by including metadata fields in the response.
		 *
		 *     Returns:
		 *         A specific code repository object.
		 */
		get: operations["get_code_repository_api_v1_code_repositories__code_repository_id__get"];
		/**
		 * Update Code Repository
		 * @description Updates a code repository.
		 *
		 *     Args:
		 *         code_repository_id: The ID of the code repository to update.
		 *         update: The model containing the attributes to update.
		 *
		 *     Returns:
		 *         The updated code repository object.
		 */
		put: operations["update_code_repository_api_v1_code_repositories__code_repository_id__put"];
		post?: never;
		/**
		 * Delete Code Repository
		 * @description Deletes a specific code repository.
		 *
		 *     Args:
		 *         code_repository_id: The ID of the code repository to delete.
		 */
		delete: operations["delete_code_repository_api_v1_code_repositories__code_repository_id__delete"];
		options?: never;
		head?: never;
		patch?: never;
		trace?: never;
	};
	"/api/v1/plugin-flavors": {
		parameters: {
			query?: never;
			header?: never;
			path?: never;
			cookie?: never;
		};
		/**
		 * List Flavors
		 * @description Returns all event flavors.
		 *
		 *     Args:
		 *         type: The type of Plugin
		 *         subtype: The subtype of the plugin
		 *         page: Page for pagination (offset +1)
		 *         size: Page size for pagination
		 *         hydrate: Whether to hydrate the response bodies
		 *
		 *     Returns:
		 *         A page of flavors.
		 */
		get: operations["list_flavors_api_v1_plugin_flavors_get"];
		put?: never;
		post?: never;
		delete?: never;
		options?: never;
		head?: never;
		patch?: never;
		trace?: never;
	};
	"/api/v1/plugin-flavors/{name}": {
		parameters: {
			query?: never;
			header?: never;
			path?: never;
			cookie?: never;
		};
		/**
		 * Get Flavor
		 * @description Returns the requested flavor.
		 *
		 *     Args:
		 *         name: Name of the flavor.
		 *         type: Type of Plugin
		 *         subtype: Subtype of Plugin
		 *
		 *     Returns:
		 *         The requested flavor response.
		 */
		get: operations["get_flavor_api_v1_plugin_flavors__name__get"];
		put?: never;
		post?: never;
		delete?: never;
		options?: never;
		head?: never;
		patch?: never;
		trace?: never;
	};
	"/api/v1/event-sources": {
		parameters: {
			query?: never;
			header?: never;
			path?: never;
			cookie?: never;
		};
		/**
		 * List Event Sources
		 * @description Returns all event_sources.
		 *
		 *     Args:
		 *         event_source_filter_model: Filter model used for pagination, sorting,
		 *             filtering.
		 *         hydrate: Flag deciding whether to hydrate the output model(s)
		 *             by including metadata fields in the response.
		 *
		 *     Returns:
		 *         All event_sources.
		 */
		get: operations["list_event_sources_api_v1_event_sources_get"];
		put?: never;
		/**
		 * Create Event Source
		 * @description Creates an event source.
		 *
		 *     Args:
		 *         event_source: EventSource to register.
		 *
		 *     Returns:
		 *         The created event source.
		 *
		 *     Raises:
		 *         ValueError: If the plugin for an event source is not a valid event
		 *             source plugin.
		 */
		post: operations["create_event_source_api_v1_event_sources_post"];
		delete?: never;
		options?: never;
		head?: never;
		patch?: never;
		trace?: never;
	};
	"/api/v1/event-sources/{event_source_id}": {
		parameters: {
			query?: never;
			header?: never;
			path?: never;
			cookie?: never;
		};
		/**
		 * Get Event Source
		 * @description Returns the requested event_source.
		 *
		 *     Args:
		 *         event_source_id: ID of the event_source.
		 *         hydrate: Flag deciding whether to hydrate the output model(s)
		 *             by including metadata fields in the response.
		 *
		 *     Returns:
		 *         The requested event_source.
		 *
		 *     Raises:
		 *         ValueError: If the plugin for an event source is not a valid event
		 *             source plugin.
		 */
		get: operations["get_event_source_api_v1_event_sources__event_source_id__get"];
		/**
		 * Update Event Source
		 * @description Updates an event_source.
		 *
		 *     Args:
		 *         event_source_id: Name of the event_source.
		 *         event_source_update: EventSource to use for the update.
		 *
		 *     Returns:
		 *         The updated event_source.
		 *
		 *     Raises:
		 *         ValueError: If the plugin for an event source is not a valid event
		 *             source plugin.
		 */
		put: operations["update_event_source_api_v1_event_sources__event_source_id__put"];
		post?: never;
		/**
		 * Delete Event Source
		 * @description Deletes a event_source.
		 *
		 *     Args:
		 *         event_source_id: Name of the event_source.
		 *         force: Flag deciding whether to force delete the event source.
		 *
		 *     Raises:
		 *         ValueError: If the plugin for an event source is not a valid event
		 *             source plugin.
		 */
		delete: operations["delete_event_source_api_v1_event_sources__event_source_id__delete"];
		options?: never;
		head?: never;
		patch?: never;
		trace?: never;
	};
	"/api/v1/flavors": {
		parameters: {
			query?: never;
			header?: never;
			path?: never;
			cookie?: never;
		};
		/**
		 * List Flavors
		 * @description Returns all flavors.
		 *
		 *     Args:
		 *         flavor_filter_model: Filter model used for pagination, sorting,
		 *                              filtering
		 *         hydrate: Flag deciding whether to hydrate the output model(s)
		 *             by including metadata fields in the response.
		 *
		 *     Returns:
		 *         All flavors.
		 */
		get: operations["list_flavors_api_v1_flavors_get"];
		put?: never;
		/**
		 * Create Flavor
		 * @description Creates a stack component flavor.
		 *
		 *     Args:
		 *         flavor: Stack component flavor to register.
		 *
		 *     Returns:
		 *         The created stack component flavor.
		 */
		post: operations["create_flavor_api_v1_flavors_post"];
		delete?: never;
		options?: never;
		head?: never;
		patch?: never;
		trace?: never;
	};
	"/api/v1/flavors/{flavor_id}": {
		parameters: {
			query?: never;
			header?: never;
			path?: never;
			cookie?: never;
		};
		/**
		 * Get Flavor
		 * @description Returns the requested flavor.
		 *
		 *     Args:
		 *         flavor_id: ID of the flavor.
		 *         hydrate: Flag deciding whether to hydrate the output model(s)
		 *             by including metadata fields in the response.
		 *
		 *     Returns:
		 *         The requested stack.
		 */
		get: operations["get_flavor_api_v1_flavors__flavor_id__get"];
		/**
		 * Update Flavor
		 * @description Updates a flavor.
		 *
		 *     # noqa: DAR401
		 *
		 *     Args:
		 *         flavor_id: ID of the flavor to update.
		 *         flavor_update: Flavor update.
		 *
		 *     Returns:
		 *         The updated flavor.
		 */
		put: operations["update_flavor_api_v1_flavors__flavor_id__put"];
		post?: never;
		/**
		 * Delete Flavor
		 * @description Deletes a flavor.
		 *
		 *     Args:
		 *         flavor_id: ID of the flavor.
		 */
		delete: operations["delete_flavor_api_v1_flavors__flavor_id__delete"];
		options?: never;
		head?: never;
		patch?: never;
		trace?: never;
	};
	"/api/v1/flavors/sync": {
		parameters: {
			query?: never;
			header?: never;
			path?: never;
			cookie?: never;
		};
		get?: never;
		put?: never;
		post?: never;
		delete?: never;
		options?: never;
		head?: never;
		/**
		 * Sync Flavors
		 * @description Purge all in-built and integration flavors from the DB and sync.
		 *
		 *     Returns:
		 *         None if successful. Raises an exception otherwise.
		 */
		patch: operations["sync_flavors_api_v1_flavors_sync_patch"];
		trace?: never;
	};
	"/api/v1/logs/{logs_id}": {
		parameters: {
			query?: never;
			header?: never;
			path?: never;
			cookie?: never;
		};
		/**
		 * Get Logs
		 * @description Returns the requested logs.
		 *
		 *     Args:
		 *         logs_id: ID of the logs.
		 *         hydrate: Flag deciding whether to hydrate the output model(s)
		 *             by including metadata fields in the response.
		 *
		 *     Returns:
		 *         The requested logs.
		 */
		get: operations["get_logs_api_v1_logs__logs_id__get"];
		put?: never;
		post?: never;
		delete?: never;
		options?: never;
		head?: never;
		patch?: never;
		trace?: never;
	};
	"/api/v1/models": {
		parameters: {
			query?: never;
			header?: never;
			path?: never;
			cookie?: never;
		};
		/**
		 * List Models
		 * @description Get models according to query filters.
		 *
		 *     Args:
		 *         model_filter_model: Filter model used for pagination, sorting,
		 *             filtering.
		 *         hydrate: Flag deciding whether to hydrate the output model(s)
		 *             by including metadata fields in the response.
		 *
		 *     Returns:
		 *         The models according to query filters.
		 */
		get: operations["list_models_api_v1_models_get"];
		put?: never;
		/**
		 * Create Model
		 * @description Creates a model.
		 *
		 *     Args:
		 *         model: Model to create.
		 *         project_name_or_id: Optional name or ID of the project.
		 *
		 *     Returns:
		 *         The created model.
		 */
		post: operations["create_model_api_v1_models_post"];
		delete?: never;
		options?: never;
		head?: never;
		patch?: never;
		trace?: never;
	};
	"/api/v1/models/{model_id}": {
		parameters: {
			query?: never;
			header?: never;
			path?: never;
			cookie?: never;
		};
		/**
		 * Get Model
		 * @description Get a model by name or ID.
		 *
		 *     Args:
		 *         model_id: The ID of the model to get.
		 *         hydrate: Flag deciding whether to hydrate the output model(s)
		 *             by including metadata fields in the response.
		 *
		 *     Returns:
		 *         The model with the given name or ID.
		 */
		get: operations["get_model_api_v1_models__model_id__get"];
		/**
		 * Update Model
		 * @description Updates a model.
		 *
		 *     Args:
		 *         model_id: Name of the stack.
		 *         model_update: Stack to use for the update.
		 *
		 *     Returns:
		 *         The updated model.
		 */
		put: operations["update_model_api_v1_models__model_id__put"];
		post?: never;
		/**
		 * Delete Model
		 * @description Delete a model by ID.
		 *
		 *     Args:
		 *         model_id: The ID of the model to delete.
		 */
		delete: operations["delete_model_api_v1_models__model_id__delete"];
		options?: never;
		head?: never;
		patch?: never;
		trace?: never;
	};
	"/api/v1/models/{model_name_or_id}/model_versions": {
		parameters: {
			query?: never;
			header?: never;
			path?: never;
			cookie?: never;
		};
		/**
		 * List Model Versions
		 * @description Get model versions according to query filters.
		 *
		 *     Args:
		 *         model_version_filter_model: Filter model used for pagination, sorting,
		 *             filtering.
		 *         model_name_or_id: Optional name or ID of the model.
		 *         hydrate: Flag deciding whether to hydrate the output model(s)
		 *             by including metadata fields in the response.
		 *         auth_context: The authentication context.
		 *
		 *     Returns:
		 *         The model versions according to query filters.
		 *
		 *     Raises:
		 *         ValueError: If the model is missing from the filter.
		 */
		get: operations["list_model_versions_api_v1_models__model_name_or_id__model_versions_get"];
		put?: never;
		post?: never;
		delete?: never;
		options?: never;
		head?: never;
		patch?: never;
		trace?: never;
	};
	"/api/v1/model_versions": {
		parameters: {
			query?: never;
			header?: never;
			path?: never;
			cookie?: never;
		};
		/**
		 * List Model Versions
		 * @description Get model versions according to query filters.
		 *
		 *     Args:
		 *         model_version_filter_model: Filter model used for pagination, sorting,
		 *             filtering.
		 *         model_name_or_id: Optional name or ID of the model.
		 *         hydrate: Flag deciding whether to hydrate the output model(s)
		 *             by including metadata fields in the response.
		 *         auth_context: The authentication context.
		 *
		 *     Returns:
		 *         The model versions according to query filters.
		 *
		 *     Raises:
		 *         ValueError: If the model is missing from the filter.
		 */
		get: operations["list_model_versions_api_v1_model_versions_get"];
		put?: never;
		/**
		 * Create Model Version
		 * @description Creates a model version.
		 *
		 *     Args:
		 *         model_version: Model version to create.
		 *         model_id: Optional ID of the model.
		 *         project_name_or_id: Optional name or ID of the project.
		 *
		 *     Returns:
		 *         The created model version.
		 */
		post: operations["create_model_version_api_v1_model_versions_post"];
		delete?: never;
		options?: never;
		head?: never;
		patch?: never;
		trace?: never;
	};
	"/api/v1/model_versions/{model_version_id}": {
		parameters: {
			query?: never;
			header?: never;
			path?: never;
			cookie?: never;
		};
		/**
		 * Get Model Version
		 * @description Get a model version by ID.
		 *
		 *     Args:
		 *         model_version_id: id of the model version to be retrieved.
		 *         hydrate: Flag deciding whether to hydrate the output model(s)
		 *             by including metadata fields in the response.
		 *
		 *     Returns:
		 *         The model version with the given name or ID.
		 */
		get: operations["get_model_version_api_v1_model_versions__model_version_id__get"];
		/**
		 * Update Model Version
		 * @description Get all model versions by filter.
		 *
		 *     Args:
		 *         model_version_id: The ID of model version to be updated.
		 *         model_version_update_model: The model version to be updated.
		 *
		 *     Returns:
		 *         An updated model version.
		 */
		put: operations["update_model_version_api_v1_model_versions__model_version_id__put"];
		post?: never;
		/**
		 * Delete Model Version
		 * @description Delete a model by name or ID.
		 *
		 *     Args:
		 *         model_version_id: The name or ID of the model version to delete.
		 */
		delete: operations["delete_model_version_api_v1_model_versions__model_version_id__delete"];
		options?: never;
		head?: never;
		patch?: never;
		trace?: never;
	};
	"/api/v1/model_versions/{model_version_id}/artifacts/{model_version_artifact_link_name_or_id}": {
		parameters: {
			query?: never;
			header?: never;
			path?: never;
			cookie?: never;
		};
		get?: never;
		put?: never;
		post?: never;
		/**
		 * Delete Model Version Artifact Link
		 * @description Deletes a model version to artifact link.
		 *
		 *     Args:
		 *         model_version_id: ID of the model version containing the link.
		 *         model_version_artifact_link_name_or_id: name or ID of the model
		 *             version to artifact link to be deleted.
		 */
		delete: operations["delete_model_version_artifact_link_api_v1_model_versions__model_version_id__artifacts__model_version_artifact_link_name_or_id__delete"];
		options?: never;
		head?: never;
		patch?: never;
		trace?: never;
	};
	"/api/v1/model_versions/{model_version_id}/artifacts": {
		parameters: {
			query?: never;
			header?: never;
			path?: never;
			cookie?: never;
		};
		get?: never;
		put?: never;
		post?: never;
		/**
		 * Delete All Model Version Artifact Links
		 * @description Deletes all model version to artifact links.
		 *
		 *     Args:
		 *         model_version_id: ID of the model version containing links.
		 *         only_links: Whether to only delete the link to the artifact.
		 */
		delete: operations["delete_all_model_version_artifact_links_api_v1_model_versions__model_version_id__artifacts_delete"];
		options?: never;
		head?: never;
		patch?: never;
		trace?: never;
	};
	"/api/v1/model_versions/{model_version_id}/runs/{model_version_pipeline_run_link_name_or_id}": {
		parameters: {
			query?: never;
			header?: never;
			path?: never;
			cookie?: never;
		};
		get?: never;
		put?: never;
		post?: never;
		/**
		 * Delete Model Version Pipeline Run Link
		 * @description Deletes a model version link.
		 *
		 *     Args:
		 *         model_version_id: name or ID of the model version containing the link.
		 *         model_version_pipeline_run_link_name_or_id: name or ID of the model
		 *             version link to be deleted.
		 */
		delete: operations["delete_model_version_pipeline_run_link_api_v1_model_versions__model_version_id__runs__model_version_pipeline_run_link_name_or_id__delete"];
		options?: never;
		head?: never;
		patch?: never;
		trace?: never;
	};
	"/api/v1/model_version_artifacts": {
		parameters: {
			query?: never;
			header?: never;
			path?: never;
			cookie?: never;
		};
		/**
		 * List Model Version Artifact Links
		 * @description Get model version to artifact links according to query filters.
		 *
		 *     Args:
		 *         model_version_artifact_link_filter_model: Filter model used for
		 *             pagination, sorting, filtering.
		 *         hydrate: Flag deciding whether to hydrate the output model(s)
		 *             by including metadata fields in the response.
		 *
		 *     Returns:
		 *         The model version to artifact links according to query filters.
		 */
		get: operations["list_model_version_artifact_links_api_v1_model_version_artifacts_get"];
		put?: never;
		/**
		 * Create Model Version Artifact Link
		 * @description Create a new model version to artifact link.
		 *
		 *     Args:
		 *         model_version_artifact_link: The model version to artifact link to create.
		 *
		 *     Returns:
		 *         The created model version to artifact link.
		 */
		post: operations["create_model_version_artifact_link_api_v1_model_version_artifacts_post"];
		delete?: never;
		options?: never;
		head?: never;
		patch?: never;
		trace?: never;
	};
	"/api/v1/model_version_pipeline_runs": {
		parameters: {
			query?: never;
			header?: never;
			path?: never;
			cookie?: never;
		};
		/**
		 * List Model Version Pipeline Run Links
		 * @description Get model version to pipeline run links according to query filters.
		 *
		 *     Args:
		 *         model_version_pipeline_run_link_filter_model: Filter model used for
		 *             pagination, sorting, and filtering.
		 *         hydrate: Flag deciding whether to hydrate the output model(s)
		 *             by including metadata fields in the response.
		 *
		 *     Returns:
		 *         The model version to pipeline run links according to query filters.
		 */
		get: operations["list_model_version_pipeline_run_links_api_v1_model_version_pipeline_runs_get"];
		put?: never;
		/**
		 * Create Model Version Pipeline Run Link
		 * @description Create a new model version to pipeline run link.
		 *
		 *     Args:
		 *         model_version_pipeline_run_link: The model version to pipeline run link to create.
		 *
		 *     Returns:
		 *         - If Model Version to Pipeline Run Link already exists - returns the existing link.
		 *         - Otherwise, returns the newly created model version to pipeline run link.
		 */
		post: operations["create_model_version_pipeline_run_link_api_v1_model_version_pipeline_runs_post"];
		delete?: never;
		options?: never;
		head?: never;
		patch?: never;
		trace?: never;
	};
	"/api/v1/pipelines": {
		parameters: {
			query?: never;
			header?: never;
			path?: never;
			cookie?: never;
		};
		/**
		 * List Pipelines
		 * @description Gets a list of pipelines.
		 *
		 *     Args:
		 *         pipeline_filter_model: Filter model used for pagination, sorting,
		 *             filtering.
		 *         project_name_or_id: Optional name or ID of the project to filter by.
		 *         hydrate: Flag deciding whether to hydrate the output model(s)
		 *             by including metadata fields in the response.
		 *
		 *     Returns:
		 *         List of pipeline objects matching the filter criteria.
		 */
		get: operations["list_pipelines_api_v1_pipelines_get"];
		put?: never;
		/**
		 * Create Pipeline
		 * @description Creates a pipeline.
		 *
		 *     Args:
		 *         pipeline: Pipeline to create.
		 *         project_name_or_id: Optional name or ID of the project.
		 *
		 *     Returns:
		 *         The created pipeline.
		 */
		post: operations["create_pipeline_api_v1_pipelines_post"];
		delete?: never;
		options?: never;
		head?: never;
		patch?: never;
		trace?: never;
	};
	"/api/v1/pipelines/{pipeline_id}": {
		parameters: {
			query?: never;
			header?: never;
			path?: never;
			cookie?: never;
		};
		/**
		 * Get Pipeline
		 * @description Gets a specific pipeline using its unique id.
		 *
		 *     Args:
		 *         pipeline_id: ID of the pipeline to get.
		 *         hydrate: Flag deciding whether to hydrate the output model(s)
		 *             by including metadata fields in the response.
		 *
		 *     Returns:
		 *         A specific pipeline object.
		 */
		get: operations["get_pipeline_api_v1_pipelines__pipeline_id__get"];
		/**
		 * Update Pipeline
		 * @description Updates the attribute on a specific pipeline using its unique id.
		 *
		 *     Args:
		 *         pipeline_id: ID of the pipeline to get.
		 *         pipeline_update: the model containing the attributes to update.
		 *
		 *     Returns:
		 *         The updated pipeline object.
		 */
		put: operations["update_pipeline_api_v1_pipelines__pipeline_id__put"];
		post?: never;
		/**
		 * Delete Pipeline
		 * @description Deletes a specific pipeline.
		 *
		 *     Args:
		 *         pipeline_id: ID of the pipeline to delete.
		 */
		delete: operations["delete_pipeline_api_v1_pipelines__pipeline_id__delete"];
		options?: never;
		head?: never;
		patch?: never;
		trace?: never;
	};
	"/api/v1/pipelines/{pipeline_id}/runs": {
		parameters: {
			query?: never;
			header?: never;
			path?: never;
			cookie?: never;
		};
		/**
		 * List Pipeline Runs
		 * @description Get pipeline runs according to query filters.
		 *
		 *     Args:
		 *         pipeline_run_filter_model: Filter model used for pagination, sorting,
		 *             filtering
		 *         hydrate: Flag deciding whether to hydrate the output model(s)
		 *             by including metadata fields in the response.
		 *
		 *     Returns:
		 *         The pipeline runs according to query filters.
		 */
		get: operations["list_pipeline_runs_api_v1_pipelines__pipeline_id__runs_get"];
		put?: never;
		post?: never;
		delete?: never;
		options?: never;
		head?: never;
		patch?: never;
		trace?: never;
	};
	"/api/v1/pipeline_builds": {
		parameters: {
			query?: never;
			header?: never;
			path?: never;
			cookie?: never;
		};
		/**
		 * List Builds
		 * @description Gets a list of builds.
		 *
		 *     Args:
		 *         build_filter_model: Filter model used for pagination, sorting,
		 *             filtering.
		 *         project_name_or_id: Optional name or ID of the project to filter by.
		 *         hydrate: Flag deciding whether to hydrate the output model(s)
		 *             by including metadata fields in the response.
		 *
		 *     Returns:
		 *         List of build objects matching the filter criteria.
		 */
		get: operations["list_builds_api_v1_pipeline_builds_get"];
		put?: never;
		/**
		 * Create Build
		 * @description Creates a build, optionally in a specific project.
		 *
		 *     Args:
		 *         build: Build to create.
		 *         project_name_or_id: Optional name or ID of the project.
		 *
		 *     Returns:
		 *         The created build.
		 */
		post: operations["create_build_api_v1_pipeline_builds_post"];
		delete?: never;
		options?: never;
		head?: never;
		patch?: never;
		trace?: never;
	};
	"/api/v1/pipeline_builds/{build_id}": {
		parameters: {
			query?: never;
			header?: never;
			path?: never;
			cookie?: never;
		};
		/**
		 * Get Build
		 * @description Gets a specific build using its unique id.
		 *
		 *     Args:
		 *         build_id: ID of the build to get.
		 *         hydrate: Flag deciding whether to hydrate the output model(s)
		 *             by including metadata fields in the response.
		 *
		 *     Returns:
		 *         A specific build object.
		 */
		get: operations["get_build_api_v1_pipeline_builds__build_id__get"];
		put?: never;
		post?: never;
		/**
		 * Delete Build
		 * @description Deletes a specific build.
		 *
		 *     Args:
		 *         build_id: ID of the build to delete.
		 */
		delete: operations["delete_build_api_v1_pipeline_builds__build_id__delete"];
		options?: never;
		head?: never;
		patch?: never;
		trace?: never;
	};
	"/api/v1/pipeline_deployments": {
		parameters: {
			query?: never;
			header?: never;
			path?: never;
			cookie?: never;
		};
		/**
		 * List Deployments
		 * @description Gets a list of deployments.
		 *
		 *     Args:
		 *         deployment_filter_model: Filter model used for pagination, sorting,
		 *             filtering.
		 *         project_name_or_id: Optional name or ID of the project to filter by.
		 *         hydrate: Flag deciding whether to hydrate the output model(s)
		 *             by including metadata fields in the response.
		 *
		 *     Returns:
		 *         List of deployment objects matching the filter criteria.
		 */
		get: operations["list_deployments_api_v1_pipeline_deployments_get"];
		put?: never;
		/**
		 * Create Deployment
		 * @description Creates a deployment.
		 *
		 *     Args:
		 *         deployment: Deployment to create.
		 *         project_name_or_id: Optional name or ID of the project.
		 *
		 *     Returns:
		 *         The created deployment.
		 */
		post: operations["create_deployment_api_v1_pipeline_deployments_post"];
		delete?: never;
		options?: never;
		head?: never;
		patch?: never;
		trace?: never;
	};
	"/api/v1/pipeline_deployments/{deployment_id}": {
		parameters: {
			query?: never;
			header?: never;
			path?: never;
			cookie?: never;
		};
		/**
		 * Get Deployment
		 * @description Gets a specific deployment using its unique id.
		 *
		 *     Args:
		 *         deployment_id: ID of the deployment to get.
		 *         hydrate: Flag deciding whether to hydrate the output model(s)
		 *             by including metadata fields in the response.
		 *
		 *     Returns:
		 *         A specific deployment object.
		 */
		get: operations["get_deployment_api_v1_pipeline_deployments__deployment_id__get"];
		put?: never;
		post?: never;
		/**
		 * Delete Deployment
		 * @description Deletes a specific deployment.
		 *
		 *     Args:
		 *         deployment_id: ID of the deployment to delete.
		 */
		delete: operations["delete_deployment_api_v1_pipeline_deployments__deployment_id__delete"];
		options?: never;
		head?: never;
		patch?: never;
		trace?: never;
	};
	"/api/v1/pipeline_deployments/{deployment_id}/logs": {
		parameters: {
			query?: never;
			header?: never;
			path?: never;
			cookie?: never;
		};
		/**
		 * Deployment Logs
		 * @description Get deployment logs.
		 *
		 *     Args:
		 *         deployment_id: ID of the deployment.
		 *         offset: The offset from which to start reading.
		 *         length: The amount of bytes that should be read.
		 *
		 *     Returns:
		 *         The deployment logs.
		 *
		 *     Raises:
		 *         KeyError: If no logs are available for the deployment.
		 */
		get: operations["deployment_logs_api_v1_pipeline_deployments__deployment_id__logs_get"];
		put?: never;
		post?: never;
		delete?: never;
		options?: never;
		head?: never;
		patch?: never;
		trace?: never;
	};
	"/api/v1/runs": {
		parameters: {
			query?: never;
			header?: never;
			path?: never;
			cookie?: never;
		};
		/**
		 * List Runs
		 * @description Get pipeline runs according to query filters.
		 *
		 *     Args:
		 *         runs_filter_model: Filter model used for pagination, sorting, filtering.
		 *         project_name_or_id: Optional name or ID of the project.
		 *         hydrate: Flag deciding whether to hydrate the output model(s)
		 *             by including metadata fields in the response.
		 *
		 *     Returns:
		 *         The pipeline runs according to query filters.
		 */
		get: operations["list_runs_api_v1_runs_get"];
		put?: never;
		/**
		 * Get Or Create Pipeline Run
		 * @description Get or create a pipeline run.
		 *
		 *     Args:
		 *         pipeline_run: Pipeline run to create.
		 *         project_name_or_id: Optional name or ID of the project.
		 *
		 *     Returns:
		 *         The pipeline run and a boolean indicating whether the run was created
		 *         or not.
		 */
		post: operations["get_or_create_pipeline_run_api_v1_runs_post"];
		delete?: never;
		options?: never;
		head?: never;
		patch?: never;
		trace?: never;
	};
	"/api/v1/runs/{run_id}": {
		parameters: {
			query?: never;
			header?: never;
			path?: never;
			cookie?: never;
		};
		/**
		 * Get Run
		 * @description Get a specific pipeline run using its ID.
		 *
		 *     Args:
		 *         run_id: ID of the pipeline run to get.
		 *         hydrate: Flag deciding whether to hydrate the output model(s)
		 *             by including metadata fields in the response.
		 *         refresh_status: Flag deciding whether we should try to refresh
		 *             the status of the pipeline run using its orchestrator.
		 *
		 *     Returns:
		 *         The pipeline run.
		 *
		 *     Raises:
		 *         RuntimeError: If the stack or the orchestrator of the run is deleted.
		 */
		get: operations["get_run_api_v1_runs__run_id__get"];
		/**
		 * Update Run
		 * @description Updates a run.
		 *
		 *     Args:
		 *         run_id: ID of the run.
		 *         run_model: Run model to use for the update.
		 *
		 *     Returns:
		 *         The updated run model.
		 */
		put: operations["update_run_api_v1_runs__run_id__put"];
		post?: never;
		/**
		 * Delete Run
		 * @description Deletes a run.
		 *
		 *     Args:
		 *         run_id: ID of the run.
		 */
		delete: operations["delete_run_api_v1_runs__run_id__delete"];
		options?: never;
		head?: never;
		patch?: never;
		trace?: never;
	};
	"/api/v1/runs/{run_id}/steps": {
		parameters: {
			query?: never;
			header?: never;
			path?: never;
			cookie?: never;
		};
		/**
		 * Get Run Steps
		 * @description Get all steps for a given pipeline run.
		 *
		 *     Args:
		 *         run_id: ID of the pipeline run.
		 *         step_run_filter_model: Filter model used for pagination, sorting,
		 *             filtering
		 *
		 *     Returns:
		 *         The steps for a given pipeline run.
		 */
		get: operations["get_run_steps_api_v1_runs__run_id__steps_get"];
		put?: never;
		post?: never;
		delete?: never;
		options?: never;
		head?: never;
		patch?: never;
		trace?: never;
	};
	"/api/v1/runs/{run_id}/pipeline-configuration": {
		parameters: {
			query?: never;
			header?: never;
			path?: never;
			cookie?: never;
		};
		/**
		 * Get Pipeline Configuration
		 * @description Get the pipeline configuration of a specific pipeline run using its ID.
		 *
		 *     Args:
		 *         run_id: ID of the pipeline run to get.
		 *
		 *     Returns:
		 *         The pipeline configuration of the pipeline run.
		 */
		get: operations["get_pipeline_configuration_api_v1_runs__run_id__pipeline_configuration_get"];
		put?: never;
		post?: never;
		delete?: never;
		options?: never;
		head?: never;
		patch?: never;
		trace?: never;
	};
	"/api/v1/runs/{run_id}/status": {
		parameters: {
			query?: never;
			header?: never;
			path?: never;
			cookie?: never;
		};
		/**
		 * Get Run Status
		 * @description Get the status of a specific pipeline run.
		 *
		 *     Args:
		 *         run_id: ID of the pipeline run for which to get the status.
		 *
		 *     Returns:
		 *         The status of the pipeline run.
		 */
		get: operations["get_run_status_api_v1_runs__run_id__status_get"];
		put?: never;
		post?: never;
		delete?: never;
		options?: never;
		head?: never;
		patch?: never;
		trace?: never;
	};
	"/api/v1/runs/{run_id}/refresh": {
		parameters: {
			query?: never;
			header?: never;
			path?: never;
			cookie?: never;
		};
		/**
		 * Refresh Run Status
		 * @description Refreshes the status of a specific pipeline run.
		 *
		 *     Args:
		 *         run_id: ID of the pipeline run to refresh.
		 *
		 *     Raises:
		 *         RuntimeError: If the stack or the orchestrator of the run is deleted.
		 */
		get: operations["refresh_run_status_api_v1_runs__run_id__refresh_get"];
		put?: never;
		post?: never;
		delete?: never;
		options?: never;
		head?: never;
		patch?: never;
		trace?: never;
	};
	"/api/v1/runs/{run_id}/logs": {
		parameters: {
			query?: never;
			header?: never;
			path?: never;
			cookie?: never;
		};
		/**
		 * Run Logs
		 * @description Get pipeline run logs.
		 *
		 *     Args:
		 *         run_id: ID of the pipeline run.
		 *         offset: The offset from which to start reading.
		 *         length: The amount of bytes that should be read.
		 *
		 *     Returns:
		 *         The pipeline run logs.
		 *
		 *     Raises:
		 *         KeyError: If no logs are available for the pipeline run.
		 */
		get: operations["run_logs_api_v1_runs__run_id__logs_get"];
		put?: never;
		post?: never;
		delete?: never;
		options?: never;
		head?: never;
		patch?: never;
		trace?: never;
	};
	"/api/v1/run-metadata": {
		parameters: {
			query?: never;
			header?: never;
			path?: never;
			cookie?: never;
		};
		get?: never;
		put?: never;
		/**
		 * Create Run Metadata
		 * @description Creates run metadata.
		 *
		 *     Args:
		 *         run_metadata: The run metadata to create.
		 *         project_name_or_id: Optional name or ID of the project.
		 *         auth_context: Authentication context.
		 *
		 *     Raises:
		 *         RuntimeError: If the resource type is not supported.
		 */
		post: operations["create_run_metadata_api_v1_run_metadata_post"];
		delete?: never;
		options?: never;
		head?: never;
		patch?: never;
		trace?: never;
	};
	"/api/v1/run_templates": {
		parameters: {
			query?: never;
			header?: never;
			path?: never;
			cookie?: never;
		};
		/**
		 * List Run Templates
		 * @description Get a page of run templates.
		 *
		 *     Args:
		 *         filter_model: Filter model used for pagination, sorting,
		 *             filtering.
		 *         project_name_or_id: Optional name or ID of the project.
		 *         hydrate: Flag deciding whether to hydrate the output model(s)
		 *             by including metadata fields in the response.
		 *
		 *     Returns:
		 *         Page of run templates.
		 */
		get: operations["list_run_templates_api_v1_run_templates_get"];
		put?: never;
		/**
		 * Create Run Template
		 * @description Create a run template.
		 *
		 *     Args:
		 *         run_template: Run template to create.
		 *         project_name_or_id: Optional name or ID of the project.
		 *
		 *     Returns:
		 *         The created run template.
		 */
		post: operations["create_run_template_api_v1_run_templates_post"];
		delete?: never;
		options?: never;
		head?: never;
		patch?: never;
		trace?: never;
	};
	"/api/v1/run_templates/{template_id}": {
		parameters: {
			query?: never;
			header?: never;
			path?: never;
			cookie?: never;
		};
		/**
		 * Get Run Template
		 * @description Get a run template.
		 *
		 *     Args:
		 *         template_id: ID of the run template to get.
		 *         hydrate: Flag deciding whether to hydrate the output model(s)
		 *             by including metadata fields in the response.
		 *
		 *     Returns:
		 *         The run template.
		 */
		get: operations["get_run_template_api_v1_run_templates__template_id__get"];
		/**
		 * Update Run Template
		 * @description Update a run template.
		 *
		 *     Args:
		 *         template_id: ID of the run template to get.
		 *         update: The updates to apply.
		 *
		 *     Returns:
		 *         The updated run template.
		 */
		put: operations["update_run_template_api_v1_run_templates__template_id__put"];
		post?: never;
		/**
		 * Delete Run Template
		 * @description Delete a run template.
		 *
		 *     Args:
		 *         template_id: ID of the run template to delete.
		 */
		delete: operations["delete_run_template_api_v1_run_templates__template_id__delete"];
		options?: never;
		head?: never;
		patch?: never;
		trace?: never;
	};
	"/api/v1/schedules": {
		parameters: {
			query?: never;
			header?: never;
			path?: never;
			cookie?: never;
		};
		/**
		 * List Schedules
		 * @description Gets a list of schedules.
		 *
		 *     Args:
		 *         schedule_filter_model: Filter model used for pagination, sorting,
		 *             filtering
		 *         project_name_or_id: Optional name or ID of the project.
		 *         hydrate: Flag deciding whether to hydrate the output model(s)
		 *             by including metadata fields in the response.
		 *
		 *     Returns:
		 *         List of schedule objects.
		 */
		get: operations["list_schedules_api_v1_schedules_get"];
		put?: never;
		/**
		 * Create Schedule
		 * @description Creates a schedule.
		 *
		 *     Args:
		 *         schedule: Schedule to create.
		 *         project_name_or_id: Optional name or ID of the project.
		 *         auth_context: Authentication context.
		 *
		 *     Returns:
		 *         The created schedule.
		 */
		post: operations["create_schedule_api_v1_schedules_post"];
		delete?: never;
		options?: never;
		head?: never;
		patch?: never;
		trace?: never;
	};
	"/api/v1/schedules/{schedule_id}": {
		parameters: {
			query?: never;
			header?: never;
			path?: never;
			cookie?: never;
		};
		/**
		 * Get Schedule
		 * @description Gets a specific schedule using its unique id.
		 *
		 *     Args:
		 *         schedule_id: ID of the schedule to get.
		 *         hydrate: Flag deciding whether to hydrate the output model(s)
		 *             by including metadata fields in the response.
		 *
		 *     Returns:
		 *         A specific schedule object.
		 */
		get: operations["get_schedule_api_v1_schedules__schedule_id__get"];
		/**
		 * Update Schedule
		 * @description Updates the attribute on a specific schedule using its unique id.
		 *
		 *     Args:
		 *         schedule_id: ID of the schedule to get.
		 *         schedule_update: the model containing the attributes to update.
		 *
		 *     Returns:
		 *         The updated schedule object.
		 */
		put: operations["update_schedule_api_v1_schedules__schedule_id__put"];
		post?: never;
		/**
		 * Delete Schedule
		 * @description Deletes a specific schedule using its unique id.
		 *
		 *     Args:
		 *         schedule_id: ID of the schedule to delete.
		 */
		delete: operations["delete_schedule_api_v1_schedules__schedule_id__delete"];
		options?: never;
		head?: never;
		patch?: never;
		trace?: never;
	};
	"/api/v1/secrets": {
		parameters: {
			query?: never;
			header?: never;
			path?: never;
			cookie?: never;
		};
		/**
		 * List Secrets
		 * @description Gets a list of secrets.
		 *
		 *     Args:
		 *         secret_filter_model: Filter model used for pagination, sorting,
		 *             filtering.
		 *         hydrate: Flag deciding whether to hydrate the output model(s)
		 *             by including metadata fields in the response.
		 *
		 *     Returns:
		 *         List of secret objects.
		 */
		get: operations["list_secrets_api_v1_secrets_get"];
		put?: never;
		/**
		 * Create Secret
		 * @description Creates a secret.
		 *
		 *     Args:
		 *         secret: Secret to create.
		 *         workspace_name_or_id: Optional name or ID of the workspace.
		 *
		 *     Returns:
		 *         The created secret.
		 */
		post: operations["create_secret_api_v1_secrets_post"];
		delete?: never;
		options?: never;
		head?: never;
		patch?: never;
		trace?: never;
	};
	"/api/v1/secrets/{secret_id}": {
		parameters: {
			query?: never;
			header?: never;
			path?: never;
			cookie?: never;
		};
		/**
		 * Get Secret
		 * @description Gets a specific secret using its unique id.
		 *
		 *     Args:
		 *         secret_id: ID of the secret to get.
		 *         hydrate: Flag deciding whether to hydrate the output model(s)
		 *             by including metadata fields in the response.
		 *
		 *     Returns:
		 *         A specific secret object.
		 */
		get: operations["get_secret_api_v1_secrets__secret_id__get"];
		/**
		 * Update Secret
		 * @description Updates the attribute on a specific secret using its unique id.
		 *
		 *     Args:
		 *         secret_id: ID of the secret to get.
		 *         secret_update: the model containing the attributes to update.
		 *         patch_values: Whether to patch the secret values or replace them.
		 *
		 *     Returns:
		 *         The updated secret object.
		 */
		put: operations["update_secret_api_v1_secrets__secret_id__put"];
		post?: never;
		/**
		 * Delete Secret
		 * @description Deletes a specific secret using its unique id.
		 *
		 *     Args:
		 *         secret_id: ID of the secret to delete.
		 */
		delete: operations["delete_secret_api_v1_secrets__secret_id__delete"];
		options?: never;
		head?: never;
		patch?: never;
		trace?: never;
	};
	"/api/v1/secrets_operations/backup": {
		parameters: {
			query?: never;
			header?: never;
			path?: never;
			cookie?: never;
		};
		get?: never;
		/**
		 * Backup Secrets
		 * @description Backs up all secrets in the secrets store to the backup secrets store.
		 *
		 *     Args:
		 *         ignore_errors: Whether to ignore individual errors when backing up
		 *             secrets and continue with the backup operation until all secrets
		 *             have been backed up.
		 *         delete_secrets: Whether to delete the secrets that have been
		 *             successfully backed up from the primary secrets store. Setting
		 *             this flag effectively moves all secrets from the primary secrets
		 *             store to the backup secrets store.
		 */
		put: operations["backup_secrets_api_v1_secrets_operations_backup_put"];
		post?: never;
		delete?: never;
		options?: never;
		head?: never;
		patch?: never;
		trace?: never;
	};
	"/api/v1/secrets_operations/restore": {
		parameters: {
			query?: never;
			header?: never;
			path?: never;
			cookie?: never;
		};
		get?: never;
		/**
		 * Restore Secrets
		 * @description Restores all secrets from the backup secrets store into the main secrets store.
		 *
		 *     Args:
		 *         ignore_errors: Whether to ignore individual errors when restoring
		 *             secrets and continue with the restore operation until all secrets
		 *             have been restored.
		 *         delete_secrets: Whether to delete the secrets that have been
		 *             successfully restored from the backup secrets store. Setting
		 *             this flag effectively moves all secrets from the backup secrets
		 *             store to the primary secrets store.
		 */
		put: operations["restore_secrets_api_v1_secrets_operations_restore_put"];
		post?: never;
		delete?: never;
		options?: never;
		head?: never;
		patch?: never;
		trace?: never;
	};
	"/api/v1/version": {
		parameters: {
			query?: never;
			header?: never;
			path?: never;
			cookie?: never;
		};
		/**
		 * Version
		 * @description Get version of the server.
		 *
		 *     Returns:
		 *         String representing the version of the server.
		 */
		get: operations["version_api_v1_version_get"];
		put?: never;
		post?: never;
		delete?: never;
		options?: never;
		head?: never;
		patch?: never;
		trace?: never;
	};
	"/api/v1/info": {
		parameters: {
			query?: never;
			header?: never;
			path?: never;
			cookie?: never;
		};
		/**
		 * Server Info
		 * @description Get information about the server.
		 *
		 *     Returns:
		 *         Information about the server.
		 */
		get: operations["server_info_api_v1_info_get"];
		put?: never;
		post?: never;
		delete?: never;
		options?: never;
		head?: never;
		patch?: never;
		trace?: never;
	};
	"/api/v1/load-info": {
		parameters: {
			query?: never;
			header?: never;
			path?: never;
			cookie?: never;
		};
		/**
		 * Server Load Info
		 * @description Get information about the server load.
		 *
		 *     Returns:
		 *         Information about the server load.
		 */
		get: operations["server_load_info_api_v1_load_info_get"];
		put?: never;
		post?: never;
		delete?: never;
		options?: never;
		head?: never;
		patch?: never;
		trace?: never;
	};
	"/api/v1/onboarding_state": {
		parameters: {
			query?: never;
			header?: never;
			path?: never;
			cookie?: never;
		};
		/**
		 * Get Onboarding State
		 * @description Get the onboarding state of the server.
		 *
		 *     Returns:
		 *         The onboarding state of the server.
		 */
		get: operations["get_onboarding_state_api_v1_onboarding_state_get"];
		put?: never;
		post?: never;
		delete?: never;
		options?: never;
		head?: never;
		patch?: never;
		trace?: never;
	};
	"/api/v1/settings": {
		parameters: {
			query?: never;
			header?: never;
			path?: never;
			cookie?: never;
		};
		/**
		 * Get Settings
		 * @description Get settings of the server.
		 *
		 *     Args:
		 *         hydrate: Whether to hydrate the response.
		 *
		 *     Returns:
		 *         Settings of the server.
		 */
		get: operations["get_settings_api_v1_settings_get"];
		/**
		 * Update Server Settings
		 * @description Updates the settings of the server.
		 *
		 *     Args:
		 *         settings_update: Settings update.
		 *         auth_context: Authentication context.
		 *
		 *     Raises:
		 *         IllegalOperationError: If trying to update admin properties without
		 *             admin permissions.
		 *
		 *     Returns:
		 *         The updated settings.
		 */
		put: operations["update_server_settings_api_v1_settings_put"];
		post?: never;
		delete?: never;
		options?: never;
		head?: never;
		patch?: never;
		trace?: never;
	};
	"/api/v1/activate": {
		parameters: {
			query?: never;
			header?: never;
			path?: never;
			cookie?: never;
		};
		get?: never;
		/**
		 * Activate Server
		 * @description Updates a stack.
		 *
		 *     Args:
		 *         activate_request: The request to activate the server.
		 *
		 *     Returns:
		 *         The default admin user that was created during activation, if any.
		 */
		put: operations["activate_server_api_v1_activate_put"];
		post?: never;
		delete?: never;
		options?: never;
		head?: never;
		patch?: never;
		trace?: never;
	};
	"/api/v1/statistics": {
		parameters: {
			query?: never;
			header?: never;
			path?: never;
			cookie?: never;
		};
		/**
		 * Get Server Statistics
		 * @description Gets server statistics.
		 *
		 *     Args:
		 *         auth_context: Authentication context.
		 *
		 *     Returns:
		 *         Statistics of the server.
		 */
		get: operations["get_server_statistics_api_v1_statistics_get"];
		put?: never;
		post?: never;
		delete?: never;
		options?: never;
		head?: never;
		patch?: never;
		trace?: never;
	};
	"/api/v1/service_accounts": {
		parameters: {
			query?: never;
			header?: never;
			path?: never;
			cookie?: never;
		};
		/**
		 * List Service Accounts
		 * @description Returns a list of service accounts.
		 *
		 *     Args:
		 *         filter_model: Model that takes care of filtering, sorting and
		 *             pagination.
		 *         hydrate: Flag deciding whether to hydrate the output model(s)
		 *             by including metadata fields in the response.
		 *
		 *     Returns:
		 *         A list of service accounts matching the filter.
		 */
		get: operations["list_service_accounts_api_v1_service_accounts_get"];
		put?: never;
		/**
		 * Create Service Account
		 * @description Creates a service account.
		 *
		 *     Args:
		 *         service_account: Service account to create.
		 *
		 *     Returns:
		 *         The created service account.
		 */
		post: operations["create_service_account_api_v1_service_accounts_post"];
		delete?: never;
		options?: never;
		head?: never;
		patch?: never;
		trace?: never;
	};
	"/api/v1/service_accounts/{service_account_name_or_id}": {
		parameters: {
			query?: never;
			header?: never;
			path?: never;
			cookie?: never;
		};
		/**
		 * Get Service Account
		 * @description Returns a specific service account.
		 *
		 *     Args:
		 *         service_account_name_or_id: Name or ID of the service account.
		 *         hydrate: Flag deciding whether to hydrate the output model(s)
		 *             by including metadata fields in the response.
		 *
		 *     Returns:
		 *         The service account matching the given name or ID.
		 */
		get: operations["get_service_account_api_v1_service_accounts__service_account_name_or_id__get"];
		/**
		 * Update Service Account
		 * @description Updates a specific service account.
		 *
		 *     Args:
		 *         service_account_name_or_id: Name or ID of the service account.
		 *         service_account_update: the service account to use for the update.
		 *
		 *     Returns:
		 *         The updated service account.
		 */
		put: operations["update_service_account_api_v1_service_accounts__service_account_name_or_id__put"];
		post?: never;
		/**
		 * Delete Service Account
		 * @description Delete a specific service account.
		 *
		 *     Args:
		 *         service_account_name_or_id: Name or ID of the service account.
		 */
		delete: operations["delete_service_account_api_v1_service_accounts__service_account_name_or_id__delete"];
		options?: never;
		head?: never;
		patch?: never;
		trace?: never;
	};
	"/api/v1/service_accounts/{service_account_id}/api_keys": {
		parameters: {
			query?: never;
			header?: never;
			path?: never;
			cookie?: never;
		};
		/**
		 * List Api Keys
		 * @description List API keys associated with a service account.
		 *
		 *     Args:
		 *         service_account_id: ID of the service account to which the API keys
		 *             belong.
		 *         hydrate: Flag deciding whether to hydrate the output model(s)
		 *             by including metadata fields in the response.
		 *         filter_model: Filter model used for pagination, sorting,
		 *             filtering
		 *
		 *     Returns:
		 *         All API keys matching the filter and associated with the supplied
		 *         service account.
		 */
		get: operations["list_api_keys_api_v1_service_accounts__service_account_id__api_keys_get"];
		put?: never;
		/**
		 * Create Api Key
		 * @description Creates an API key for a service account.
		 *
		 *     Args:
		 *         service_account_id: ID of the service account for which to create the
		 *             API key.
		 *         api_key: API key to create.
		 *
		 *     Returns:
		 *         The created API key.
		 */
		post: operations["create_api_key_api_v1_service_accounts__service_account_id__api_keys_post"];
		delete?: never;
		options?: never;
		head?: never;
		patch?: never;
		trace?: never;
	};
	"/api/v1/service_accounts/{service_account_id}/api_keys/{api_key_name_or_id}": {
		parameters: {
			query?: never;
			header?: never;
			path?: never;
			cookie?: never;
		};
		/**
		 * Get Api Key
		 * @description Returns the requested API key.
		 *
		 *     Args:
		 *         service_account_id: ID of the service account to which the API key
		 *             belongs.
		 *         hydrate: Flag deciding whether to hydrate the output model(s)
		 *             by including metadata fields in the response.
		 *         api_key_name_or_id: Name or ID of the API key to return.
		 *
		 *     Returns:
		 *         The requested API key.
		 */
		get: operations["get_api_key_api_v1_service_accounts__service_account_id__api_keys__api_key_name_or_id__get"];
		/**
		 * Update Api Key
		 * @description Updates an API key for a service account.
		 *
		 *     Args:
		 *         service_account_id: ID of the service account to which the API key
		 *             belongs.
		 *         api_key_name_or_id: Name or ID of the API key to update.
		 *         api_key_update: API key update.
		 *
		 *     Returns:
		 *         The updated API key.
		 */
		put: operations["update_api_key_api_v1_service_accounts__service_account_id__api_keys__api_key_name_or_id__put"];
		post?: never;
		/**
		 * Delete Api Key
		 * @description Deletes an API key.
		 *
		 *     Args:
		 *         service_account_id: ID of the service account to which the API key
		 *             belongs.
		 *         api_key_name_or_id: Name or ID of the API key to delete.
		 */
		delete: operations["delete_api_key_api_v1_service_accounts__service_account_id__api_keys__api_key_name_or_id__delete"];
		options?: never;
		head?: never;
		patch?: never;
		trace?: never;
	};
	"/api/v1/service_accounts/{service_account_id}/api_keys/{api_key_name_or_id}/rotate": {
		parameters: {
			query?: never;
			header?: never;
			path?: never;
			cookie?: never;
		};
		get?: never;
		/**
		 * Rotate Api Key
		 * @description Rotate an API key.
		 *
		 *     Args:
		 *         service_account_id: ID of the service account to which the API key
		 *             belongs.
		 *         api_key_name_or_id: Name or ID of the API key to rotate.
		 *         rotate_request: API key rotation request.
		 *
		 *     Returns:
		 *         The updated API key.
		 */
		put: operations["rotate_api_key_api_v1_service_accounts__service_account_id__api_keys__api_key_name_or_id__rotate_put"];
		post?: never;
		delete?: never;
		options?: never;
		head?: never;
		patch?: never;
		trace?: never;
	};
	"/api/v1/service_connectors": {
		parameters: {
			query?: never;
			header?: never;
			path?: never;
			cookie?: never;
		};
		/**
		 * List Service Connectors
		 * @description Get a list of all service connectors.
		 *
		 *     Args:
		 *         connector_filter_model: Filter model used for pagination, sorting,
		 *             filtering
		 *         project_name_or_id: Optional name or ID of the project to filter by.
		 *         expand_secrets: Whether to expand secrets or not.
		 *         hydrate: Flag deciding whether to hydrate the output model(s)
		 *             by including metadata fields in the response.
		 *
		 *     Returns:
		 *         Page with list of service connectors matching the filter criteria.
		 */
		get: operations["list_service_connectors_api_v1_service_connectors_get"];
		put?: never;
		/**
		 * Create Service Connector
		 * @description Creates a service connector.
		 *
		 *     Args:
		 *         connector: Service connector to register.
		 *         project_name_or_id: Optional name or ID of the project.
		 *
		 *     Returns:
		 *         The created service connector.
		 */
		post: operations["create_service_connector_api_v1_service_connectors_post"];
		delete?: never;
		options?: never;
		head?: never;
		patch?: never;
		trace?: never;
	};
	"/api/v1/service_connectors/resources": {
		parameters: {
			query?: never;
			header?: never;
			path?: never;
			cookie?: never;
		};
		/**
		 * List Service Connector Resources
		 * @description List resources that can be accessed by service connectors.
		 *
		 *     Args:
		 *         filter_model: The filter model to use when fetching service
		 *             connectors.
		 *         project_name_or_id: Optional name or ID of the project.
		 *         auth_context: Authentication context.
		 *
		 *     Returns:
		 *         The matching list of resources that available service
		 *         connectors have access to.
		 */
		get: operations["list_service_connector_resources_api_v1_service_connectors_resources_get"];
		put?: never;
		post?: never;
		delete?: never;
		options?: never;
		head?: never;
		patch?: never;
		trace?: never;
	};
	"/api/v1/service_connectors/{connector_id}": {
		parameters: {
			query?: never;
			header?: never;
			path?: never;
			cookie?: never;
		};
		/**
		 * Get Service Connector
		 * @description Returns the requested service connector.
		 *
		 *     Args:
		 *         connector_id: ID of the service connector.
		 *         expand_secrets: Whether to expand secrets or not.
		 *         hydrate: Flag deciding whether to hydrate the output model(s)
		 *             by including metadata fields in the response.
		 *
		 *     Returns:
		 *         The requested service connector.
		 */
		get: operations["get_service_connector_api_v1_service_connectors__connector_id__get"];
		/**
		 * Update Service Connector
		 * @description Updates a service connector.
		 *
		 *     Args:
		 *         connector_id: ID of the service connector.
		 *         connector_update: Service connector to use to update.
		 *
		 *     Returns:
		 *         Updated service connector.
		 */
		put: operations["update_service_connector_api_v1_service_connectors__connector_id__put"];
		post?: never;
		/**
		 * Delete Service Connector
		 * @description Deletes a service connector.
		 *
		 *     Args:
		 *         connector_id: ID of the service connector.
		 */
		delete: operations["delete_service_connector_api_v1_service_connectors__connector_id__delete"];
		options?: never;
		head?: never;
		patch?: never;
		trace?: never;
	};
	"/api/v1/service_connectors/verify": {
		parameters: {
			query?: never;
			header?: never;
			path?: never;
			cookie?: never;
		};
		get?: never;
		put?: never;
		/**
		 * Validate And Verify Service Connector Config
		 * @description Verifies if a service connector configuration has access to resources.
		 *
		 *     This requires the service connector implementation to be installed
		 *     on the ZenML server, otherwise a 501 Not Implemented error will be
		 *     returned.
		 *
		 *     Args:
		 *         connector: The service connector configuration to verify.
		 *         list_resources: If True, the list of all resources accessible
		 *             through the service connector is returned.
		 *
		 *     Returns:
		 *         The list of resources that the service connector configuration has
		 *         access to.
		 */
		post: operations["validate_and_verify_service_connector_config_api_v1_service_connectors_verify_post"];
		delete?: never;
		options?: never;
		head?: never;
		patch?: never;
		trace?: never;
	};
	"/api/v1/service_connectors/{connector_id}/verify": {
		parameters: {
			query?: never;
			header?: never;
			path?: never;
			cookie?: never;
		};
		get?: never;
		/**
		 * Validate And Verify Service Connector
		 * @description Verifies if a service connector instance has access to one or more resources.
		 *
		 *     This requires the service connector implementation to be installed
		 *     on the ZenML server, otherwise a 501 Not Implemented error will be
		 *     returned.
		 *
		 *     Args:
		 *         connector_id: The ID of the service connector to verify.
		 *         resource_type: The type of resource to verify access to.
		 *         resource_id: The ID of the resource to verify access to.
		 *         list_resources: If True, the list of all resources accessible
		 *             through the service connector and matching the supplied resource
		 *             type and ID are returned.
		 *
		 *     Returns:
		 *         The list of resources that the service connector has access to, scoped
		 *         to the supplied resource type and ID, if provided.
		 */
		put: operations["validate_and_verify_service_connector_api_v1_service_connectors__connector_id__verify_put"];
		post?: never;
		delete?: never;
		options?: never;
		head?: never;
		patch?: never;
		trace?: never;
	};
	"/api/v1/service_connectors/{connector_id}/client": {
		parameters: {
			query?: never;
			header?: never;
			path?: never;
			cookie?: never;
		};
		/**
		 * Get Service Connector Client
		 * @description Get a service connector client for a service connector and given resource.
		 *
		 *     This requires the service connector implementation to be installed
		 *     on the ZenML server, otherwise a 501 Not Implemented error will be
		 *     returned.
		 *
		 *     Args:
		 *         connector_id: ID of the service connector.
		 *         resource_type: Type of the resource to list.
		 *         resource_id: ID of the resource to list.
		 *
		 *     Returns:
		 *         A service connector client that can be used to access the given
		 *         resource.
		 */
		get: operations["get_service_connector_client_api_v1_service_connectors__connector_id__client_get"];
		put?: never;
		post?: never;
		delete?: never;
		options?: never;
		head?: never;
		patch?: never;
		trace?: never;
	};
	"/api/v1/service_connectors/full_stack_resources": {
		parameters: {
			query?: never;
			header?: never;
			path?: never;
			cookie?: never;
		};
		get?: never;
		put?: never;
		/**
		 * Get Resources Based On Service Connector Info
		 * @description Gets the list of resources that a service connector can access.
		 *
		 *     Args:
		 *         connector_info: The service connector info.
		 *         connector_uuid: The service connector uuid.
		 *
		 *     Returns:
		 *         The list of resources that the service connector configuration has
		 *         access to and consumable from UI/CLI.
		 *
		 *     Raises:
		 *         ValueError: If both connector_info and connector_uuid are provided.
		 *         ValueError: If neither connector_info nor connector_uuid are provided.
		 */
		post: operations["get_resources_based_on_service_connector_info_api_v1_service_connectors_full_stack_resources_post"];
		delete?: never;
		options?: never;
		head?: never;
		patch?: never;
		trace?: never;
	};
	"/api/v1/service_connector_types": {
		parameters: {
			query?: never;
			header?: never;
			path?: never;
			cookie?: never;
		};
		/**
		 * List Service Connector Types
		 * @description Get a list of service connector types.
		 *
		 *     Args:
		 *         connector_type: Filter by connector type.
		 *         resource_type: Filter by resource type.
		 *         auth_method: Filter by auth method.
		 *
		 *     Returns:
		 *         List of service connector types.
		 */
		get: operations["list_service_connector_types_api_v1_service_connector_types_get"];
		put?: never;
		post?: never;
		delete?: never;
		options?: never;
		head?: never;
		patch?: never;
		trace?: never;
	};
	"/api/v1/service_connector_types/{connector_type}": {
		parameters: {
			query?: never;
			header?: never;
			path?: never;
			cookie?: never;
		};
		/**
		 * Get Service Connector Type
		 * @description Returns the requested service connector type.
		 *
		 *     Args:
		 *         connector_type: the service connector type identifier.
		 *
		 *     Returns:
		 *         The requested service connector type.
		 */
		get: operations["get_service_connector_type_api_v1_service_connector_types__connector_type__get"];
		put?: never;
		post?: never;
		delete?: never;
		options?: never;
		head?: never;
		patch?: never;
		trace?: never;
	};
	"/api/v1/services": {
		parameters: {
			query?: never;
			header?: never;
			path?: never;
			cookie?: never;
		};
		/**
		 * List Services
		 * @description Gets a page of service objects.
		 *
		 *     Args:
		 *         filter_model: Filter model used for pagination, sorting,
		 *             filtering.
		 *         hydrate: Flag deciding whether to hydrate the output model(s)
		 *             by including metadata fields in the response.
		 *
		 *     Returns:
		 *         Page of service objects.
		 */
		get: operations["list_services_api_v1_services_get"];
		put?: never;
		/**
		 * Create Service
		 * @description Creates a new service.
		 *
		 *     Args:
		 *         service: The service to create.
		 *         project_name_or_id: Optional name or ID of the project.
		 *
		 *     Returns:
		 *         The created service.
		 */
		post: operations["create_service_api_v1_services_post"];
		delete?: never;
		options?: never;
		head?: never;
		patch?: never;
		trace?: never;
	};
	"/api/v1/services/{service_id}": {
		parameters: {
			query?: never;
			header?: never;
			path?: never;
			cookie?: never;
		};
		/**
		 * Get Service
		 * @description Gets a specific service using its unique ID.
		 *
		 *     Args:
		 *         service_id: The ID of the service to get.
		 *         hydrate: Flag deciding whether to hydrate the output model(s)
		 *             by including metadata fields in the response.
		 *
		 *     Returns:
		 *         A specific service object.
		 */
		get: operations["get_service_api_v1_services__service_id__get"];
		/**
		 * Update Service
		 * @description Updates a service.
		 *
		 *     Args:
		 *         service_id: The ID of the service to update.
		 *         update: The model containing the attributes to update.
		 *
		 *     Returns:
		 *         The updated service object.
		 */
		put: operations["update_service_api_v1_services__service_id__put"];
		post?: never;
		/**
		 * Delete Service
		 * @description Deletes a specific service.
		 *
		 *     Args:
		 *         service_id: The ID of the service to delete.
		 */
		delete: operations["delete_service_api_v1_services__service_id__delete"];
		options?: never;
		head?: never;
		patch?: never;
		trace?: never;
	};
	"/api/v1/stack-deployment/info": {
		parameters: {
			query?: never;
			header?: never;
			path?: never;
			cookie?: never;
		};
		/**
		 * Get Stack Deployment Info
		 * @description Get information about a stack deployment provider.
		 *
		 *     Args:
		 *         provider: The stack deployment provider.
		 *
		 *     Returns:
		 *         Information about the stack deployment provider.
		 */
		get: operations["get_stack_deployment_info_api_v1_stack_deployment_info_get"];
		put?: never;
		post?: never;
		delete?: never;
		options?: never;
		head?: never;
		patch?: never;
		trace?: never;
	};
	"/api/v1/stack-deployment/config": {
		parameters: {
			query?: never;
			header?: never;
			path?: never;
			cookie?: never;
		};
		/**
		 * Get Stack Deployment Config
		 * @description Return the URL to deploy the ZenML stack to the specified cloud provider.
		 *
		 *     Args:
		 *         request: The FastAPI request object.
		 *         provider: The stack deployment provider.
		 *         stack_name: The name of the stack.
		 *         location: The location where the stack should be deployed.
		 *         terraform: Whether the stack should be deployed using Terraform.
		 *         auth_context: The authentication context.
		 *
		 *     Returns:
		 *         The cloud provider console URL where the stack will be deployed and
		 *         the configuration for the stack deployment.
		 */
		get: operations["get_stack_deployment_config_api_v1_stack_deployment_config_get"];
		put?: never;
		post?: never;
		delete?: never;
		options?: never;
		head?: never;
		patch?: never;
		trace?: never;
	};
	"/api/v1/stack-deployment/stack": {
		parameters: {
			query?: never;
			header?: never;
			path?: never;
			cookie?: never;
		};
		/**
		 * Get Deployed Stack
		 * @description Return a matching ZenML stack that was deployed and registered.
		 *
		 *     Args:
		 *         provider: The stack deployment provider.
		 *         stack_name: The name of the stack.
		 *         location: The location where the stack should be deployed.
		 *         date_start: The date when the deployment started.
		 *         terraform: Whether the stack was deployed using Terraform.
		 *
		 *     Returns:
		 *         The ZenML stack that was deployed and registered or None if the stack
		 *         was not found.
		 */
		get: operations["get_deployed_stack_api_v1_stack_deployment_stack_get"];
		put?: never;
		post?: never;
		delete?: never;
		options?: never;
		head?: never;
		patch?: never;
		trace?: never;
	};
	"/api/v1/stacks": {
		parameters: {
			query?: never;
			header?: never;
			path?: never;
			cookie?: never;
		};
		/**
		 * List Stacks
		 * @description Returns all stacks.
		 *
		 *     Args:
		 *         project_name_or_id: Optional name or ID of the project to filter by.
		 *         stack_filter_model: Filter model used for pagination, sorting,
		 *             filtering.
		 *         hydrate: Flag deciding whether to hydrate the output model(s)
		 *             by including metadata fields in the response.
		 *
		 *     Returns:
		 *         All stacks matching the filter criteria.
		 */
		get: operations["list_stacks_api_v1_stacks_get"];
		put?: never;
		/**
		 * Create Stack
		 * @description Creates a stack.
		 *
		 *     Args:
		 *         stack: Stack to register.
		 *         project_name_or_id: Optional name or ID of the project.
		 *         auth_context: Authentication context.
		 *
		 *     Returns:
		 *         The created stack.
		 */
		post: operations["create_stack_api_v1_stacks_post"];
		delete?: never;
		options?: never;
		head?: never;
		patch?: never;
		trace?: never;
	};
	"/api/v1/stacks/{stack_id}": {
		parameters: {
			query?: never;
			header?: never;
			path?: never;
			cookie?: never;
		};
		/**
		 * Get Stack
		 * @description Returns the requested stack.
		 *
		 *     Args:
		 *         stack_id: ID of the stack.
		 *         hydrate: Flag deciding whether to hydrate the output model(s)
		 *             by including metadata fields in the response.
		 *
		 *     Returns:
		 *         The requested stack.
		 */
		get: operations["get_stack_api_v1_stacks__stack_id__get"];
		/**
		 * Update Stack
		 * @description Updates a stack.
		 *
		 *     Args:
		 *         stack_id: Name of the stack.
		 *         stack_update: Stack to use for the update.
		 *
		 *     Returns:
		 *         The updated stack.
		 */
		put: operations["update_stack_api_v1_stacks__stack_id__put"];
		post?: never;
		/**
		 * Delete Stack
		 * @description Deletes a stack.
		 *
		 *     Args:
		 *         stack_id: Name of the stack.
		 */
		delete: operations["delete_stack_api_v1_stacks__stack_id__delete"];
		options?: never;
		head?: never;
		patch?: never;
		trace?: never;
	};
	"/api/v1/components": {
		parameters: {
			query?: never;
			header?: never;
			path?: never;
			cookie?: never;
		};
		/**
		 * List Stack Components
		 * @description Get a list of all stack components.
		 *
		 *     Args:
		 *         component_filter_model: Filter model used for pagination, sorting,
		 *             filtering.
		 *         project_name_or_id: Optional name or ID of the project to filter by.
		 *         hydrate: Flag deciding whether to hydrate the output model(s)
		 *             by including metadata fields in the response.
		 *
		 *     Returns:
		 *         List of stack components matching the filter criteria.
		 */
		get: operations["list_stack_components_api_v1_components_get"];
		put?: never;
		/**
		 * Create Stack Component
		 * @description Creates a stack component.
		 *
		 *     Args:
		 *         component: Stack component to register.
		 *         project_name_or_id: Optional name or ID of the project.
		 *
		 *     Returns:
		 *         The created stack component.
		 */
		post: operations["create_stack_component_api_v1_components_post"];
		delete?: never;
		options?: never;
		head?: never;
		patch?: never;
		trace?: never;
	};
	"/api/v1/components/{component_id}": {
		parameters: {
			query?: never;
			header?: never;
			path?: never;
			cookie?: never;
		};
		/**
		 * Get Stack Component
		 * @description Returns the requested stack component.
		 *
		 *     Args:
		 *         component_id: ID of the stack component.
		 *         hydrate: Flag deciding whether to hydrate the output model(s)
		 *             by including metadata fields in the response.
		 *
		 *     Returns:
		 *         The requested stack component.
		 */
		get: operations["get_stack_component_api_v1_components__component_id__get"];
		/**
		 * Update Stack Component
		 * @description Updates a stack component.
		 *
		 *     Args:
		 *         component_id: ID of the stack component.
		 *         component_update: Stack component to use to update.
		 *
		 *     Returns:
		 *         Updated stack component.
		 */
		put: operations["update_stack_component_api_v1_components__component_id__put"];
		post?: never;
		/**
		 * Deregister Stack Component
		 * @description Deletes a stack component.
		 *
		 *     Args:
		 *         component_id: ID of the stack component.
		 */
		delete: operations["deregister_stack_component_api_v1_components__component_id__delete"];
		options?: never;
		head?: never;
		patch?: never;
		trace?: never;
	};
	"/api/v1/component-types": {
		parameters: {
			query?: never;
			header?: never;
			path?: never;
			cookie?: never;
		};
		/**
		 * Get Stack Component Types
		 * @description Get a list of all stack component types.
		 *
		 *     Returns:
		 *         List of stack components.
		 */
		get: operations["get_stack_component_types_api_v1_component_types_get"];
		put?: never;
		post?: never;
		delete?: never;
		options?: never;
		head?: never;
		patch?: never;
		trace?: never;
	};
	"/api/v1/steps": {
		parameters: {
			query?: never;
			header?: never;
			path?: never;
			cookie?: never;
		};
		/**
		 * List Run Steps
		 * @description Get run steps according to query filters.
		 *
		 *     Args:
		 *         step_run_filter_model: Filter model used for pagination, sorting,
		 *             filtering.
		 *         hydrate: Flag deciding whether to hydrate the output model(s)
		 *             by including metadata fields in the response.
		 *         auth_context: Authentication context.
		 *
		 *     Returns:
		 *         The run steps according to query filters.
		 */
		get: operations["list_run_steps_api_v1_steps_get"];
		put?: never;
		/**
		 * Create Run Step
		 * @description Create a run step.
		 *
		 *     Args:
		 *         step: The run step to create.
		 *         _: Authentication context.
		 *
		 *     Returns:
		 *         The created run step.
		 */
		post: operations["create_run_step_api_v1_steps_post"];
		delete?: never;
		options?: never;
		head?: never;
		patch?: never;
		trace?: never;
	};
	"/api/v1/steps/{step_id}": {
		parameters: {
			query?: never;
			header?: never;
			path?: never;
			cookie?: never;
		};
		/**
		 * Get Step
		 * @description Get one specific step.
		 *
		 *     Args:
		 *         step_id: ID of the step to get.
		 *         hydrate: Flag deciding whether to hydrate the output model(s)
		 *             by including metadata fields in the response.
		 *
		 *     Returns:
		 *         The step.
		 */
		get: operations["get_step_api_v1_steps__step_id__get"];
		/**
		 * Update Step
		 * @description Updates a step.
		 *
		 *     Args:
		 *         step_id: ID of the step.
		 *         step_model: Step model to use for the update.
		 *
		 *     Returns:
		 *         The updated step model.
		 */
		put: operations["update_step_api_v1_steps__step_id__put"];
		post?: never;
		delete?: never;
		options?: never;
		head?: never;
		patch?: never;
		trace?: never;
	};
	"/api/v1/steps/{step_id}/step-configuration": {
		parameters: {
			query?: never;
			header?: never;
			path?: never;
			cookie?: never;
		};
		/**
		 * Get Step Configuration
		 * @description Get the configuration of a specific step.
		 *
		 *     Args:
		 *         step_id: ID of the step to get.
		 *
		 *     Returns:
		 *         The step configuration.
		 */
		get: operations["get_step_configuration_api_v1_steps__step_id__step_configuration_get"];
		put?: never;
		post?: never;
		delete?: never;
		options?: never;
		head?: never;
		patch?: never;
		trace?: never;
	};
	"/api/v1/steps/{step_id}/status": {
		parameters: {
			query?: never;
			header?: never;
			path?: never;
			cookie?: never;
		};
		/**
		 * Get Step Status
		 * @description Get the status of a specific step.
		 *
		 *     Args:
		 *         step_id: ID of the step for which to get the status.
		 *
		 *     Returns:
		 *         The status of the step.
		 */
		get: operations["get_step_status_api_v1_steps__step_id__status_get"];
		put?: never;
		post?: never;
		delete?: never;
		options?: never;
		head?: never;
		patch?: never;
		trace?: never;
	};
	"/api/v1/steps/{step_id}/logs": {
		parameters: {
			query?: never;
			header?: never;
			path?: never;
			cookie?: never;
		};
		/**
		 * Get Step Logs
		 * @description Get the logs of a specific step.
		 *
		 *     Args:
		 *         step_id: ID of the step for which to get the logs.
		 *         offset: The offset from which to start reading.
		 *         length: The amount of bytes that should be read.
		 *
		 *     Returns:
		 *         The logs of the step.
		 *
		 *     Raises:
		 *         HTTPException: If no logs are available for this step.
		 */
		get: operations["get_step_logs_api_v1_steps__step_id__logs_get"];
		put?: never;
		post?: never;
		delete?: never;
		options?: never;
		head?: never;
		patch?: never;
		trace?: never;
	};
	"/api/v1/tags": {
		parameters: {
			query?: never;
			header?: never;
			path?: never;
			cookie?: never;
		};
		/**
		 * List Tags
		 * @description Get tags according to query filters.
		 *
		 *     Args:
		 *         tag_filter_model: Filter model used for pagination, sorting,
		 *             filtering
		 *         hydrate: Flag deciding whether to hydrate the output model(s)
		 *             by including metadata fields in the response.
		 *
		 *     Returns:
		 *         The tags according to query filters.
		 */
		get: operations["list_tags_api_v1_tags_get"];
		put?: never;
		/**
		 * Create Tag
		 * @description Create a new tag.
		 *
		 *     Args:
		 *         tag: The tag to create.
		 *
		 *     Returns:
		 *         The created tag.
		 */
		post: operations["create_tag_api_v1_tags_post"];
		delete?: never;
		options?: never;
		head?: never;
		patch?: never;
		trace?: never;
	};
	"/api/v1/tags/{tag_name_or_id}": {
		parameters: {
			query?: never;
			header?: never;
			path?: never;
			cookie?: never;
		};
		/**
		 * Get Tag
		 * @description Get a tag by name or ID.
		 *
		 *     Args:
		 *         tag_name_or_id: The name or ID of the tag to get.
		 *         hydrate: Flag deciding whether to hydrate the output model(s)
		 *             by including metadata fields in the response.
		 *
		 *     Returns:
		 *         The tag with the given name or ID.
		 */
		get: operations["get_tag_api_v1_tags__tag_name_or_id__get"];
		put?: never;
		post?: never;
		/**
		 * Delete Tag
		 * @description Delete a tag by name or ID.
		 *
		 *     Args:
		 *         tag_name_or_id: The name or ID of the tag to delete.
		 */
		delete: operations["delete_tag_api_v1_tags__tag_name_or_id__delete"];
		options?: never;
		head?: never;
		patch?: never;
		trace?: never;
	};
	"/api/v1/tags/{tag_id}": {
		parameters: {
			query?: never;
			header?: never;
			path?: never;
			cookie?: never;
		};
		get?: never;
		/**
		 * Update Tag
		 * @description Updates a tag.
		 *
		 *     Args:
		 *         tag_id: Id or name of the tag.
		 *         tag_update_model: Tag to use for the update.
		 *
		 *     Returns:
		 *         The updated tag.
		 */
		put: operations["update_tag_api_v1_tags__tag_id__put"];
		post?: never;
		delete?: never;
		options?: never;
		head?: never;
		patch?: never;
		trace?: never;
	};
	"/api/v1/tag_resources": {
		parameters: {
			query?: never;
			header?: never;
			path?: never;
			cookie?: never;
		};
		get?: never;
		put?: never;
		/**
		 * Create Tag Resource
		 * @description Attach different tags to different resources.
		 *
		 *     Args:
		 *         tag_resource: A tag resource request.
		 *
		 *     Returns:
		 *         A tag resource response.
		 */
		post: operations["create_tag_resource_api_v1_tag_resources_post"];
		/**
		 * Delete Tag Resource
		 * @description Detach a tag from a resource.
		 *
		 *     Args:
		 *         tag_resource: The tag resource relationship to delete.
		 */
		delete: operations["delete_tag_resource_api_v1_tag_resources_delete"];
		options?: never;
		head?: never;
		patch?: never;
		trace?: never;
	};
	"/api/v1/tag_resources/batch": {
		parameters: {
			query?: never;
			header?: never;
			path?: never;
			cookie?: never;
		};
		get?: never;
		put?: never;
		/**
		 * Batch Create Tag Resource
		 * @description Attach different tags to different resources.
		 *
		 *     Args:
		 *         tag_resources: A list of tag resource requests.
		 *
		 *     Returns:
		 *         A list of tag resource responses.
		 */
		post: operations["batch_create_tag_resource_api_v1_tag_resources_batch_post"];
		/**
		 * Batch Delete Tag Resource
		 * @description Detach different tags from different resources.
		 *
		 *     Args:
		 *         tag_resources: A list of tag resource requests.
		 */
		delete: operations["batch_delete_tag_resource_api_v1_tag_resources_batch_delete"];
		options?: never;
		head?: never;
		patch?: never;
		trace?: never;
	};
	"/api/v1/triggers": {
		parameters: {
			query?: never;
			header?: never;
			path?: never;
			cookie?: never;
		};
		/**
		 * List Triggers
		 * @description Returns all triggers.
		 *
		 *     Args:
		 *         trigger_filter_model: Filter model used for pagination, sorting,
		 *             filtering.
		 *         hydrate: Flag deciding whether to hydrate the output model(s)
		 *             by including metadata fields in the response.
		 *
		 *     Returns:
		 *         All triggers.
		 */
		get: operations["list_triggers_api_v1_triggers_get"];
		put?: never;
		/**
		 * Create Trigger
		 * @description Creates a trigger.
		 *
		 *     Args:
		 *         trigger: Trigger to register.
		 *
		 *     Returns:
		 *         The created trigger.
		 *
		 *     Raises:
		 *         ValueError: If the action flavor/subtype combination is not actually a webhook event source
		 */
		post: operations["create_trigger_api_v1_triggers_post"];
		delete?: never;
		options?: never;
		head?: never;
		patch?: never;
		trace?: never;
	};
	"/api/v1/triggers/{trigger_id}": {
		parameters: {
			query?: never;
			header?: never;
			path?: never;
			cookie?: never;
		};
		/**
		 * Get Trigger
		 * @description Returns the requested trigger.
		 *
		 *     Args:
		 *         trigger_id: ID of the trigger.
		 *         hydrate: Flag deciding whether to hydrate the output model(s)
		 *             by including metadata fields in the response.
		 *
		 *     Returns:
		 *         The requested trigger.
		 */
		get: operations["get_trigger_api_v1_triggers__trigger_id__get"];
		/**
		 * Update Trigger
		 * @description Updates a trigger.
		 *
		 *     Args:
		 *         trigger_id: Name of the trigger.
		 *         trigger_update: Trigger to use for the update.
		 *
		 *     Returns:
		 *         The updated trigger.
		 *
		 *     Raises:
		 *         ValueError: If the action flavor/subtype combination is not actually a webhook event source
		 */
		put: operations["update_trigger_api_v1_triggers__trigger_id__put"];
		post?: never;
		/**
		 * Delete Trigger
		 * @description Deletes a trigger.
		 *
		 *     Args:
		 *         trigger_id: Name of the trigger.
		 */
		delete: operations["delete_trigger_api_v1_triggers__trigger_id__delete"];
		options?: never;
		head?: never;
		patch?: never;
		trace?: never;
	};
	"/api/v1/users": {
		parameters: {
			query?: never;
			header?: never;
			path?: never;
			cookie?: never;
		};
		/**
		 * List Users
		 * @description Returns a list of all users.
		 *
		 *     Args:
		 *         user_filter_model: Model that takes care of filtering, sorting and
		 *             pagination.
		 *         hydrate: Flag deciding whether to hydrate the output model(s)
		 *             by including metadata fields in the response.
		 *         auth_context: Authentication context.
		 *
		 *     Returns:
		 *         A list of all users.
		 */
		get: operations["list_users_api_v1_users_get"];
		put?: never;
		/**
		 * Create User
		 * @description Creates a user.
		 *
		 *     # noqa: DAR401
		 *
		 *     Args:
		 *         user: User to create.
		 *         auth_context: Authentication context.
		 *
		 *     Returns:
		 *         The created user.
		 */
		post: operations["create_user_api_v1_users_post"];
		delete?: never;
		options?: never;
		head?: never;
		patch?: never;
		trace?: never;
	};
	"/api/v1/users/{user_name_or_id}": {
		parameters: {
			query?: never;
			header?: never;
			path?: never;
			cookie?: never;
		};
		/**
		 * Get User
		 * @description Returns a specific user.
		 *
		 *     Args:
		 *         user_name_or_id: Name or ID of the user.
		 *         hydrate: Flag deciding whether to hydrate the output model(s)
		 *             by including metadata fields in the response.
		 *         auth_context: Authentication context.
		 *
		 *     Returns:
		 *         A specific user.
		 */
		get: operations["get_user_api_v1_users__user_name_or_id__get"];
		/**
		 * Update User
		 * @description Updates a specific user.
		 *
		 *     Args:
		 *         user_name_or_id: Name or ID of the user.
		 *         user_update: the user to use for the update.
		 *         request: The request object.
		 *         auth_context: Authentication context.
		 *
		 *     Returns:
		 *         The updated user.
		 *
		 *     Raises:
		 *         IllegalOperationError: if the user tries change admin status,
		 *             while not an admin, if the user tries to change the password
		 *             of another user, or if the user tries to change their own
		 *             password without providing the old password or providing
		 *             an incorrect old password.
		 */
		put: operations["update_user_api_v1_users__user_name_or_id__put"];
		post?: never;
		/**
		 * Delete User
		 * @description Deletes a specific user.
		 *
		 *     Args:
		 *         user_name_or_id: Name or ID of the user.
		 *         auth_context: The authentication context.
		 *
		 *     Raises:
		 *         IllegalOperationError: If the user is not authorized to delete the user.
		 */
		delete: operations["delete_user_api_v1_users__user_name_or_id__delete"];
		options?: never;
		head?: never;
		patch?: never;
		trace?: never;
	};
	"/api/v1/users/{user_name_or_id}/deactivate": {
		parameters: {
			query?: never;
			header?: never;
			path?: never;
			cookie?: never;
		};
		get?: never;
		/**
		 * Deactivate User
		 * @description Deactivates a user and generates a new activation token for it.
		 *
		 *     Args:
		 *         user_name_or_id: Name or ID of the user.
		 *         auth_context: Authentication context.
		 *
		 *     Returns:
		 *         The generated activation token.
		 *
		 *     Raises:
		 *         IllegalOperationError: if the user is trying to deactivate
		 *             themselves.
		 */
		put: operations["deactivate_user_api_v1_users__user_name_or_id__deactivate_put"];
		post?: never;
		delete?: never;
		options?: never;
		head?: never;
		patch?: never;
		trace?: never;
	};
	"/api/v1/users/{user_name_or_id}/email-opt-in": {
		parameters: {
			query?: never;
			header?: never;
			path?: never;
			cookie?: never;
		};
		get?: never;
		/**
		 * Email Opt In Response
		 * @description Sets the response of the user to the email prompt.
		 *
		 *     Args:
		 *         user_name_or_id: Name or ID of the user.
		 *         user_response: User Response to email prompt
		 *         auth_context: The authentication context of the user
		 *
		 *     Returns:
		 *         The updated user.
		 *
		 *     Raises:
		 *         AuthorizationException: if the user does not have the required
		 *             permissions
		 */
		put: operations["email_opt_in_response_api_v1_users__user_name_or_id__email_opt_in_put"];
		post?: never;
		delete?: never;
		options?: never;
		head?: never;
		patch?: never;
		trace?: never;
	};
	"/api/v1/current-user": {
		parameters: {
			query?: never;
			header?: never;
			path?: never;
			cookie?: never;
		};
		/**
		 * Get Current User
		 * @description Returns the model of the authenticated user.
		 *
		 *     Args:
		 *         auth_context: The authentication context.
		 *
		 *     Returns:
		 *         The model of the authenticated user.
		 */
		get: operations["get_current_user_api_v1_current_user_get"];
		/**
		 * Update Myself
		 * @description Updates a specific user.
		 *
		 *     Args:
		 *         user: the user to use for the update.
		 *         request: The request object.
		 *         auth_context: The authentication context.
		 *
		 *     Returns:
		 *         The updated user.
		 *
		 *     Raises:
		 *         IllegalOperationError: if the current password is not supplied when
		 *             changing the password or if the current password is incorrect.
		 */
		put: operations["update_myself_api_v1_current_user_put"];
		post?: never;
		delete?: never;
		options?: never;
		head?: never;
		patch?: never;
		trace?: never;
	};
	"/api/v1/webhooks/{event_source_id}": {
		parameters: {
			query?: never;
			header?: never;
			path?: never;
			cookie?: never;
		};
		get?: never;
		put?: never;
		/**
		 * Webhook
		 * @description Webhook to receive events from external event sources.
		 *
		 *     Args:
		 *         event_source_id: The event_source_id
		 *         request: The request object
		 *         background_tasks: Background task handler
		 *         raw_body: The raw request body
		 *
		 *     Returns:
		 *         Static dict stating that event is received.
		 *
		 *     Raises:
		 *         AuthorizationException: If the Event Source does not exist.
		 *         KeyError: If no appropriate Plugin found in the plugin registry
		 *         ValueError: If the id of the Event Source is not actually a webhook event source
		 *         WebhookInactiveError: In case this webhook has been deactivated
		 */
		post: operations["webhook_api_v1_webhooks__event_source_id__post"];
		delete?: never;
		options?: never;
		head?: never;
		patch?: never;
		trace?: never;
	};
	"/api/v1/workspaces": {
		parameters: {
			query?: never;
			header?: never;
			path?: never;
			cookie?: never;
		};
		/**
		 * List Projects
		 * @deprecated
		 * @description Lists all projects in the organization.
		 *
		 *     Args:
		 *         project_filter_model: Filter model used for pagination, sorting,
		 *             filtering,
		 *         hydrate: Flag deciding whether to hydrate the output model(s)
		 *             by including metadata fields in the response.
		 *
		 *     Returns:
		 *         A list of projects.
		 */
		get: operations["list_projects_api_v1_workspaces_get"];
		put?: never;
		/**
		 * Create Project
		 * @deprecated
		 * @description Creates a project based on the requestBody.
		 *
		 *     # noqa: DAR401
		 *
		 *     Args:
		 *         project_request: Project to create.
		 *
		 *     Returns:
		 *         The created project.
		 */
		post: operations["create_project_api_v1_workspaces_post"];
		delete?: never;
		options?: never;
		head?: never;
		patch?: never;
		trace?: never;
	};
	"/api/v1/workspaces/{project_name_or_id}": {
		parameters: {
			query?: never;
			header?: never;
			path?: never;
			cookie?: never;
		};
		/**
		 * Get Project
		 * @deprecated
		 * @description Get a project for given name.
		 *
		 *     # noqa: DAR401
		 *
		 *     Args:
		 *         project_name_or_id: Name or ID of the project.
		 *         hydrate: Flag deciding whether to hydrate the output model(s)
		 *             by including metadata fields in the response.
		 *
		 *     Returns:
		 *         The requested project.
		 */
		get: operations["get_project_api_v1_workspaces__project_name_or_id__get"];
		/**
		 * Update Project
		 * @deprecated
		 * @description Get a project for given name.
		 *
		 *     # noqa: DAR401
		 *
		 *     Args:
		 *         project_name_or_id: Name or ID of the project to update.
		 *         project_update: the project to use to update
		 *
		 *     Returns:
		 *         The updated project.
		 */
		put: operations["update_project_api_v1_workspaces__project_name_or_id__put"];
		post?: never;
		/**
		 * Delete Project
		 * @deprecated
		 * @description Deletes a project.
		 *
		 *     Args:
		 *         project_name_or_id: Name or ID of the project.
		 */
		delete: operations["delete_project_api_v1_workspaces__project_name_or_id__delete"];
		options?: never;
		head?: never;
		patch?: never;
		trace?: never;
	};
	"/api/v1/workspaces/{project_name_or_id}/statistics": {
		parameters: {
			query?: never;
			header?: never;
			path?: never;
			cookie?: never;
		};
		/**
		 * Get Project Statistics
		 * @deprecated
		 * @description Gets statistics of a project.
		 *
		 *     # noqa: DAR401
		 *
		 *     Args:
		 *         project_name_or_id: Name or ID of the project to get statistics for.
		 *         auth_context: Authentication context.
		 *
		 *     Returns:
		 *         Project statistics.
		 */
		get: operations["get_project_statistics_api_v1_workspaces__project_name_or_id__statistics_get"];
		put?: never;
		post?: never;
		delete?: never;
		options?: never;
		head?: never;
		patch?: never;
		trace?: never;
	};
	"/api/v1/workspaces/{project_name_or_id}/code_repositories": {
		parameters: {
			query?: never;
			header?: never;
			path?: never;
			cookie?: never;
		};
		/**
		 * List Code Repositories
		 * @deprecated
		 * @description Gets a page of code repositories.
		 *
		 *     Args:
		 *         filter_model: Filter model used for pagination, sorting,
		 *             filtering.
		 *         project_name_or_id: Optional name or ID of the project.
		 *         hydrate: Flag deciding whether to hydrate the output model(s)
		 *             by including metadata fields in the response.
		 *
		 *     Returns:
		 *         Page of code repository objects.
		 */
		get: operations["list_code_repositories_api_v1_workspaces__project_name_or_id__code_repositories_get"];
		put?: never;
		/**
		 * Create Code Repository
		 * @deprecated
		 * @description Creates a code repository.
		 *
		 *     Args:
		 *         code_repository: Code repository to create.
		 *         project_name_or_id: Optional name or ID of the project.
		 *
		 *     Returns:
		 *         The created code repository.
		 */
		post: operations["create_code_repository_api_v1_workspaces__project_name_or_id__code_repositories_post"];
		delete?: never;
		options?: never;
		head?: never;
		patch?: never;
		trace?: never;
	};
	"/api/v1/workspaces/{project_name_or_id}/models": {
		parameters: {
			query?: never;
			header?: never;
			path?: never;
			cookie?: never;
		};
		get?: never;
		put?: never;
		/**
		 * Create Model
		 * @deprecated
		 * @description Creates a model.
		 *
		 *     Args:
		 *         model: Model to create.
		 *         project_name_or_id: Optional name or ID of the project.
		 *
		 *     Returns:
		 *         The created model.
		 */
		post: operations["create_model_api_v1_workspaces__project_name_or_id__models_post"];
		delete?: never;
		options?: never;
		head?: never;
		patch?: never;
		trace?: never;
	};
	"/api/v1/workspaces/{project_name_or_id}/models/{model_id}/model_versions": {
		parameters: {
			query?: never;
			header?: never;
			path?: never;
			cookie?: never;
		};
		get?: never;
		put?: never;
		/**
		 * Create Model Version
		 * @deprecated
		 * @description Creates a model version.
		 *
		 *     Args:
		 *         model_version: Model version to create.
		 *         model_id: Optional ID of the model.
		 *         project_name_or_id: Optional name or ID of the project.
		 *
		 *     Returns:
		 *         The created model version.
		 */
		post: operations["create_model_version_api_v1_workspaces__project_name_or_id__models__model_id__model_versions_post"];
		delete?: never;
		options?: never;
		head?: never;
		patch?: never;
		trace?: never;
	};
	"/api/v1/workspaces/{project_name_or_id}/pipeline_builds": {
		parameters: {
			query?: never;
			header?: never;
			path?: never;
			cookie?: never;
		};
		/**
		 * List Builds
		 * @deprecated
		 * @description Gets a list of builds.
		 *
		 *     Args:
		 *         build_filter_model: Filter model used for pagination, sorting,
		 *             filtering.
		 *         project_name_or_id: Optional name or ID of the project to filter by.
		 *         hydrate: Flag deciding whether to hydrate the output model(s)
		 *             by including metadata fields in the response.
		 *
		 *     Returns:
		 *         List of build objects matching the filter criteria.
		 */
		get: operations["list_builds_api_v1_workspaces__project_name_or_id__pipeline_builds_get"];
		put?: never;
		/**
		 * Create Build
		 * @deprecated
		 * @description Creates a build, optionally in a specific project.
		 *
		 *     Args:
		 *         build: Build to create.
		 *         project_name_or_id: Optional name or ID of the project.
		 *
		 *     Returns:
		 *         The created build.
		 */
		post: operations["create_build_api_v1_workspaces__project_name_or_id__pipeline_builds_post"];
		delete?: never;
		options?: never;
		head?: never;
		patch?: never;
		trace?: never;
	};
	"/api/v1/workspaces/{project_name_or_id}/pipeline_deployments": {
		parameters: {
			query?: never;
			header?: never;
			path?: never;
			cookie?: never;
		};
		/**
		 * List Deployments
		 * @deprecated
		 * @description Gets a list of deployments.
		 *
		 *     Args:
		 *         deployment_filter_model: Filter model used for pagination, sorting,
		 *             filtering.
		 *         project_name_or_id: Optional name or ID of the project to filter by.
		 *         hydrate: Flag deciding whether to hydrate the output model(s)
		 *             by including metadata fields in the response.
		 *
		 *     Returns:
		 *         List of deployment objects matching the filter criteria.
		 */
		get: operations["list_deployments_api_v1_workspaces__project_name_or_id__pipeline_deployments_get"];
		put?: never;
		/**
		 * Create Deployment
		 * @deprecated
		 * @description Creates a deployment.
		 *
		 *     Args:
		 *         deployment: Deployment to create.
		 *         project_name_or_id: Optional name or ID of the project.
		 *
		 *     Returns:
		 *         The created deployment.
		 */
		post: operations["create_deployment_api_v1_workspaces__project_name_or_id__pipeline_deployments_post"];
		delete?: never;
		options?: never;
		head?: never;
		patch?: never;
		trace?: never;
	};
	"/api/v1/workspaces/{project_name_or_id}/pipelines": {
		parameters: {
			query?: never;
			header?: never;
			path?: never;
			cookie?: never;
		};
		/**
		 * List Pipelines
		 * @deprecated
		 * @description Gets a list of pipelines.
		 *
		 *     Args:
		 *         pipeline_filter_model: Filter model used for pagination, sorting,
		 *             filtering.
		 *         project_name_or_id: Optional name or ID of the project to filter by.
		 *         hydrate: Flag deciding whether to hydrate the output model(s)
		 *             by including metadata fields in the response.
		 *
		 *     Returns:
		 *         List of pipeline objects matching the filter criteria.
		 */
		get: operations["list_pipelines_api_v1_workspaces__project_name_or_id__pipelines_get"];
		put?: never;
		/**
		 * Create Pipeline
		 * @deprecated
		 * @description Creates a pipeline.
		 *
		 *     Args:
		 *         pipeline: Pipeline to create.
		 *         project_name_or_id: Optional name or ID of the project.
		 *
		 *     Returns:
		 *         The created pipeline.
		 */
		post: operations["create_pipeline_api_v1_workspaces__project_name_or_id__pipelines_post"];
		delete?: never;
		options?: never;
		head?: never;
		patch?: never;
		trace?: never;
	};
	"/api/v1/workspaces/{project_name_or_id}/run-metadata": {
		parameters: {
			query?: never;
			header?: never;
			path?: never;
			cookie?: never;
		};
		get?: never;
		put?: never;
		/**
		 * Create Run Metadata
		 * @deprecated
		 * @description Creates run metadata.
		 *
		 *     Args:
		 *         run_metadata: The run metadata to create.
		 *         project_name_or_id: Optional name or ID of the project.
		 *         auth_context: Authentication context.
		 *
		 *     Raises:
		 *         RuntimeError: If the resource type is not supported.
		 */
		post: operations["create_run_metadata_api_v1_workspaces__project_name_or_id__run_metadata_post"];
		delete?: never;
		options?: never;
		head?: never;
		patch?: never;
		trace?: never;
	};
	"/api/v1/workspaces/{project_name_or_id}/run_templates": {
		parameters: {
			query?: never;
			header?: never;
			path?: never;
			cookie?: never;
		};
		/**
		 * List Run Templates
		 * @deprecated
		 * @description Get a page of run templates.
		 *
		 *     Args:
		 *         filter_model: Filter model used for pagination, sorting,
		 *             filtering.
		 *         project_name_or_id: Optional name or ID of the project.
		 *         hydrate: Flag deciding whether to hydrate the output model(s)
		 *             by including metadata fields in the response.
		 *
		 *     Returns:
		 *         Page of run templates.
		 */
		get: operations["list_run_templates_api_v1_workspaces__project_name_or_id__run_templates_get"];
		put?: never;
		/**
		 * Create Run Template
		 * @deprecated
		 * @description Create a run template.
		 *
		 *     Args:
		 *         run_template: Run template to create.
		 *         project_name_or_id: Optional name or ID of the project.
		 *
		 *     Returns:
		 *         The created run template.
		 */
		post: operations["create_run_template_api_v1_workspaces__project_name_or_id__run_templates_post"];
		delete?: never;
		options?: never;
		head?: never;
		patch?: never;
		trace?: never;
	};
	"/api/v1/workspaces/{project_name_or_id}/runs": {
		parameters: {
			query?: never;
			header?: never;
			path?: never;
			cookie?: never;
		};
		/**
		 * List Runs
		 * @deprecated
		 * @description Get pipeline runs according to query filters.
		 *
		 *     Args:
		 *         runs_filter_model: Filter model used for pagination, sorting, filtering.
		 *         project_name_or_id: Optional name or ID of the project.
		 *         hydrate: Flag deciding whether to hydrate the output model(s)
		 *             by including metadata fields in the response.
		 *
		 *     Returns:
		 *         The pipeline runs according to query filters.
		 */
		get: operations["list_runs_api_v1_workspaces__project_name_or_id__runs_get"];
		put?: never;
		/**
		 * Get Or Create Pipeline Run
		 * @deprecated
		 * @description Get or create a pipeline run.
		 *
		 *     Args:
		 *         pipeline_run: Pipeline run to create.
		 *         project_name_or_id: Optional name or ID of the project.
		 *
		 *     Returns:
		 *         The pipeline run and a boolean indicating whether the run was created
		 *         or not.
		 */
		post: operations["get_or_create_pipeline_run_api_v1_workspaces__project_name_or_id__runs_post"];
		delete?: never;
		options?: never;
		head?: never;
		patch?: never;
		trace?: never;
	};
	"/api/v1/workspaces/{project_name_or_id}/schedules": {
		parameters: {
			query?: never;
			header?: never;
			path?: never;
			cookie?: never;
		};
		/**
		 * List Schedules
		 * @deprecated
		 * @description Gets a list of schedules.
		 *
		 *     Args:
		 *         schedule_filter_model: Filter model used for pagination, sorting,
		 *             filtering
		 *         project_name_or_id: Optional name or ID of the project.
		 *         hydrate: Flag deciding whether to hydrate the output model(s)
		 *             by including metadata fields in the response.
		 *
		 *     Returns:
		 *         List of schedule objects.
		 */
		get: operations["list_schedules_api_v1_workspaces__project_name_or_id__schedules_get"];
		put?: never;
		/**
		 * Create Schedule
		 * @deprecated
		 * @description Creates a schedule.
		 *
		 *     Args:
		 *         schedule: Schedule to create.
		 *         project_name_or_id: Optional name or ID of the project.
		 *         auth_context: Authentication context.
		 *
		 *     Returns:
		 *         The created schedule.
		 */
		post: operations["create_schedule_api_v1_workspaces__project_name_or_id__schedules_post"];
		delete?: never;
		options?: never;
		head?: never;
		patch?: never;
		trace?: never;
	};
	"/api/v1/workspaces/{workspace_name_or_id}/secrets": {
		parameters: {
			query?: never;
			header?: never;
			path?: never;
			cookie?: never;
		};
		get?: never;
		put?: never;
		/**
		 * Create Secret
		 * @deprecated
		 * @description Creates a secret.
		 *
		 *     Args:
		 *         secret: Secret to create.
		 *         workspace_name_or_id: Optional name or ID of the workspace.
		 *
		 *     Returns:
		 *         The created secret.
		 */
		post: operations["create_secret_api_v1_workspaces__workspace_name_or_id__secrets_post"];
		delete?: never;
		options?: never;
		head?: never;
		patch?: never;
		trace?: never;
	};
	"/api/v1/workspaces/{project_name_or_id}/service_connectors": {
		parameters: {
			query?: never;
			header?: never;
			path?: never;
			cookie?: never;
		};
		/**
		 * List Service Connectors
		 * @deprecated
		 * @description Get a list of all service connectors.
		 *
		 *     Args:
		 *         connector_filter_model: Filter model used for pagination, sorting,
		 *             filtering
		 *         project_name_or_id: Optional name or ID of the project to filter by.
		 *         expand_secrets: Whether to expand secrets or not.
		 *         hydrate: Flag deciding whether to hydrate the output model(s)
		 *             by including metadata fields in the response.
		 *
		 *     Returns:
		 *         Page with list of service connectors matching the filter criteria.
		 */
		get: operations["list_service_connectors_api_v1_workspaces__project_name_or_id__service_connectors_get"];
		put?: never;
		/**
		 * Create Service Connector
		 * @deprecated
		 * @description Creates a service connector.
		 *
		 *     Args:
		 *         connector: Service connector to register.
		 *         project_name_or_id: Optional name or ID of the project.
		 *
		 *     Returns:
		 *         The created service connector.
		 */
		post: operations["create_service_connector_api_v1_workspaces__project_name_or_id__service_connectors_post"];
		delete?: never;
		options?: never;
		head?: never;
		patch?: never;
		trace?: never;
	};
	"/api/v1/workspaces/{project_name_or_id}/resources": {
		parameters: {
			query?: never;
			header?: never;
			path?: never;
			cookie?: never;
		};
		/**
		 * List Service Connector Resources
		 * @deprecated
		 * @description List resources that can be accessed by service connectors.
		 *
		 *     Args:
		 *         filter_model: The filter model to use when fetching service
		 *             connectors.
		 *         project_name_or_id: Optional name or ID of the project.
		 *         auth_context: Authentication context.
		 *
		 *     Returns:
		 *         The matching list of resources that available service
		 *         connectors have access to.
		 */
		get: operations["list_service_connector_resources_api_v1_workspaces__project_name_or_id__resources_get"];
		put?: never;
		post?: never;
		delete?: never;
		options?: never;
		head?: never;
		patch?: never;
		trace?: never;
	};
	"/api/v1/workspaces/{project_name_or_id}/services": {
		parameters: {
			query?: never;
			header?: never;
			path?: never;
			cookie?: never;
		};
		get?: never;
		put?: never;
		/**
		 * Create Service
		 * @deprecated
		 * @description Creates a new service.
		 *
		 *     Args:
		 *         service: The service to create.
		 *         project_name_or_id: Optional name or ID of the project.
		 *
		 *     Returns:
		 *         The created service.
		 */
		post: operations["create_service_api_v1_workspaces__project_name_or_id__services_post"];
		delete?: never;
		options?: never;
		head?: never;
		patch?: never;
		trace?: never;
	};
	"/api/v1/workspaces/{project_name_or_id}/components": {
		parameters: {
			query?: never;
			header?: never;
			path?: never;
			cookie?: never;
		};
		/**
		 * List Stack Components
		 * @deprecated
		 * @description Get a list of all stack components.
		 *
		 *     Args:
		 *         component_filter_model: Filter model used for pagination, sorting,
		 *             filtering.
		 *         project_name_or_id: Optional name or ID of the project to filter by.
		 *         hydrate: Flag deciding whether to hydrate the output model(s)
		 *             by including metadata fields in the response.
		 *
		 *     Returns:
		 *         List of stack components matching the filter criteria.
		 */
		get: operations["list_stack_components_api_v1_workspaces__project_name_or_id__components_get"];
		put?: never;
		/**
		 * Create Stack Component
		 * @deprecated
		 * @description Creates a stack component.
		 *
		 *     Args:
		 *         component: Stack component to register.
		 *         project_name_or_id: Optional name or ID of the project.
		 *
		 *     Returns:
		 *         The created stack component.
		 */
		post: operations["create_stack_component_api_v1_workspaces__project_name_or_id__components_post"];
		delete?: never;
		options?: never;
		head?: never;
		patch?: never;
		trace?: never;
	};
	"/api/v1/workspaces/{project_name_or_id}/stacks": {
		parameters: {
			query?: never;
			header?: never;
			path?: never;
			cookie?: never;
		};
		/**
		 * List Stacks
		 * @deprecated
		 * @description Returns all stacks.
		 *
		 *     Args:
		 *         project_name_or_id: Optional name or ID of the project to filter by.
		 *         stack_filter_model: Filter model used for pagination, sorting,
		 *             filtering.
		 *         hydrate: Flag deciding whether to hydrate the output model(s)
		 *             by including metadata fields in the response.
		 *
		 *     Returns:
		 *         All stacks matching the filter criteria.
		 */
		get: operations["list_stacks_api_v1_workspaces__project_name_or_id__stacks_get"];
		put?: never;
		/**
		 * Create Stack
		 * @deprecated
		 * @description Creates a stack.
		 *
		 *     Args:
		 *         stack: Stack to register.
		 *         project_name_or_id: Optional name or ID of the project.
		 *         auth_context: Authentication context.
		 *
		 *     Returns:
		 *         The created stack.
		 */
		post: operations["create_stack_api_v1_workspaces__project_name_or_id__stacks_post"];
		delete?: never;
		options?: never;
		head?: never;
		patch?: never;
		trace?: never;
	};
	"/api/v1/projects": {
		parameters: {
			query?: never;
			header?: never;
			path?: never;
			cookie?: never;
		};
		/**
		 * List Projects
		 * @description Lists all projects in the organization.
		 *
		 *     Args:
		 *         project_filter_model: Filter model used for pagination, sorting,
		 *             filtering,
		 *         hydrate: Flag deciding whether to hydrate the output model(s)
		 *             by including metadata fields in the response.
		 *
		 *     Returns:
		 *         A list of projects.
		 */
		get: operations["list_projects_api_v1_projects_get"];
		put?: never;
		/**
		 * Create Project
		 * @description Creates a project based on the requestBody.
		 *
		 *     # noqa: DAR401
		 *
		 *     Args:
		 *         project_request: Project to create.
		 *
		 *     Returns:
		 *         The created project.
		 */
		post: operations["create_project_api_v1_projects_post"];
		delete?: never;
		options?: never;
		head?: never;
		patch?: never;
		trace?: never;
	};
	"/api/v1/projects/{project_name_or_id}": {
		parameters: {
			query?: never;
			header?: never;
			path?: never;
			cookie?: never;
		};
		/**
		 * Get Project
		 * @description Get a project for given name.
		 *
		 *     # noqa: DAR401
		 *
		 *     Args:
		 *         project_name_or_id: Name or ID of the project.
		 *         hydrate: Flag deciding whether to hydrate the output model(s)
		 *             by including metadata fields in the response.
		 *
		 *     Returns:
		 *         The requested project.
		 */
		get: operations["get_project_api_v1_projects__project_name_or_id__get"];
		/**
		 * Update Project
		 * @description Get a project for given name.
		 *
		 *     # noqa: DAR401
		 *
		 *     Args:
		 *         project_name_or_id: Name or ID of the project to update.
		 *         project_update: the project to use to update
		 *
		 *     Returns:
		 *         The updated project.
		 */
		put: operations["update_project_api_v1_projects__project_name_or_id__put"];
		post?: never;
		/**
		 * Delete Project
		 * @description Deletes a project.
		 *
		 *     Args:
		 *         project_name_or_id: Name or ID of the project.
		 */
		delete: operations["delete_project_api_v1_projects__project_name_or_id__delete"];
		options?: never;
		head?: never;
		patch?: never;
		trace?: never;
	};
	"/api/v1/projects/{project_name_or_id}/statistics": {
		parameters: {
			query?: never;
			header?: never;
			path?: never;
			cookie?: never;
		};
		/**
		 * Get Project Statistics
		 * @description Gets statistics of a project.
		 *
		 *     # noqa: DAR401
		 *
		 *     Args:
		 *         project_name_or_id: Name or ID of the project to get statistics for.
		 *         auth_context: Authentication context.
		 *
		 *     Returns:
		 *         Project statistics.
		 */
		get: operations["get_project_statistics_api_v1_projects__project_name_or_id__statistics_get"];
		put?: never;
		post?: never;
		delete?: never;
		options?: never;
		head?: never;
		patch?: never;
		trace?: never;
	};
	"/api/v1/users/{user_name_or_id}/activate": {
		parameters: {
			query?: never;
			header?: never;
			path?: never;
			cookie?: never;
		};
		get?: never;
		/**
		 * Activate User
		 * @description Activates a specific user.
		 *
		 *     Args:
		 *         user_name_or_id: Name or ID of the user.
		 *         user_update: the user to use for the update.
		 *
		 *     Returns:
		 *         The updated user.
		 */
		put: operations["activate_user_api_v1_users__user_name_or_id__activate_put"];
		post?: never;
		delete?: never;
		options?: never;
		head?: never;
		patch?: never;
		trace?: never;
	};
};
export type webhooks = Record<string, never>;
export type components = {
	schemas: {
		/**
		 * APIKeyRequest
		 * @description Request model for API keys.
		 */
		APIKeyRequest: {
			/** The name of the API Key. */
			name: string;
			/** The description of the API Key. */
			description?: string | null;
		};
		/**
		 * APIKeyResponse
		 * @description Response model for API keys.
		 */
		APIKeyResponse: {
			/** The body of the resource. */
			body?: components["schemas"]["APIKeyResponseBody"] | null;
			/** The metadata related to this resource. */
			metadata?: components["schemas"]["APIKeyResponseMetadata"] | null;
			/** The resources related to this resource. */
			resources?: components["schemas"]["APIKeyResponseResources"] | null;
			/**
			 * The unique resource id.
			 * Format: uuid
			 */
			id: string;
			/**
			 * Permission Denied
			 * @default false
			 */
			permission_denied: boolean;
			/** The name of the API Key. */
			name: string;
		};
		/**
		 * APIKeyResponseBody
		 * @description Response body for API keys.
		 */
		APIKeyResponseBody: {
			/**
			 * The timestamp when this resource was created.
			 * Format: date-time
			 */
			created: string;
			/**
			 * The timestamp when this resource was last updated.
			 * Format: date-time
			 */
			updated: string;
			/** The API key. Only set immediately after creation or rotation. */
			key?: string | null;
			/**
			 * Whether the API key is active.
			 * @default true
			 */
			active: boolean;
			/** The service account associated with this API key. */
			service_account: components["schemas"]["ServiceAccountResponse"];
		};
		/**
		 * APIKeyResponseMetadata
		 * @description Response metadata for API keys.
		 */
		APIKeyResponseMetadata: {
			/**
			 * The description of the API Key.
			 * @default
			 */
			description: string;
			/** Number of minutes for which the previous key is still valid after it has been rotated. */
			retain_period_minutes: number;
			/** Time when the API key was last used to log in. */
			last_login?: string | null;
			/** Time when the API key was last rotated. */
			last_rotated?: string | null;
		};
		/**
		 * APIKeyResponseResources
		 * @description Class for all resource models associated with the APIKey entity.
		 */
		APIKeyResponseResources: {
			[key: string]: unknown;
		};
		/**
		 * APIKeyRotateRequest
		 * @description Request model for API key rotation.
		 */
		APIKeyRotateRequest: {
			/**
			 * Number of minutes for which the previous key is still valid after it has been rotated.
			 * @default 0
			 */
			retain_period_minutes: number;
		};
		/**
		 * APIKeyUpdate
		 * @description Update model for API keys.
		 */
		APIKeyUpdate: {
			/** The name of the API Key. */
			name?: string | null;
			/** The description of the API Key. */
			description?: string | null;
			/** Whether the API key is active. */
			active?: boolean | null;
		};
		/**
		 * APITokenType
		 * @description The API token type.
		 * @enum {string}
		 */
		APITokenType: "generic" | "workload";
		/**
		 * ActionRequest
		 * @description Model for creating a new action.
		 */
		ActionRequest: {
			/** The id of the user that created this resource. Set automatically by the server. */
			user?: string | null;
			/**
			 * The project to which this resource belongs.
			 * Format: uuid
			 */
			project: string;
			/** The name of the action. */
			name: string;
			/**
			 * The description of the action
			 * @default
			 */
			description: string;
			/** The flavor of the action. */
			flavor: string;
			/** The subtype of the action. */
			plugin_subtype: components["schemas"]["PluginSubType"];
			/** The configuration for the action. */
			configuration: {
				[key: string]: unknown;
			};
			/**
			 * The service account that is used to execute the action.
			 * Format: uuid
			 */
			service_account_id: string;
			/** The time window in minutes for which the service account is authorized to execute the action. Set this to 0 to authorize the service account indefinitely (not recommended). If not set, a default value defined for each individual action type is used. */
			auth_window?: number | null;
		};
		/**
		 * ActionResponse
		 * @description Response model for actions.
		 */
		ActionResponse: {
			/** The body of the resource. */
			body?: components["schemas"]["ActionResponseBody"] | null;
			/** The metadata related to this resource. */
			metadata?: components["schemas"]["ActionResponseMetadata"] | null;
			/** The resources related to this resource. */
			resources?: components["schemas"]["ActionResponseResources"] | null;
			/**
			 * The unique resource id.
			 * Format: uuid
			 */
			id: string;
			/**
			 * Permission Denied
			 * @default false
			 */
			permission_denied: boolean;
			/** The name of the action. */
			name: string;
		};
		/**
		 * ActionResponseBody
		 * @description Response body for actions.
		 */
		ActionResponseBody: {
			/**
			 * The timestamp when this resource was created.
			 * Format: date-time
			 */
			created: string;
			/**
			 * The timestamp when this resource was last updated.
			 * Format: date-time
			 */
			updated: string;
			/** The user who created this resource. */
			user?: components["schemas"]["UserResponse"] | null;
			/** The flavor of the action. */
			flavor: string;
			/** The subtype of the action. */
			plugin_subtype: components["schemas"]["PluginSubType"];
		};
		/**
		 * ActionResponseMetadata
		 * @description Response metadata for actions.
		 */
		ActionResponseMetadata: {
			/** The project of this resource. */
			project: components["schemas"]["ProjectResponse"];
			/**
			 * The description of the action.
			 * @default
			 */
			description: string;
			/** The configuration for the action. */
			configuration: {
				[key: string]: unknown;
			};
			/** The time window in minutes for which the service account is authorized to execute the action. */
			auth_window: number;
		};
		/**
		 * ActionResponseResources
		 * @description Class for all resource models associated with the action entity.
		 */
		ActionResponseResources: {
			/** The service account that is used to execute the action. */
			service_account: components["schemas"]["UserResponse"];
		} & {
			[key: string]: unknown;
		};
		/**
		 * ActionUpdate
		 * @description Update model for actions.
		 */
		ActionUpdate: {
			/** The new name for the action. */
			name?: string | null;
			/** The new description for the action. */
			description?: string | null;
			/** The configuration for the action. */
			configuration?: {
				[key: string]: unknown;
			} | null;
			/** The service account that is used to execute the action. */
			service_account_id?: string | null;
			/** The time window in minutes for which the service account is authorized to execute the action. Set this to 0 to authorize the service account indefinitely (not recommended). If not set, a default value defined for each individual action type is used. */
			auth_window?: number | null;
		};
		/**
		 * ArtifactConfig
		 * @description Artifact configuration class.
		 *
		 *     Can be used in step definitions to define various artifact properties.
		 *
		 *     Example:
		 *     ```python
		 *     @step
		 *     def my_step() -> Annotated[
		 *         int, ArtifactConfig(
		 *             name="my_artifact",  # override the default artifact name
		 *             version=42,  # set a custom version
		 *             artifact_type=ArtifactType.MODEL,  # Specify the artifact type
		 *             tags=["tag1", "tag2"],  # set custom tags
		 *         )
		 *     ]:
		 *         return ...
		 *     ```
		 *
		 *     Attributes:
		 *         name: The name of the artifact:
		 *             - static string e.g. "name"
		 *             - dynamic string e.g. "name_{date}_{time}_{custom_placeholder}"
		 *             If you use any placeholders besides `date` and `time`,
		 *             you need to provide the values for them in the `substitutions`
		 *             argument of the step decorator or the `substitutions` argument
		 *             of `with_options` of the step.
		 *         version: The version of the artifact.
		 *         tags: The tags of the artifact.
		 *         run_metadata: Metadata to add to the artifact.
		 *         artifact_type: Optional type of the artifact. If not given, the type
		 *             specified by the materializer that is used to save this artifact
		 *             is used.
		 */
		ArtifactConfig: {
			/** Name */
			name?: string | null;
			/** Version */
			version?: number | string | null;
			/** Tags */
			tags?: string[] | null;
			/** Run Metadata */
			run_metadata?: {
				[key: string]: unknown;
			} | null;
			artifact_type?: components["schemas"]["ArtifactType"] | null;
		};
		/**
		 * ArtifactConfiguration
		 * @description Class representing a complete input/output artifact configuration.
		 */
		"ArtifactConfiguration-Input": {
			/** Materializer Source */
			materializer_source: components["schemas"]["Source"][];
			default_materializer_source?: components["schemas"]["Source"] | null;
			artifact_config?: components["schemas"]["ArtifactConfig"] | null;
		};
		/**
		 * ArtifactConfiguration
		 * @description Class representing a complete input/output artifact configuration.
		 */
		"ArtifactConfiguration-Output": {
			/** Materializer Source */
			materializer_source: components["schemas"]["Source"][];
			default_materializer_source?: components["schemas"]["Source"] | null;
			artifact_config?: components["schemas"]["ArtifactConfig"] | null;
		};
		/**
		 * ArtifactRequest
		 * @description Artifact request model.
		 */
		ArtifactRequest: {
			/** The id of the user that created this resource. Set automatically by the server. */
			user?: string | null;
			/**
			 * The project to which this resource belongs.
			 * Format: uuid
			 */
			project: string;
			/** Name of the artifact. */
			name: string;
			/**
			 * Whether the name is custom (True) or auto-generated (False).
			 * @default false
			 */
			has_custom_name: boolean;
			/**
			 * Artifact tags.
			 * @description Should be a list of plain strings, e.g., ['tag1', 'tag2']
			 */
			tags?: string[] | null;
		};
		/**
		 * ArtifactResponse
		 * @description Artifact response model.
		 */
		ArtifactResponse: {
			/** The body of the resource. */
			body?: components["schemas"]["ArtifactResponseBody"] | null;
			/** The metadata related to this resource. */
			metadata?: components["schemas"]["ArtifactResponseMetadata"] | null;
			/** The resources related to this resource. */
			resources?: components["schemas"]["ArtifactResponseResources"] | null;
			/**
			 * The unique resource id.
			 * Format: uuid
			 */
			id: string;
			/**
			 * Permission Denied
			 * @default false
			 */
			permission_denied: boolean;
			/** Name of the output in the parent step. */
			name: string;
		};
		/**
		 * ArtifactResponseBody
		 * @description Response body for artifacts.
		 */
		ArtifactResponseBody: {
			/**
			 * The timestamp when this resource was created.
			 * Format: date-time
			 */
			created: string;
			/**
			 * The timestamp when this resource was last updated.
			 * Format: date-time
			 */
			updated: string;
			/** The user who created this resource. */
			user?: components["schemas"]["UserResponse"] | null;
			/** Tags associated with the model */
			tags: components["schemas"]["TagResponse"][];
			/** Latest Version Name */
			latest_version_name?: string | null;
			/** Latest Version Id */
			latest_version_id?: string | null;
		};
		/**
		 * ArtifactResponseMetadata
		 * @description Response metadata for artifacts.
		 */
		ArtifactResponseMetadata: {
			/** The project of this resource. */
			project: components["schemas"]["ProjectResponse"];
			/**
			 * Whether the name is custom (True) or auto-generated (False).
			 * @default false
			 */
			has_custom_name: boolean;
		};
		/**
		 * ArtifactResponseResources
		 * @description Class for all resource models associated with the Artifact Entity.
		 */
		ArtifactResponseResources: {
			[key: string]: unknown;
		};
		/**
		 * ArtifactSaveType
		 * @description All possible method types of how artifact versions can be saved.
		 * @enum {string}
		 */
		ArtifactSaveType: "step_output" | "manual" | "preexisting" | "external";
		/**
		 * ArtifactType
		 * @description All possible types an artifact can have.
		 * @enum {string}
		 */
		ArtifactType:
			| "DataAnalysisArtifact"
			| "DataArtifact"
			| "ModelArtifact"
			| "SchemaArtifact"
			| "ServiceArtifact"
			| "StatisticsArtifact"
			| "BaseArtifact";
		/**
		 * ArtifactUpdate
		 * @description Artifact update model.
		 */
		ArtifactUpdate: {
			/** Name */
			name?: string | null;
			/** Add Tags */
			add_tags?: string[] | null;
			/** Remove Tags */
			remove_tags?: string[] | null;
			/** Has Custom Name */
			has_custom_name?: boolean | null;
		};
		/**
		 * ArtifactVersionRequest
		 * @description Request model for artifact versions.
		 */
		ArtifactVersionRequest: {
			/** The id of the user that created this resource. Set automatically by the server. */
			user?: string | null;
			/**
			 * The project to which this resource belongs.
			 * Format: uuid
			 */
			project: string;
			/** ID of the artifact to which this version belongs. */
			artifact_id?: string | null;
			/** Name of the artifact to which this version belongs. */
			artifact_name?: string | null;
			/** Version of the artifact. */
			version?: number | string | null;
			/**
			 * Whether the name is custom (True) or auto-generated (False).
			 * @default false
			 */
			has_custom_name: boolean;
			/** Type of the artifact. */
			type: components["schemas"]["ArtifactType"];
			/** ID of the artifact store in which this artifact is stored. */
			artifact_store_id?: string | null;
			/** URI of the artifact. */
			uri: string;
			/** Materializer class to use for this artifact. */
			materializer: components["schemas"]["Source"];
			/** Data type of the artifact. */
			data_type: components["schemas"]["Source"];
			/**
			 * Tags of the artifact.
			 * @description Should be a list of plain strings, e.g., ['tag1', 'tag2']
			 */
			tags?: string[] | null;
			/** Visualizations of the artifact. */
			visualizations?:
				| components["schemas"]["ArtifactVisualizationRequest"][]
				| null;
			/** The save type of the artifact version. */
			save_type: components["schemas"]["ArtifactSaveType"];
			/** Metadata of the artifact version. */
			metadata?: {
				[key: string]: unknown;
			} | null;
		};
		/**
		 * ArtifactVersionResponse
		 * @description Response model for artifact versions.
		 */
		ArtifactVersionResponse: {
			/** The body of the resource. */
			body?: components["schemas"]["ArtifactVersionResponseBody"] | null;
			/** The metadata related to this resource. */
			metadata?:
				| components["schemas"]["ArtifactVersionResponseMetadata"]
				| null;
			/** The resources related to this resource. */
			resources?:
				| components["schemas"]["ArtifactVersionResponseResources"]
				| null;
			/**
			 * The unique resource id.
			 * Format: uuid
			 */
			id: string;
			/**
			 * Permission Denied
			 * @default false
			 */
			permission_denied: boolean;
		};
		/**
		 * ArtifactVersionResponseBody
		 * @description Response body for artifact versions.
		 */
		ArtifactVersionResponseBody: {
			/**
			 * The timestamp when this resource was created.
			 * Format: date-time
			 */
			created: string;
			/**
			 * The timestamp when this resource was last updated.
			 * Format: date-time
			 */
			updated: string;
			/** The user who created this resource. */
			user?: components["schemas"]["UserResponse"] | null;
			/** Artifact to which this version belongs. */
			artifact: components["schemas"]["ArtifactResponse"];
			/** Version of the artifact. */
			version: string;
			/** URI of the artifact. */
			uri: string;
			/** Type of the artifact. */
			type: components["schemas"]["ArtifactType"];
			/** Materializer class to use for this artifact. */
			materializer: components["schemas"]["Source"];
			/** Data type of the artifact. */
			data_type: components["schemas"]["Source"];
			/** Tags associated with the model */
			tags: components["schemas"]["TagResponse"][];
			/** The ID of the pipeline run that generated this artifact version. */
			producer_pipeline_run_id?: string | null;
			/** The save type of the artifact version. */
			save_type: components["schemas"]["ArtifactSaveType"];
			/** ID of the artifact store in which this artifact is stored. */
			artifact_store_id?: string | null;
		};
		/**
		 * ArtifactVersionResponseMetadata
		 * @description Response metadata for artifact versions.
		 */
		ArtifactVersionResponseMetadata: {
			/** The project of this resource. */
			project: components["schemas"]["ProjectResponse"];
			/** ID of the step run that produced this artifact. */
			producer_step_run_id?: string | null;
			/** Visualizations of the artifact. */
			visualizations?:
				| components["schemas"]["ArtifactVisualizationResponse"][]
				| null;
			/**
			 * Metadata of the artifact.
			 * @default {}
			 */
			run_metadata: {
				[key: string]: unknown;
			};
		};
		/**
		 * ArtifactVersionResponseResources
		 * @description Class for all resource models associated with the artifact version entity.
		 */
		ArtifactVersionResponseResources: {
			[key: string]: unknown;
		};
		/**
		 * ArtifactVersionUpdate
		 * @description Artifact version update model.
		 */
		ArtifactVersionUpdate: {
			/** Name */
			name?: string | null;
			/** Add Tags */
			add_tags?: string[] | null;
			/** Remove Tags */
			remove_tags?: string[] | null;
		};
		/**
		 * ArtifactVisualizationRequest
		 * @description Request model for artifact visualization.
		 */
		ArtifactVisualizationRequest: {
			type: components["schemas"]["VisualizationType"];
			/** Uri */
			uri: string;
		};
		/**
		 * ArtifactVisualizationResponse
		 * @description Response model for artifact visualizations.
		 */
		ArtifactVisualizationResponse: {
			/** The body of the resource. */
			body?: components["schemas"]["ArtifactVisualizationResponseBody"] | null;
			/** The metadata related to this resource. */
			metadata?:
				| components["schemas"]["ArtifactVisualizationResponseMetadata"]
				| null;
			/** The resources related to this resource. */
			resources?:
				| components["schemas"]["ArtifactVisualizationResponseResources"]
				| null;
			/**
			 * The unique resource id.
			 * Format: uuid
			 */
			id: string;
			/**
			 * Permission Denied
			 * @default false
			 */
			permission_denied: boolean;
		};
		/**
		 * ArtifactVisualizationResponseBody
		 * @description Response body for artifact visualizations.
		 */
		ArtifactVisualizationResponseBody: {
			/**
			 * The timestamp when this resource was created.
			 * Format: date-time
			 */
			created: string;
			/**
			 * The timestamp when this resource was last updated.
			 * Format: date-time
			 */
			updated: string;
			type: components["schemas"]["VisualizationType"];
			/** Uri */
			uri: string;
		};
		/**
		 * ArtifactVisualizationResponseMetadata
		 * @description Response metadata model for artifact visualizations.
		 */
		ArtifactVisualizationResponseMetadata: {
			/**
			 * Artifact Version Id
			 * Format: uuid
			 */
			artifact_version_id: string;
		};
		/**
		 * ArtifactVisualizationResponseResources
		 * @description Class for all resource models associated with the artifact visualization.
		 */
		ArtifactVisualizationResponseResources: {
			[key: string]: unknown;
		};
		/**
		 * AuthScheme
		 * @description The authentication scheme.
		 * @enum {string}
		 */
		AuthScheme:
			| "NO_AUTH"
			| "HTTP_BASIC"
			| "OAUTH2_PASSWORD_BEARER"
			| "EXTERNAL";
		/**
		 * AuthenticationMethodModel
		 * @description Authentication method specification.
		 *
		 *     Describes the schema for the configuration and secrets that need to be
		 *     provided to configure an authentication method.
		 */
		AuthenticationMethodModel: {
			/** User readable name for the authentication method. */
			name: string;
			/** The name of the authentication method. */
			auth_method: string;
			/**
			 * A description of the authentication method.
			 * @default
			 */
			description: string;
			/** The JSON schema of the configuration for this authentication method. */
			config_schema?: {
				[key: string]: unknown;
			};
			/** The minimum number of seconds that the authentication session can be configured to be valid for. Set to None for authentication sessions and long-lived credentials that don't expire. */
			min_expiration_seconds?: number | null;
			/** The maximum number of seconds that the authentication session can be configured to be valid for. Set to None for authentication sessions and long-lived credentials that don't expire. */
			max_expiration_seconds?: number | null;
			/** The default number of seconds that the authentication session is valid for. Set to None for authentication sessions and long-lived credentials that don't expire. */
			default_expiration_seconds?: number | null;
		};
		/**
		 * BasePluginFlavorResponse
		 * @description Base response for all Plugin Flavors.
		 */
		BasePluginFlavorResponse: {
			/** The body of the resource. */
			body?: components["schemas"]["BasePluginResponseBody"] | null;
			/** The metadata related to this resource. */
			metadata?: components["schemas"]["BasePluginResponseMetadata"] | null;
			/** The resources related to this resource. */
			resources?: components["schemas"]["BasePluginResponseResources"] | null;
			/** Name of the flavor. */
			name: string;
			/** Type of the plugin. */
			type: components["schemas"]["PluginType"];
			/** Subtype of the plugin. */
			subtype: components["schemas"]["PluginSubType"];
		};
		/**
		 * BasePluginResponseBody
		 * @description Response body for plugins.
		 */
		BasePluginResponseBody: Record<string, never>;
		/**
		 * BasePluginResponseMetadata
		 * @description Response metadata for plugins.
		 */
		BasePluginResponseMetadata: Record<string, never>;
		/**
		 * BasePluginResponseResources
		 * @description Response resources for plugins.
		 */
		BasePluginResponseResources: {
			[key: string]: unknown;
		};
		/**
		 * BaseResponseMetadata
		 * @description Base metadata model.
		 *
		 *     Used as a base class for all metadata models associated with responses.
		 */
		BaseResponseMetadata: Record<string, never>;
		/**
		 * BaseSettings
		 * @description Base class for settings.
		 *
		 *     The `LEVEL` class variable defines on which level the settings can be
		 *     specified. By default, subclasses can be defined on both pipelines and
		 *     steps.
		 */
		BaseSettings: {
			[key: string]: unknown;
		};
		/** Body_device_authorization_api_v1_device_authorization_post */
		Body_device_authorization_api_v1_device_authorization_post: {
			/**
			 * Client Id
			 * Format: uuid
			 */
			client_id: string;
		};
		/** Body_token_api_v1_login_post */
		Body_token_api_v1_login_post: {
			/** Grant Type */
			grant_type?: string | null;
			/** Username */
			username?: string | null;
			/** Password */
			password?: string | null;
			/** Client Id */
			client_id?: string | null;
			/** Device Code */
			device_code?: string | null;
		};
		/**
		 * BuildItem
		 * @description Pipeline build item.
		 *
		 *     Attributes:
		 *         image: The image name or digest.
		 *         dockerfile: The contents of the Dockerfile used to build the image.
		 *         requirements: The pip requirements installed in the image. This is a
		 *             string consisting of multiple concatenated requirements.txt files.
		 *         settings_checksum: Checksum of the settings used for the build.
		 *         contains_code: Whether the image contains user files.
		 *         requires_code_download: Whether the image needs to download files.
		 */
		BuildItem: {
			/** The image name or digest. */
			image: string;
			/** The dockerfile used to build the image. */
			dockerfile?: string | null;
			/** The pip requirements installed in the image. */
			requirements?: string | null;
			/** The checksum of the build settings. */
			settings_checksum?: string | null;
			/**
			 * Whether the image contains user files.
			 * @default true
			 */
			contains_code: boolean;
			/**
			 * Whether the image needs to download files.
			 * @default false
			 */
			requires_code_download: boolean;
		};
		/**
		 * ClientLazyLoader
		 * @description Lazy loader for Client methods.
		 */
		ClientLazyLoader: {
			/** Method Name */
			method_name: string;
			/**
			 * Call Chain
			 * @default []
			 */
			call_chain: components["schemas"]["_CallStep"][];
			/**
			 * Exclude Next Call
			 * @default false
			 */
			exclude_next_call: boolean;
		};
		/**
		 * CodeReferenceRequest
		 * @description Request model for code references.
		 */
		CodeReferenceRequest: {
			/**
			 * Commit
			 * @description The commit of the code reference.
			 */
			commit: string;
			/**
			 * Subdirectory
			 * @description The subdirectory of the code reference.
			 */
			subdirectory: string;
			/**
			 * Code Repository
			 * Format: uuid
			 * @description The repository of the code reference.
			 */
			code_repository: string;
		};
		/**
		 * CodeReferenceResponse
		 * @description Response model for code references.
		 */
		CodeReferenceResponse: {
			/** The body of the resource. */
			body?: components["schemas"]["CodeReferenceResponseBody"] | null;
			/** The metadata related to this resource. */
			metadata?: components["schemas"]["CodeReferenceResponseMetadata"] | null;
			/** The resources related to this resource. */
			resources?:
				| components["schemas"]["CodeReferenceResponseResources"]
				| null;
			/**
			 * The unique resource id.
			 * Format: uuid
			 */
			id: string;
			/**
			 * Permission Denied
			 * @default false
			 */
			permission_denied: boolean;
		};
		/**
		 * CodeReferenceResponseBody
		 * @description Response body for code references.
		 */
		CodeReferenceResponseBody: {
			/**
			 * The timestamp when this resource was created.
			 * Format: date-time
			 */
			created: string;
			/**
			 * The timestamp when this resource was last updated.
			 * Format: date-time
			 */
			updated: string;
			/**
			 * Commit
			 * @description The commit of the code reference.
			 */
			commit: string;
			/**
			 * Subdirectory
			 * @description The subdirectory of the code reference.
			 */
			subdirectory: string;
			/** @description The repository of the code reference. */
			code_repository: components["schemas"]["CodeRepositoryResponse"];
		};
		/**
		 * CodeReferenceResponseMetadata
		 * @description Response metadata for code references.
		 */
		CodeReferenceResponseMetadata: Record<string, never>;
		/**
		 * CodeReferenceResponseResources
		 * @description Class for all resource models associated with the code reference entity.
		 */
		CodeReferenceResponseResources: {
			[key: string]: unknown;
		};
		/**
		 * CodeRepositoryRequest
		 * @description Request model for code repositories.
		 */
		CodeRepositoryRequest: {
			/** The id of the user that created this resource. Set automatically by the server. */
			user?: string | null;
			/**
			 * The project to which this resource belongs.
			 * Format: uuid
			 */
			project: string;
			/** The name of the code repository. */
			name: string;
			/**
			 * Config
			 * @description Configuration for the code repository.
			 */
			config: {
				[key: string]: unknown;
			};
			/** @description The code repository source. */
			source: components["schemas"]["Source"];
			/**
			 * Logo Url
			 * @description Optional URL of a logo (png, jpg or svg) for the code repository.
			 */
			logo_url?: string | null;
			/**
			 * Description
			 * @description Code repository description.
			 */
			description?: string | null;
		};
		/**
		 * CodeRepositoryResponse
		 * @description Response model for code repositories.
		 */
		CodeRepositoryResponse: {
			/** The body of the resource. */
			body?: components["schemas"]["CodeRepositoryResponseBody"] | null;
			/** The metadata related to this resource. */
			metadata?: components["schemas"]["CodeRepositoryResponseMetadata"] | null;
			/** The resources related to this resource. */
			resources?:
				| components["schemas"]["CodeRepositoryResponseResources"]
				| null;
			/**
			 * The unique resource id.
			 * Format: uuid
			 */
			id: string;
			/**
			 * Permission Denied
			 * @default false
			 */
			permission_denied: boolean;
			/** The name of the code repository. */
			name: string;
		};
		/**
		 * CodeRepositoryResponseBody
		 * @description Response body for code repositories.
		 */
		CodeRepositoryResponseBody: {
			/**
			 * The timestamp when this resource was created.
			 * Format: date-time
			 */
			created: string;
			/**
			 * The timestamp when this resource was last updated.
			 * Format: date-time
			 */
			updated: string;
			/** The user who created this resource. */
			user?: components["schemas"]["UserResponse"] | null;
			/** @description The code repository source. */
			source: components["schemas"]["Source"];
			/**
			 * Logo Url
			 * @description Optional URL of a logo (png, jpg or svg) for the code repository.
			 */
			logo_url?: string | null;
		};
		/**
		 * CodeRepositoryResponseMetadata
		 * @description Response metadata for code repositories.
		 */
		CodeRepositoryResponseMetadata: {
			/** The project of this resource. */
			project: components["schemas"]["ProjectResponse"];
			/**
			 * Config
			 * @description Configuration for the code repository.
			 */
			config: {
				[key: string]: unknown;
			};
			/**
			 * Description
			 * @description Code repository description.
			 */
			description?: string | null;
		};
		/**
		 * CodeRepositoryResponseResources
		 * @description Class for all resource models associated with the code repository entity.
		 */
		CodeRepositoryResponseResources: {
			[key: string]: unknown;
		};
		/**
		 * CodeRepositoryUpdate
		 * @description Update model for code repositories.
		 */
		CodeRepositoryUpdate: {
			/** The name of the code repository. */
			name?: string | null;
			/**
			 * Config
			 * @description Configuration for the code repository.
			 */
			config?: {
				[key: string]: unknown;
			} | null;
			/** @description The code repository source. */
			source?: components["schemas"]["Source"] | null;
			/**
			 * Logo Url
			 * @description Optional URL of a logo (png, jpg or svg) for the code repository.
			 */
			logo_url?: string | null;
			/**
			 * Description
			 * @description Code repository description.
			 */
			description?: string | null;
		};
		/**
		 * ColorVariants
		 * @description All possible color variants for frontend.
		 * @enum {string}
		 */
		ColorVariants:
			| "grey"
			| "purple"
			| "red"
			| "green"
			| "yellow"
			| "orange"
			| "lime"
			| "teal"
			| "turquoise"
			| "magenta"
			| "blue";
		/**
		 * ComponentInfo
		 * @description Information about each stack components when creating a full stack.
		 */
		ComponentInfo: {
			/** Flavor */
			flavor: string;
			/**
			 * The id of the service connector from the list `service_connectors`.
			 * @description The id of the service connector from the list `service_connectors` from `FullStackRequest`.
			 */
			service_connector_index?: number | null;
			/** Service Connector Resource Id */
			service_connector_resource_id?: string | null;
			/**
			 * Configuration
			 * @default {}
			 */
			configuration: {
				[key: string]: unknown;
			};
		};
		/**
		 * ComponentRequest
		 * @description Request model for stack components.
		 */
		ComponentRequest: {
			/** The id of the user that created this resource. Set automatically by the server. */
			user?: string | null;
			/** The name of the stack component. */
			name: string;
			/** The type of the stack component. */
			type: components["schemas"]["StackComponentType"];
			/** The flavor of the stack component. */
			flavor: string;
			/** The stack component configuration. */
			configuration: {
				[key: string]: unknown;
			};
			/**
			 * Connector Resource Id
			 * @description The ID of a specific resource instance to gain access to through the connector
			 */
			connector_resource_id?: string | null;
			/** The stack component labels. */
			labels?: {
				[key: string]: unknown;
			} | null;
			/** The service connector linked to this stack component. */
			connector?: string | null;
		};
		/**
		 * ComponentResponse
		 * @description Response model for stack components.
		 */
		ComponentResponse: {
			/** The body of the resource. */
			body?: components["schemas"]["ComponentResponseBody"] | null;
			/** The metadata related to this resource. */
			metadata?: components["schemas"]["ComponentResponseMetadata"] | null;
			/** The resources related to this resource. */
			resources?: components["schemas"]["ComponentResponseResources"] | null;
			/**
			 * The unique resource id.
			 * Format: uuid
			 */
			id: string;
			/**
			 * Permission Denied
			 * @default false
			 */
			permission_denied: boolean;
			/** The name of the stack component. */
			name: string;
		};
		/**
		 * ComponentResponseBody
		 * @description Response body for stack components.
		 */
		ComponentResponseBody: {
			/**
			 * The timestamp when this resource was created.
			 * Format: date-time
			 */
			created: string;
			/**
			 * The timestamp when this resource was last updated.
			 * Format: date-time
			 */
			updated: string;
			/** The user who created this resource. */
			user?: components["schemas"]["UserResponse"] | null;
			/** The type of the stack component. */
			type: components["schemas"]["StackComponentType"];
			/** The flavor of the stack component. */
			flavor_name: string;
			/** The name of the integration that the component's flavor belongs to. */
			integration?: string | null;
			/** Optionally, a url pointing to a png,svg or jpg can be attached. */
			logo_url?: string | null;
		};
		/**
		 * ComponentResponseMetadata
		 * @description Response metadata for stack components.
		 */
		ComponentResponseMetadata: {
			/** The stack component configuration. */
			configuration: {
				[key: string]: unknown;
			};
			/** The stack component labels. */
			labels?: {
				[key: string]: unknown;
			} | null;
			/**
			 * Connector Resource Id
			 * @description The ID of a specific resource instance to gain access to through the connector
			 */
			connector_resource_id?: string | null;
			/** The service connector linked to this stack component. */
			connector?: components["schemas"]["ServiceConnectorResponse"] | null;
		};
		/**
		 * ComponentResponseResources
		 * @description Response resources for stack components.
		 */
		ComponentResponseResources: {
			/** The flavor of this stack component. */
			flavor: components["schemas"]["FlavorResponse"];
		} & {
			[key: string]: unknown;
		};
		/**
		 * ComponentUpdate
		 * @description Update model for stack components.
		 */
		ComponentUpdate: {
			/** The name of the stack component. */
			name?: string | null;
			/** The stack component configuration. */
			configuration?: {
				[key: string]: unknown;
			} | null;
			/**
			 * Connector Resource Id
			 * @description The ID of a specific resource instance to gain access to through the connector
			 */
			connector_resource_id?: string | null;
			/** The stack component labels. */
			labels?: {
				[key: string]: unknown;
			} | null;
			/** The service connector linked to this stack component. */
			connector?: string | null;
		};
		/**
		 * DeployedStack
		 * @description Information about a deployed stack.
		 */
		DeployedStack: {
			/**
			 * The stack that was deployed.
			 * @description The stack that was deployed.
			 */
			stack: components["schemas"]["StackResponse"];
			/**
			 * The service connector for the deployed stack.
			 * @description The service connector for the deployed stack.
			 */
			service_connector?:
				| components["schemas"]["ServiceConnectorResponse"]
				| null;
		};
		/**
		 * ErrorModel
		 * @description Base class for error responses.
		 */
		ErrorModel: {
			/** Detail */
			detail?: unknown | null;
		};
		/**
		 * EventSourceRequest
		 * @description BaseModel for all event sources.
		 */
		EventSourceRequest: {
			/** The id of the user that created this resource. Set automatically by the server. */
			user?: string | null;
			/**
			 * The project to which this resource belongs.
			 * Format: uuid
			 */
			project: string;
			/** The name of the event source. */
			name: string;
			/** The flavor of event source. */
			flavor: string;
			/** The plugin subtype of the event source. */
			plugin_subtype: components["schemas"]["PluginSubType"];
			/**
			 * The description of the event source.
			 * @default
			 */
			description: string;
			/** The event source configuration. */
			configuration: {
				[key: string]: unknown;
			};
		};
		/**
		 * EventSourceResponse
		 * @description Response model for event sources.
		 */
		EventSourceResponse: {
			/** The body of the resource. */
			body?: components["schemas"]["EventSourceResponseBody"] | null;
			/** The metadata related to this resource. */
			metadata?: components["schemas"]["EventSourceResponseMetadata"] | null;
			/** The resources related to this resource. */
			resources?: components["schemas"]["EventSourceResponseResources"] | null;
			/**
			 * The unique resource id.
			 * Format: uuid
			 */
			id: string;
			/**
			 * Permission Denied
			 * @default false
			 */
			permission_denied: boolean;
			/** The name of the event source. */
			name: string;
		};
		/**
		 * EventSourceResponseBody
		 * @description ResponseBody for event sources.
		 */
		EventSourceResponseBody: {
			/**
			 * The timestamp when this resource was created.
			 * Format: date-time
			 */
			created: string;
			/**
			 * The timestamp when this resource was last updated.
			 * Format: date-time
			 */
			updated: string;
			/** The user who created this resource. */
			user?: components["schemas"]["UserResponse"] | null;
			/** The flavor of event source. */
			flavor: string;
			/** The plugin subtype of the event source. */
			plugin_subtype: components["schemas"]["PluginSubType"];
			/** Whether the event source is active. */
			is_active: boolean;
		};
		/**
		 * EventSourceResponseMetadata
		 * @description Response metadata for event sources.
		 */
		EventSourceResponseMetadata: {
			/** The project of this resource. */
			project: components["schemas"]["ProjectResponse"];
			/**
			 * The description of the event source.
			 * @default
			 */
			description: string;
			/** The event source configuration. */
			configuration: {
				[key: string]: unknown;
			};
		};
		/**
		 * EventSourceResponseResources
		 * @description Class for all resource models associated with the code repository entity.
		 */
		EventSourceResponseResources: {
			/** The triggers configured with this event source. */
			triggers: components["schemas"]["Page_TriggerResponse_"];
		} & {
			[key: string]: unknown;
		};
		/**
		 * EventSourceUpdate
		 * @description Update model for event sources.
		 */
		EventSourceUpdate: {
			/** The updated name of the event source. */
			name?: string | null;
			/** The updated description of the event source. */
			description?: string | null;
			/** The updated event source configuration. */
			configuration?: {
				[key: string]: unknown;
			} | null;
			/** The status of the event source. */
			is_active?: boolean | null;
		};
		/**
		 * ExecutionStatus
		 * @description Enum that represents the current status of a step or pipeline run.
		 * @enum {string}
		 */
		ExecutionStatus:
			| "initializing"
			| "failed"
			| "completed"
			| "running"
			| "cached";
		/**
		 * ExternalArtifactConfiguration
		 * @description External artifact configuration.
		 *
		 *     Lightweight class to pass in the steps for runtime inference.
		 */
		ExternalArtifactConfiguration: {
			/** Id */
			id?: string | null;
		};
		/**
		 * FlavorRequest
		 * @description Request model for stack component flavors.
		 */
		FlavorRequest: {
			/** The id of the user that created this resource. Set automatically by the server. */
			user?: string | null;
			/** The name of the Flavor. */
			name: string;
			/** The type of the Flavor. */
			type: components["schemas"]["StackComponentType"];
			/** The JSON schema of this flavor's corresponding configuration. */
			config_schema: {
				[key: string]: unknown;
			};
			/** The type of the connector that this flavor uses. */
			connector_type?: string | null;
			/** The resource type of the connector that this flavor uses. */
			connector_resource_type?: string | null;
			/** The name of an attribute in the stack component configuration that plays the role of resource ID when linked to a service connector. */
			connector_resource_id_attr?: string | null;
			/** The path to the module which contains this Flavor. */
			source: string;
			/** The name of the integration that the Flavor belongs to. */
			integration: string | null;
			/** Optionally, a url pointing to a png,svg or jpg can be attached. */
			logo_url?: string | null;
			/** Optionally, a url pointing to docs, within docs.zenml.io. */
			docs_url?: string | null;
			/** Optionally, a url pointing to SDK docs,within sdkdocs.zenml.io. */
			sdk_docs_url?: string | null;
			/**
			 * Whether or not this flavor is a custom, user created flavor.
			 * @default true
			 */
			is_custom: boolean;
		};
		/**
		 * FlavorResponse
		 * @description Response model for stack component flavors.
		 */
		FlavorResponse: {
			/** The body of the resource. */
			body?: components["schemas"]["FlavorResponseBody"] | null;
			/** The metadata related to this resource. */
			metadata?: components["schemas"]["FlavorResponseMetadata"] | null;
			/** The resources related to this resource. */
			resources?: components["schemas"]["FlavorResponseResources"] | null;
			/**
			 * The unique resource id.
			 * Format: uuid
			 */
			id: string;
			/**
			 * Permission Denied
			 * @default false
			 */
			permission_denied: boolean;
			/** The name of the Flavor. */
			name: string;
		};
		/**
		 * FlavorResponseBody
		 * @description Response body for stack component flavors.
		 */
		FlavorResponseBody: {
			/**
			 * The timestamp when this resource was created.
			 * Format: date-time
			 */
			created: string;
			/**
			 * The timestamp when this resource was last updated.
			 * Format: date-time
			 */
			updated: string;
			/** The user who created this resource. */
			user?: components["schemas"]["UserResponse"] | null;
			/** The type of the Flavor. */
			type: components["schemas"]["StackComponentType"];
			/** The name of the integration that the Flavor belongs to. */
			integration: string | null;
			/** The path to the module which contains this Flavor. */
			source: string;
			/** Optionally, a url pointing to a png,svg or jpg can be attached. */
			logo_url?: string | null;
			/**
			 * Whether or not this flavor is a custom, user created flavor.
			 * @default true
			 */
			is_custom: boolean;
		};
		/**
		 * FlavorResponseMetadata
		 * @description Response metadata for stack component flavors.
		 */
		FlavorResponseMetadata: {
			/** The JSON schema of this flavor's corresponding configuration. */
			config_schema: {
				[key: string]: unknown;
			};
			/** The type of the connector that this flavor uses. */
			connector_type?: string | null;
			/** The resource type of the connector that this flavor uses. */
			connector_resource_type?: string | null;
			/** The name of an attribute in the stack component configuration that plays the role of resource ID when linked to a service connector. */
			connector_resource_id_attr?: string | null;
			/** Optionally, a url pointing to docs, within docs.zenml.io. */
			docs_url?: string | null;
			/** Optionally, a url pointing to SDK docs,within sdkdocs.zenml.io. */
			sdk_docs_url?: string | null;
		};
		/**
		 * FlavorResponseResources
		 * @description Response resources for stack component flavors.
		 */
		FlavorResponseResources: {
			[key: string]: unknown;
		};
		/**
		 * FlavorUpdate
		 * @description Update model for stack component flavors.
		 */
		FlavorUpdate: {
			/** The name of the Flavor. */
			name?: string | null;
			/** The type of the Flavor. */
			type?: components["schemas"]["StackComponentType"] | null;
			/** The JSON schema of this flavor's corresponding configuration. */
			config_schema?: {
				[key: string]: unknown;
			} | null;
			/** The type of the connector that this flavor uses. */
			connector_type?: string | null;
			/** The resource type of the connector that this flavor uses. */
			connector_resource_type?: string | null;
			/** The name of an attribute in the stack component configuration that plays the role of resource ID when linked to a service connector. */
			connector_resource_id_attr?: string | null;
			/** The path to the module which contains this Flavor. */
			source?: string | null;
			/** The name of the integration that the Flavor belongs to. */
			integration?: string | null;
			/** Optionally, a url pointing to a png,svg or jpg can be attached. */
			logo_url?: string | null;
			/** Optionally, a url pointing to docs, within docs.zenml.io. */
			docs_url?: string | null;
			/** Optionally, a url pointing to SDK docs,within sdkdocs.zenml.io. */
			sdk_docs_url?: string | null;
			/** Whether or not this flavor is a custom, user created flavor. */
			is_custom?: boolean | null;
		};
		/** HTTPValidationError */
		HTTPValidationError: {
			/** Detail */
			detail?: components["schemas"]["ValidationError"][];
		};
		/**
		 * InputSpec
		 * @description Step input specification.
		 */
		InputSpec: {
			/** Step Name */
			step_name: string;
			/** Output Name */
			output_name: string;
		};
		/**
		 * LoadedVisualization
		 * @description Model for loaded visualizations.
		 */
		LoadedVisualization: {
			type: components["schemas"]["VisualizationType"];
			/** Value */
			value: string;
		};
		/**
		 * LogicalOperators
		 * @description Logical Ops to use to combine filters on list methods.
		 * @enum {string}
		 */
		LogicalOperators: "or" | "and";
		/**
		 * LogsRequest
		 * @description Request model for logs.
		 */
		LogsRequest: {
			/** The uri of the logs file */
			uri: string;
			/**
			 * The artifact store ID to associate the logs with.
			 * Format: uuid
			 */
			artifact_store_id: string;
		};
		/**
		 * LogsResponse
		 * @description Response model for logs.
		 */
		LogsResponse: {
			/** The body of the resource. */
			body?: components["schemas"]["LogsResponseBody"] | null;
			/** The metadata related to this resource. */
			metadata?: components["schemas"]["LogsResponseMetadata"] | null;
			/** The resources related to this resource. */
			resources?: components["schemas"]["LogsResponseResources"] | null;
			/**
			 * The unique resource id.
			 * Format: uuid
			 */
			id: string;
			/**
			 * Permission Denied
			 * @default false
			 */
			permission_denied: boolean;
		};
		/**
		 * LogsResponseBody
		 * @description Response body for logs.
		 */
		LogsResponseBody: {
			/**
			 * The timestamp when this resource was created.
			 * Format: date-time
			 */
			created: string;
			/**
			 * The timestamp when this resource was last updated.
			 * Format: date-time
			 */
			updated: string;
			/** The uri of the logs file */
			uri: string;
		};
		/**
		 * LogsResponseMetadata
		 * @description Response metadata for logs.
		 */
		LogsResponseMetadata: {
			/**
			 * Step ID to associate the logs with.
			 * @description When this is set, pipeline_run_id should be set to None.
			 */
			step_run_id?: string | null;
			/**
			 * Pipeline run ID to associate the logs with.
			 * @description When this is set, step_run_id should be set to None.
			 */
			pipeline_run_id?: string | null;
			/** The artifact store ID to associate the logs with. */
			artifact_store_id: string;
		};
		/**
		 * LogsResponseResources
		 * @description Class for all resource models associated with the Logs entity.
		 */
		LogsResponseResources: {
			[key: string]: unknown;
		};
		/**
		 * MetadataResourceTypes
		 * @description All possible resource types for adding metadata.
		 * @enum {string}
		 */
		MetadataResourceTypes:
			| "pipeline_run"
			| "step_run"
			| "artifact_version"
			| "model_version"
			| "schedule";
		/**
		 * MetadataTypeEnum
		 * @description String Enum of all possible types that metadata can have.
		 * @enum {string}
		 */
		MetadataTypeEnum:
			| "str"
			| "int"
			| "float"
			| "bool"
			| "list"
			| "dict"
			| "tuple"
			| "set"
			| "Uri"
			| "Path"
			| "DType"
			| "StorageSize";
		/**
		 * Model
		 * @description Model class to pass into pipeline or step to set it into a model context.
		 *
		 *     name: The name of the model.
		 *     license: The license under which the model is created.
		 *     description: The description of the model.
		 *     audience: The target audience of the model.
		 *     use_cases: The use cases of the model.
		 *     limitations: The known limitations of the model.
		 *     trade_offs: The tradeoffs of the model.
		 *     ethics: The ethical implications of the model.
		 *     tags: Tags associated with the model.
		 *     version: The version name, version number or stage is optional and points model context
		 *         to a specific version/stage. If skipped new version will be created. `version`
		 *         also supports placeholders: standard `{date}` and `{time}` and any custom placeholders
		 *         that are passed as substitutions in the pipeline or step decorators.
		 *     save_models_to_registry: Whether to save all ModelArtifacts to Model Registry,
		 *         if available in active stack.
		 */
		Model: {
			/** Name */
			name: string;
			/** License */
			license?: string | null;
			/** Description */
			description?: string | null;
			/** Audience */
			audience?: string | null;
			/** Use Cases */
			use_cases?: string | null;
			/** Limitations */
			limitations?: string | null;
			/** Trade Offs */
			trade_offs?: string | null;
			/** Ethics */
			ethics?: string | null;
			/** Tags */
			tags?: string[] | null;
			/** Version */
			version?: components["schemas"]["ModelStages"] | number | string | null;
			/**
			 * Save Models To Registry
			 * @default true
			 */
			save_models_to_registry: boolean;
			/** Model Version Id */
			model_version_id?: string | null;
			/**
			 * Suppress Class Validation Warnings
			 * @default false
			 */
			suppress_class_validation_warnings: boolean;
		};
		/**
		 * ModelRequest
		 * @description Request model for models.
		 */
		ModelRequest: {
			/** The id of the user that created this resource. Set automatically by the server. */
			user?: string | null;
			/**
			 * The project to which this resource belongs.
			 * Format: uuid
			 */
			project: string;
			/** The name of the model */
			name: string;
			/** The license model created under */
			license?: string | null;
			/** The description of the model */
			description?: string | null;
			/** The target audience of the model */
			audience?: string | null;
			/** The use cases of the model */
			use_cases?: string | null;
			/** The know limitations of the model */
			limitations?: string | null;
			/** The trade offs of the model */
			trade_offs?: string | null;
			/** The ethical implications of the model */
			ethics?: string | null;
			/** Tags associated with the model */
			tags?: string[] | null;
			/**
			 * Whether to save all ModelArtifacts to Model Registry
			 * @default true
			 */
			save_models_to_registry: boolean;
		};
		/**
		 * ModelResponse
		 * @description Response model for models.
		 */
		ModelResponse: {
			/** The body of the resource. */
			body?: components["schemas"]["ModelResponseBody"] | null;
			/** The metadata related to this resource. */
			metadata?: components["schemas"]["ModelResponseMetadata"] | null;
			/** The resources related to this resource. */
			resources?: components["schemas"]["ModelResponseResources"] | null;
			/**
			 * The unique resource id.
			 * Format: uuid
			 */
			id: string;
			/**
			 * Permission Denied
			 * @default false
			 */
			permission_denied: boolean;
			/** The name of the model */
			name: string;
		};
		/**
		 * ModelResponseBody
		 * @description Response body for models.
		 */
		ModelResponseBody: {
			/**
			 * The timestamp when this resource was created.
			 * Format: date-time
			 */
			created: string;
			/**
			 * The timestamp when this resource was last updated.
			 * Format: date-time
			 */
			updated: string;
			/** The user who created this resource. */
			user?: components["schemas"]["UserResponse"] | null;
			/** Tags associated with the model */
			tags: components["schemas"]["TagResponse"][];
			/** Latest Version Name */
			latest_version_name?: string | null;
			/** Latest Version Id */
			latest_version_id?: string | null;
		};
		/**
		 * ModelResponseMetadata
		 * @description Response metadata for models.
		 */
		ModelResponseMetadata: {
			/** The project of this resource. */
			project: components["schemas"]["ProjectResponse"];
			/** The license model created under */
			license?: string | null;
			/** The description of the model */
			description?: string | null;
			/** The target audience of the model */
			audience?: string | null;
			/** The use cases of the model */
			use_cases?: string | null;
			/** The know limitations of the model */
			limitations?: string | null;
			/** The trade offs of the model */
			trade_offs?: string | null;
			/** The ethical implications of the model */
			ethics?: string | null;
			/**
			 * Whether to save all ModelArtifacts to Model Registry
			 * @default true
			 */
			save_models_to_registry: boolean;
		};
		/**
		 * ModelResponseResources
		 * @description Class for all resource models associated with the model entity.
		 */
		ModelResponseResources: {
			[key: string]: unknown;
		};
		/**
		 * ModelStages
		 * @description All possible stages of a Model Version.
		 * @enum {string}
		 */
		ModelStages: "none" | "staging" | "production" | "archived" | "latest";
		/**
		 * ModelUpdate
		 * @description Update model for models.
		 */
		ModelUpdate: {
			/** Name */
			name?: string | null;
			/** License */
			license?: string | null;
			/** Description */
			description?: string | null;
			/** Audience */
			audience?: string | null;
			/** Use Cases */
			use_cases?: string | null;
			/** Limitations */
			limitations?: string | null;
			/** Trade Offs */
			trade_offs?: string | null;
			/** Ethics */
			ethics?: string | null;
			/** Add Tags */
			add_tags?: string[] | null;
			/** Remove Tags */
			remove_tags?: string[] | null;
			/** Save Models To Registry */
			save_models_to_registry?: boolean | null;
		};
		/**
		 * ModelVersionArtifactRequest
		 * @description Request model for links between model versions and artifacts.
		 */
		ModelVersionArtifactRequest: {
			/**
			 * Model Version
			 * Format: uuid
			 */
			model_version: string;
			/**
			 * Artifact Version
			 * Format: uuid
			 */
			artifact_version: string;
		};
		/**
		 * ModelVersionArtifactResponse
		 * @description Response model for links between model versions and artifacts.
		 */
		ModelVersionArtifactResponse: {
			/** The body of the resource. */
			body?: components["schemas"]["ModelVersionArtifactResponseBody"] | null;
			/** The metadata related to this resource. */
			metadata?: components["schemas"]["BaseResponseMetadata"] | null;
			/** The resources related to this resource. */
			resources?:
				| components["schemas"]["ModelVersionArtifactResponseResources"]
				| null;
			/**
			 * The unique resource id.
			 * Format: uuid
			 */
			id: string;
			/**
			 * Permission Denied
			 * @default false
			 */
			permission_denied: boolean;
		};
		/**
		 * ModelVersionArtifactResponseBody
		 * @description Response body for links between model versions and artifacts.
		 */
		ModelVersionArtifactResponseBody: {
			/**
			 * The timestamp when this resource was created.
			 * Format: date-time
			 */
			created: string;
			/**
			 * The timestamp when this resource was last updated.
			 * Format: date-time
			 */
			updated: string;
			/**
			 * Model Version
			 * Format: uuid
			 */
			model_version: string;
			artifact_version: components["schemas"]["ArtifactVersionResponse"];
		};
		/**
		 * ModelVersionArtifactResponseResources
		 * @description Class for all resource models associated with the model version artifact entity.
		 */
		ModelVersionArtifactResponseResources: {
			[key: string]: unknown;
		};
		/**
		 * ModelVersionDataLazyLoader
		 * @description Model Version Data Lazy Loader helper class.
		 *
		 *     It helps the inner codes to fetch proper artifact,
		 *     model version metadata or artifact metadata from the
		 *     model version during runtime time of the step.
		 */
		ModelVersionDataLazyLoader: {
			/** Model Name */
			model_name: string;
			/** Model Version */
			model_version?: string | null;
			/** Artifact Name */
			artifact_name?: string | null;
			/** Artifact Version */
			artifact_version?: string | null;
			/** Metadata Name */
			metadata_name?: string | null;
		};
		/**
		 * ModelVersionPipelineRunRequest
		 * @description Request model for links between model versions and pipeline runs.
		 */
		ModelVersionPipelineRunRequest: {
			/**
			 * Model Version
			 * Format: uuid
			 */
			model_version: string;
			/**
			 * Pipeline Run
			 * Format: uuid
			 */
			pipeline_run: string;
		};
		/**
		 * ModelVersionPipelineRunResponse
		 * @description Response model for links between model versions and pipeline runs.
		 */
		ModelVersionPipelineRunResponse: {
			/** The body of the resource. */
			body?:
				| components["schemas"]["ModelVersionPipelineRunResponseBody"]
				| null;
			/** The metadata related to this resource. */
			metadata?: components["schemas"]["BaseResponseMetadata"] | null;
			/** The resources related to this resource. */
			resources?:
				| components["schemas"]["ModelVersionPipelineRunResponseResources"]
				| null;
			/**
			 * The unique resource id.
			 * Format: uuid
			 */
			id: string;
			/**
			 * Permission Denied
			 * @default false
			 */
			permission_denied: boolean;
		};
		/**
		 * ModelVersionPipelineRunResponseBody
		 * @description Response body for links between model versions and pipeline runs.
		 */
		ModelVersionPipelineRunResponseBody: {
			/**
			 * The timestamp when this resource was created.
			 * Format: date-time
			 */
			created: string;
			/**
			 * The timestamp when this resource was last updated.
			 * Format: date-time
			 */
			updated: string;
			/**
			 * Model Version
			 * Format: uuid
			 */
			model_version: string;
			pipeline_run: components["schemas"]["PipelineRunResponse"];
		};
		/**
		 * ModelVersionPipelineRunResponseResources
		 * @description Class for all resource models associated with the model version pipeline run entity.
		 */
		ModelVersionPipelineRunResponseResources: {
			[key: string]: unknown;
		};
		/**
		 * ModelVersionRequest
		 * @description Request model for model versions.
		 */
		ModelVersionRequest: {
			/** The id of the user that created this resource. Set automatically by the server. */
			user?: string | null;
			/**
			 * The project to which this resource belongs.
			 * Format: uuid
			 */
			project: string;
			/**
			 * Name
			 * @description The name of the model version
			 */
			name?: string | null;
			/**
			 * Description
			 * @description The description of the model version
			 */
			description?: string | null;
			/**
			 * Stage
			 * @description The stage of the model version
			 */
			stage?: string | null;
			/**
			 * Model
			 * Format: uuid
			 * @description The ID of the model containing version
			 */
			model: string;
			/** Tags associated with the model version */
			tags?: string[] | null;
		};
		/**
		 * ModelVersionResponse
		 * @description Response model for model versions.
		 */
		ModelVersionResponse: {
			/** The body of the resource. */
			body?: components["schemas"]["ModelVersionResponseBody"] | null;
			/** The metadata related to this resource. */
			metadata?: components["schemas"]["ModelVersionResponseMetadata"] | null;
			/** The resources related to this resource. */
			resources?: components["schemas"]["ModelVersionResponseResources"] | null;
			/**
			 * The unique resource id.
			 * Format: uuid
			 */
			id: string;
			/**
			 * Permission Denied
			 * @default false
			 */
			permission_denied: boolean;
			/**
			 * Name
			 * @description The name of the model version
			 */
			name?: string | null;
		};
		/**
		 * ModelVersionResponseBody
		 * @description Response body for model versions.
		 */
		ModelVersionResponseBody: {
			/**
			 * The timestamp when this resource was created.
			 * Format: date-time
			 */
			created: string;
			/**
			 * The timestamp when this resource was last updated.
			 * Format: date-time
			 */
			updated: string;
			/** The user who created this resource. */
			user?: components["schemas"]["UserResponse"] | null;
			/**
			 * Stage
			 * @description The stage of the model version
			 */
			stage?: string | null;
			/**
			 * Number
			 * @description The number of the model version
			 */
			number: number;
			/** @description The model containing version */
			model: components["schemas"]["ModelResponse"];
			/**
			 * Model Artifact Ids
			 * @description Model artifacts linked to the model version
			 * @default {}
			 */
			model_artifact_ids: {
				[key: string]: unknown;
			};
			/**
			 * Data Artifact Ids
			 * @description Data artifacts linked to the model version
			 * @default {}
			 */
			data_artifact_ids: {
				[key: string]: unknown;
			};
			/**
			 * Deployment Artifact Ids
			 * @description Deployment artifacts linked to the model version
			 * @default {}
			 */
			deployment_artifact_ids: {
				[key: string]: unknown;
			};
			/**
			 * Pipeline Run Ids
			 * @description Pipeline runs linked to the model version
			 * @default {}
			 */
			pipeline_run_ids: {
				[key: string]: unknown;
			};
			/**
			 * Tags associated with the model version
			 * @default []
			 */
			tags: components["schemas"]["TagResponse"][];
		};
		/**
		 * ModelVersionResponseMetadata
		 * @description Response metadata for model versions.
		 */
		ModelVersionResponseMetadata: {
			/** The project of this resource. */
			project: components["schemas"]["ProjectResponse"];
			/**
			 * Description
			 * @description The description of the model version
			 */
			description?: string | null;
			/**
			 * Run Metadata
			 * @description Metadata linked to the model version
			 * @default {}
			 */
			run_metadata: {
				[key: string]: unknown;
			};
		};
		/**
		 * ModelVersionResponseResources
		 * @description Class for all resource models associated with the model version entity.
		 */
		ModelVersionResponseResources: {
			/** @description Services linked to the model version */
			services: components["schemas"]["Page_ServiceResponse_"];
		} & {
			[key: string]: unknown;
		};
		/**
		 * ModelVersionUpdate
		 * @description Update model for model versions.
		 */
		ModelVersionUpdate: {
			/**
			 * Stage
			 * @description Target model version stage to be set
			 */
			stage?: string | components["schemas"]["ModelStages"] | null;
			/**
			 * Force
			 * @description Whether existing model version in target stage should be silently archived or an error should be raised.
			 * @default false
			 */
			force: boolean;
			/**
			 * Name
			 * @description Target model version name to be set
			 */
			name?: string | null;
			/**
			 * Description
			 * @description Target model version description to be set
			 */
			description?: string | null;
			/**
			 * Add Tags
			 * @description Tags to be added to the model version
			 */
			add_tags?: string[] | null;
			/**
			 * Remove Tags
			 * @description Tags to be removed from the model version
			 */
			remove_tags?: string[] | null;
		};
		/**
		 * OAuthDeviceAuthorizationResponse
		 * @description OAuth2 device authorization grant response.
		 */
		OAuthDeviceAuthorizationResponse: {
			/** Device Code */
			device_code: string;
			/** User Code */
			user_code: string;
			/** Verification Uri */
			verification_uri: string;
			/** Verification Uri Complete */
			verification_uri_complete?: string | null;
			/** Expires In */
			expires_in: number;
			/** Interval */
			interval: number;
		};
		/**
		 * OAuthDeviceResponse
		 * @description Response model for OAuth2 devices.
		 */
		OAuthDeviceResponse: {
			/** The body of the resource. */
			body?: components["schemas"]["OAuthDeviceResponseBody"] | null;
			/** The metadata related to this resource. */
			metadata?: components["schemas"]["OAuthDeviceResponseMetadata"] | null;
			/** The resources related to this resource. */
			resources?: components["schemas"]["OAuthDeviceResponseResources"] | null;
			/**
			 * The unique resource id.
			 * Format: uuid
			 */
			id: string;
			/**
			 * Permission Denied
			 * @default false
			 */
			permission_denied: boolean;
		};
		/**
		 * OAuthDeviceResponseBody
		 * @description Response body for OAuth2 devices.
		 */
		OAuthDeviceResponseBody: {
			/**
			 * The timestamp when this resource was created.
			 * Format: date-time
			 */
			created: string;
			/**
			 * The timestamp when this resource was last updated.
			 * Format: date-time
			 */
			updated: string;
			/** The user who created this resource. */
			user?: components["schemas"]["UserResponse"] | null;
			/**
			 * Client Id
			 * Format: uuid
			 * @description The client ID of the OAuth2 device.
			 */
			client_id: string;
			/**
			 * Expires
			 * @description The expiration date of the OAuth2 device after which the device is no longer valid and cannot be used for authentication.
			 */
			expires?: string | null;
			/**
			 * Trusted Device
			 * @description Whether the OAuth2 device was marked as trusted. A trusted device has a much longer validity time.
			 */
			trusted_device: boolean;
			/** @description The status of the OAuth2 device. */
			status: components["schemas"]["OAuthDeviceStatus"];
			/**
			 * Os
			 * @description The operating system of the device used for authentication.
			 */
			os?: string | null;
			/**
			 * Ip Address
			 * @description The IP address of the device used for authentication.
			 */
			ip_address?: string | null;
			/**
			 * Hostname
			 * @description The hostname of the device used for authentication.
			 */
			hostname?: string | null;
		};
		/**
		 * OAuthDeviceResponseMetadata
		 * @description Response metadata for OAuth2 devices.
		 */
		OAuthDeviceResponseMetadata: {
			/**
			 * Python Version
			 * @description The Python version of the device used for authentication.
			 */
			python_version?: string | null;
			/**
			 * Zenml Version
			 * @description The ZenML version of the device used for authentication.
			 */
			zenml_version?: string | null;
			/**
			 * City
			 * @description The city where the device is located.
			 */
			city?: string | null;
			/**
			 * Region
			 * @description The region where the device is located.
			 */
			region?: string | null;
			/**
			 * Country
			 * @description The country where the device is located.
			 */
			country?: string | null;
			/**
			 * Failed Auth Attempts
			 * @description The number of failed authentication attempts.
			 */
			failed_auth_attempts: number;
			/**
			 * Last Login
			 * @description The date of the last successful login.
			 */
			last_login: string | null;
		};
		/**
		 * OAuthDeviceResponseResources
		 * @description Class for all resource models associated with the OAuthDevice entity.
		 */
		OAuthDeviceResponseResources: {
			[key: string]: unknown;
		};
		/**
		 * OAuthDeviceStatus
		 * @description The OAuth device status.
		 * @enum {string}
		 */
		OAuthDeviceStatus: "pending" | "verified" | "active" | "locked";
		/**
		 * OAuthDeviceUpdate
		 * @description OAuth2 device update model.
		 */
		OAuthDeviceUpdate: {
			/**
			 * Locked
			 * @description Whether to lock or unlock the OAuth2 device. A locked device cannot be used for authentication.
			 */
			locked?: boolean | null;
		};
		/**
		 * OAuthDeviceVerificationRequest
		 * @description OAuth2 device authorization verification request.
		 */
		OAuthDeviceVerificationRequest: {
			/** User Code */
			user_code: string;
			/**
			 * Trusted Device
			 * @default false
			 */
			trusted_device: boolean;
		};
		/**
		 * OAuthRedirectResponse
		 * @description Redirect response.
		 */
		OAuthRedirectResponse: {
			/** Authorization Url */
			authorization_url: string;
		};
		/**
		 * OAuthTokenResponse
		 * @description OAuth2 device authorization token response.
		 */
		OAuthTokenResponse: {
			/** Access Token */
			access_token: string;
			/** Token Type */
			token_type: string;
			/** Expires In */
			expires_in?: number | null;
			/** Refresh Token */
			refresh_token?: string | null;
			/** Csrf Token */
			csrf_token?: string | null;
			/** Scope */
			scope?: string | null;
			/** Device Id */
			device_id?: string | null;
			/** Device Metadata */
			device_metadata?: {
				[key: string]: unknown;
			} | null;
		} & {
			[key: string]: unknown;
		};
		/** Page[APIKeyResponse] */
		Page_APIKeyResponse_: {
			/** Index */
			index: number;
			/** Max Size */
			max_size: number;
			/** Total Pages */
			total_pages: number;
			/** Total */
			total: number;
			/** Items */
			items: components["schemas"]["APIKeyResponse"][];
		};
		/** Page[ActionResponse] */
		Page_ActionResponse_: {
			/** Index */
			index: number;
			/** Max Size */
			max_size: number;
			/** Total Pages */
			total_pages: number;
			/** Total */
			total: number;
			/** Items */
			items: components["schemas"]["ActionResponse"][];
		};
		/** Page[ArtifactResponse] */
		Page_ArtifactResponse_: {
			/** Index */
			index: number;
			/** Max Size */
			max_size: number;
			/** Total Pages */
			total_pages: number;
			/** Total */
			total: number;
			/** Items */
			items: components["schemas"]["ArtifactResponse"][];
		};
		/** Page[ArtifactVersionResponse] */
		Page_ArtifactVersionResponse_: {
			/** Index */
			index: number;
			/** Max Size */
			max_size: number;
			/** Total Pages */
			total_pages: number;
			/** Total */
			total: number;
			/** Items */
			items: components["schemas"]["ArtifactVersionResponse"][];
		};
		/** Page[BasePluginFlavorResponse] */
		Page_BasePluginFlavorResponse_: {
			/** Index */
			index: number;
			/** Max Size */
			max_size: number;
			/** Total Pages */
			total_pages: number;
			/** Total */
			total: number;
			/** Items */
			items: components["schemas"]["BasePluginFlavorResponse"][];
		};
		/** Page[CodeRepositoryResponse] */
		Page_CodeRepositoryResponse_: {
			/** Index */
			index: number;
			/** Max Size */
			max_size: number;
			/** Total Pages */
			total_pages: number;
			/** Total */
			total: number;
			/** Items */
			items: components["schemas"]["CodeRepositoryResponse"][];
		};
		/** Page[ComponentResponse] */
		Page_ComponentResponse_: {
			/** Index */
			index: number;
			/** Max Size */
			max_size: number;
			/** Total Pages */
			total_pages: number;
			/** Total */
			total: number;
			/** Items */
			items: components["schemas"]["ComponentResponse"][];
		};
		/** Page[EventSourceResponse] */
		Page_EventSourceResponse_: {
			/** Index */
			index: number;
			/** Max Size */
			max_size: number;
			/** Total Pages */
			total_pages: number;
			/** Total */
			total: number;
			/** Items */
			items: components["schemas"]["EventSourceResponse"][];
		};
		/** Page[FlavorResponse] */
		Page_FlavorResponse_: {
			/** Index */
			index: number;
			/** Max Size */
			max_size: number;
			/** Total Pages */
			total_pages: number;
			/** Total */
			total: number;
			/** Items */
			items: components["schemas"]["FlavorResponse"][];
		};
		/** Page[ModelResponse] */
		Page_ModelResponse_: {
			/** Index */
			index: number;
			/** Max Size */
			max_size: number;
			/** Total Pages */
			total_pages: number;
			/** Total */
			total: number;
			/** Items */
			items: components["schemas"]["ModelResponse"][];
		};
		/** Page[ModelVersionArtifactResponse] */
		Page_ModelVersionArtifactResponse_: {
			/** Index */
			index: number;
			/** Max Size */
			max_size: number;
			/** Total Pages */
			total_pages: number;
			/** Total */
			total: number;
			/** Items */
			items: components["schemas"]["ModelVersionArtifactResponse"][];
		};
		/** Page[ModelVersionPipelineRunResponse] */
		Page_ModelVersionPipelineRunResponse_: {
			/** Index */
			index: number;
			/** Max Size */
			max_size: number;
			/** Total Pages */
			total_pages: number;
			/** Total */
			total: number;
			/** Items */
			items: components["schemas"]["ModelVersionPipelineRunResponse"][];
		};
		/** Page[ModelVersionResponse] */
		Page_ModelVersionResponse_: {
			/** Index */
			index: number;
			/** Max Size */
			max_size: number;
			/** Total Pages */
			total_pages: number;
			/** Total */
			total: number;
			/** Items */
			items: components["schemas"]["ModelVersionResponse"][];
		};
		/** Page[OAuthDeviceResponse] */
		Page_OAuthDeviceResponse_: {
			/** Index */
			index: number;
			/** Max Size */
			max_size: number;
			/** Total Pages */
			total_pages: number;
			/** Total */
			total: number;
			/** Items */
			items: components["schemas"]["OAuthDeviceResponse"][];
		};
		/** Page[PipelineBuildResponse] */
		Page_PipelineBuildResponse_: {
			/** Index */
			index: number;
			/** Max Size */
			max_size: number;
			/** Total Pages */
			total_pages: number;
			/** Total */
			total: number;
			/** Items */
			items: components["schemas"]["PipelineBuildResponse"][];
		};
		/** Page[PipelineDeploymentResponse] */
		Page_PipelineDeploymentResponse_: {
			/** Index */
			index: number;
			/** Max Size */
			max_size: number;
			/** Total Pages */
			total_pages: number;
			/** Total */
			total: number;
			/** Items */
			items: components["schemas"]["PipelineDeploymentResponse"][];
		};
		/** Page[PipelineResponse] */
		Page_PipelineResponse_: {
			/** Index */
			index: number;
			/** Max Size */
			max_size: number;
			/** Total Pages */
			total_pages: number;
			/** Total */
			total: number;
			/** Items */
			items: components["schemas"]["PipelineResponse"][];
		};
		/** Page[PipelineRunResponse] */
		Page_PipelineRunResponse_: {
			/** Index */
			index: number;
			/** Max Size */
			max_size: number;
			/** Total Pages */
			total_pages: number;
			/** Total */
			total: number;
			/** Items */
			items: components["schemas"]["PipelineRunResponse"][];
		};
		/** Page[ProjectResponse] */
		Page_ProjectResponse_: {
			/** Index */
			index: number;
			/** Max Size */
			max_size: number;
			/** Total Pages */
			total_pages: number;
			/** Total */
			total: number;
			/** Items */
			items: components["schemas"]["ProjectResponse"][];
		};
		/** Page[RunTemplateResponse] */
		Page_RunTemplateResponse_: {
			/** Index */
			index: number;
			/** Max Size */
			max_size: number;
			/** Total Pages */
			total_pages: number;
			/** Total */
			total: number;
			/** Items */
			items: components["schemas"]["RunTemplateResponse"][];
		};
		/** Page[ScheduleResponse] */
		Page_ScheduleResponse_: {
			/** Index */
			index: number;
			/** Max Size */
			max_size: number;
			/** Total Pages */
			total_pages: number;
			/** Total */
			total: number;
			/** Items */
			items: components["schemas"]["ScheduleResponse"][];
		};
		/** Page[SecretResponse] */
		Page_SecretResponse_: {
			/** Index */
			index: number;
			/** Max Size */
			max_size: number;
			/** Total Pages */
			total_pages: number;
			/** Total */
			total: number;
			/** Items */
			items: components["schemas"]["SecretResponse"][];
		};
		/** Page[ServiceAccountResponse] */
		Page_ServiceAccountResponse_: {
			/** Index */
			index: number;
			/** Max Size */
			max_size: number;
			/** Total Pages */
			total_pages: number;
			/** Total */
			total: number;
			/** Items */
			items: components["schemas"]["ServiceAccountResponse"][];
		};
		/** Page[ServiceConnectorResponse] */
		Page_ServiceConnectorResponse_: {
			/** Index */
			index: number;
			/** Max Size */
			max_size: number;
			/** Total Pages */
			total_pages: number;
			/** Total */
			total: number;
			/** Items */
			items: components["schemas"]["ServiceConnectorResponse"][];
		};
		/** Page[ServiceResponse] */
		Page_ServiceResponse_: {
			/** Index */
			index: number;
			/** Max Size */
			max_size: number;
			/** Total Pages */
			total_pages: number;
			/** Total */
			total: number;
			/** Items */
			items: components["schemas"]["ServiceResponse"][];
		};
		/** Page[StackResponse] */
		Page_StackResponse_: {
			/** Index */
			index: number;
			/** Max Size */
			max_size: number;
			/** Total Pages */
			total_pages: number;
			/** Total */
			total: number;
			/** Items */
			items: components["schemas"]["StackResponse"][];
		};
		/** Page[StepRunResponse] */
		Page_StepRunResponse_: {
			/** Index */
			index: number;
			/** Max Size */
			max_size: number;
			/** Total Pages */
			total_pages: number;
			/** Total */
			total: number;
			/** Items */
			items: components["schemas"]["StepRunResponse"][];
		};
		/** Page[TagResponse] */
		Page_TagResponse_: {
			/** Index */
			index: number;
			/** Max Size */
			max_size: number;
			/** Total Pages */
			total_pages: number;
			/** Total */
			total: number;
			/** Items */
			items: components["schemas"]["TagResponse"][];
		};
		/** Page[TriggerExecutionResponse] */
		Page_TriggerExecutionResponse_: {
			/** Index */
			index: number;
			/** Max Size */
			max_size: number;
			/** Total Pages */
			total_pages: number;
			/** Total */
			total: number;
			/** Items */
			items: components["schemas"]["TriggerExecutionResponse"][];
		};
		/** Page[TriggerResponse] */
		Page_TriggerResponse_: {
			/** Index */
			index: number;
			/** Max Size */
			max_size: number;
			/** Total Pages */
			total_pages: number;
			/** Total */
			total: number;
			/** Items */
			items: components["schemas"]["TriggerResponse"][];
		};
		/** Page[UserResponse] */
		Page_UserResponse_: {
			/** Index */
			index: number;
			/** Max Size */
			max_size: number;
			/** Total Pages */
			total_pages: number;
			/** Total */
			total: number;
			/** Items */
			items: components["schemas"]["UserResponse"][];
		};
		/**
		 * PipelineBuildRequest
		 * @description Request model for pipelines builds.
		 */
		PipelineBuildRequest: {
			/** The id of the user that created this resource. Set automatically by the server. */
			user?: string | null;
			/**
			 * The project to which this resource belongs.
			 * Format: uuid
			 */
			project: string;
			/**
			 * The images of this build.
			 * @default {}
			 */
			images: {
				[key: string]: unknown;
			};
			/** Whether the build images are stored in a container registry or locally. */
			is_local: boolean;
			/** Whether any image of the build contains user code. */
			contains_code: boolean;
			/** The version of ZenML used for this build. */
			zenml_version?: string | null;
			/** The Python version used for this build. */
			python_version?: string | null;
			/** The duration of the build in seconds. */
			duration?: number | null;
			/** The build checksum. */
			checksum?: string | null;
			/** The stack checksum. */
			stack_checksum?: string | null;
			/** The stack that was used for this build. */
			stack?: string | null;
			/** The pipeline that was used for this build. */
			pipeline?: string | null;
		};
		/**
		 * PipelineBuildResponse
		 * @description Response model for pipeline builds.
		 */
		PipelineBuildResponse: {
			/** The body of the resource. */
			body?: components["schemas"]["PipelineBuildResponseBody"] | null;
			/** The metadata related to this resource. */
			metadata?: components["schemas"]["PipelineBuildResponseMetadata"] | null;
			/** The resources related to this resource. */
			resources?:
				| components["schemas"]["PipelineBuildResponseResources"]
				| null;
			/**
			 * The unique resource id.
			 * Format: uuid
			 */
			id: string;
			/**
			 * Permission Denied
			 * @default false
			 */
			permission_denied: boolean;
		};
		/**
		 * PipelineBuildResponseBody
		 * @description Response body for pipeline builds.
		 */
		PipelineBuildResponseBody: {
			/**
			 * The timestamp when this resource was created.
			 * Format: date-time
			 */
			created: string;
			/**
			 * The timestamp when this resource was last updated.
			 * Format: date-time
			 */
			updated: string;
			/** The user who created this resource. */
			user?: components["schemas"]["UserResponse"] | null;
		};
		/**
		 * PipelineBuildResponseMetadata
		 * @description Response metadata for pipeline builds.
		 */
		PipelineBuildResponseMetadata: {
			/** The project of this resource. */
			project: components["schemas"]["ProjectResponse"];
			/** The pipeline that was used for this build. */
			pipeline?: components["schemas"]["PipelineResponse"] | null;
			/** The stack that was used for this build. */
			stack?: components["schemas"]["StackResponse"] | null;
			/**
			 * The images of this build.
			 * @default {}
			 */
			images: {
				[key: string]: unknown;
			};
			/** The version of ZenML used for this build. */
			zenml_version?: string | null;
			/** The Python version used for this build. */
			python_version?: string | null;
			/** The build checksum. */
			checksum?: string | null;
			/** The stack checksum. */
			stack_checksum?: string | null;
			/** Whether the build images are stored in a container registry or locally. */
			is_local: boolean;
			/** Whether any image of the build contains user code. */
			contains_code: boolean;
			/** The duration of the build in seconds. */
			duration?: number | null;
		};
		/**
		 * PipelineBuildResponseResources
		 * @description Class for all resource models associated with the pipeline build entity.
		 */
		PipelineBuildResponseResources: {
			[key: string]: unknown;
		};
		/**
		 * PipelineConfiguration
		 * @description Pipeline configuration class.
		 */
		"PipelineConfiguration-Input": {
			/** Enable Cache */
			enable_cache?: boolean | null;
			/** Enable Artifact Metadata */
			enable_artifact_metadata?: boolean | null;
			/** Enable Artifact Visualization */
			enable_artifact_visualization?: boolean | null;
			/** Enable Step Logs */
			enable_step_logs?: boolean | null;
			/** Enable Pipeline Logs */
			enable_pipeline_logs?: boolean | null;
			/**
			 * Settings
			 * @default {}
			 */
			settings: {
				[key: string]: unknown;
			};
			/** Tags */
			tags?: (string | components["schemas"]["Tag"])[] | null;
			/**
			 * Extra
			 * @default {}
			 */
			extra: {
				[key: string]: unknown;
			};
			failure_hook_source?: components["schemas"]["Source"] | null;
			success_hook_source?: components["schemas"]["Source"] | null;
			model?: components["schemas"]["Model"] | null;
			/** Parameters */
			parameters?: {
				[key: string]: unknown;
			} | null;
			retry?: components["schemas"]["StepRetryConfig"] | null;
			/**
			 * Substitutions
			 * @default {}
			 */
			substitutions: {
				[key: string]: unknown;
			};
			/** Name */
			name: string;
		};
		/**
		 * PipelineConfiguration
		 * @description Pipeline configuration class.
		 */
		"PipelineConfiguration-Output": {
			/** Enable Cache */
			enable_cache?: boolean | null;
			/** Enable Artifact Metadata */
			enable_artifact_metadata?: boolean | null;
			/** Enable Artifact Visualization */
			enable_artifact_visualization?: boolean | null;
			/** Enable Step Logs */
			enable_step_logs?: boolean | null;
			/** Enable Pipeline Logs */
			enable_pipeline_logs?: boolean | null;
			/**
			 * Settings
			 * @default {}
			 */
			settings: {
				[key: string]: unknown;
			};
			/** Tags */
			tags?: (string | components["schemas"]["Tag"])[] | null;
			/**
			 * Extra
			 * @default {}
			 */
			extra: {
				[key: string]: unknown;
			};
			failure_hook_source?: components["schemas"]["Source"] | null;
			success_hook_source?: components["schemas"]["Source"] | null;
			model?: components["schemas"]["Model"] | null;
			/** Parameters */
			parameters?: {
				[key: string]: unknown;
			} | null;
			retry?: components["schemas"]["StepRetryConfig"] | null;
			/**
			 * Substitutions
			 * @default {}
			 */
			substitutions: {
				[key: string]: unknown;
			};
			/** Name */
			name: string;
		};
		/**
		 * PipelineDeploymentRequest
		 * @description Request model for pipeline deployments.
		 */
		PipelineDeploymentRequest: {
			/** The id of the user that created this resource. Set automatically by the server. */
			user?: string | null;
			/**
			 * The project to which this resource belongs.
			 * Format: uuid
			 */
			project: string;
			/** The run name template for runs created using this deployment. */
			run_name_template: string;
			/** The pipeline configuration for this deployment. */
			pipeline_configuration: components["schemas"]["PipelineConfiguration-Input"];
			/**
			 * The step configurations for this deployment.
			 * @default {}
			 */
			step_configurations: {
				[key: string]: unknown;
			};
			/**
			 * The client environment for this deployment.
			 * @default {}
			 */
			client_environment: {
				[key: string]: unknown;
			};
			/** The version of the ZenML installation on the client side. */
			client_version?: string | null;
			/** The version of the ZenML installation on the server side. */
			server_version?: string | null;
			/** The pipeline version hash of the deployment. */
			pipeline_version_hash?: string | null;
			/** The pipeline spec of the deployment. */
			pipeline_spec?: components["schemas"]["PipelineSpec-Input"] | null;
			/**
			 * The stack associated with the deployment.
			 * Format: uuid
			 */
			stack: string;
			/** The pipeline associated with the deployment. */
			pipeline?: string | null;
			/** The build associated with the deployment. */
			build?: string | null;
			/** The schedule associated with the deployment. */
			schedule?: string | null;
			/** The code reference associated with the deployment. */
			code_reference?: components["schemas"]["CodeReferenceRequest"] | null;
			/** Optional path where the code is stored in the artifact store. */
			code_path?: string | null;
			/**
			 * Template
			 * @description Template used for the deployment.
			 */
			template?: string | null;
		};
		/**
		 * PipelineDeploymentResponse
		 * @description Response model for pipeline deployments.
		 */
		PipelineDeploymentResponse: {
			/** The body of the resource. */
			body?: components["schemas"]["PipelineDeploymentResponseBody"] | null;
			/** The metadata related to this resource. */
			metadata?:
				| components["schemas"]["PipelineDeploymentResponseMetadata"]
				| null;
			/** The resources related to this resource. */
			resources?:
				| components["schemas"]["PipelineDeploymentResponseResources"]
				| null;
			/**
			 * The unique resource id.
			 * Format: uuid
			 */
			id: string;
			/**
			 * Permission Denied
			 * @default false
			 */
			permission_denied: boolean;
		};
		/**
		 * PipelineDeploymentResponseBody
		 * @description Response body for pipeline deployments.
		 */
		PipelineDeploymentResponseBody: {
			/**
			 * The timestamp when this resource was created.
			 * Format: date-time
			 */
			created: string;
			/**
			 * The timestamp when this resource was last updated.
			 * Format: date-time
			 */
			updated: string;
			/** The user who created this resource. */
			user?: components["schemas"]["UserResponse"] | null;
		};
		/**
		 * PipelineDeploymentResponseMetadata
		 * @description Response metadata for pipeline deployments.
		 */
		PipelineDeploymentResponseMetadata: {
			/** The project of this resource. */
			project: components["schemas"]["ProjectResponse"];
			/** The run name template for runs created using this deployment. */
			run_name_template: string;
			/** The pipeline configuration for this deployment. */
			pipeline_configuration: components["schemas"]["PipelineConfiguration-Output"];
			/**
			 * The step configurations for this deployment.
			 * @default {}
			 */
			step_configurations: {
				[key: string]: unknown;
			};
			/**
			 * The client environment for this deployment.
			 * @default {}
			 */
			client_environment: {
				[key: string]: unknown;
			};
			/** The version of the ZenML installation on the client side. */
			client_version: string | null;
			/** The version of the ZenML installation on the server side. */
			server_version: string | null;
			/** The pipeline version hash of the deployment. */
			pipeline_version_hash?: string | null;
			/** The pipeline spec of the deployment. */
			pipeline_spec?: components["schemas"]["PipelineSpec-Output"] | null;
			/** Optional path where the code is stored in the artifact store. */
			code_path?: string | null;
			/** The pipeline associated with the deployment. */
			pipeline?: components["schemas"]["PipelineResponse"] | null;
			/** The stack associated with the deployment. */
			stack?: components["schemas"]["StackResponse"] | null;
			/** The pipeline build associated with the deployment. */
			build?: components["schemas"]["PipelineBuildResponse"] | null;
			/** The schedule associated with the deployment. */
			schedule?: components["schemas"]["ScheduleResponse"] | null;
			/** The code reference associated with the deployment. */
			code_reference?: components["schemas"]["CodeReferenceResponse"] | null;
			/**
			 * Template Id
			 * @description Template used for the pipeline run.
			 */
			template_id?: string | null;
		};
		/**
		 * PipelineDeploymentResponseResources
		 * @description Class for all resource models associated with the pipeline deployment entity.
		 */
		PipelineDeploymentResponseResources: {
			/** The triggers configured with this event source. */
			triggers: components["schemas"]["Page_TriggerResponse_"];
		} & {
			[key: string]: unknown;
		};
		/**
		 * PipelineRequest
		 * @description Request model for pipelines.
		 */
		PipelineRequest: {
			/** The id of the user that created this resource. Set automatically by the server. */
			user?: string | null;
			/**
			 * The project to which this resource belongs.
			 * Format: uuid
			 */
			project: string;
			/** The name of the pipeline. */
			name: string;
			/** The description of the pipeline. */
			description?: string | null;
			/** Tags of the pipeline. */
			tags?: string[] | null;
		};
		/**
		 * PipelineResponse
		 * @description Response model for pipelines.
		 */
		PipelineResponse: {
			/** The body of the resource. */
			body?: components["schemas"]["PipelineResponseBody"] | null;
			/** The metadata related to this resource. */
			metadata?: components["schemas"]["PipelineResponseMetadata"] | null;
			/** The resources related to this resource. */
			resources?: components["schemas"]["PipelineResponseResources"] | null;
			/**
			 * The unique resource id.
			 * Format: uuid
			 */
			id: string;
			/**
			 * Permission Denied
			 * @default false
			 */
			permission_denied: boolean;
			/** The name of the pipeline. */
			name: string;
		};
		/**
		 * PipelineResponseBody
		 * @description Response body for pipelines.
		 */
		PipelineResponseBody: {
			/**
			 * The timestamp when this resource was created.
			 * Format: date-time
			 */
			created: string;
			/**
			 * The timestamp when this resource was last updated.
			 * Format: date-time
			 */
			updated: string;
			/** The user who created this resource. */
			user?: components["schemas"]["UserResponse"] | null;
			/** The ID of the latest run of the pipeline. */
			latest_run_id?: string | null;
			/** The status of the latest run of the pipeline. */
			latest_run_status?: components["schemas"]["ExecutionStatus"] | null;
		};
		/**
		 * PipelineResponseMetadata
		 * @description Response metadata for pipelines.
		 */
		PipelineResponseMetadata: {
			/** The project of this resource. */
			project: components["schemas"]["ProjectResponse"];
			/** The description of the pipeline. */
			description?: string | null;
		};
		/**
		 * PipelineResponseResources
		 * @description Class for all resource models associated with the pipeline entity.
		 */
		PipelineResponseResources: {
			/** The user that created the latest run of this pipeline. */
			latest_run_user?: components["schemas"]["UserResponse"] | null;
			/** Tags associated with the pipeline. */
			tags: components["schemas"]["TagResponse"][];
		} & {
			[key: string]: unknown;
		};
		/**
		 * PipelineRunRequest
		 * @description Request model for pipeline runs.
		 */
		PipelineRunRequest: {
			/** The id of the user that created this resource. Set automatically by the server. */
			user?: string | null;
			/**
			 * The project to which this resource belongs.
			 * Format: uuid
			 */
			project: string;
			/** The name of the pipeline run. */
			name: string;
			/**
			 * The deployment associated with the pipeline run.
			 * Format: uuid
			 */
			deployment: string;
			/** The pipeline associated with the pipeline run. */
			pipeline?: string | null;
			/** The orchestrator run ID. */
			orchestrator_run_id?: string | null;
			/** The start time of the pipeline run. */
			start_time?: string | null;
			/** The end time of the pipeline run. */
			end_time?: string | null;
			/** The status of the pipeline run. */
			status: components["schemas"]["ExecutionStatus"];
			/**
			 * Environment of the client that initiated this pipeline run (OS, Python version, etc.).
			 * @default {}
			 */
			client_environment: {
				[key: string]: unknown;
			};
			/**
			 * Environment of the orchestrator that executed this pipeline run (OS, Python version, etc.).
			 * @default {}
			 */
			orchestrator_environment: {
				[key: string]: unknown;
			};
			/** ID of the trigger execution that triggered this run. */
			trigger_execution_id?: string | null;
			/** Tags of the pipeline run. */
			tags?: (string | components["schemas"]["Tag"])[] | null;
			/** Logs of the pipeline run. */
			logs?: components["schemas"]["LogsRequest"] | null;
		};
		/**
		 * PipelineRunResponse
		 * @description Response model for pipeline runs.
		 */
		PipelineRunResponse: {
			/** The body of the resource. */
			body?: components["schemas"]["PipelineRunResponseBody"] | null;
			/** The metadata related to this resource. */
			metadata?: components["schemas"]["PipelineRunResponseMetadata"] | null;
			/** The resources related to this resource. */
			resources?: components["schemas"]["PipelineRunResponseResources"] | null;
			/**
			 * The unique resource id.
			 * Format: uuid
			 */
			id: string;
			/**
			 * Permission Denied
			 * @default false
			 */
			permission_denied: boolean;
			/** The name of the pipeline run. */
			name: string;
		};
		/**
		 * PipelineRunResponseBody
		 * @description Response body for pipeline runs.
		 */
		PipelineRunResponseBody: {
			/**
			 * The timestamp when this resource was created.
			 * Format: date-time
			 */
			created: string;
			/**
			 * The timestamp when this resource was last updated.
			 * Format: date-time
			 */
			updated: string;
			/** The user who created this resource. */
			user?: components["schemas"]["UserResponse"] | null;
			/** The status of the pipeline run. */
			status: components["schemas"]["ExecutionStatus"];
			/** The stack that was used for this run. */
			stack?: components["schemas"]["StackResponse"] | null;
			/** The pipeline this run belongs to. */
			pipeline?: components["schemas"]["PipelineResponse"] | null;
			/** The pipeline build that was used for this run. */
			build?: components["schemas"]["PipelineBuildResponse"] | null;
			/** The schedule that was used for this run. */
			schedule?: components["schemas"]["ScheduleResponse"] | null;
			/** The code reference that was used for this run. */
			code_reference?: components["schemas"]["CodeReferenceResponse"] | null;
			/** The deployment that was used for this run. */
			deployment_id?: string | null;
			/** The trigger execution that triggered this run. */
			trigger_execution?:
				| components["schemas"]["TriggerExecutionResponse"]
				| null;
			/** The ID of the model version that was configured by this pipeline run explicitly. */
			model_version_id?: string | null;
		};
		/**
		 * PipelineRunResponseMetadata
		 * @description Response metadata for pipeline runs.
		 */
		PipelineRunResponseMetadata: {
			/** The project of this resource. */
			project: components["schemas"]["ProjectResponse"];
			/**
			 * Metadata associated with this pipeline run.
			 * @default {}
			 */
			run_metadata: {
				[key: string]: unknown;
			};
			/**
			 * The steps of this run.
			 * @default {}
			 */
			steps: {
				[key: string]: unknown;
			};
			/** The pipeline configuration used for this pipeline run. */
			config: components["schemas"]["PipelineConfiguration-Output"];
			/** The start time of the pipeline run. */
			start_time?: string | null;
			/** The end time of the pipeline run. */
			end_time?: string | null;
			/**
			 * Environment of the client that initiated this pipeline run (OS, Python version, etc.).
			 * @default {}
			 */
			client_environment: {
				[key: string]: unknown;
			};
			/**
			 * Environment of the orchestrator that executed this pipeline run (OS, Python version, etc.).
			 * @default {}
			 */
			orchestrator_environment: {
				[key: string]: unknown;
			};
			/** The orchestrator run ID. */
			orchestrator_run_id?: string | null;
			/** Optional path where the code is stored in the artifact store. */
			code_path?: string | null;
			/**
			 * Template Id
			 * @description Template used for the pipeline run.
			 */
			template_id?: string | null;
			/**
			 * Is Templatable
			 * @description Whether a template can be created from this run.
			 * @default false
			 */
			is_templatable: boolean;
			/** Substitutions used in the step runs of this pipeline run. */
			step_substitutions?: {
				[key: string]: unknown;
			};
		};
		/**
		 * PipelineRunResponseResources
		 * @description Class for all resource models associated with the pipeline run entity.
		 */
		PipelineRunResponseResources: {
			model_version?: components["schemas"]["ModelVersionResponse"] | null;
			/** Tags associated with the pipeline run. */
			tags: components["schemas"]["TagResponse"][];
			/** Logs associated with this pipeline run. */
			logs?: components["schemas"]["LogsResponse"] | null;
		} & {
			[key: string]: unknown;
		};
		/**
		 * PipelineRunUpdate
		 * @description Pipeline run update model.
		 */
		PipelineRunUpdate: {
			status?: components["schemas"]["ExecutionStatus"] | null;
			/** End Time */
			end_time?: string | null;
			/** New tags to add to the pipeline run. */
			add_tags?: string[] | null;
			/** Tags to remove from the pipeline run. */
			remove_tags?: string[] | null;
		};
		/**
		 * PipelineSpec
		 * @description Specification of a pipeline.
		 */
		"PipelineSpec-Input": {
			/**
			 * Version
			 * @default 0.4
			 */
			version: string;
			source?: components["schemas"]["Source"] | null;
			/**
			 * Parameters
			 * @default {}
			 */
			parameters: {
				[key: string]: unknown;
			};
			/** Steps */
			steps: components["schemas"]["StepSpec-Input"][];
		};
		/**
		 * PipelineSpec
		 * @description Specification of a pipeline.
		 */
		"PipelineSpec-Output": {
			/**
			 * Version
			 * @default 0.4
			 */
			version: string;
			source?: components["schemas"]["Source"] | null;
			/**
			 * Parameters
			 * @default {}
			 */
			parameters: {
				[key: string]: unknown;
			};
			/** Steps */
			steps: components["schemas"]["StepSpec-Output"][];
		};
		/**
		 * PipelineUpdate
		 * @description Update model for pipelines.
		 */
		PipelineUpdate: {
			/** The description of the pipeline. */
			description?: string | null;
			/** New tags to add to the pipeline. */
			add_tags?: string[] | null;
			/** Tags to remove from the pipeline. */
			remove_tags?: string[] | null;
		};
		/**
		 * PluginSubType
		 * @description All possible types of Plugins.
		 * @enum {string}
		 */
		PluginSubType: "webhook" | "pipeline_run";
		/**
		 * PluginType
		 * @description All possible types of Plugins.
		 * @enum {string}
		 */
		PluginType: "event_source" | "action";
		/**
		 * ProjectRequest
		 * @description Request model for projects.
		 */
		ProjectRequest: {
			/** The unique name of the project. The project name must only contain only lowercase letters, numbers, underscores, and hyphens and be at most 50 characters long. */
			name: string;
			/**
			 * The display name of the project.
			 * @default
			 */
			display_name: string;
			/**
			 * The description of the project.
			 * @default
			 */
			description: string;
		};
		/**
		 * ProjectResponse
		 * @description Response model for projects.
		 */
		ProjectResponse: {
			/** The body of the resource. */
			body?: components["schemas"]["ProjectResponseBody"] | null;
			/** The metadata related to this resource. */
			metadata?: components["schemas"]["ProjectResponseMetadata"] | null;
			/** The resources related to this resource. */
			resources?: components["schemas"]["ProjectResponseResources"] | null;
			/**
			 * The unique resource id.
			 * Format: uuid
			 */
			id: string;
			/**
			 * Permission Denied
			 * @default false
			 */
			permission_denied: boolean;
			/** The unique name of the project. */
			name: string;
		};
		/**
		 * ProjectResponseBody
		 * @description Response body for projects.
		 */
		ProjectResponseBody: {
			/**
			 * The timestamp when this resource was created.
			 * Format: date-time
			 */
			created: string;
			/**
			 * The timestamp when this resource was last updated.
			 * Format: date-time
			 */
			updated: string;
			/** The display name of the project. */
			display_name: string;
		};
		/**
		 * ProjectResponseMetadata
		 * @description Response metadata for projects.
		 */
		ProjectResponseMetadata: {
			/**
			 * The description of the project.
			 * @default
			 */
			description: string;
		};
		/**
		 * ProjectResponseResources
		 * @description Class for all resource models associated with the project entity.
		 */
		ProjectResponseResources: {
			[key: string]: unknown;
		};
		/**
		 * ProjectStatistics
		 * @description Project statistics.
		 */
		ProjectStatistics: {
			/** The number of pipelines. */
			pipelines: number;
			/** The number of pipeline runs. */
			runs: number;
		};
		/**
		 * ProjectUpdate
		 * @description Update model for projects.
		 */
		ProjectUpdate: {
			/** The unique name of the project. The project name must only contain only lowercase letters, numbers, underscores, and hyphens and be at most 50 characters long. */
			name?: string | null;
			/** The display name of the project. */
			display_name?: string | null;
			/** The description of the project. */
			description?: string | null;
		};
		/**
		 * ResourceTypeModel
		 * @description Resource type specification.
		 *
		 *     Describes the authentication methods and resource instantiation model for
		 *     one or more resource types.
		 */
		ResourceTypeModel: {
			/** User readable name for the resource type. */
			name: string;
			/** Resource type identifier. */
			resource_type: string;
			/**
			 * A description of the resource type.
			 * @default
			 */
			description: string;
			/** The list of authentication methods that can be used to access resources of this type. */
			auth_methods: string[];
			/**
			 * Specifies if a single connector instance can be used to access multiple instances of this resource type. If set to True, the connector is able to provide a list of resource IDs identifying all the resources that it can access and a resource ID needs to be explicitly configured or supplied when access to a resource is requested. If set to False, a connector instance is only able to access a single resource and a resource ID is not required to access the resource.
			 * @default false
			 */
			supports_instances: boolean;
			/** Optionally, a URL pointing to a png,svg or jpg file can be attached. */
			logo_url?: string | null;
			/** Optionally, a python-rich emoji can be attached. */
			emoji?: string | null;
		};
		/**
		 * ResourcesInfo
		 * @description Information about the resources needed for CLI and UI.
		 */
		ResourcesInfo: {
			/** Flavor */
			flavor: string;
			/** Flavor Display Name */
			flavor_display_name: string;
			/**
			 * Required Configuration
			 * @default {}
			 */
			required_configuration: {
				[key: string]: unknown;
			};
			/**
			 * Use Resource Value As Fixed Config
			 * @default false
			 */
			use_resource_value_as_fixed_config: boolean;
			/** Accessible By Service Connector */
			accessible_by_service_connector: string[];
			/** Connected Through Service Connector */
			connected_through_service_connector: components["schemas"]["ComponentResponse"][];
		};
		/**
		 * RunMetadataRequest
		 * @description Request model for run metadata.
		 */
		RunMetadataRequest: {
			/** The id of the user that created this resource. Set automatically by the server. */
			user?: string | null;
			/**
			 * The project to which this resource belongs.
			 * Format: uuid
			 */
			project: string;
			/** The list of resources that this metadata belongs to. */
			resources: components["schemas"]["RunMetadataResource"][];
			/** The ID of the stack component that this metadata belongs to. */
			stack_component_id?: string | null;
			/** The metadata to be created. */
			values: {
				[key: string]: unknown;
			};
			/** The types of the metadata to be created. */
			types: {
				[key: string]: unknown;
			};
			/** The ID of the step execution that published this metadata. */
			publisher_step_id?: string | null;
		};
		/**
		 * RunMetadataResource
		 * @description Utility class to help identify resources to tag metadata to.
		 */
		RunMetadataResource: {
			/**
			 * The ID of the resource.
			 * Format: uuid
			 */
			id: string;
			/** The type of the resource. */
			type: components["schemas"]["MetadataResourceTypes"];
		};
		/**
		 * RunTemplateRequest
		 * @description Request model for run templates.
		 */
		RunTemplateRequest: {
			/** The id of the user that created this resource. Set automatically by the server. */
			user?: string | null;
			/**
			 * The project to which this resource belongs.
			 * Format: uuid
			 */
			project: string;
			/** The name of the run template. */
			name: string;
			/** The description of the run template. */
			description?: string | null;
			/**
			 * The deployment that should be the base of the created template.
			 * Format: uuid
			 */
			source_deployment_id: string;
			/**
			 * Whether the run template is hidden.
			 * @default false
			 */
			hidden: boolean;
			/** Tags of the run template. */
			tags?: string[] | null;
		};
		/**
		 * RunTemplateResponse
		 * @description Response model for run templates.
		 */
		RunTemplateResponse: {
			/** The body of the resource. */
			body?: components["schemas"]["RunTemplateResponseBody"] | null;
			/** The metadata related to this resource. */
			metadata?: components["schemas"]["RunTemplateResponseMetadata"] | null;
			/** The resources related to this resource. */
			resources?: components["schemas"]["RunTemplateResponseResources"] | null;
			/**
			 * The unique resource id.
			 * Format: uuid
			 */
			id: string;
			/**
			 * Permission Denied
			 * @default false
			 */
			permission_denied: boolean;
			/** The name of the run template. */
			name: string;
		};
		/**
		 * RunTemplateResponseBody
		 * @description Response body for run templates.
		 */
		RunTemplateResponseBody: {
			/**
			 * The timestamp when this resource was created.
			 * Format: date-time
			 */
			created: string;
			/**
			 * The timestamp when this resource was last updated.
			 * Format: date-time
			 */
			updated: string;
			/** The user who created this resource. */
			user?: components["schemas"]["UserResponse"] | null;
			/** If a run can be started from the template. */
			runnable: boolean;
			/**
			 * Whether the run template is hidden.
			 * @default false
			 */
			hidden: boolean;
			/** The ID of the latest run of the run template. */
			latest_run_id?: string | null;
			/** The status of the latest run of the run template. */
			latest_run_status?: components["schemas"]["ExecutionStatus"] | null;
		};
		/**
		 * RunTemplateResponseMetadata
		 * @description Response metadata for run templates.
		 */
		RunTemplateResponseMetadata: {
			/** The project of this resource. */
			project: components["schemas"]["ProjectResponse"];
			/** The description of the run template. */
			description?: string | null;
			/** The spec of the pipeline. */
			pipeline_spec?: components["schemas"]["PipelineSpec-Output"] | null;
			/** Run configuration template. */
			config_template?: {
				[key: string]: unknown;
			} | null;
			/** Run configuration schema. */
			config_schema?: {
				[key: string]: unknown;
			} | null;
		};
		/**
		 * RunTemplateResponseResources
		 * @description All resource models associated with the run template.
		 */
		RunTemplateResponseResources: {
			/** The deployment that is the source of the template. */
			source_deployment?:
				| components["schemas"]["PipelineDeploymentResponse"]
				| null;
			/** The pipeline associated with the template. */
			pipeline?: components["schemas"]["PipelineResponse"] | null;
			/** The pipeline build associated with the template. */
			build?: components["schemas"]["PipelineBuildResponse"] | null;
			/** The code reference associated with the template. */
			code_reference?: components["schemas"]["CodeReferenceResponse"] | null;
			/** Tags associated with the run template. */
			tags: components["schemas"]["TagResponse"][];
		} & {
			[key: string]: unknown;
		};
		/**
		 * RunTemplateUpdate
		 * @description Run template update model.
		 */
		RunTemplateUpdate: {
			/** The name of the run template. */
			name?: string | null;
			/** The description of the run template. */
			description?: string | null;
			/** Whether the run template is hidden. */
			hidden?: boolean | null;
			/** New tags to add to the run template. */
			add_tags?: string[] | null;
			/** Tags to remove from the run template. */
			remove_tags?: string[] | null;
		};
		/**
		 * Schedule
		 * @description Class for defining a pipeline schedule.
		 *
		 *     Attributes:
		 *         name: Optional name to give to the schedule. If not set, a default name
		 *             will be generated based on the pipeline name and the current date
		 *             and time.
		 *         cron_expression: Cron expression for the pipeline schedule. If a value
		 *             for this is set it takes precedence over the start time + interval.
		 *         start_time: When the schedule should start. If this is a datetime object
		 *             without any timezone, it is treated as a datetime in the local
		 *             timezone.
		 *         end_time: When the schedule should end. If this is a datetime object
		 *             without any timezone, it is treated as a datetime in the local
		 *             timezone.
		 *         interval_second: datetime timedelta indicating the seconds between two
		 *             recurring runs for a periodic schedule.
		 *         catchup: Whether the recurring run should catch up if behind schedule.
		 *             For example, if the recurring run is paused for a while and
		 *             re-enabled afterward. If catchup=True, the scheduler will catch
		 *             up on (backfill) each missed interval. Otherwise, it only
		 *             schedules the latest interval if more than one interval is ready to
		 *             be scheduled. Usually, if your pipeline handles backfill
		 *             internally, you should turn catchup off to avoid duplicate backfill.
		 *         run_once_start_time: When to run the pipeline once. If this is a
		 *             datetime object without any timezone, it is treated as a datetime
		 *             in the local timezone.
		 */
		Schedule: {
			/** Name */
			name?: string | null;
			/** Cron Expression */
			cron_expression?: string | null;
			/** Start Time */
			start_time?: string | null;
			/** End Time */
			end_time?: string | null;
			/** Interval Second */
			interval_second?: string | null;
			/**
			 * Catchup
			 * @default false
			 */
			catchup: boolean;
			/** Run Once Start Time */
			run_once_start_time?: string | null;
		};
		/**
		 * ScheduleRequest
		 * @description Request model for schedules.
		 */
		ScheduleRequest: {
			/** The id of the user that created this resource. Set automatically by the server. */
			user?: string | null;
			/**
			 * The project to which this resource belongs.
			 * Format: uuid
			 */
			project: string;
			/** Name */
			name: string;
			/** Active */
			active: boolean;
			/** Cron Expression */
			cron_expression?: string | null;
			/** Start Time */
			start_time?: string | null;
			/** End Time */
			end_time?: string | null;
			/** Interval Second */
			interval_second?: string | null;
			/**
			 * Catchup
			 * @default false
			 */
			catchup: boolean;
			/** Run Once Start Time */
			run_once_start_time?: string | null;
			/** Orchestrator Id */
			orchestrator_id: string | null;
			/** Pipeline Id */
			pipeline_id: string | null;
		};
		/**
		 * ScheduleResponse
		 * @description Response model for schedules.
		 */
		ScheduleResponse: {
			/** The body of the resource. */
			body?: components["schemas"]["ScheduleResponseBody"] | null;
			/** The metadata related to this resource. */
			metadata?: components["schemas"]["ScheduleResponseMetadata"] | null;
			/** The resources related to this resource. */
			resources?: components["schemas"]["ScheduleResponseResources"] | null;
			/**
			 * The unique resource id.
			 * Format: uuid
			 */
			id: string;
			/**
			 * Permission Denied
			 * @default false
			 */
			permission_denied: boolean;
			/** Name of this schedule. */
			name: string;
		};
		/**
		 * ScheduleResponseBody
		 * @description Response body for schedules.
		 */
		ScheduleResponseBody: {
			/**
			 * The timestamp when this resource was created.
			 * Format: date-time
			 */
			created: string;
			/**
			 * The timestamp when this resource was last updated.
			 * Format: date-time
			 */
			updated: string;
			/** The user who created this resource. */
			user?: components["schemas"]["UserResponse"] | null;
			/** Active */
			active: boolean;
			/** Cron Expression */
			cron_expression?: string | null;
			/** Start Time */
			start_time?: string | null;
			/** End Time */
			end_time?: string | null;
			/** Interval Second */
			interval_second?: string | null;
			/**
			 * Catchup
			 * @default false
			 */
			catchup: boolean;
			/** Run Once Start Time */
			run_once_start_time?: string | null;
		};
		/**
		 * ScheduleResponseMetadata
		 * @description Response metadata for schedules.
		 */
		ScheduleResponseMetadata: {
			/** The project of this resource. */
			project: components["schemas"]["ProjectResponse"];
			/** Orchestrator Id */
			orchestrator_id: string | null;
			/** Pipeline Id */
			pipeline_id: string | null;
			/**
			 * Metadata associated with this schedule.
			 * @default {}
			 */
			run_metadata: {
				[key: string]: unknown;
			};
		};
		/**
		 * ScheduleResponseResources
		 * @description Class for all resource models associated with the schedule entity.
		 */
		ScheduleResponseResources: {
			[key: string]: unknown;
		};
		/**
		 * ScheduleUpdate
		 * @description Update model for schedules.
		 */
		ScheduleUpdate: {
			/** Name */
			name?: string | null;
		};
		/**
		 * SecretRequest
		 * @description Request model for secrets.
		 */
		SecretRequest: {
			/** The id of the user that created this resource. Set automatically by the server. */
			user?: string | null;
			/** The name of the secret. */
			name: string;
			/**
			 * Whether the secret is private. A private secret is only accessible to the user who created it.
			 * @default false
			 */
			private: boolean;
			/** The values stored in this secret. */
			values?: {
				[key: string]: unknown;
			};
		};
		/**
		 * SecretResponse
		 * @description Response model for secrets.
		 */
		SecretResponse: {
			/** The body of the resource. */
			body?: components["schemas"]["SecretResponseBody"] | null;
			/** The metadata related to this resource. */
			metadata?: components["schemas"]["SecretResponseMetadata"] | null;
			/** The resources related to this resource. */
			resources?: components["schemas"]["SecretResponseResources"] | null;
			/**
			 * The unique resource id.
			 * Format: uuid
			 */
			id: string;
			/**
			 * Permission Denied
			 * @default false
			 */
			permission_denied: boolean;
			/** The name of the secret. */
			name: string;
		};
		/**
		 * SecretResponseBody
		 * @description Response body for secrets.
		 */
		SecretResponseBody: {
			/**
			 * The timestamp when this resource was created.
			 * Format: date-time
			 */
			created: string;
			/**
			 * The timestamp when this resource was last updated.
			 * Format: date-time
			 */
			updated: string;
			/** The user who created this resource. */
			user?: components["schemas"]["UserResponse"] | null;
			/**
			 * Whether the secret is private. A private secret is only accessible to the user who created it.
			 * @default false
			 */
			private: boolean;
			/** The values stored in this secret. */
			values?: {
				[key: string]: unknown;
			};
		};
		/**
		 * SecretResponseMetadata
		 * @description Response metadata for secrets.
		 */
		SecretResponseMetadata: Record<string, never>;
		/**
		 * SecretResponseResources
		 * @description Response resources for secrets.
		 */
		SecretResponseResources: {
			[key: string]: unknown;
		};
		/**
		 * SecretUpdate
		 * @description Update model for secrets.
		 */
		SecretUpdate: {
			/** The name of the secret. */
			name?: string | null;
			/** Whether the secret is private. A private secret is only accessible to the user who created it. */
			private?: boolean | null;
			/** The values stored in this secret. */
			values?: {
				[key: string]: unknown;
			} | null;
		};
		/**
		 * SecretsStoreType
		 * @description Secrets Store Backend Types.
		 * @enum {string}
		 */
		SecretsStoreType:
			| "none"
			| "sql"
			| "aws"
			| "gcp"
			| "azure"
			| "hashicorp"
			| "custom";
		/**
		 * ServerActivationRequest
		 * @description Model for activating the server.
		 */
		ServerActivationRequest: {
			/** The name of the server. */
			server_name?: string | null;
			/** The logo URL of the server. */
			logo_url?: string | null;
			/** Whether to enable analytics for the server. */
			enable_analytics?: boolean | null;
			/** Whether to display announcements about ZenML in the dashboard. */
			display_announcements?: boolean | null;
			/** Whether to display notifications about ZenML updates in the dashboard. */
			display_updates?: boolean | null;
			/** The username of the default admin account to create. Leave empty to skip creating the default admin account. */
			admin_username?: string | null;
			/** The password of the default admin account to create. Leave empty to skip creating the default admin account. */
			admin_password?: string | null;
		};
		/**
		 * ServerDatabaseType
		 * @description Enum for server database types.
		 * @enum {string}
		 */
		ServerDatabaseType: "sqlite" | "mysql" | "other";
		/**
		 * ServerDeploymentType
		 * @description Enum for server deployment types.
		 * @enum {string}
		 */
		ServerDeploymentType:
			| "local"
			| "docker"
			| "kubernetes"
			| "aws"
			| "gcp"
			| "azure"
			| "alpha"
			| "other"
			| "hf_spaces"
			| "sandbox"
			| "cloud";
		/**
		 * ServerLoadInfo
		 * @description Domain model for ZenML server load information.
		 */
		ServerLoadInfo: {
			/** Number of threads that the server is currently using. */
			threads: number;
			/** Total number of database connections (active and idle) that the server currently has established. */
			db_connections_total: number;
			/** Number of database connections that the server is currently actively using to make queries or transactions. */
			db_connections_active: number;
			/** Number of overflow database connections that the server is currently actively using to make queries or transactions. */
			db_connections_overflow: number;
		};
		/**
		 * ServerModel
		 * @description Domain model for ZenML servers.
		 */
		ServerModel: {
			/**
			 * The unique server id.
			 * Format: uuid
			 */
			id?: string;
			/** The name of the ZenML server. */
			name?: string | null;
			/** The ZenML version that the server is running. */
			version: string;
			/**
			 * Flag to indicate whether the server is active.
			 * @default true
			 */
			active: boolean;
			/**
			 * Flag to indicate whether ZenML is running on debug mode.
			 * @default false
			 */
			debug: boolean;
			/**
			 * The ZenML server deployment type.
			 * @default other
			 */
			deployment_type: components["schemas"]["ServerDeploymentType"];
			/**
			 * The database type that the server is using.
			 * @default other
			 */
			database_type: components["schemas"]["ServerDatabaseType"];
			/**
			 * The type of secrets store that the server is using.
			 * @default none
			 */
			secrets_store_type: components["schemas"]["SecretsStoreType"];
			/** The authentication scheme that the server is using. */
			auth_scheme: components["schemas"]["AuthScheme"];
			/**
			 * The URL where the ZenML server API is reachable. If not specified, the clients will use the same URL used to connect them to the ZenML server.
			 * @default
			 */
			server_url: string;
			/**
			 * The URL where the ZenML dashboard is reachable. If not specified, the `server_url` value will be used instead.
			 * @default
			 */
			dashboard_url: string;
			/**
			 * Enable server-side analytics.
			 * @default true
			 */
			analytics_enabled: boolean;
			/**
			 * The metadata associated with the server.
			 * @default {}
			 */
			metadata: {
				[key: string]: unknown;
			};
			/** Timestamp of latest user activity traced on the server. */
			last_user_activity?: string | null;
			/** The base URL of the ZenML Pro dashboard to which the server is connected. Only set if the server is a ZenML Pro server. */
			pro_dashboard_url?: string | null;
			/** The base URL of the ZenML Pro API to which the server is connected. Only set if the server is a ZenML Pro server. */
			pro_api_url?: string | null;
			/** The ID of the ZenML Pro organization to which the server is connected. Only set if the server is a ZenML Pro server. */
			pro_organization_id?: string | null;
			/** The name of the ZenML Pro organization to which the server is connected. Only set if the server is a ZenML Pro server. */
			pro_organization_name?: string | null;
			/** The ID of the ZenML Pro workspace to which the server is connected. Only set if the server is a ZenML Pro server. */
			pro_workspace_id?: string | null;
			/** The name of the ZenML Pro workspace to which the server is connected. Only set if the server is a ZenML Pro server. */
			pro_workspace_name?: string | null;
		};
		/**
		 * ServerSettingsResponse
		 * @description Response model for server settings.
		 */
		ServerSettingsResponse: {
			/** The body of the resource. */
			body?: components["schemas"]["ServerSettingsResponseBody"] | null;
			/** The metadata related to this resource. */
			metadata?: components["schemas"]["ServerSettingsResponseMetadata"] | null;
			/** The resources related to this resource. */
			resources?:
				| components["schemas"]["ServerSettingsResponseResources"]
				| null;
		};
		/**
		 * ServerSettingsResponseBody
		 * @description Response body for server settings.
		 */
		ServerSettingsResponseBody: {
			/**
			 * The unique server id.
			 * Format: uuid
			 */
			server_id: string;
			/** The name of the server. */
			server_name: string;
			/** The logo URL of the server. */
			logo_url?: string | null;
			/** Whether the server has been activated or not. */
			active: boolean;
			/** Whether analytics are enabled for the server. */
			enable_analytics: boolean;
			/** Whether to display announcements about ZenML in the dashboard. */
			display_announcements: boolean | null;
			/** Whether to display notifications about ZenML updates in the dashboard. */
			display_updates: boolean | null;
			/**
			 * The timestamp when the last user activity was detected.
			 * Format: date-time
			 */
			last_user_activity: string;
			/**
			 * The timestamp when this resource was last updated.
			 * Format: date-time
			 */
			updated: string;
		};
		/**
		 * ServerSettingsResponseMetadata
		 * @description Response metadata for server settings.
		 */
		ServerSettingsResponseMetadata: Record<string, never>;
		/**
		 * ServerSettingsResponseResources
		 * @description Response resources for server settings.
		 */
		ServerSettingsResponseResources: {
			[key: string]: unknown;
		};
		/**
		 * ServerSettingsUpdate
		 * @description Model for updating server settings.
		 */
		ServerSettingsUpdate: {
			/** The name of the server. */
			server_name?: string | null;
			/** The logo URL of the server. */
			logo_url?: string | null;
			/** Whether to enable analytics for the server. */
			enable_analytics?: boolean | null;
			/** Whether to display announcements about ZenML in the dashboard. */
			display_announcements?: boolean | null;
			/** Whether to display notifications about ZenML updates in the dashboard. */
			display_updates?: boolean | null;
		};
		/**
		 * ServerStatistics
		 * @description Server statistics.
		 */
		ServerStatistics: {
			/** The number of stacks. */
			stacks: number;
			/** The number of components. */
			components: number;
			/** The number of projects. */
			projects: number;
		};
		/**
		 * ServiceAccountRequest
		 * @description Request model for service accounts.
		 */
		ServiceAccountRequest: {
			/** The unique name for the service account. */
			name: string;
			/** A description of the service account. */
			description?: string | null;
			/** Whether the service account is active or not. */
			active: boolean;
		};
		/**
		 * ServiceAccountResponse
		 * @description Response model for service accounts.
		 */
		ServiceAccountResponse: {
			/** The body of the resource. */
			body?: components["schemas"]["ServiceAccountResponseBody"] | null;
			/** The metadata related to this resource. */
			metadata?: components["schemas"]["ServiceAccountResponseMetadata"] | null;
			/** The resources related to this resource. */
			resources?:
				| components["schemas"]["ServiceAccountResponseResources"]
				| null;
			/**
			 * The unique resource id.
			 * Format: uuid
			 */
			id: string;
			/**
			 * Permission Denied
			 * @default false
			 */
			permission_denied: boolean;
			/** The unique username for the account. */
			name: string;
		};
		/**
		 * ServiceAccountResponseBody
		 * @description Response body for service accounts.
		 */
		ServiceAccountResponseBody: {
			/**
			 * The timestamp when this resource was created.
			 * Format: date-time
			 */
			created: string;
			/**
			 * The timestamp when this resource was last updated.
			 * Format: date-time
			 */
			updated: string;
			/**
			 * Whether the account is active.
			 * @default false
			 */
			active: boolean;
		};
		/**
		 * ServiceAccountResponseMetadata
		 * @description Response metadata for service accounts.
		 */
		ServiceAccountResponseMetadata: {
			/**
			 * A description of the service account.
			 * @default
			 */
			description: string;
		};
		/**
		 * ServiceAccountResponseResources
		 * @description Class for all resource models associated with the service account entity.
		 */
		ServiceAccountResponseResources: {
			[key: string]: unknown;
		};
		/**
		 * ServiceAccountUpdate
		 * @description Update model for service accounts.
		 */
		ServiceAccountUpdate: {
			/** The unique name for the service account. */
			name?: string | null;
			/** A description of the service account. */
			description?: string | null;
			/** Whether the service account is active or not. */
			active?: boolean | null;
		};
		/**
		 * ServiceConnectorInfo
		 * @description Information about the service connector when creating a full stack.
		 */
		ServiceConnectorInfo: {
			/** Type */
			type: string;
			/** Auth Method */
			auth_method: string;
			/**
			 * Configuration
			 * @default {}
			 */
			configuration: {
				[key: string]: unknown;
			};
		};
		/**
		 * ServiceConnectorRequest
		 * @description Request model for service connectors.
		 */
		ServiceConnectorRequest: {
			/** The id of the user that created this resource. Set automatically by the server. */
			user?: string | null;
			/** The service connector name. */
			name: string;
			/** The type of service connector. */
			connector_type:
				| string
				| components["schemas"]["ServiceConnectorTypeModel"];
			/**
			 * The service connector instance description.
			 * @default
			 */
			description: string;
			/** The authentication method that the connector instance uses to access the resources. */
			auth_method: string;
			/** The type(s) of resource that the connector instance can be used to gain access to. */
			resource_types?: string[];
			/** Uniquely identifies a specific resource instance that the connector instance can be used to access. If omitted, the connector instance can be used to access any and all resource instances that the authentication method and resource type(s) allow. */
			resource_id?: string | null;
			/**
			 * Indicates whether the connector instance can be used to access multiple instances of the configured resource type.
			 * @default false
			 */
			supports_instances: boolean;
			/** Time when the authentication credentials configured for the connector expire. If omitted, the credentials do not expire. */
			expires_at?: string | null;
			/** The number of seconds of tolerance to apply when checking whether the authentication credentials configured for the connector have expired. If omitted, no tolerance is applied. */
			expires_skew_tolerance?: number | null;
			/** The duration, in seconds, that the temporary credentials generated by this connector should remain valid. Only applicable for connectors and authentication methods that involve generating temporary credentials from the ones configured in the connector. */
			expiration_seconds?: number | null;
			/** The service connector configuration, not including secrets. */
			configuration?: {
				[key: string]: unknown;
			};
			/** The service connector secrets. */
			secrets?: {
				[key: string]: unknown;
			};
			/** Service connector labels. */
			labels?: {
				[key: string]: unknown;
			};
		};
		/**
		 * ServiceConnectorResourcesInfo
		 * @description Information about the service connector resources needed for CLI and UI.
		 */
		ServiceConnectorResourcesInfo: {
			/** Connector Type */
			connector_type: string;
			/** Components Resources Info */
			components_resources_info: {
				[key: string]: unknown;
			};
		};
		/**
		 * ServiceConnectorResourcesModel
		 * @description Service connector resources list.
		 *
		 *     Lists the resource types and resource instances that a service connector
		 *     can provide access to.
		 */
		ServiceConnectorResourcesModel: {
			/** The ID of the service connector instance providing this resource. */
			id?: string | null;
			/** The name of the service connector instance providing this resource. */
			name?: string | null;
			/** The type of service connector. */
			connector_type:
				| string
				| components["schemas"]["ServiceConnectorTypeModel"];
			/** The list of resources that the service connector instance can give access to. Contains one entry for every resource type that the connector is configured for. */
			resources?: components["schemas"]["ServiceConnectorTypedResourcesModel"][];
			/** A global error message describing why the service connector instance could not authenticate to the remote service. */
			error?: string | null;
		};
		/**
		 * ServiceConnectorResponse
		 * @description Response model for service connectors.
		 */
		ServiceConnectorResponse: {
			/** The body of the resource. */
			body?: components["schemas"]["ServiceConnectorResponseBody"] | null;
			/** The metadata related to this resource. */
			metadata?:
				| components["schemas"]["ServiceConnectorResponseMetadata"]
				| null;
			/** The resources related to this resource. */
			resources?:
				| components["schemas"]["ServiceConnectorResponseResources"]
				| null;
			/**
			 * The unique resource id.
			 * Format: uuid
			 */
			id: string;
			/**
			 * Permission Denied
			 * @default false
			 */
			permission_denied: boolean;
			/** The service connector name. */
			name: string;
		};
		/**
		 * ServiceConnectorResponseBody
		 * @description Response body for service connectors.
		 */
		ServiceConnectorResponseBody: {
			/**
			 * The timestamp when this resource was created.
			 * Format: date-time
			 */
			created: string;
			/**
			 * The timestamp when this resource was last updated.
			 * Format: date-time
			 */
			updated: string;
			/** The user who created this resource. */
			user?: components["schemas"]["UserResponse"] | null;
			/**
			 * The service connector instance description.
			 * @default
			 */
			description: string;
			/** The type of service connector. */
			connector_type:
				| string
				| components["schemas"]["ServiceConnectorTypeModel"];
			/** The authentication method that the connector instance uses to access the resources. */
			auth_method: string;
			/** The type(s) of resource that the connector instance can be used to gain access to. */
			resource_types?: string[];
			/** Uniquely identifies a specific resource instance that the connector instance can be used to access. If omitted, the connector instance can be used to access any and all resource instances that the authentication method and resource type(s) allow. */
			resource_id?: string | null;
			/**
			 * Indicates whether the connector instance can be used to access multiple instances of the configured resource type.
			 * @default false
			 */
			supports_instances: boolean;
			/** Time when the authentication credentials configured for the connector expire. If omitted, the credentials do not expire. */
			expires_at?: string | null;
			/** The number of seconds of tolerance to apply when checking whether the authentication credentials configured for the connector have expired. If omitted, no tolerance is applied. */
			expires_skew_tolerance?: number | null;
		};
		/**
		 * ServiceConnectorResponseMetadata
		 * @description Response metadata for service connectors.
		 */
		ServiceConnectorResponseMetadata: {
			/** The service connector configuration, not including secrets. */
			configuration?: {
				[key: string]: unknown;
			};
			/** The ID of the secret that contains the service connector secret configuration values. */
			secret_id?: string | null;
			/** The duration, in seconds, that the temporary credentials generated by this connector should remain valid. Only applicable for connectors and authentication methods that involve generating temporary credentials from the ones configured in the connector. */
			expiration_seconds?: number | null;
			/** The service connector secrets. */
			secrets?: {
				[key: string]: unknown;
			};
			/** Service connector labels. */
			labels?: {
				[key: string]: unknown;
			};
		};
		/**
		 * ServiceConnectorResponseResources
		 * @description Class for all resource models associated with the service connector entity.
		 */
		ServiceConnectorResponseResources: {
			[key: string]: unknown;
		};
		/**
		 * ServiceConnectorTypeModel
		 * @description Service connector type specification.
		 *
		 *     Describes the types of resources to which the service connector can be used
		 *     to gain access and the authentication methods that are supported by the
		 *     service connector.
		 *
		 *     The connector type, resource types, resource IDs and authentication
		 *     methods can all be used as search criteria to lookup and filter service
		 *     connector instances that are compatible with the requirements of a consumer
		 *     (e.g. a stack component).
		 */
		ServiceConnectorTypeModel: {
			/** User readable name for the service connector type. */
			name: string;
			/** The type of service connector. It can be used to represent a generic resource (e.g. Docker, Kubernetes) or a group of different resources accessible through a common interface or point of access and authentication (e.g. a cloud provider or a platform). */
			connector_type: string;
			/**
			 * A description of the service connector.
			 * @default
			 */
			description: string;
			/** A list of resource types that the connector can be used to access. */
			resource_types: components["schemas"]["ResourceTypeModel"][];
			/** A list of specifications describing the authentication methods that are supported by the service connector, along with the configuration and secrets attributes that need to be configured for them. */
			auth_methods: components["schemas"]["AuthenticationMethodModel"][];
			/**
			 * Models if the connector can be configured automatically based on information extracted from a local environment.
			 * @default false
			 */
			supports_auto_configuration: boolean;
			/** Optionally, a URL pointing to a png,svg or jpg can be attached. */
			logo_url?: string | null;
			/** Optionally, a python-rich emoji can be attached. */
			emoji?: string | null;
			/** Optionally, a URL pointing to docs, within docs.zenml.io. */
			docs_url?: string | null;
			/** Optionally, a URL pointing to SDK docs,within sdkdocs.zenml.io. */
			sdk_docs_url?: string | null;
			/**
			 * If True, the service connector is available locally.
			 * @default true
			 */
			local: boolean;
			/**
			 * If True, the service connector is available remotely.
			 * @default false
			 */
			remote: boolean;
		};
		/**
		 * ServiceConnectorTypedResourcesModel
		 * @description Service connector typed resources list.
		 *
		 *     Lists the resource instances that a service connector can provide
		 *     access to.
		 */
		ServiceConnectorTypedResourcesModel: {
			/** The type of resource that the service connector instance can be used to access. */
			resource_type: string;
			/** The resource IDs of all resource instances that the service connector instance can be used to access. Omitted (set to None) for multi-type service connectors that didn't explicitly request to fetch resources for all resource types. Also omitted if an error occurred while listing the resource instances or if no resources are listed due to authorization issues or lack of permissions (in both cases the 'error' field is set to an error message). For resource types that do not support multiple instances, a single resource ID is listed. */
			resource_ids?: string[] | null;
			/** An error message describing why the service connector instance could not list the resources that it is configured to access. */
			error?: string | null;
		};
		/**
		 * ServiceConnectorUpdate
		 * @description Model used for service connector updates.
		 *
		 *     Most fields in the update model are optional and will not be updated if
		 *     omitted. However, the following fields are "special" and leaving them out
		 *     will also cause the corresponding value to be removed from the service
		 *     connector in the database:
		 *
		 *     * the `resource_id` field
		 *     * the `expiration_seconds` field
		 *
		 *     In addition to the above exceptions, the following rules apply:
		 *
		 *     * the `configuration` and `secrets` fields together represent a full
		 *     valid configuration update, not just a partial update. If either is
		 *     set (i.e. not None) in the update, their values are merged together and
		 *     will replace the existing configuration and secrets values.
		 *     * the `labels` field is also a full labels update: if set (i.e. not
		 *     `None`), all existing labels are removed and replaced by the new labels
		 *     in the update.
		 *
		 *     NOTE: the attributes here override the ones in the base class, so they
		 *     have a None default value.
		 */
		ServiceConnectorUpdate: {
			/** The service connector name. */
			name?: string | null;
			/** The type of service connector. */
			connector_type?:
				| string
				| components["schemas"]["ServiceConnectorTypeModel"]
				| null;
			/** The service connector instance description. */
			description?: string | null;
			/** The authentication method that the connector instance uses to access the resources. */
			auth_method?: string | null;
			/** The type(s) of resource that the connector instance can be used to gain access to. */
			resource_types?: string[] | null;
			/** Uniquely identifies a specific resource instance that the connector instance can be used to access. If omitted, the connector instance can be used to access any and all resource instances that the authentication method and resource type(s) allow. */
			resource_id?: string | null;
			/** Indicates whether the connector instance can be used to access multiple instances of the configured resource type. */
			supports_instances?: boolean | null;
			/** Time when the authentication credentials configured for the connector expire. If omitted, the credentials do not expire. */
			expires_at?: string | null;
			/** The number of seconds of tolerance to apply when checking whether the authentication credentials configured for the connector have expired. If omitted, no tolerance is applied. */
			expires_skew_tolerance?: number | null;
			/** The duration, in seconds, that the temporary credentials generated by this connector should remain valid. Only applicable for connectors and authentication methods that involve generating temporary credentials from the ones configured in the connector. */
			expiration_seconds?: number | null;
			/** The service connector configuration, not including secrets. */
			configuration?: {
				[key: string]: unknown;
			} | null;
			/** The service connector secrets. */
			secrets?: {
				[key: string]: unknown;
			} | null;
			/** Service connector labels. */
			labels?: {
				[key: string]: unknown;
			} | null;
		};
		/**
		 * ServiceRequest
		 * @description Request model for services.
		 */
		ServiceRequest: {
			/** The id of the user that created this resource. Set automatically by the server. */
			user?: string | null;
			/**
			 * The project to which this resource belongs.
			 * Format: uuid
			 */
			project: string;
			/** The name of the service. */
			name: string;
			/** The type of the service. */
			service_type: components["schemas"]["ServiceType"];
			/**
			 * The class of the service.
			 * @description The fully qualified class name of the service implementation.
			 */
			service_source?: string | null;
			/**
			 * The admin state of the service.
			 * @description The administrative state of the service, e.g., ACTIVE, INACTIVE.
			 */
			admin_state?: components["schemas"]["ServiceState"] | null;
			/**
			 * The service config.
			 * @description A dictionary containing configuration parameters for the service.
			 */
			config: {
				[key: string]: unknown;
			};
			/** The service labels. */
			labels?: {
				[key: string]: unknown;
			} | null;
			/** The status of the service. */
			status?: {
				[key: string]: unknown;
			} | null;
			/** The service endpoint. */
			endpoint?: {
				[key: string]: unknown;
			} | null;
			/** The service endpoint URL. */
			prediction_url?: string | null;
			/** The service health check URL. */
			health_check_url?: string | null;
			/** The model version id linked to the service. */
			model_version_id?: string | null;
			/** The pipeline run id linked to the service. */
			pipeline_run_id?: string | null;
		};
		/**
		 * ServiceResponse
		 * @description Response model for services.
		 */
		ServiceResponse: {
			/** The body of the resource. */
			body?: components["schemas"]["ServiceResponseBody"] | null;
			/** The metadata related to this resource. */
			metadata?: components["schemas"]["ServiceResponseMetadata"] | null;
			/** The resources related to this resource. */
			resources?: components["schemas"]["ServiceResponseResources"] | null;
			/**
			 * The unique resource id.
			 * Format: uuid
			 */
			id: string;
			/**
			 * Permission Denied
			 * @default false
			 */
			permission_denied: boolean;
			/** The name of the service. */
			name: string;
		};
		/**
		 * ServiceResponseBody
		 * @description Response body for services.
		 */
		ServiceResponseBody: {
			/**
			 * The timestamp when this component was created.
			 * Format: date-time
			 */
			created: string;
			/**
			 * The timestamp when this component was last updated.
			 * Format: date-time
			 */
			updated: string;
			/** The user who created this resource. */
			user?: components["schemas"]["UserResponse"] | null;
			/** The type of the service. */
			service_type: components["schemas"]["ServiceType"];
			/** The service labels. */
			labels?: {
				[key: string]: unknown;
			} | null;
			/** The current state of the service. */
			state?: components["schemas"]["ServiceState"] | null;
		};
		/**
		 * ServiceResponseMetadata
		 * @description Response metadata for services.
		 */
		ServiceResponseMetadata: {
			/** The project of this resource. */
			project: components["schemas"]["ProjectResponse"];
			/** The class of the service. */
			service_source: string | null;
			/** The admin state of the service. */
			admin_state: components["schemas"]["ServiceState"] | null;
			/** The service config. */
			config: {
				[key: string]: unknown;
			};
			/** The status of the service. */
			status: {
				[key: string]: unknown;
			} | null;
			/** The service endpoint. */
			endpoint?: {
				[key: string]: unknown;
			} | null;
			/** The service endpoint URL. */
			prediction_url?: string | null;
			/** The service health check URL. */
			health_check_url?: string | null;
		};
		/**
		 * ServiceResponseResources
		 * @description Class for all resource models associated with the service entity.
		 */
		ServiceResponseResources: {
			/** The pipeline run associated with the service. */
			pipeline_run?: components["schemas"]["PipelineRunResponse"] | null;
			/** The model version associated with the service. */
			model_version?: components["schemas"]["ModelVersionResponse"] | null;
		} & {
			[key: string]: unknown;
		};
		/**
		 * ServiceState
		 * @description Possible states for the service and service endpoint.
		 * @enum {string}
		 */
		ServiceState:
			| "inactive"
			| "active"
			| "pending_startup"
			| "pending_shutdown"
			| "error"
			| "scaled_to_zero";
		/**
		 * ServiceType
		 * @description Service type descriptor.
		 *
		 *     Attributes:
		 *         type: service type
		 *         flavor: service flavor
		 *         name: name of the service type
		 *         description: description of the service type
		 *         logo_url: logo of the service type
		 */
		ServiceType: {
			/** Type */
			type: string;
			/** Flavor */
			flavor: string;
			/**
			 * Name
			 * @default
			 */
			name: string;
			/**
			 * Description
			 * @default
			 */
			description: string;
			/**
			 * Logo Url
			 * @default
			 */
			logo_url: string;
		};
		/**
		 * ServiceUpdate
		 * @description Update model for stack components.
		 */
		ServiceUpdate: {
			/** The name of the service. */
			name?: string | null;
			/**
			 * The admin state of the service.
			 * @description The administrative state of the service, e.g., ACTIVE, INACTIVE.
			 */
			admin_state?: components["schemas"]["ServiceState"] | null;
			/**
			 * The class of the service.
			 * @description The fully qualified class name of the service implementation.
			 */
			service_source?: string | null;
			/** The status of the service. */
			status?: {
				[key: string]: unknown;
			} | null;
			/** The service endpoint. */
			endpoint?: {
				[key: string]: unknown;
			} | null;
			/** The service endpoint URL. */
			prediction_url?: string | null;
			/** The service health check URL. */
			health_check_url?: string | null;
			/** The service labels. */
			labels?: {
				[key: string]: unknown;
			} | null;
			/** The model version id linked to the service. */
			model_version_id?: string | null;
		};
		/**
		 * Source
		 * @description Source specification.
		 *
		 *     A source specifies a module name as well as an optional attribute of that
		 *     module. These values can be used to import the module and get the value
		 *     of the attribute inside the module.
		 *
		 *     Example:
		 *         The source `Source(module="zenml.config.source", attribute="Source")`
		 *         references the class that this docstring is describing. This class is
		 *         defined in the `zenml.config.source` module and the name of the
		 *         attribute is the class name `Source`.
		 *
		 *     Attributes:
		 *         module: The module name.
		 *         attribute: Optional name of the attribute inside the module.
		 *         type: The type of the source.
		 */
		Source: {
			/** Module */
			module: string;
			/** Attribute */
			attribute?: string | null;
			type: components["schemas"]["SourceType"];
		} & {
			[key: string]: unknown;
		};
		/**
		 * SourceType
		 * @description Enum representing different types of sources.
		 * @enum {string}
		 */
		SourceType:
			| "user"
			| "builtin"
			| "internal"
			| "distribution_package"
			| "code_repository"
			| "notebook"
			| "unknown";
		/**
		 * StackComponentType
		 * @description All possible types a `StackComponent` can have.
		 * @enum {string}
		 */
		StackComponentType:
			| "alerter"
			| "annotator"
			| "artifact_store"
			| "container_registry"
			| "data_validator"
			| "experiment_tracker"
			| "feature_store"
			| "image_builder"
			| "model_deployer"
			| "orchestrator"
			| "step_operator"
			| "model_registry";
		/**
		 * StackDeploymentConfig
		 * @description Configuration about a stack deployment.
		 */
		StackDeploymentConfig: {
			/** The cloud provider console URL where the stack will be deployed. */
			deployment_url: string;
			/** A textual description for the cloud provider console URL. */
			deployment_url_text: string;
			/** Configuration for the stack deployment that the user must manually configure into the cloud provider console. */
			configuration?: string | null;
			/** Instructions for deploying the stack. */
			instructions?: string | null;
		};
		/**
		 * StackDeploymentInfo
		 * @description Information about a stack deployment.
		 */
		StackDeploymentInfo: {
			/** The provider of the stack deployment. */
			provider: components["schemas"]["StackDeploymentProvider"];
			/**
			 * The description of the stack deployment.
			 * @description The description of the stack deployment.
			 */
			description: string;
			/**
			 * The instructions for deploying the stack.
			 * @description The instructions for deploying the stack.
			 */
			instructions: string;
			/**
			 * The instructions for post-deployment.
			 * @description The instructions for post-deployment.
			 */
			post_deploy_instructions: string;
			/**
			 * ZenML integrations required for the stack.
			 * @description The list of ZenML integrations that need to be installed for the stack to be usable.
			 */
			integrations: string[];
			/**
			 * The permissions granted to ZenML to access the cloud resources.
			 * @description The permissions granted to ZenML to access the cloud resources, as a dictionary grouping permissions by resource.
			 */
			permissions: {
				[key: string]: unknown;
			};
			/**
			 * The locations where the stack can be deployed.
			 * @description The locations where the stack can be deployed, as a dictionary mapping location names to descriptions.
			 */
			locations: {
				[key: string]: unknown;
			};
			/**
			 * The locations where the Skypilot clusters can be deployed by default.
			 * @description The locations where the Skypilot clusters can be deployed by default, as a dictionary mapping location names to descriptions.
			 */
			skypilot_default_regions: {
				[key: string]: unknown;
			};
		};
		/**
		 * StackDeploymentProvider
		 * @description All possible stack deployment providers.
		 * @enum {string}
		 */
		StackDeploymentProvider: "aws" | "gcp" | "azure";
		/**
		 * StackRequest
		 * @description Request model for stack creation.
		 */
		StackRequest: {
			/** The id of the user that created this resource. Set automatically by the server. */
			user?: string | null;
			/** The name of the stack. */
			name: string;
			/**
			 * The description of the stack
			 * @default
			 */
			description: string;
			/** The path to the stack spec used for mlstacks deployments. */
			stack_spec_path?: string | null;
			/**
			 * The mapping for the components of the full stack registration.
			 * @description The mapping from component types to either UUIDs of existing components or request information for brand new components.
			 */
			components: {
				[key: string]: unknown;
			};
			/** The stack labels. */
			labels?: {
				[key: string]: unknown;
			} | null;
			/**
			 * The service connectors dictionary for the full stack registration.
			 * @description The UUID of an already existing service connector or request information to create a service connector from scratch.
			 * @default []
			 */
			service_connectors: (
				| string
				| components["schemas"]["ServiceConnectorInfo"]
			)[];
		};
		/**
		 * StackResponse
		 * @description Response model for stacks.
		 */
		StackResponse: {
			/** The body of the resource. */
			body?: components["schemas"]["StackResponseBody"] | null;
			/** The metadata related to this resource. */
			metadata?: components["schemas"]["StackResponseMetadata"] | null;
			/** The resources related to this resource. */
			resources?: components["schemas"]["StackResponseResources"] | null;
			/**
			 * The unique resource id.
			 * Format: uuid
			 */
			id: string;
			/**
			 * Permission Denied
			 * @default false
			 */
			permission_denied: boolean;
			/** The name of the stack. */
			name: string;
		};
		/**
		 * StackResponseBody
		 * @description Response body for stacks.
		 */
		StackResponseBody: {
			/**
			 * The timestamp when this resource was created.
			 * Format: date-time
			 */
			created: string;
			/**
			 * The timestamp when this resource was last updated.
			 * Format: date-time
			 */
			updated: string;
			/** The user who created this resource. */
			user?: components["schemas"]["UserResponse"] | null;
		};
		/**
		 * StackResponseMetadata
		 * @description Response metadata for stacks.
		 */
		StackResponseMetadata: {
			/** A mapping of stack component types to the actualinstances of components of this type. */
			components: {
				[key: string]: unknown;
			};
			/**
			 * The description of the stack
			 * @default
			 */
			description: string | null;
			/** The path to the stack spec used for mlstacks deployments. */
			stack_spec_path?: string | null;
			/** The stack labels. */
			labels?: {
				[key: string]: unknown;
			} | null;
		};
		/**
		 * StackResponseResources
		 * @description Response resources for stacks.
		 */
		StackResponseResources: {
			[key: string]: unknown;
		};
		/**
		 * StackUpdate
		 * @description Update model for stacks.
		 */
		StackUpdate: {
			/** The name of the stack. */
			name?: string | null;
			/** The description of the stack */
			description?: string | null;
			/** The path to the stack spec used for mlstacks deployments. */
			stack_spec_path?: string | null;
			/** A mapping of stack component types to the actualinstances of components of this type. */
			components?: {
				[key: string]: unknown;
			} | null;
			/** The stack labels. */
			labels?: {
				[key: string]: unknown;
			} | null;
		};
		/**
		 * Step
		 * @description Class representing a ZenML step.
		 */
		"Step-Input": {
			spec: components["schemas"]["StepSpec-Input"];
			config: components["schemas"]["StepConfiguration-Input"];
		};
		/**
		 * Step
		 * @description Class representing a ZenML step.
		 */
		"Step-Output": {
			spec: components["schemas"]["StepSpec-Output"];
			config: components["schemas"]["StepConfiguration-Output"];
		};
		/**
		 * StepConfiguration
		 * @description Step configuration class.
		 */
		"StepConfiguration-Input": {
			/** Enable Cache */
			enable_cache?: boolean | null;
			/** Enable Artifact Metadata */
			enable_artifact_metadata?: boolean | null;
			/** Enable Artifact Visualization */
			enable_artifact_visualization?: boolean | null;
			/** Enable Step Logs */
			enable_step_logs?: boolean | null;
			/** Step Operator */
			step_operator?: string | null;
			/** Experiment Tracker */
			experiment_tracker?: string | null;
			/**
			 * Parameters
			 * @default {}
			 */
			parameters: {
				[key: string]: unknown;
			};
			/**
			 * Settings
			 * @default {}
			 */
			settings: {
				[key: string]: unknown;
			};
			/**
			 * Extra
			 * @default {}
			 */
			extra: {
				[key: string]: unknown;
			};
			failure_hook_source?: components["schemas"]["Source"] | null;
			success_hook_source?: components["schemas"]["Source"] | null;
			model?: components["schemas"]["Model"] | null;
			retry?: components["schemas"]["StepRetryConfig"] | null;
			/**
			 * Substitutions
			 * @default {}
			 */
			substitutions: {
				[key: string]: unknown;
			};
			/**
			 * Outputs
			 * @default {}
			 */
			outputs: {
				[key: string]: unknown;
			};
			/** Name */
			name: string;
			/**
			 * Caching Parameters
			 * @default {}
			 */
			caching_parameters: {
				[key: string]: unknown;
			};
			/**
			 * External Input Artifacts
			 * @default {}
			 */
			external_input_artifacts: {
				[key: string]: unknown;
			};
			/**
			 * Model Artifacts Or Metadata
			 * @default {}
			 */
			model_artifacts_or_metadata: {
				[key: string]: unknown;
			};
			/**
			 * Client Lazy Loaders
			 * @default {}
			 */
			client_lazy_loaders: {
				[key: string]: unknown;
			};
		};
		/**
		 * StepConfiguration
		 * @description Step configuration class.
		 */
		"StepConfiguration-Output": {
			/** Enable Cache */
			enable_cache?: boolean | null;
			/** Enable Artifact Metadata */
			enable_artifact_metadata?: boolean | null;
			/** Enable Artifact Visualization */
			enable_artifact_visualization?: boolean | null;
			/** Enable Step Logs */
			enable_step_logs?: boolean | null;
			/** Step Operator */
			step_operator?: string | null;
			/** Experiment Tracker */
			experiment_tracker?: string | null;
			/**
			 * Parameters
			 * @default {}
			 */
			parameters: {
				[key: string]: unknown;
			};
			/**
			 * Settings
			 * @default {}
			 */
			settings: {
				[key: string]: unknown;
			};
			/**
			 * Extra
			 * @default {}
			 */
			extra: {
				[key: string]: unknown;
			};
			failure_hook_source?: components["schemas"]["Source"] | null;
			success_hook_source?: components["schemas"]["Source"] | null;
			model?: components["schemas"]["Model"] | null;
			retry?: components["schemas"]["StepRetryConfig"] | null;
			/**
			 * Substitutions
			 * @default {}
			 */
			substitutions: {
				[key: string]: unknown;
			};
			/**
			 * Outputs
			 * @default {}
			 */
			outputs: {
				[key: string]: unknown;
			};
			/** Name */
			name: string;
			/**
			 * Caching Parameters
			 * @default {}
			 */
			caching_parameters: {
				[key: string]: unknown;
			};
			/**
			 * External Input Artifacts
			 * @default {}
			 */
			external_input_artifacts: {
				[key: string]: unknown;
			};
			/**
			 * Model Artifacts Or Metadata
			 * @default {}
			 */
			model_artifacts_or_metadata: {
				[key: string]: unknown;
			};
			/**
			 * Client Lazy Loaders
			 * @default {}
			 */
			client_lazy_loaders: {
				[key: string]: unknown;
			};
		};
		/**
		 * StepRetryConfig
		 * @description Retry configuration for a step.
		 *
		 *     Delay is an integer (specified in seconds).
		 */
		StepRetryConfig: {
			/**
			 * Max Retries
			 * @default 1
			 */
			max_retries: number;
			/**
			 * Delay
			 * @default 0
			 */
			delay: number;
			/**
			 * Backoff
			 * @default 0
			 */
			backoff: number;
		};
		/**
		 * StepRunInputArtifactType
		 * @description All possible types of a step run input artifact.
		 * @enum {string}
		 */
		StepRunInputArtifactType: "step_output" | "manual" | "external" | "lazy";
		/**
		 * StepRunInputResponse
		 * @description Response model for step run inputs.
		 */
		StepRunInputResponse: {
			/** The body of the resource. */
			body?: components["schemas"]["ArtifactVersionResponseBody"] | null;
			/** The metadata related to this resource. */
			metadata?:
				| components["schemas"]["ArtifactVersionResponseMetadata"]
				| null;
			/** The resources related to this resource. */
			resources?:
				| components["schemas"]["ArtifactVersionResponseResources"]
				| null;
			/**
			 * The unique resource id.
			 * Format: uuid
			 */
			id: string;
			/**
			 * Permission Denied
			 * @default false
			 */
			permission_denied: boolean;
			input_type: components["schemas"]["StepRunInputArtifactType"];
		};
		/**
		 * StepRunRequest
		 * @description Request model for step runs.
		 */
		StepRunRequest: {
			/** The id of the user that created this resource. Set automatically by the server. */
			user?: string | null;
			/**
			 * The project to which this resource belongs.
			 * Format: uuid
			 */
			project: string;
			/** The name of the pipeline run step. */
			name: string;
			/** The start time of the step run. */
			start_time?: string | null;
			/** The end time of the step run. */
			end_time?: string | null;
			/** The status of the step. */
			status: components["schemas"]["ExecutionStatus"];
			/** The cache key of the step run. */
			cache_key?: string | null;
			/** The code hash of the step run. */
			code_hash?: string | null;
			/** The docstring of the step function or class. */
			docstring?: string | null;
			/** The source code of the step function or class. */
			source_code?: string | null;
			/**
			 * The ID of the pipeline run that this step run belongs to.
			 * Format: uuid
			 */
			pipeline_run_id: string;
			/** The ID of the original step run if this step was cached. */
			original_step_run_id?: string | null;
			/** The IDs of the parent steps of this step run. */
			parent_step_ids?: string[];
			/** The IDs of the input artifact versions of the step run. */
			inputs?: {
				[key: string]: unknown;
			};
			/** The IDs of the output artifact versions of the step run. */
			outputs?: {
				[key: string]: unknown;
			};
			/** Logs associated with this step run. */
			logs?: components["schemas"]["LogsRequest"] | null;
		};
		/**
		 * StepRunResponse
		 * @description Response model for step runs.
		 */
		StepRunResponse: {
			/** The body of the resource. */
			body?: components["schemas"]["StepRunResponseBody"] | null;
			/** The metadata related to this resource. */
			metadata?: components["schemas"]["StepRunResponseMetadata"] | null;
			/** The resources related to this resource. */
			resources?: components["schemas"]["StepRunResponseResources"] | null;
			/**
			 * The unique resource id.
			 * Format: uuid
			 */
			id: string;
			/**
			 * Permission Denied
			 * @default false
			 */
			permission_denied: boolean;
			/** The name of the pipeline run step. */
			name: string;
		};
		/**
		 * StepRunResponseBody
		 * @description Response body for step runs.
		 */
		StepRunResponseBody: {
			/**
			 * The timestamp when this resource was created.
			 * Format: date-time
			 */
			created: string;
			/**
			 * The timestamp when this resource was last updated.
			 * Format: date-time
			 */
			updated: string;
			/** The user who created this resource. */
			user?: components["schemas"]["UserResponse"] | null;
			/** The status of the step. */
			status: components["schemas"]["ExecutionStatus"];
			/** The start time of the step run. */
			start_time?: string | null;
			/** The end time of the step run. */
			end_time?: string | null;
			/** The input artifact versions of the step run. */
			inputs?: {
				[key: string]: unknown;
			};
			/** The output artifact versions of the step run. */
			outputs?: {
				[key: string]: unknown;
			};
			/** The ID of the model version that was configured by this step run explicitly. */
			model_version_id?: string | null;
		};
		/**
		 * StepRunResponseMetadata
		 * @description Response metadata for step runs.
		 */
		StepRunResponseMetadata: {
			/** The project of this resource. */
			project: components["schemas"]["ProjectResponse"];
			/** The configuration of the step. */
			config: components["schemas"]["StepConfiguration-Output"];
			/** The spec of the step. */
			spec: components["schemas"]["StepSpec-Output"];
			/** The cache key of the step run. */
			cache_key?: string | null;
			/** The code hash of the step run. */
			code_hash?: string | null;
			/** The docstring of the step function or class. */
			docstring?: string | null;
			/** The source code of the step function or class. */
			source_code?: string | null;
			/** Logs associated with this step run. */
			logs?: components["schemas"]["LogsResponse"] | null;
			/**
			 * The deployment associated with the step run.
			 * Format: uuid
			 */
			deployment_id: string;
			/**
			 * The ID of the pipeline run that this step run belongs to.
			 * Format: uuid
			 */
			pipeline_run_id: string;
			/** The ID of the original step run if this step was cached. */
			original_step_run_id?: string | null;
			/** The IDs of the parent steps of this step run. */
			parent_step_ids?: string[];
			/**
			 * Metadata associated with this step run.
			 * @default {}
			 */
			run_metadata: {
				[key: string]: unknown;
			};
		};
		/**
		 * StepRunResponseResources
		 * @description Class for all resource models associated with the step run entity.
		 */
		StepRunResponseResources: {
			model_version?: components["schemas"]["ModelVersionResponse"] | null;
		} & {
			[key: string]: unknown;
		};
		/**
		 * StepRunUpdate
		 * @description Update model for step runs.
		 */
		StepRunUpdate: {
			/**
			 * The IDs of the output artifact versions of the step run.
			 * @default {}
			 */
			outputs: {
				[key: string]: unknown;
			};
			/**
			 * The IDs of artifact versions that were loaded by this step run.
			 * @default {}
			 */
			loaded_artifact_versions: {
				[key: string]: unknown;
			};
			/** The status of the step. */
			status?: components["schemas"]["ExecutionStatus"] | null;
			/** The end time of the step run. */
			end_time?: string | null;
		};
		/**
		 * StepSpec
		 * @description Specification of a pipeline.
		 */
		"StepSpec-Input": {
			source: components["schemas"]["Source"];
			/** Upstream Steps */
			upstream_steps: string[];
			/**
			 * Inputs
			 * @default {}
			 */
			inputs: {
				[key: string]: unknown;
			};
			/**
			 * Pipeline Parameter Name
			 * @default
			 */
			pipeline_parameter_name: string;
		};
		/**
		 * StepSpec
		 * @description Specification of a pipeline.
		 */
		"StepSpec-Output": {
			source: components["schemas"]["Source"];
			/** Upstream Steps */
			upstream_steps: string[];
			/**
			 * Inputs
			 * @default {}
			 */
			inputs: {
				[key: string]: unknown;
			};
			/**
			 * Pipeline Parameter Name
			 * @default
			 */
			pipeline_parameter_name: string;
		};
		/**
		 * Tag
		 * @description A model representing a tag.
		 */
		Tag: {
			/** Name */
			name: string;
			color?: components["schemas"]["ColorVariants"] | null;
			/** Exclusive */
			exclusive?: boolean | null;
			/** Cascade */
			cascade?: boolean | null;
		};
		/**
		 * TagRequest
		 * @description Request model for tags.
		 */
		TagRequest: {
			/** The id of the user that created this resource. Set automatically by the server. */
			user?: string | null;
			/**
			 * Name
			 * @description The unique title of the tag.
			 */
			name: string;
			/**
			 * Exclusive
			 * @description The flag signifying whether the tag is an exclusive tag.
			 * @default false
			 */
			exclusive: boolean;
			/** @description The color variant assigned to the tag. */
			color?: components["schemas"]["ColorVariants"];
		};
		/**
		 * TagResourceRequest
		 * @description Request model for links between tags and resources.
		 */
		TagResourceRequest: {
			/**
			 * Tag Id
			 * Format: uuid
			 */
			tag_id: string;
			/**
			 * Resource Id
			 * Format: uuid
			 */
			resource_id: string;
			resource_type: components["schemas"]["TaggableResourceTypes"];
		};
		/**
		 * TagResourceResponse
		 * @description Response model for the links between tags and resources.
		 */
		TagResourceResponse: {
			/** The body of the resource. */
			body?: components["schemas"]["TagResourceResponseBody"] | null;
			/** The metadata related to this resource. */
			metadata?: components["schemas"]["BaseResponseMetadata"] | null;
			/** The resources related to this resource. */
			resources?: components["schemas"]["TagResourceResponseResources"] | null;
			/**
			 * The unique resource id.
			 * Format: uuid
			 */
			id: string;
			/**
			 * Permission Denied
			 * @default false
			 */
			permission_denied: boolean;
		};
		/**
		 * TagResourceResponseBody
		 * @description Response body for the links between tags and resources.
		 */
		TagResourceResponseBody: {
			/**
			 * The timestamp when this resource was created.
			 * Format: date-time
			 */
			created: string;
			/**
			 * The timestamp when this resource was last updated.
			 * Format: date-time
			 */
			updated: string;
			/**
			 * Tag Id
			 * Format: uuid
			 */
			tag_id: string;
			/**
			 * Resource Id
			 * Format: uuid
			 */
			resource_id: string;
			resource_type: components["schemas"]["TaggableResourceTypes"];
		};
		/**
		 * TagResourceResponseResources
		 * @description Class for all resource models associated with the tag resource entity.
		 */
		TagResourceResponseResources: {
			[key: string]: unknown;
		};
		/**
		 * TagResponse
		 * @description Response model for tags.
		 */
		TagResponse: {
			/** The body of the resource. */
			body?: components["schemas"]["TagResponseBody"] | null;
			/** The metadata related to this resource. */
			metadata?: components["schemas"]["TagResponseMetadata"] | null;
			/** The resources related to this resource. */
			resources?: components["schemas"]["TagResponseResources"] | null;
			/**
			 * The unique resource id.
			 * Format: uuid
			 */
			id: string;
			/**
			 * Permission Denied
			 * @default false
			 */
			permission_denied: boolean;
			/**
			 * Name
			 * @description The unique title of the tag.
			 */
			name: string;
		};
		/**
		 * TagResponseBody
		 * @description Response body for tags.
		 */
		TagResponseBody: {
			/**
			 * The timestamp when this resource was created.
			 * Format: date-time
			 */
			created: string;
			/**
			 * The timestamp when this resource was last updated.
			 * Format: date-time
			 */
			updated: string;
			/** The user who created this resource. */
			user?: components["schemas"]["UserResponse"] | null;
			/** @description The color variant assigned to the tag. */
			color?: components["schemas"]["ColorVariants"];
			/**
			 * Exclusive
			 * @description The flag signifying whether the tag is an exclusive tag.
			 */
			exclusive: boolean;
			/**
			 * Tagged Count
			 * @description The count of resources tagged with this tag.
			 */
			tagged_count: number;
		};
		/**
		 * TagResponseMetadata
		 * @description Response metadata for tags.
		 */
		TagResponseMetadata: Record<string, never>;
		/**
		 * TagResponseResources
		 * @description Class for all resource models associated with the tag entity.
		 */
		TagResponseResources: {
			[key: string]: unknown;
		};
		/**
		 * TagUpdate
		 * @description Update model for tags.
		 */
		TagUpdate: {
			/** Name */
			name?: string | null;
			/** Exclusive */
			exclusive?: boolean | null;
			color?: components["schemas"]["ColorVariants"] | null;
		};
		/**
		 * TaggableResourceTypes
		 * @description All possible resource types for tagging.
		 * @enum {string}
		 */
		TaggableResourceTypes:
			| "artifact"
			| "artifact_version"
			| "model"
			| "model_version"
			| "pipeline"
			| "pipeline_run"
			| "run_template";
		/**
		 * TriggerExecutionResponse
		 * @description Response model for trigger executions.
		 */
		TriggerExecutionResponse: {
			/** The body of the resource. */
			body?: components["schemas"]["TriggerExecutionResponseBody"] | null;
			/** The metadata related to this resource. */
			metadata?:
				| components["schemas"]["TriggerExecutionResponseMetadata"]
				| null;
			/** The resources related to this resource. */
			resources?:
				| components["schemas"]["TriggerExecutionResponseResources"]
				| null;
			/**
			 * The unique resource id.
			 * Format: uuid
			 */
			id: string;
			/**
			 * Permission Denied
			 * @default false
			 */
			permission_denied: boolean;
		};
		/**
		 * TriggerExecutionResponseBody
		 * @description Response body for trigger executions.
		 */
		TriggerExecutionResponseBody: {
			/**
			 * The timestamp when this resource was created.
			 * Format: date-time
			 */
			created: string;
			/**
			 * The timestamp when this resource was last updated.
			 * Format: date-time
			 */
			updated: string;
		};
		/**
		 * TriggerExecutionResponseMetadata
		 * @description Response metadata for trigger executions.
		 */
		TriggerExecutionResponseMetadata: {
			/**
			 * Event Metadata
			 * @default {}
			 */
			event_metadata: {
				[key: string]: unknown;
			};
		};
		/**
		 * TriggerExecutionResponseResources
		 * @description Class for all resource models associated with the trigger entity.
		 */
		TriggerExecutionResponseResources: {
			/** The event source that activates this trigger. */
			trigger: components["schemas"]["TriggerResponse"];
		} & {
			[key: string]: unknown;
		};
		/**
		 * TriggerRequest
		 * @description Model for creating a new trigger.
		 */
		TriggerRequest: {
			/** The id of the user that created this resource. Set automatically by the server. */
			user?: string | null;
			/**
			 * The project to which this resource belongs.
			 * Format: uuid
			 */
			project: string;
			/** The name of the trigger. */
			name: string;
			/**
			 * The description of the trigger
			 * @default
			 */
			description: string;
			/**
			 * The action that is executed by this trigger.
			 * Format: uuid
			 */
			action_id: string;
			/** The schedule for the trigger. Either a schedule or an event source is required. */
			schedule?: components["schemas"]["Schedule"] | null;
			/** The event source that activates this trigger. Either a schedule or an event source is required. */
			event_source_id?: string | null;
			/** Filter applied to events that activate this trigger. Only set if the trigger is activated by an event source. */
			event_filter?: {
				[key: string]: unknown;
			} | null;
		};
		/**
		 * TriggerResponse
		 * @description Response model for models.
		 */
		TriggerResponse: {
			/** The body of the resource. */
			body?: components["schemas"]["TriggerResponseBody"] | null;
			/** The metadata related to this resource. */
			metadata?: components["schemas"]["TriggerResponseMetadata"] | null;
			/** The resources related to this resource. */
			resources?: components["schemas"]["TriggerResponseResources"] | null;
			/**
			 * The unique resource id.
			 * Format: uuid
			 */
			id: string;
			/**
			 * Permission Denied
			 * @default false
			 */
			permission_denied: boolean;
			/** The name of the trigger */
			name: string;
		};
		/**
		 * TriggerResponseBody
		 * @description Response body for triggers.
		 */
		TriggerResponseBody: {
			/**
			 * The timestamp when this resource was created.
			 * Format: date-time
			 */
			created: string;
			/**
			 * The timestamp when this resource was last updated.
			 * Format: date-time
			 */
			updated: string;
			/** The user who created this resource. */
			user?: components["schemas"]["UserResponse"] | null;
			/** The flavor of the action that is executed by this trigger. */
			action_flavor: string;
			/** The subtype of the action that is executed by this trigger. */
			action_subtype: string;
			/** The flavor of the event source that activates this trigger. Not set if the trigger is activated by a schedule. */
			event_source_flavor?: string | null;
			/** The subtype of the event source that activates this trigger. Not set if the trigger is activated by a schedule. */
			event_source_subtype?: string | null;
			/** Whether the trigger is active. */
			is_active: boolean;
		};
		/**
		 * TriggerResponseMetadata
		 * @description Response metadata for triggers.
		 */
		TriggerResponseMetadata: {
			/** The project of this resource. */
			project: components["schemas"]["ProjectResponse"];
			/**
			 * The description of the trigger.
			 * @default
			 */
			description: string;
			/** The event that activates this trigger. Not set if the trigger is activated by a schedule. */
			event_filter?: {
				[key: string]: unknown;
			} | null;
			/** The schedule that activates this trigger. Not set if the trigger is activated by an event source. */
			schedule?: components["schemas"]["Schedule"] | null;
		};
		/**
		 * TriggerResponseResources
		 * @description Class for all resource models associated with the trigger entity.
		 */
		TriggerResponseResources: {
			/** The action that is executed by this trigger. */
			action: components["schemas"]["ActionResponse"];
			/** The event source that activates this trigger. Not set if the trigger is activated by a schedule. */
			event_source?: components["schemas"]["EventSourceResponse"] | null;
			/** The executions of this trigger. */
			executions: components["schemas"]["Page_TriggerExecutionResponse_"];
		} & {
			[key: string]: unknown;
		};
		/**
		 * TriggerUpdate
		 * @description Update model for triggers.
		 */
		TriggerUpdate: {
			/** The new name for the trigger. */
			name?: string | null;
			/** The new description for the trigger. */
			description?: string | null;
			/** New filter applied to events that activate this trigger. Only valid if the trigger is already configured to be activated by an event source. */
			event_filter?: {
				[key: string]: unknown;
			} | null;
			/** The updated schedule for the trigger. Only valid if the trigger is already configured to be activated by a schedule. */
			schedule?: components["schemas"]["Schedule"] | null;
			/** The new status of the trigger. */
			is_active?: boolean | null;
		};
		/**
		 * UserRequest
		 * @description Request model for users.
		 */
		UserRequest: {
			/** The email address associated with the account. */
			email?: string | null;
			/**
			 * Whether the user agreed to share their email. Only relevant for user accounts
			 * @description `null` if not answered, `true` if agreed, `false` if skipped.
			 */
			email_opted_in?: boolean | null;
			/** A password for the user. */
			password?: string | null;
			/** Activation Token */
			activation_token?: string | null;
			/** The external user ID associated with the account. */
			external_user_id?: string | null;
			/** The metadata associated with the user. */
			user_metadata?: {
				[key: string]: unknown;
			} | null;
			/** The unique username for the account. */
			name: string;
			/**
			 * The full name for the account owner. Only relevant for user accounts.
			 * @default
			 */
			full_name: string;
			/** Whether the account is an administrator. */
			is_admin: boolean;
			/**
			 * Whether the account is active.
			 * @default false
			 */
			active: boolean;
		};
		/**
		 * UserResponse
		 * @description Response model for user and service accounts.
		 *
		 *     This returns the activation_token that is required for the
		 *     user-invitation-flow of the frontend. The email is returned optionally as
		 *     well for use by the analytics on the client-side.
		 */
		UserResponse: {
			/** The body of the resource. */
			body?: components["schemas"]["UserResponseBody"] | null;
			/** The metadata related to this resource. */
			metadata?: components["schemas"]["UserResponseMetadata"] | null;
			/** The resources related to this resource. */
			resources?: components["schemas"]["UserResponseResources"] | null;
			/**
			 * The unique resource id.
			 * Format: uuid
			 */
			id: string;
			/**
			 * Permission Denied
			 * @default false
			 */
			permission_denied: boolean;
			/** The unique username for the account. */
			name: string;
		};
		/**
		 * UserResponseBody
		 * @description Response body for users.
		 */
		UserResponseBody: {
			/**
			 * The timestamp when this resource was created.
			 * Format: date-time
			 */
			created: string;
			/**
			 * The timestamp when this resource was last updated.
			 * Format: date-time
			 */
			updated: string;
			/**
			 * Whether the account is active.
			 * @default false
			 */
			active: boolean;
			/** The activation token for the user. Only relevant for user accounts. */
			activation_token?: string | null;
			/**
			 * The full name for the account owner. Only relevant for user accounts.
			 * @default
			 */
			full_name: string;
			/**
			 * Whether the user agreed to share their email. Only relevant for user accounts
			 * @description `null` if not answered, `true` if agreed, `false` if skipped.
			 */
			email_opted_in?: boolean | null;
			/** Indicates whether this is a service account or a user account. */
			is_service_account: boolean;
			/** Whether the account is an administrator. */
			is_admin: boolean;
			/** The default project ID for the user. */
			default_project_id?: string | null;
		};
		/**
		 * UserResponseMetadata
		 * @description Response metadata for users.
		 */
		UserResponseMetadata: {
			/**
			 * The email address associated with the account. Only relevant for user accounts.
			 * @default
			 */
			email: string | null;
			/** The external user ID associated with the account. Only relevant for user accounts. */
			external_user_id?: string | null;
			/**
			 * The metadata associated with the user.
			 * @default {}
			 */
			user_metadata: {
				[key: string]: unknown;
			};
		};
		/**
		 * UserResponseResources
		 * @description Class for all resource models associated with the user entity.
		 */
		UserResponseResources: {
			[key: string]: unknown;
		};
		/**
		 * UserUpdate
		 * @description Update model for users.
		 */
		UserUpdate: {
			/** The email address associated with the account. */
			email?: string | null;
			/**
			 * Whether the user agreed to share their email. Only relevant for user accounts
			 * @description `null` if not answered, `true` if agreed, `false` if skipped.
			 */
			email_opted_in?: boolean | null;
			/** A password for the user. */
			password?: string | null;
			/** Activation Token */
			activation_token?: string | null;
			/** The external user ID associated with the account. */
			external_user_id?: string | null;
			/** The metadata associated with the user. */
			user_metadata?: {
				[key: string]: unknown;
			} | null;
			/** The unique username for the account. */
			name?: string | null;
			/** The full name for the account owner. Only relevant for user accounts. */
			full_name?: string | null;
			/** Whether the account is an administrator. */
			is_admin?: boolean | null;
			/** Whether the account is active. */
			active?: boolean | null;
			/** The previous password for the user. Only relevant for user accounts. Required when updating the password. */
			old_password?: string | null;
			/** The default project ID for the user. */
			default_project_id?: string | null;
		};
		/** ValidationError */
		ValidationError: {
			/** Location */
			loc: (string | number)[];
			/** Message */
			msg: string;
			/** Error Type */
			type: string;
		};
		/**
		 * VisualizationType
		 * @description All currently available visualization types.
		 * @enum {string}
		 */
		VisualizationType: "csv" | "html" | "image" | "markdown" | "json";
		/** _CallStep */
		_CallStep: {
			/** Attribute Name */
			attribute_name?: string | null;
			/**
			 * Is Call
			 * @default false
			 */
			is_call: boolean;
			/** Call Args */
			call_args?: unknown[];
			/** Call Kwargs */
			call_kwargs?: {
				[key: string]: unknown;
			};
			/** Selector */
			selector?: unknown | null;
		};
	};
	responses: never;
	parameters: never;
	requestBodies: never;
	headers: never;
	pathItems: never;
};
export type $defs = Record<string, never>;
export interface operations {
	health_health_get: {
		parameters: {
			query?: never;
			header?: never;
			path?: never;
			cookie?: never;
		};
		requestBody?: never;
		responses: {
			/** @description Successful Response */
			200: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": string;
				};
			};
		};
	};
	list_actions_api_v1_actions_get: {
		parameters: {
			query?: {
				hydrate?: boolean;
				sort_by?: string;
				logical_operator?: components["schemas"]["LogicalOperators"];
				page?: number;
				size?: number;
				id?: string | null;
				created?: string | null;
				updated?: string | null;
				scope_user?: string | null;
				user?: string | null;
				project?: string | null;
				name?: string | null;
				flavor?: string | null;
				plugin_subtype?: string | null;
			};
			header?: never;
			path?: never;
			cookie?: never;
		};
		requestBody?: never;
		responses: {
			/** @description Successful Response */
			200: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["Page_ActionResponse_"];
				};
			};
			/** @description Unauthorized */
			401: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Forbidden */
			403: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Not Found */
			404: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Unprocessable Entity */
			422: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
		};
	};
	create_action_api_v1_actions_post: {
		parameters: {
			query?: never;
			header?: never;
			path?: never;
			cookie?: never;
		};
		requestBody: {
			content: {
				"application/json": components["schemas"]["ActionRequest"];
			};
		};
		responses: {
			/** @description Successful Response */
			200: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ActionResponse"];
				};
			};
			/** @description Unauthorized */
			401: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Forbidden */
			403: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Conflict */
			409: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Unprocessable Entity */
			422: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
		};
	};
	get_action_api_v1_actions__action_id__get: {
		parameters: {
			query?: {
				hydrate?: boolean;
			};
			header?: never;
			path: {
				action_id: string;
			};
			cookie?: never;
		};
		requestBody?: never;
		responses: {
			/** @description Successful Response */
			200: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ActionResponse"];
				};
			};
			/** @description Unauthorized */
			401: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Forbidden */
			403: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Not Found */
			404: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Unprocessable Entity */
			422: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
		};
	};
	update_action_api_v1_actions__action_id__put: {
		parameters: {
			query?: never;
			header?: never;
			path: {
				action_id: string;
			};
			cookie?: never;
		};
		requestBody: {
			content: {
				"application/json": components["schemas"]["ActionUpdate"];
			};
		};
		responses: {
			/** @description Successful Response */
			200: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ActionResponse"];
				};
			};
			/** @description Unauthorized */
			401: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Forbidden */
			403: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Not Found */
			404: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Unprocessable Entity */
			422: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
		};
	};
	delete_action_api_v1_actions__action_id__delete: {
		parameters: {
			query?: {
				force?: boolean;
			};
			header?: never;
			path: {
				action_id: string;
			};
			cookie?: never;
		};
		requestBody?: never;
		responses: {
			/** @description Successful Response */
			200: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": unknown;
				};
			};
			/** @description Unauthorized */
			401: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Forbidden */
			403: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Not Found */
			404: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Unprocessable Entity */
			422: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
		};
	};
	list_artifacts_api_v1_artifacts_get: {
		parameters: {
			query?: {
				hydrate?: boolean;
				sort_by?: string;
				logical_operator?: components["schemas"]["LogicalOperators"];
				page?: number;
				size?: number;
				id?: string | null;
				created?: string | null;
				updated?: string | null;
				tag?: string | null;
				tags?: string[] | null;
				scope_user?: string | null;
				user?: string | null;
				project?: string | null;
				name?: string | null;
				has_custom_name?: boolean | null;
			};
			header?: never;
			path?: never;
			cookie?: never;
		};
		requestBody?: never;
		responses: {
			/** @description Successful Response */
			200: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["Page_ArtifactResponse_"];
				};
			};
			/** @description Unauthorized */
			401: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Forbidden */
			403: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Not Found */
			404: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Unprocessable Entity */
			422: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
		};
	};
	create_artifact_api_v1_artifacts_post: {
		parameters: {
			query?: never;
			header?: never;
			path?: never;
			cookie?: never;
		};
		requestBody: {
			content: {
				"application/json": components["schemas"]["ArtifactRequest"];
			};
		};
		responses: {
			/** @description Successful Response */
			200: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ArtifactResponse"];
				};
			};
			/** @description Unauthorized */
			401: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Forbidden */
			403: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Conflict */
			409: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Unprocessable Entity */
			422: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
		};
	};
	get_artifact_api_v1_artifacts__artifact_id__get: {
		parameters: {
			query?: {
				hydrate?: boolean;
			};
			header?: never;
			path: {
				artifact_id: string;
			};
			cookie?: never;
		};
		requestBody?: never;
		responses: {
			/** @description Successful Response */
			200: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ArtifactResponse"];
				};
			};
			/** @description Unauthorized */
			401: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Forbidden */
			403: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Not Found */
			404: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Unprocessable Entity */
			422: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
		};
	};
	update_artifact_api_v1_artifacts__artifact_id__put: {
		parameters: {
			query?: never;
			header?: never;
			path: {
				artifact_id: string;
			};
			cookie?: never;
		};
		requestBody: {
			content: {
				"application/json": components["schemas"]["ArtifactUpdate"];
			};
		};
		responses: {
			/** @description Successful Response */
			200: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ArtifactResponse"];
				};
			};
			/** @description Unauthorized */
			401: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Forbidden */
			403: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Not Found */
			404: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Unprocessable Entity */
			422: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
		};
	};
	delete_artifact_api_v1_artifacts__artifact_id__delete: {
		parameters: {
			query?: never;
			header?: never;
			path: {
				artifact_id: string;
			};
			cookie?: never;
		};
		requestBody?: never;
		responses: {
			/** @description Successful Response */
			200: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": unknown;
				};
			};
			/** @description Unauthorized */
			401: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Forbidden */
			403: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Not Found */
			404: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Unprocessable Entity */
			422: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
		};
	};
	list_artifact_versions_api_v1_artifact_versions_get: {
		parameters: {
			query?: {
				hydrate?: boolean;
				sort_by?: string;
				logical_operator?: components["schemas"]["LogicalOperators"];
				page?: number;
				size?: number;
				id?: string | null;
				created?: string | null;
				updated?: string | null;
				run_metadata?: string[] | null;
				tag?: string | null;
				tags?: string[] | null;
				scope_user?: string | null;
				user?: string | null;
				project?: string | null;
				artifact?: string | null;
				artifact_id?: string | null;
				version?: string | null;
				version_number?: number | string | null;
				uri?: string | null;
				materializer?: string | null;
				type?: string | null;
				data_type?: string | null;
				artifact_store_id?: string | null;
				model_version_id?: string | null;
				only_unused?: boolean | null;
				has_custom_name?: boolean | null;
				model?: string | null;
				pipeline_run?: string | null;
			};
			header?: never;
			path?: never;
			cookie?: never;
		};
		requestBody?: never;
		responses: {
			/** @description Successful Response */
			200: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["Page_ArtifactVersionResponse_"];
				};
			};
			/** @description Unauthorized */
			401: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Forbidden */
			403: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Not Found */
			404: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Unprocessable Entity */
			422: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
		};
	};
	create_artifact_version_api_v1_artifact_versions_post: {
		parameters: {
			query?: never;
			header?: never;
			path?: never;
			cookie?: never;
		};
		requestBody: {
			content: {
				"application/json": components["schemas"]["ArtifactVersionRequest"];
			};
		};
		responses: {
			/** @description Successful Response */
			200: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ArtifactVersionResponse"];
				};
			};
			/** @description Unauthorized */
			401: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Forbidden */
			403: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Conflict */
			409: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Unprocessable Entity */
			422: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
		};
	};
	prune_artifact_versions_api_v1_artifact_versions_delete: {
		parameters: {
			query: {
				project_name_or_id: string;
				only_versions?: boolean;
			};
			header?: never;
			path?: never;
			cookie?: never;
		};
		requestBody?: never;
		responses: {
			/** @description Successful Response */
			200: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": unknown;
				};
			};
			/** @description Unauthorized */
			401: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Forbidden */
			403: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Not Found */
			404: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Unprocessable Entity */
			422: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
		};
	};
	batch_create_artifact_version_api_v1_artifact_versions_batch_post: {
		parameters: {
			query?: never;
			header?: never;
			path?: never;
			cookie?: never;
		};
		requestBody: {
			content: {
				"application/json": components["schemas"]["ArtifactVersionRequest"][];
			};
		};
		responses: {
			/** @description Successful Response */
			200: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ArtifactVersionResponse"][];
				};
			};
			/** @description Unauthorized */
			401: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Forbidden */
			403: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Conflict */
			409: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Unprocessable Entity */
			422: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
		};
	};
	get_artifact_version_api_v1_artifact_versions__artifact_version_id__get: {
		parameters: {
			query?: {
				hydrate?: boolean;
			};
			header?: never;
			path: {
				artifact_version_id: string;
			};
			cookie?: never;
		};
		requestBody?: never;
		responses: {
			/** @description Successful Response */
			200: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ArtifactVersionResponse"];
				};
			};
			/** @description Unauthorized */
			401: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Forbidden */
			403: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Not Found */
			404: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Unprocessable Entity */
			422: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
		};
	};
	update_artifact_version_api_v1_artifact_versions__artifact_version_id__put: {
		parameters: {
			query?: never;
			header?: never;
			path: {
				artifact_version_id: string;
			};
			cookie?: never;
		};
		requestBody: {
			content: {
				"application/json": components["schemas"]["ArtifactVersionUpdate"];
			};
		};
		responses: {
			/** @description Successful Response */
			200: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ArtifactVersionResponse"];
				};
			};
			/** @description Unauthorized */
			401: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Forbidden */
			403: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Not Found */
			404: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Unprocessable Entity */
			422: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
		};
	};
	delete_artifact_version_api_v1_artifact_versions__artifact_version_id__delete: {
		parameters: {
			query?: never;
			header?: never;
			path: {
				artifact_version_id: string;
			};
			cookie?: never;
		};
		requestBody?: never;
		responses: {
			/** @description Successful Response */
			200: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": unknown;
				};
			};
			/** @description Unauthorized */
			401: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Forbidden */
			403: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Not Found */
			404: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Unprocessable Entity */
			422: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
		};
	};
	get_artifact_visualization_api_v1_artifact_versions__artifact_version_id__visualize_get: {
		parameters: {
			query?: {
				index?: number;
			};
			header?: never;
			path: {
				artifact_version_id: string;
			};
			cookie?: never;
		};
		requestBody?: never;
		responses: {
			/** @description Successful Response */
			200: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["LoadedVisualization"];
				};
			};
			/** @description Unauthorized */
			401: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Forbidden */
			403: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Not Found */
			404: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Unprocessable Entity */
			422: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
		};
	};
	get_artifact_download_token_api_v1_artifact_versions__artifact_version_id__download_token_get: {
		parameters: {
			query?: never;
			header?: never;
			path: {
				artifact_version_id: string;
			};
			cookie?: never;
		};
		requestBody?: never;
		responses: {
			/** @description Successful Response */
			200: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": string;
				};
			};
			/** @description Unauthorized */
			401: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Forbidden */
			403: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Not Found */
			404: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Unprocessable Entity */
			422: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
		};
	};
	download_artifact_data_api_v1_artifact_versions__artifact_version_id__data_get: {
		parameters: {
			query: {
				token: string;
			};
			header?: never;
			path: {
				artifact_version_id: string;
			};
			cookie?: never;
		};
		requestBody?: never;
		responses: {
			/** @description Successful Response */
			200: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": unknown;
				};
			};
			/** @description Unauthorized */
			401: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Forbidden */
			403: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Not Found */
			404: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Unprocessable Entity */
			422: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
		};
	};
	token_api_v1_login_post: {
		parameters: {
			query?: never;
			header?: never;
			path?: never;
			cookie?: never;
		};
		requestBody?: {
			content: {
				"application/x-www-form-urlencoded": components["schemas"]["Body_token_api_v1_login_post"];
			};
		};
		responses: {
			/** @description Successful Response */
			200: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json":
						| components["schemas"]["OAuthTokenResponse"]
						| components["schemas"]["OAuthRedirectResponse"];
				};
			};
			/** @description Unauthorized */
			401: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Validation Error */
			422: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["HTTPValidationError"];
				};
			};
		};
	};
	logout_api_v1_logout_get: {
		parameters: {
			query?: never;
			header?: never;
			path?: never;
			cookie?: never;
		};
		requestBody?: never;
		responses: {
			/** @description Successful Response */
			200: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": unknown;
				};
			};
			/** @description Unauthorized */
			401: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
		};
	};
	device_authorization_api_v1_device_authorization_post: {
		parameters: {
			query?: never;
			header?: never;
			path?: never;
			cookie?: never;
		};
		requestBody: {
			content: {
				"application/x-www-form-urlencoded": components["schemas"]["Body_device_authorization_api_v1_device_authorization_post"];
			};
		};
		responses: {
			/** @description Successful Response */
			200: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["OAuthDeviceAuthorizationResponse"];
				};
			};
			/** @description Unauthorized */
			401: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Validation Error */
			422: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["HTTPValidationError"];
				};
			};
		};
	};
	api_token_api_v1_api_token_get: {
		parameters: {
			query?: {
				token_type?: components["schemas"]["APITokenType"];
				expires_in?: number | null;
				schedule_id?: string | null;
				pipeline_run_id?: string | null;
			};
			header?: never;
			path?: never;
			cookie?: never;
		};
		requestBody?: never;
		responses: {
			/** @description Successful Response */
			200: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": string;
				};
			};
			/** @description Unauthorized */
			401: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Validation Error */
			422: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["HTTPValidationError"];
				};
			};
		};
	};
	list_authorized_devices_api_v1_devices_get: {
		parameters: {
			query?: {
				hydrate?: boolean;
				sort_by?: string;
				logical_operator?: components["schemas"]["LogicalOperators"];
				page?: number;
				size?: number;
				id?: string | null;
				created?: string | null;
				updated?: string | null;
				scope_user?: string | null;
				user?: string | null;
				expires?: string | null;
				client_id?: string | null;
				status?: components["schemas"]["OAuthDeviceStatus"] | string | null;
				trusted_device?: boolean | string | null;
				failed_auth_attempts?: number | string | null;
				last_login?: string | null;
			};
			header?: never;
			path?: never;
			cookie?: never;
		};
		requestBody?: never;
		responses: {
			/** @description Successful Response */
			200: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["Page_OAuthDeviceResponse_"];
				};
			};
			/** @description Unauthorized */
			401: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Not Found */
			404: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Unprocessable Entity */
			422: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
		};
	};
	get_authorization_device_api_v1_devices__device_id__get: {
		parameters: {
			query?: {
				user_code?: string | null;
				hydrate?: boolean;
			};
			header?: never;
			path: {
				device_id: string;
			};
			cookie?: never;
		};
		requestBody?: never;
		responses: {
			/** @description Successful Response */
			200: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["OAuthDeviceResponse"];
				};
			};
			/** @description Unauthorized */
			401: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Not Found */
			404: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Unprocessable Entity */
			422: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
		};
	};
	update_authorized_device_api_v1_devices__device_id__put: {
		parameters: {
			query?: never;
			header?: never;
			path: {
				device_id: string;
			};
			cookie?: never;
		};
		requestBody: {
			content: {
				"application/json": components["schemas"]["OAuthDeviceUpdate"];
			};
		};
		responses: {
			/** @description Successful Response */
			200: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["OAuthDeviceResponse"];
				};
			};
			/** @description Unauthorized */
			401: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Not Found */
			404: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Unprocessable Entity */
			422: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
		};
	};
	delete_authorized_device_api_v1_devices__device_id__delete: {
		parameters: {
			query?: never;
			header?: never;
			path: {
				device_id: string;
			};
			cookie?: never;
		};
		requestBody?: never;
		responses: {
			/** @description Successful Response */
			200: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": unknown;
				};
			};
			/** @description Unauthorized */
			401: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Not Found */
			404: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Unprocessable Entity */
			422: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
		};
	};
	verify_authorized_device_api_v1_devices__device_id__verify_put: {
		parameters: {
			query?: never;
			header?: never;
			path: {
				device_id: string;
			};
			cookie?: never;
		};
		requestBody: {
			content: {
				"application/json": components["schemas"]["OAuthDeviceVerificationRequest"];
			};
		};
		responses: {
			/** @description Successful Response */
			200: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["OAuthDeviceResponse"];
				};
			};
			/** @description Unauthorized */
			401: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Not Found */
			404: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Unprocessable Entity */
			422: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
		};
	};
	list_code_repositories_api_v1_code_repositories_get: {
		parameters: {
			query?: {
				project_name_or_id?: string | null;
				hydrate?: boolean;
				sort_by?: string;
				logical_operator?: components["schemas"]["LogicalOperators"];
				page?: number;
				size?: number;
				id?: string | null;
				created?: string | null;
				updated?: string | null;
				scope_user?: string | null;
				user?: string | null;
				project?: string | null;
				name?: string | null;
			};
			header?: never;
			path?: never;
			cookie?: never;
		};
		requestBody?: never;
		responses: {
			/** @description Successful Response */
			200: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["Page_CodeRepositoryResponse_"];
				};
			};
			/** @description Unauthorized */
			401: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Forbidden */
			403: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Not Found */
			404: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Unprocessable Entity */
			422: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
		};
	};
	create_code_repository_api_v1_code_repositories_post: {
		parameters: {
			query?: {
				project_name_or_id?: string | null;
			};
			header?: never;
			path?: never;
			cookie?: never;
		};
		requestBody: {
			content: {
				"application/json": components["schemas"]["CodeRepositoryRequest"];
			};
		};
		responses: {
			/** @description Successful Response */
			200: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["CodeRepositoryResponse"];
				};
			};
			/** @description Unauthorized */
			401: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Forbidden */
			403: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Conflict */
			409: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Unprocessable Entity */
			422: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
		};
	};
	get_code_repository_api_v1_code_repositories__code_repository_id__get: {
		parameters: {
			query?: {
				hydrate?: boolean;
			};
			header?: never;
			path: {
				code_repository_id: string;
			};
			cookie?: never;
		};
		requestBody?: never;
		responses: {
			/** @description Successful Response */
			200: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["CodeRepositoryResponse"];
				};
			};
			/** @description Unauthorized */
			401: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Forbidden */
			403: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Not Found */
			404: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Unprocessable Entity */
			422: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
		};
	};
	update_code_repository_api_v1_code_repositories__code_repository_id__put: {
		parameters: {
			query?: never;
			header?: never;
			path: {
				code_repository_id: string;
			};
			cookie?: never;
		};
		requestBody: {
			content: {
				"application/json": components["schemas"]["CodeRepositoryUpdate"];
			};
		};
		responses: {
			/** @description Successful Response */
			200: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["CodeRepositoryResponse"];
				};
			};
			/** @description Unauthorized */
			401: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Forbidden */
			403: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Not Found */
			404: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Unprocessable Entity */
			422: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
		};
	};
	delete_code_repository_api_v1_code_repositories__code_repository_id__delete: {
		parameters: {
			query?: never;
			header?: never;
			path: {
				code_repository_id: string;
			};
			cookie?: never;
		};
		requestBody?: never;
		responses: {
			/** @description Successful Response */
			200: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": unknown;
				};
			};
			/** @description Unauthorized */
			401: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Forbidden */
			403: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Not Found */
			404: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Unprocessable Entity */
			422: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
		};
	};
	list_flavors_api_v1_plugin_flavors_get: {
		parameters: {
			query: {
				type: components["schemas"]["PluginType"];
				subtype: components["schemas"]["PluginSubType"];
				page?: number;
				size?: number;
				hydrate?: boolean;
			};
			header?: never;
			path?: never;
			cookie?: never;
		};
		requestBody?: never;
		responses: {
			/** @description Successful Response */
			200: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["Page_BasePluginFlavorResponse_"];
				};
			};
			/** @description Unauthorized */
			401: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Forbidden */
			403: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Not Found */
			404: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Unprocessable Entity */
			422: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
		};
	};
	get_flavor_api_v1_plugin_flavors__name__get: {
		parameters: {
			query: {
				type: components["schemas"]["PluginType"];
				subtype: components["schemas"]["PluginSubType"];
			};
			header?: never;
			path: {
				name: string;
			};
			cookie?: never;
		};
		requestBody?: never;
		responses: {
			/** @description Successful Response */
			200: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["BasePluginFlavorResponse"];
				};
			};
			/** @description Unauthorized */
			401: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Forbidden */
			403: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Not Found */
			404: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Unprocessable Entity */
			422: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
		};
	};
	list_event_sources_api_v1_event_sources_get: {
		parameters: {
			query?: {
				hydrate?: boolean;
				sort_by?: string;
				logical_operator?: components["schemas"]["LogicalOperators"];
				page?: number;
				size?: number;
				id?: string | null;
				created?: string | null;
				updated?: string | null;
				scope_user?: string | null;
				user?: string | null;
				project?: string | null;
				name?: string | null;
				flavor?: string | null;
				plugin_subtype?: string | null;
			};
			header?: never;
			path?: never;
			cookie?: never;
		};
		requestBody?: never;
		responses: {
			/** @description Successful Response */
			200: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["Page_EventSourceResponse_"];
				};
			};
			/** @description Unauthorized */
			401: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Forbidden */
			403: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Not Found */
			404: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Unprocessable Entity */
			422: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
		};
	};
	create_event_source_api_v1_event_sources_post: {
		parameters: {
			query?: never;
			header?: never;
			path?: never;
			cookie?: never;
		};
		requestBody: {
			content: {
				"application/json": components["schemas"]["EventSourceRequest"];
			};
		};
		responses: {
			/** @description Successful Response */
			200: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["EventSourceResponse"];
				};
			};
			/** @description Unauthorized */
			401: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Forbidden */
			403: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Conflict */
			409: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Unprocessable Entity */
			422: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
		};
	};
	get_event_source_api_v1_event_sources__event_source_id__get: {
		parameters: {
			query?: {
				hydrate?: boolean;
			};
			header?: never;
			path: {
				event_source_id: string;
			};
			cookie?: never;
		};
		requestBody?: never;
		responses: {
			/** @description Successful Response */
			200: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["EventSourceResponse"];
				};
			};
			/** @description Unauthorized */
			401: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Forbidden */
			403: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Not Found */
			404: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Unprocessable Entity */
			422: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
		};
	};
	update_event_source_api_v1_event_sources__event_source_id__put: {
		parameters: {
			query?: never;
			header?: never;
			path: {
				event_source_id: string;
			};
			cookie?: never;
		};
		requestBody: {
			content: {
				"application/json": components["schemas"]["EventSourceUpdate"];
			};
		};
		responses: {
			/** @description Successful Response */
			200: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["EventSourceResponse"];
				};
			};
			/** @description Unauthorized */
			401: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Forbidden */
			403: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Not Found */
			404: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Unprocessable Entity */
			422: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
		};
	};
	delete_event_source_api_v1_event_sources__event_source_id__delete: {
		parameters: {
			query?: {
				force?: boolean;
			};
			header?: never;
			path: {
				event_source_id: string;
			};
			cookie?: never;
		};
		requestBody?: never;
		responses: {
			/** @description Successful Response */
			200: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": unknown;
				};
			};
			/** @description Unauthorized */
			401: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Forbidden */
			403: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Not Found */
			404: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Unprocessable Entity */
			422: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
		};
	};
	list_flavors_api_v1_flavors_get: {
		parameters: {
			query?: {
				hydrate?: boolean;
				sort_by?: string;
				logical_operator?: components["schemas"]["LogicalOperators"];
				page?: number;
				size?: number;
				id?: string | null;
				created?: string | null;
				updated?: string | null;
				scope_user?: string | null;
				user?: string | null;
				name?: string | null;
				type?: string | null;
				integration?: string | null;
			};
			header?: never;
			path?: never;
			cookie?: never;
		};
		requestBody?: never;
		responses: {
			/** @description Successful Response */
			200: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["Page_FlavorResponse_"];
				};
			};
			/** @description Unauthorized */
			401: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Forbidden */
			403: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Not Found */
			404: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Unprocessable Entity */
			422: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
		};
	};
	create_flavor_api_v1_flavors_post: {
		parameters: {
			query?: never;
			header?: never;
			path?: never;
			cookie?: never;
		};
		requestBody: {
			content: {
				"application/json": components["schemas"]["FlavorRequest"];
			};
		};
		responses: {
			/** @description Successful Response */
			200: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["FlavorResponse"];
				};
			};
			/** @description Unauthorized */
			401: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Forbidden */
			403: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Conflict */
			409: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Unprocessable Entity */
			422: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
		};
	};
	get_flavor_api_v1_flavors__flavor_id__get: {
		parameters: {
			query?: {
				hydrate?: boolean;
			};
			header?: never;
			path: {
				flavor_id: string;
			};
			cookie?: never;
		};
		requestBody?: never;
		responses: {
			/** @description Successful Response */
			200: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["FlavorResponse"];
				};
			};
			/** @description Unauthorized */
			401: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Forbidden */
			403: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Not Found */
			404: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Unprocessable Entity */
			422: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
		};
	};
	update_flavor_api_v1_flavors__flavor_id__put: {
		parameters: {
			query?: never;
			header?: never;
			path: {
				flavor_id: string;
			};
			cookie?: never;
		};
		requestBody: {
			content: {
				"application/json": components["schemas"]["FlavorUpdate"];
			};
		};
		responses: {
			/** @description Successful Response */
			200: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["FlavorResponse"];
				};
			};
			/** @description Unauthorized */
			401: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Forbidden */
			403: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Conflict */
			409: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Unprocessable Entity */
			422: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
		};
	};
	delete_flavor_api_v1_flavors__flavor_id__delete: {
		parameters: {
			query?: never;
			header?: never;
			path: {
				flavor_id: string;
			};
			cookie?: never;
		};
		requestBody?: never;
		responses: {
			/** @description Successful Response */
			200: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": unknown;
				};
			};
			/** @description Unauthorized */
			401: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Forbidden */
			403: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Not Found */
			404: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Unprocessable Entity */
			422: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
		};
	};
	sync_flavors_api_v1_flavors_sync_patch: {
		parameters: {
			query?: never;
			header?: never;
			path?: never;
			cookie?: never;
		};
		requestBody?: never;
		responses: {
			/** @description Successful Response */
			200: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": unknown;
				};
			};
			/** @description Unauthorized */
			401: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Forbidden */
			403: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Not Found */
			404: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Unprocessable Entity */
			422: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
		};
	};
	get_logs_api_v1_logs__logs_id__get: {
		parameters: {
			query?: {
				hydrate?: boolean;
			};
			header?: never;
			path: {
				logs_id: string;
			};
			cookie?: never;
		};
		requestBody?: never;
		responses: {
			/** @description Successful Response */
			200: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["LogsResponse"];
				};
			};
			/** @description Unauthorized */
			401: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Forbidden */
			403: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Not Found */
			404: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Unprocessable Entity */
			422: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
		};
	};
	list_models_api_v1_models_get: {
		parameters: {
			query?: {
				hydrate?: boolean;
				sort_by?: string;
				logical_operator?: components["schemas"]["LogicalOperators"];
				page?: number;
				size?: number;
				id?: string | null;
				created?: string | null;
				updated?: string | null;
				tag?: string | null;
				tags?: string[] | null;
				scope_user?: string | null;
				user?: string | null;
				project?: string | null;
				name?: string | null;
			};
			header?: never;
			path?: never;
			cookie?: never;
		};
		requestBody?: never;
		responses: {
			/** @description Successful Response */
			200: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["Page_ModelResponse_"];
				};
			};
			/** @description Unauthorized */
			401: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Forbidden */
			403: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Not Found */
			404: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Unprocessable Entity */
			422: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
		};
	};
	create_model_api_v1_models_post: {
		parameters: {
			query?: {
				project_name_or_id?: string | null;
			};
			header?: never;
			path?: never;
			cookie?: never;
		};
		requestBody: {
			content: {
				"application/json": components["schemas"]["ModelRequest"];
			};
		};
		responses: {
			/** @description Successful Response */
			200: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ModelResponse"];
				};
			};
			/** @description Unauthorized */
			401: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Forbidden */
			403: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Conflict */
			409: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Unprocessable Entity */
			422: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
		};
	};
	get_model_api_v1_models__model_id__get: {
		parameters: {
			query?: {
				hydrate?: boolean;
			};
			header?: never;
			path: {
				model_id: string;
			};
			cookie?: never;
		};
		requestBody?: never;
		responses: {
			/** @description Successful Response */
			200: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ModelResponse"];
				};
			};
			/** @description Unauthorized */
			401: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Forbidden */
			403: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Not Found */
			404: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Unprocessable Entity */
			422: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
		};
	};
	update_model_api_v1_models__model_id__put: {
		parameters: {
			query?: never;
			header?: never;
			path: {
				model_id: string;
			};
			cookie?: never;
		};
		requestBody: {
			content: {
				"application/json": components["schemas"]["ModelUpdate"];
			};
		};
		responses: {
			/** @description Successful Response */
			200: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ModelResponse"];
				};
			};
			/** @description Unauthorized */
			401: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Forbidden */
			403: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Not Found */
			404: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Unprocessable Entity */
			422: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
		};
	};
	delete_model_api_v1_models__model_id__delete: {
		parameters: {
			query?: never;
			header?: never;
			path: {
				model_id: string;
			};
			cookie?: never;
		};
		requestBody?: never;
		responses: {
			/** @description Successful Response */
			200: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": unknown;
				};
			};
			/** @description Unauthorized */
			401: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Forbidden */
			403: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Not Found */
			404: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Unprocessable Entity */
			422: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
		};
	};
	list_model_versions_api_v1_models__model_name_or_id__model_versions_get: {
		parameters: {
			query?: {
				hydrate?: boolean;
				sort_by?: string;
				logical_operator?: components["schemas"]["LogicalOperators"];
				page?: number;
				size?: number;
				id?: string | null;
				created?: string | null;
				updated?: string | null;
				run_metadata?: string[] | null;
				tag?: string | null;
				tags?: string[] | null;
				scope_user?: string | null;
				user?: string | null;
				project?: string | null;
				name?: string | null;
				number?: number | null;
				stage?: string | components["schemas"]["ModelStages"] | null;
				model?: string | null;
			};
			header?: never;
			path: {
				model_name_or_id: string | null;
			};
			cookie?: never;
		};
		requestBody?: never;
		responses: {
			/** @description Successful Response */
			200: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["Page_ModelVersionResponse_"];
				};
			};
			/** @description Unauthorized */
			401: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Forbidden */
			403: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Not Found */
			404: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Unprocessable Entity */
			422: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
		};
	};
	list_model_versions_api_v1_model_versions_get: {
		parameters: {
			query?: {
				model_name_or_id?: string | null;
				hydrate?: boolean;
				sort_by?: string;
				logical_operator?: components["schemas"]["LogicalOperators"];
				page?: number;
				size?: number;
				id?: string | null;
				created?: string | null;
				updated?: string | null;
				run_metadata?: string[] | null;
				tag?: string | null;
				tags?: string[] | null;
				scope_user?: string | null;
				user?: string | null;
				project?: string | null;
				name?: string | null;
				number?: number | null;
				stage?: string | components["schemas"]["ModelStages"] | null;
				model?: string | null;
			};
			header?: never;
			path?: never;
			cookie?: never;
		};
		requestBody?: never;
		responses: {
			/** @description Successful Response */
			200: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["Page_ModelVersionResponse_"];
				};
			};
			/** @description Unauthorized */
			401: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Forbidden */
			403: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Not Found */
			404: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Unprocessable Entity */
			422: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
		};
	};
	create_model_version_api_v1_model_versions_post: {
		parameters: {
			query?: {
				model_id?: string | null;
				project_name_or_id?: string | null;
			};
			header?: never;
			path?: never;
			cookie?: never;
		};
		requestBody: {
			content: {
				"application/json": components["schemas"]["ModelVersionRequest"];
			};
		};
		responses: {
			/** @description Successful Response */
			200: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ModelVersionResponse"];
				};
			};
			/** @description Unauthorized */
			401: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Forbidden */
			403: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Conflict */
			409: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Unprocessable Entity */
			422: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
		};
	};
	get_model_version_api_v1_model_versions__model_version_id__get: {
		parameters: {
			query?: {
				hydrate?: boolean;
			};
			header?: never;
			path: {
				model_version_id: string;
			};
			cookie?: never;
		};
		requestBody?: never;
		responses: {
			/** @description Successful Response */
			200: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ModelVersionResponse"];
				};
			};
			/** @description Unauthorized */
			401: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Forbidden */
			403: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Not Found */
			404: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Unprocessable Entity */
			422: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
		};
	};
	update_model_version_api_v1_model_versions__model_version_id__put: {
		parameters: {
			query?: never;
			header?: never;
			path: {
				model_version_id: string;
			};
			cookie?: never;
		};
		requestBody: {
			content: {
				"application/json": components["schemas"]["ModelVersionUpdate"];
			};
		};
		responses: {
			/** @description Successful Response */
			200: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ModelVersionResponse"];
				};
			};
			/** @description Unauthorized */
			401: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Forbidden */
			403: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Not Found */
			404: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Unprocessable Entity */
			422: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
		};
	};
	delete_model_version_api_v1_model_versions__model_version_id__delete: {
		parameters: {
			query?: never;
			header?: never;
			path: {
				model_version_id: string;
			};
			cookie?: never;
		};
		requestBody?: never;
		responses: {
			/** @description Successful Response */
			200: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": unknown;
				};
			};
			/** @description Unauthorized */
			401: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Forbidden */
			403: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Not Found */
			404: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Unprocessable Entity */
			422: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
		};
	};
	delete_model_version_artifact_link_api_v1_model_versions__model_version_id__artifacts__model_version_artifact_link_name_or_id__delete: {
		parameters: {
			query?: never;
			header?: never;
			path: {
				model_version_id: string;
				model_version_artifact_link_name_or_id: string;
			};
			cookie?: never;
		};
		requestBody?: never;
		responses: {
			/** @description Successful Response */
			200: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": unknown;
				};
			};
			/** @description Unauthorized */
			401: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Forbidden */
			403: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Not Found */
			404: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Unprocessable Entity */
			422: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
		};
	};
	delete_all_model_version_artifact_links_api_v1_model_versions__model_version_id__artifacts_delete: {
		parameters: {
			query?: {
				only_links?: boolean;
			};
			header?: never;
			path: {
				model_version_id: string;
			};
			cookie?: never;
		};
		requestBody?: never;
		responses: {
			/** @description Successful Response */
			200: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": unknown;
				};
			};
			/** @description Unauthorized */
			401: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Forbidden */
			403: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Not Found */
			404: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Unprocessable Entity */
			422: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
		};
	};
	delete_model_version_pipeline_run_link_api_v1_model_versions__model_version_id__runs__model_version_pipeline_run_link_name_or_id__delete: {
		parameters: {
			query?: never;
			header?: never;
			path: {
				model_version_id: string;
				model_version_pipeline_run_link_name_or_id: string;
			};
			cookie?: never;
		};
		requestBody?: never;
		responses: {
			/** @description Successful Response */
			200: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": unknown;
				};
			};
			/** @description Unauthorized */
			401: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Forbidden */
			403: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Not Found */
			404: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Unprocessable Entity */
			422: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
		};
	};
	list_model_version_artifact_links_api_v1_model_version_artifacts_get: {
		parameters: {
			query?: {
				hydrate?: boolean;
				sort_by?: string;
				logical_operator?: components["schemas"]["LogicalOperators"];
				page?: number;
				size?: number;
				id?: string | null;
				created?: string | null;
				updated?: string | null;
				model_version_id?: string | null;
				artifact_version_id?: string | null;
				artifact_name?: string | null;
				only_data_artifacts?: boolean | null;
				only_model_artifacts?: boolean | null;
				only_deployment_artifacts?: boolean | null;
				has_custom_name?: boolean | null;
				user?: string | null;
			};
			header?: never;
			path?: never;
			cookie?: never;
		};
		requestBody?: never;
		responses: {
			/** @description Successful Response */
			200: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["Page_ModelVersionArtifactResponse_"];
				};
			};
			/** @description Unauthorized */
			401: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Not Found */
			404: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Unprocessable Entity */
			422: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
		};
	};
	create_model_version_artifact_link_api_v1_model_version_artifacts_post: {
		parameters: {
			query?: never;
			header?: never;
			path?: never;
			cookie?: never;
		};
		requestBody: {
			content: {
				"application/json": components["schemas"]["ModelVersionArtifactRequest"];
			};
		};
		responses: {
			/** @description Successful Response */
			200: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ModelVersionArtifactResponse"];
				};
			};
			/** @description Unauthorized */
			401: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Conflict */
			409: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Unprocessable Entity */
			422: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
		};
	};
	list_model_version_pipeline_run_links_api_v1_model_version_pipeline_runs_get: {
		parameters: {
			query?: {
				hydrate?: boolean;
				sort_by?: string;
				logical_operator?: components["schemas"]["LogicalOperators"];
				page?: number;
				size?: number;
				id?: string | null;
				created?: string | null;
				updated?: string | null;
				model_version_id?: string | null;
				pipeline_run_id?: string | null;
				pipeline_run_name?: string | null;
				user?: string | null;
			};
			header?: never;
			path?: never;
			cookie?: never;
		};
		requestBody?: never;
		responses: {
			/** @description Successful Response */
			200: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["Page_ModelVersionPipelineRunResponse_"];
				};
			};
			/** @description Unauthorized */
			401: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Not Found */
			404: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Unprocessable Entity */
			422: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
		};
	};
	create_model_version_pipeline_run_link_api_v1_model_version_pipeline_runs_post: {
		parameters: {
			query?: never;
			header?: never;
			path?: never;
			cookie?: never;
		};
		requestBody: {
			content: {
				"application/json": components["schemas"]["ModelVersionPipelineRunRequest"];
			};
		};
		responses: {
			/** @description Successful Response */
			200: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ModelVersionPipelineRunResponse"];
				};
			};
			/** @description Unauthorized */
			401: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Conflict */
			409: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Unprocessable Entity */
			422: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
		};
	};
	list_pipelines_api_v1_pipelines_get: {
		parameters: {
			query?: {
				project_name_or_id?: string | null;
				hydrate?: boolean;
				sort_by?: string;
				logical_operator?: components["schemas"]["LogicalOperators"];
				page?: number;
				size?: number;
				id?: string | null;
				created?: string | null;
				updated?: string | null;
				tag?: string | null;
				tags?: string[] | null;
				scope_user?: string | null;
				user?: string | null;
				project?: string | null;
				name?: string | null;
				latest_run_status?: string | null;
			};
			header?: never;
			path?: never;
			cookie?: never;
		};
		requestBody?: never;
		responses: {
			/** @description Successful Response */
			200: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["Page_PipelineResponse_"];
				};
			};
			/** @description Unauthorized */
			401: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Forbidden */
			403: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Not Found */
			404: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Unprocessable Entity */
			422: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
		};
	};
	create_pipeline_api_v1_pipelines_post: {
		parameters: {
			query?: {
				project_name_or_id?: string | null;
			};
			header?: never;
			path?: never;
			cookie?: never;
		};
		requestBody: {
			content: {
				"application/json": components["schemas"]["PipelineRequest"];
			};
		};
		responses: {
			/** @description Successful Response */
			200: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["PipelineResponse"];
				};
			};
			/** @description Unauthorized */
			401: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Forbidden */
			403: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Conflict */
			409: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Unprocessable Entity */
			422: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
		};
	};
	get_pipeline_api_v1_pipelines__pipeline_id__get: {
		parameters: {
			query?: {
				hydrate?: boolean;
			};
			header?: never;
			path: {
				pipeline_id: string;
			};
			cookie?: never;
		};
		requestBody?: never;
		responses: {
			/** @description Successful Response */
			200: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["PipelineResponse"];
				};
			};
			/** @description Unauthorized */
			401: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Forbidden */
			403: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Not Found */
			404: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Unprocessable Entity */
			422: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
		};
	};
	update_pipeline_api_v1_pipelines__pipeline_id__put: {
		parameters: {
			query?: never;
			header?: never;
			path: {
				pipeline_id: string;
			};
			cookie?: never;
		};
		requestBody: {
			content: {
				"application/json": components["schemas"]["PipelineUpdate"];
			};
		};
		responses: {
			/** @description Successful Response */
			200: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["PipelineResponse"];
				};
			};
			/** @description Unauthorized */
			401: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Forbidden */
			403: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Not Found */
			404: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Unprocessable Entity */
			422: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
		};
	};
	delete_pipeline_api_v1_pipelines__pipeline_id__delete: {
		parameters: {
			query?: never;
			header?: never;
			path: {
				pipeline_id: string;
			};
			cookie?: never;
		};
		requestBody?: never;
		responses: {
			/** @description Successful Response */
			200: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": unknown;
				};
			};
			/** @description Unauthorized */
			401: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Forbidden */
			403: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Not Found */
			404: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Unprocessable Entity */
			422: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
		};
	};
	list_pipeline_runs_api_v1_pipelines__pipeline_id__runs_get: {
		parameters: {
			query?: {
				hydrate?: boolean;
				sort_by?: string;
				logical_operator?: components["schemas"]["LogicalOperators"];
				page?: number;
				size?: number;
				id?: string | null;
				created?: string | null;
				updated?: string | null;
				run_metadata?: string[] | null;
				tag?: string | null;
				tags?: string[] | null;
				scope_user?: string | null;
				user?: string | null;
				project?: string | null;
				name?: string | null;
				orchestrator_run_id?: string | null;
				stack_id?: string | null;
				schedule_id?: string | null;
				build_id?: string | null;
				deployment_id?: string | null;
				code_repository_id?: string | null;
				template_id?: string | null;
				model_version_id?: string | null;
				status?: string | null;
				start_time?: string | null;
				end_time?: string | null;
				unlisted?: boolean | null;
				pipeline_name?: string | null;
				pipeline?: string | null;
				stack?: string | null;
				code_repository?: string | null;
				model?: string | null;
				stack_component?: string | null;
				templatable?: boolean | null;
			};
			header?: never;
			path: {
				pipeline_id: string | null;
			};
			cookie?: never;
		};
		requestBody?: never;
		responses: {
			/** @description Successful Response */
			200: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["Page_PipelineRunResponse_"];
				};
			};
			/** @description Unauthorized */
			401: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Forbidden */
			403: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Not Found */
			404: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Unprocessable Entity */
			422: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
		};
	};
	list_builds_api_v1_pipeline_builds_get: {
		parameters: {
			query?: {
				project_name_or_id?: string | null;
				hydrate?: boolean;
				sort_by?: string;
				logical_operator?: components["schemas"]["LogicalOperators"];
				page?: number;
				size?: number;
				id?: string | null;
				created?: string | null;
				updated?: string | null;
				scope_user?: string | null;
				user?: string | null;
				project?: string | null;
				pipeline_id?: string | null;
				stack_id?: string | null;
				container_registry_id?: string | null;
				is_local?: boolean | null;
				contains_code?: boolean | null;
				zenml_version?: string | null;
				python_version?: string | null;
				checksum?: string | null;
				stack_checksum?: string | null;
				duration?: number | string | null;
			};
			header?: never;
			path?: never;
			cookie?: never;
		};
		requestBody?: never;
		responses: {
			/** @description Successful Response */
			200: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["Page_PipelineBuildResponse_"];
				};
			};
			/** @description Unauthorized */
			401: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Forbidden */
			403: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Not Found */
			404: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Unprocessable Entity */
			422: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
		};
	};
	create_build_api_v1_pipeline_builds_post: {
		parameters: {
			query?: {
				project_name_or_id?: string | null;
			};
			header?: never;
			path?: never;
			cookie?: never;
		};
		requestBody: {
			content: {
				"application/json": components["schemas"]["PipelineBuildRequest"];
			};
		};
		responses: {
			/** @description Successful Response */
			200: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["PipelineBuildResponse"];
				};
			};
			/** @description Unauthorized */
			401: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Forbidden */
			403: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Conflict */
			409: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Unprocessable Entity */
			422: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
		};
	};
	get_build_api_v1_pipeline_builds__build_id__get: {
		parameters: {
			query?: {
				hydrate?: boolean;
			};
			header?: never;
			path: {
				build_id: string;
			};
			cookie?: never;
		};
		requestBody?: never;
		responses: {
			/** @description Successful Response */
			200: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["PipelineBuildResponse"];
				};
			};
			/** @description Unauthorized */
			401: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Forbidden */
			403: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Not Found */
			404: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Unprocessable Entity */
			422: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
		};
	};
	delete_build_api_v1_pipeline_builds__build_id__delete: {
		parameters: {
			query?: never;
			header?: never;
			path: {
				build_id: string;
			};
			cookie?: never;
		};
		requestBody?: never;
		responses: {
			/** @description Successful Response */
			200: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": unknown;
				};
			};
			/** @description Unauthorized */
			401: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Forbidden */
			403: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Not Found */
			404: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Unprocessable Entity */
			422: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
		};
	};
	list_deployments_api_v1_pipeline_deployments_get: {
		parameters: {
			query?: {
				project_name_or_id?: string | null;
				hydrate?: boolean;
				sort_by?: string;
				logical_operator?: components["schemas"]["LogicalOperators"];
				page?: number;
				size?: number;
				id?: string | null;
				created?: string | null;
				updated?: string | null;
				scope_user?: string | null;
				user?: string | null;
				project?: string | null;
				pipeline_id?: string | null;
				stack_id?: string | null;
				build_id?: string | null;
				schedule_id?: string | null;
				template_id?: string | null;
			};
			header?: never;
			path?: never;
			cookie?: never;
		};
		requestBody?: never;
		responses: {
			/** @description Successful Response */
			200: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["Page_PipelineDeploymentResponse_"];
				};
			};
			/** @description Unauthorized */
			401: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Forbidden */
			403: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Not Found */
			404: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Unprocessable Entity */
			422: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
		};
	};
	create_deployment_api_v1_pipeline_deployments_post: {
		parameters: {
			query?: {
				project_name_or_id?: string | null;
			};
			header?: never;
			path?: never;
			cookie?: never;
		};
		requestBody: {
			content: {
				"application/json": components["schemas"]["PipelineDeploymentRequest"];
			};
		};
		responses: {
			/** @description Successful Response */
			200: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["PipelineDeploymentResponse"];
				};
			};
			/** @description Unauthorized */
			401: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Forbidden */
			403: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Conflict */
			409: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Unprocessable Entity */
			422: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
		};
	};
	get_deployment_api_v1_pipeline_deployments__deployment_id__get: {
		parameters: {
			query?: {
				hydrate?: boolean;
			};
			header?: never;
			path: {
				deployment_id: string;
			};
			cookie?: never;
		};
		requestBody?: never;
		responses: {
			/** @description Successful Response */
			200: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["PipelineDeploymentResponse"];
				};
			};
			/** @description Unauthorized */
			401: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Forbidden */
			403: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Not Found */
			404: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Unprocessable Entity */
			422: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
		};
	};
	delete_deployment_api_v1_pipeline_deployments__deployment_id__delete: {
		parameters: {
			query?: never;
			header?: never;
			path: {
				deployment_id: string;
			};
			cookie?: never;
		};
		requestBody?: never;
		responses: {
			/** @description Successful Response */
			200: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": unknown;
				};
			};
			/** @description Unauthorized */
			401: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Forbidden */
			403: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Not Found */
			404: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Unprocessable Entity */
			422: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
		};
	};
	deployment_logs_api_v1_pipeline_deployments__deployment_id__logs_get: {
		parameters: {
			query?: {
				offset?: number;
				length?: number;
			};
			header?: never;
			path: {
				deployment_id: string;
			};
			cookie?: never;
		};
		requestBody?: never;
		responses: {
			/** @description Successful Response */
			200: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": string;
				};
			};
			/** @description Unauthorized */
			401: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Forbidden */
			403: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Not Found */
			404: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Unprocessable Entity */
			422: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
		};
	};
	list_runs_api_v1_runs_get: {
		parameters: {
			query?: {
				project_name_or_id?: string | null;
				hydrate?: boolean;
				sort_by?: string;
				logical_operator?: components["schemas"]["LogicalOperators"];
				page?: number;
				size?: number;
				id?: string | null;
				created?: string | null;
				updated?: string | null;
				run_metadata?: string[] | null;
				tag?: string | null;
				tags?: string[] | null;
				scope_user?: string | null;
				user?: string | null;
				project?: string | null;
				name?: string | null;
				orchestrator_run_id?: string | null;
				pipeline_id?: string | null;
				stack_id?: string | null;
				schedule_id?: string | null;
				build_id?: string | null;
				deployment_id?: string | null;
				code_repository_id?: string | null;
				template_id?: string | null;
				model_version_id?: string | null;
				status?: string | null;
				start_time?: string | null;
				end_time?: string | null;
				unlisted?: boolean | null;
				pipeline_name?: string | null;
				pipeline?: string | null;
				stack?: string | null;
				code_repository?: string | null;
				model?: string | null;
				stack_component?: string | null;
				templatable?: boolean | null;
			};
			header?: never;
			path?: never;
			cookie?: never;
		};
		requestBody?: never;
		responses: {
			/** @description Successful Response */
			200: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["Page_PipelineRunResponse_"];
				};
			};
			/** @description Unauthorized */
			401: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Forbidden */
			403: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Not Found */
			404: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Unprocessable Entity */
			422: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
		};
	};
	get_or_create_pipeline_run_api_v1_runs_post: {
		parameters: {
			query?: {
				project_name_or_id?: string | null;
			};
			header?: never;
			path?: never;
			cookie?: never;
		};
		requestBody: {
			content: {
				"application/json": components["schemas"]["PipelineRunRequest"];
			};
		};
		responses: {
			/** @description Successful Response */
			200: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": [
						components["schemas"]["PipelineRunResponse"],
						boolean,
					];
				};
			};
			/** @description Unauthorized */
			401: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Forbidden */
			403: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Conflict */
			409: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Unprocessable Entity */
			422: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
		};
	};
	get_run_api_v1_runs__run_id__get: {
		parameters: {
			query?: {
				hydrate?: boolean;
				refresh_status?: boolean;
			};
			header?: never;
			path: {
				run_id: string;
			};
			cookie?: never;
		};
		requestBody?: never;
		responses: {
			/** @description Successful Response */
			200: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["PipelineRunResponse"];
				};
			};
			/** @description Unauthorized */
			401: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Forbidden */
			403: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Not Found */
			404: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Unprocessable Entity */
			422: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
		};
	};
	update_run_api_v1_runs__run_id__put: {
		parameters: {
			query?: never;
			header?: never;
			path: {
				run_id: string;
			};
			cookie?: never;
		};
		requestBody: {
			content: {
				"application/json": components["schemas"]["PipelineRunUpdate"];
			};
		};
		responses: {
			/** @description Successful Response */
			200: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["PipelineRunResponse"];
				};
			};
			/** @description Unauthorized */
			401: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Forbidden */
			403: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Not Found */
			404: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Unprocessable Entity */
			422: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
		};
	};
	delete_run_api_v1_runs__run_id__delete: {
		parameters: {
			query?: never;
			header?: never;
			path: {
				run_id: string;
			};
			cookie?: never;
		};
		requestBody?: never;
		responses: {
			/** @description Successful Response */
			200: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": unknown;
				};
			};
			/** @description Unauthorized */
			401: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Forbidden */
			403: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Not Found */
			404: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Unprocessable Entity */
			422: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
		};
	};
	get_run_steps_api_v1_runs__run_id__steps_get: {
		parameters: {
			query?: {
				sort_by?: string;
				logical_operator?: components["schemas"]["LogicalOperators"];
				page?: number;
				size?: number;
				id?: string | null;
				created?: string | null;
				updated?: string | null;
				run_metadata?: string[] | null;
				scope_user?: string | null;
				user?: string | null;
				project?: string | null;
				name?: string | null;
				code_hash?: string | null;
				cache_key?: string | null;
				status?: string | null;
				start_time?: string | null;
				end_time?: string | null;
				pipeline_run_id?: string | null;
				deployment_id?: string | null;
				original_step_run_id?: string | null;
				model_version_id?: string | null;
				model?: string | null;
			};
			header?: never;
			path: {
				run_id: string;
			};
			cookie?: never;
		};
		requestBody?: never;
		responses: {
			/** @description Successful Response */
			200: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["Page_StepRunResponse_"];
				};
			};
			/** @description Unauthorized */
			401: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Forbidden */
			403: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Not Found */
			404: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Unprocessable Entity */
			422: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
		};
	};
	get_pipeline_configuration_api_v1_runs__run_id__pipeline_configuration_get: {
		parameters: {
			query?: never;
			header?: never;
			path: {
				run_id: string;
			};
			cookie?: never;
		};
		requestBody?: never;
		responses: {
			/** @description Successful Response */
			200: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": {
						[key: string]: unknown;
					};
				};
			};
			/** @description Unauthorized */
			401: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Forbidden */
			403: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Not Found */
			404: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Unprocessable Entity */
			422: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
		};
	};
	get_run_status_api_v1_runs__run_id__status_get: {
		parameters: {
			query?: never;
			header?: never;
			path: {
				run_id: string;
			};
			cookie?: never;
		};
		requestBody?: never;
		responses: {
			/** @description Successful Response */
			200: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ExecutionStatus"];
				};
			};
			/** @description Unauthorized */
			401: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Forbidden */
			403: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Not Found */
			404: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Unprocessable Entity */
			422: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
		};
	};
	refresh_run_status_api_v1_runs__run_id__refresh_get: {
		parameters: {
			query?: never;
			header?: never;
			path: {
				run_id: string;
			};
			cookie?: never;
		};
		requestBody?: never;
		responses: {
			/** @description Successful Response */
			200: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": unknown;
				};
			};
			/** @description Unauthorized */
			401: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Forbidden */
			403: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Not Found */
			404: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Unprocessable Entity */
			422: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
		};
	};
	run_logs_api_v1_runs__run_id__logs_get: {
		parameters: {
			query?: {
				offset?: number;
				length?: number;
			};
			header?: never;
			path: {
				run_id: string;
			};
			cookie?: never;
		};
		requestBody?: never;
		responses: {
			/** @description Successful Response */
			200: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": string;
				};
			};
			/** @description Unauthorized */
			401: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Forbidden */
			403: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Not Found */
			404: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Unprocessable Entity */
			422: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
		};
	};
	create_run_metadata_api_v1_run_metadata_post: {
		parameters: {
			query?: {
				project_name_or_id?: string | null;
			};
			header?: never;
			path?: never;
			cookie?: never;
		};
		requestBody: {
			content: {
				"application/json": components["schemas"]["RunMetadataRequest"];
			};
		};
		responses: {
			/** @description Successful Response */
			200: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": unknown;
				};
			};
			/** @description Unauthorized */
			401: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Forbidden */
			403: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Conflict */
			409: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Unprocessable Entity */
			422: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
		};
	};
	list_run_templates_api_v1_run_templates_get: {
		parameters: {
			query?: {
				project_name_or_id?: string | null;
				hydrate?: boolean;
				sort_by?: string;
				logical_operator?: components["schemas"]["LogicalOperators"];
				page?: number;
				size?: number;
				id?: string | null;
				created?: string | null;
				updated?: string | null;
				tag?: string | null;
				tags?: string[] | null;
				scope_user?: string | null;
				user?: string | null;
				project?: string | null;
				name?: string | null;
				hidden?: boolean | null;
				pipeline_id?: string | null;
				build_id?: string | null;
				stack_id?: string | null;
				code_repository_id?: string | null;
				pipeline?: string | null;
				stack?: string | null;
			};
			header?: never;
			path?: never;
			cookie?: never;
		};
		requestBody?: never;
		responses: {
			/** @description Successful Response */
			200: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["Page_RunTemplateResponse_"];
				};
			};
			/** @description Unauthorized */
			401: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Forbidden */
			403: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Not Found */
			404: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Unprocessable Entity */
			422: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
		};
	};
	create_run_template_api_v1_run_templates_post: {
		parameters: {
			query?: {
				project_name_or_id?: string | null;
			};
			header?: never;
			path?: never;
			cookie?: never;
		};
		requestBody: {
			content: {
				"application/json": components["schemas"]["RunTemplateRequest"];
			};
		};
		responses: {
			/** @description Successful Response */
			200: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["RunTemplateResponse"];
				};
			};
			/** @description Unauthorized */
			401: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Forbidden */
			403: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Conflict */
			409: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Unprocessable Entity */
			422: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
		};
	};
	get_run_template_api_v1_run_templates__template_id__get: {
		parameters: {
			query?: {
				hydrate?: boolean;
			};
			header?: never;
			path: {
				template_id: string;
			};
			cookie?: never;
		};
		requestBody?: never;
		responses: {
			/** @description Successful Response */
			200: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["RunTemplateResponse"];
				};
			};
			/** @description Unauthorized */
			401: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Forbidden */
			403: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Not Found */
			404: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Unprocessable Entity */
			422: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
		};
	};
	update_run_template_api_v1_run_templates__template_id__put: {
		parameters: {
			query?: never;
			header?: never;
			path: {
				template_id: string;
			};
			cookie?: never;
		};
		requestBody: {
			content: {
				"application/json": components["schemas"]["RunTemplateUpdate"];
			};
		};
		responses: {
			/** @description Successful Response */
			200: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["RunTemplateResponse"];
				};
			};
			/** @description Unauthorized */
			401: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Forbidden */
			403: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Not Found */
			404: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Unprocessable Entity */
			422: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
		};
	};
	delete_run_template_api_v1_run_templates__template_id__delete: {
		parameters: {
			query?: never;
			header?: never;
			path: {
				template_id: string;
			};
			cookie?: never;
		};
		requestBody?: never;
		responses: {
			/** @description Successful Response */
			200: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": unknown;
				};
			};
			/** @description Unauthorized */
			401: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Forbidden */
			403: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Not Found */
			404: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Unprocessable Entity */
			422: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
		};
	};
	list_schedules_api_v1_schedules_get: {
		parameters: {
			query?: {
				project_name_or_id?: string | null;
				hydrate?: boolean;
				sort_by?: string;
				logical_operator?: components["schemas"]["LogicalOperators"];
				page?: number;
				size?: number;
				id?: string | null;
				created?: string | null;
				updated?: string | null;
				scope_user?: string | null;
				user?: string | null;
				project?: string | null;
				pipeline_id?: string | null;
				orchestrator_id?: string | null;
				active?: boolean | null;
				cron_expression?: string | null;
				start_time?: string | null;
				end_time?: string | null;
				interval_second?: number | null;
				catchup?: boolean | null;
				name?: string | null;
				run_once_start_time?: string | null;
			};
			header?: never;
			path?: never;
			cookie?: never;
		};
		requestBody?: never;
		responses: {
			/** @description Successful Response */
			200: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["Page_ScheduleResponse_"];
				};
			};
			/** @description Unauthorized */
			401: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Forbidden */
			403: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Not Found */
			404: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Unprocessable Entity */
			422: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
		};
	};
	create_schedule_api_v1_schedules_post: {
		parameters: {
			query?: {
				project_name_or_id?: string | null;
			};
			header?: never;
			path?: never;
			cookie?: never;
		};
		requestBody: {
			content: {
				"application/json": components["schemas"]["ScheduleRequest"];
			};
		};
		responses: {
			/** @description Successful Response */
			200: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ScheduleResponse"];
				};
			};
			/** @description Unauthorized */
			401: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Forbidden */
			403: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Conflict */
			409: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Unprocessable Entity */
			422: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
		};
	};
	get_schedule_api_v1_schedules__schedule_id__get: {
		parameters: {
			query?: {
				hydrate?: boolean;
			};
			header?: never;
			path: {
				schedule_id: string;
			};
			cookie?: never;
		};
		requestBody?: never;
		responses: {
			/** @description Successful Response */
			200: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ScheduleResponse"];
				};
			};
			/** @description Unauthorized */
			401: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Forbidden */
			403: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Not Found */
			404: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Unprocessable Entity */
			422: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
		};
	};
	update_schedule_api_v1_schedules__schedule_id__put: {
		parameters: {
			query?: never;
			header?: never;
			path: {
				schedule_id: string;
			};
			cookie?: never;
		};
		requestBody: {
			content: {
				"application/json": components["schemas"]["ScheduleUpdate"];
			};
		};
		responses: {
			/** @description Successful Response */
			200: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ScheduleResponse"];
				};
			};
			/** @description Unauthorized */
			401: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Forbidden */
			403: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Not Found */
			404: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Unprocessable Entity */
			422: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
		};
	};
	delete_schedule_api_v1_schedules__schedule_id__delete: {
		parameters: {
			query?: never;
			header?: never;
			path: {
				schedule_id: string;
			};
			cookie?: never;
		};
		requestBody?: never;
		responses: {
			/** @description Successful Response */
			200: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": unknown;
				};
			};
			/** @description Unauthorized */
			401: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Forbidden */
			403: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Not Found */
			404: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Unprocessable Entity */
			422: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
		};
	};
	list_secrets_api_v1_secrets_get: {
		parameters: {
			query?: {
				hydrate?: boolean;
				sort_by?: string;
				logical_operator?: components["schemas"]["LogicalOperators"];
				page?: number;
				size?: number;
				id?: string | null;
				created?: string | null;
				updated?: string | null;
				scope_user?: string | null;
				user?: string | null;
				name?: string | null;
				private?: boolean | null;
			};
			header?: never;
			path?: never;
			cookie?: never;
		};
		requestBody?: never;
		responses: {
			/** @description Successful Response */
			200: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["Page_SecretResponse_"];
				};
			};
			/** @description Unauthorized */
			401: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Forbidden */
			403: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Not Found */
			404: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Unprocessable Entity */
			422: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
		};
	};
	create_secret_api_v1_secrets_post: {
		parameters: {
			query?: {
				workspace_name_or_id?: string | null;
			};
			header?: never;
			path?: never;
			cookie?: never;
		};
		requestBody: {
			content: {
				"application/json": components["schemas"]["SecretRequest"];
			};
		};
		responses: {
			/** @description Successful Response */
			200: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["SecretResponse"];
				};
			};
			/** @description Unauthorized */
			401: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Forbidden */
			403: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Conflict */
			409: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Unprocessable Entity */
			422: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
		};
	};
	get_secret_api_v1_secrets__secret_id__get: {
		parameters: {
			query?: {
				hydrate?: boolean;
			};
			header?: never;
			path: {
				secret_id: string;
			};
			cookie?: never;
		};
		requestBody?: never;
		responses: {
			/** @description Successful Response */
			200: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["SecretResponse"];
				};
			};
			/** @description Unauthorized */
			401: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Forbidden */
			403: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Not Found */
			404: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Unprocessable Entity */
			422: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
		};
	};
	update_secret_api_v1_secrets__secret_id__put: {
		parameters: {
			query?: {
				patch_values?: boolean | null;
			};
			header?: never;
			path: {
				secret_id: string;
			};
			cookie?: never;
		};
		requestBody: {
			content: {
				"application/json": components["schemas"]["SecretUpdate"];
			};
		};
		responses: {
			/** @description Successful Response */
			200: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["SecretResponse"];
				};
			};
			/** @description Unauthorized */
			401: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Forbidden */
			403: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Not Found */
			404: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Unprocessable Entity */
			422: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
		};
	};
	delete_secret_api_v1_secrets__secret_id__delete: {
		parameters: {
			query?: never;
			header?: never;
			path: {
				secret_id: string;
			};
			cookie?: never;
		};
		requestBody?: never;
		responses: {
			/** @description Successful Response */
			200: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": unknown;
				};
			};
			/** @description Unauthorized */
			401: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Forbidden */
			403: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Not Found */
			404: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Unprocessable Entity */
			422: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
		};
	};
	backup_secrets_api_v1_secrets_operations_backup_put: {
		parameters: {
			query?: {
				ignore_errors?: boolean;
				delete_secrets?: boolean;
			};
			header?: never;
			path?: never;
			cookie?: never;
		};
		requestBody?: never;
		responses: {
			/** @description Successful Response */
			200: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": unknown;
				};
			};
			/** @description Unauthorized */
			401: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Forbidden */
			403: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Not Found */
			404: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Unprocessable Entity */
			422: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
		};
	};
	restore_secrets_api_v1_secrets_operations_restore_put: {
		parameters: {
			query?: {
				ignore_errors?: boolean;
				delete_secrets?: boolean;
			};
			header?: never;
			path?: never;
			cookie?: never;
		};
		requestBody?: never;
		responses: {
			/** @description Successful Response */
			200: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": unknown;
				};
			};
			/** @description Unauthorized */
			401: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Forbidden */
			403: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Not Found */
			404: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Unprocessable Entity */
			422: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
		};
	};
	version_api_v1_version_get: {
		parameters: {
			query?: never;
			header?: never;
			path?: never;
			cookie?: never;
		};
		requestBody?: never;
		responses: {
			/** @description Successful Response */
			200: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": string;
				};
			};
			/** @description Unauthorized */
			401: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
		};
	};
	server_info_api_v1_info_get: {
		parameters: {
			query?: never;
			header?: never;
			path?: never;
			cookie?: never;
		};
		requestBody?: never;
		responses: {
			/** @description Successful Response */
			200: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ServerModel"];
				};
			};
			/** @description Unauthorized */
			401: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Not Found */
			404: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Unprocessable Entity */
			422: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
		};
	};
	server_load_info_api_v1_load_info_get: {
		parameters: {
			query?: never;
			header?: never;
			path?: never;
			cookie?: never;
		};
		requestBody?: never;
		responses: {
			/** @description Successful Response */
			200: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ServerLoadInfo"];
				};
			};
			/** @description Unauthorized */
			401: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
		};
	};
	get_onboarding_state_api_v1_onboarding_state_get: {
		parameters: {
			query?: never;
			header?: never;
			path?: never;
			cookie?: never;
		};
		requestBody?: never;
		responses: {
			/** @description Successful Response */
			200: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": string[];
				};
			};
			/** @description Unauthorized */
			401: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Not Found */
			404: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Unprocessable Entity */
			422: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
		};
	};
	get_settings_api_v1_settings_get: {
		parameters: {
			query?: {
				hydrate?: boolean;
			};
			header?: never;
			path?: never;
			cookie?: never;
		};
		requestBody?: never;
		responses: {
			/** @description Successful Response */
			200: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ServerSettingsResponse"];
				};
			};
			/** @description Unauthorized */
			401: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Not Found */
			404: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Unprocessable Entity */
			422: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
		};
	};
	update_server_settings_api_v1_settings_put: {
		parameters: {
			query?: never;
			header?: never;
			path?: never;
			cookie?: never;
		};
		requestBody: {
			content: {
				"application/json": components["schemas"]["ServerSettingsUpdate"];
			};
		};
		responses: {
			/** @description Successful Response */
			200: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ServerSettingsResponse"];
				};
			};
			/** @description Unauthorized */
			401: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Not Found */
			404: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Unprocessable Entity */
			422: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
		};
	};
	activate_server_api_v1_activate_put: {
		parameters: {
			query?: never;
			header?: never;
			path?: never;
			cookie?: never;
		};
		requestBody: {
			content: {
				"application/json": components["schemas"]["ServerActivationRequest"];
			};
		};
		responses: {
			/** @description Successful Response */
			200: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["UserResponse"] | null;
				};
			};
			/** @description Unauthorized */
			401: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Not Found */
			404: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Unprocessable Entity */
			422: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
		};
	};
	get_server_statistics_api_v1_statistics_get: {
		parameters: {
			query?: never;
			header?: never;
			path?: never;
			cookie?: never;
		};
		requestBody?: never;
		responses: {
			/** @description Successful Response */
			200: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ServerStatistics"];
				};
			};
			/** @description Unauthorized */
			401: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Not Found */
			404: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Unprocessable Entity */
			422: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
		};
	};
	list_service_accounts_api_v1_service_accounts_get: {
		parameters: {
			query?: {
				hydrate?: boolean;
				sort_by?: string;
				logical_operator?: components["schemas"]["LogicalOperators"];
				page?: number;
				size?: number;
				id?: string | null;
				created?: string | null;
				updated?: string | null;
				name?: string | null;
				description?: string | null;
				active?: boolean | string | null;
			};
			header?: never;
			path?: never;
			cookie?: never;
		};
		requestBody?: never;
		responses: {
			/** @description Successful Response */
			200: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["Page_ServiceAccountResponse_"];
				};
			};
			/** @description Unauthorized */
			401: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Not Found */
			404: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Unprocessable Entity */
			422: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
		};
	};
	create_service_account_api_v1_service_accounts_post: {
		parameters: {
			query?: never;
			header?: never;
			path?: never;
			cookie?: never;
		};
		requestBody: {
			content: {
				"application/json": components["schemas"]["ServiceAccountRequest"];
			};
		};
		responses: {
			/** @description Successful Response */
			200: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ServiceAccountResponse"];
				};
			};
			/** @description Unauthorized */
			401: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Conflict */
			409: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Unprocessable Entity */
			422: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
		};
	};
	get_service_account_api_v1_service_accounts__service_account_name_or_id__get: {
		parameters: {
			query?: {
				hydrate?: boolean;
			};
			header?: never;
			path: {
				service_account_name_or_id: string;
			};
			cookie?: never;
		};
		requestBody?: never;
		responses: {
			/** @description Successful Response */
			200: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ServiceAccountResponse"];
				};
			};
			/** @description Unauthorized */
			401: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Not Found */
			404: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Unprocessable Entity */
			422: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
		};
	};
	update_service_account_api_v1_service_accounts__service_account_name_or_id__put: {
		parameters: {
			query?: never;
			header?: never;
			path: {
				service_account_name_or_id: string;
			};
			cookie?: never;
		};
		requestBody: {
			content: {
				"application/json": components["schemas"]["ServiceAccountUpdate"];
			};
		};
		responses: {
			/** @description Successful Response */
			200: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ServiceAccountResponse"];
				};
			};
			/** @description Unauthorized */
			401: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Not Found */
			404: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Unprocessable Entity */
			422: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
		};
	};
	delete_service_account_api_v1_service_accounts__service_account_name_or_id__delete: {
		parameters: {
			query?: never;
			header?: never;
			path: {
				service_account_name_or_id: string;
			};
			cookie?: never;
		};
		requestBody?: never;
		responses: {
			/** @description Successful Response */
			200: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": unknown;
				};
			};
			/** @description Unauthorized */
			401: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Not Found */
			404: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Unprocessable Entity */
			422: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
		};
	};
	list_api_keys_api_v1_service_accounts__service_account_id__api_keys_get: {
		parameters: {
			query?: {
				hydrate?: boolean;
				sort_by?: string;
				logical_operator?: components["schemas"]["LogicalOperators"];
				page?: number;
				size?: number;
				id?: string | null;
				created?: string | null;
				updated?: string | null;
				service_account?: string | null;
				name?: string | null;
				description?: string | null;
				active?: boolean | string | null;
				last_login?: string | null;
				last_rotated?: string | null;
			};
			header?: never;
			path: {
				service_account_id: string;
			};
			cookie?: never;
		};
		requestBody?: never;
		responses: {
			/** @description Successful Response */
			200: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["Page_APIKeyResponse_"];
				};
			};
			/** @description Unauthorized */
			401: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Not Found */
			404: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Unprocessable Entity */
			422: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
		};
	};
	create_api_key_api_v1_service_accounts__service_account_id__api_keys_post: {
		parameters: {
			query?: never;
			header?: never;
			path: {
				service_account_id: string;
			};
			cookie?: never;
		};
		requestBody: {
			content: {
				"application/json": components["schemas"]["APIKeyRequest"];
			};
		};
		responses: {
			/** @description Successful Response */
			200: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["APIKeyResponse"];
				};
			};
			/** @description Unauthorized */
			401: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Conflict */
			409: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Unprocessable Entity */
			422: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
		};
	};
	get_api_key_api_v1_service_accounts__service_account_id__api_keys__api_key_name_or_id__get: {
		parameters: {
			query?: {
				hydrate?: boolean;
			};
			header?: never;
			path: {
				service_account_id: string;
				api_key_name_or_id: string;
			};
			cookie?: never;
		};
		requestBody?: never;
		responses: {
			/** @description Successful Response */
			200: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["APIKeyResponse"];
				};
			};
			/** @description Unauthorized */
			401: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Not Found */
			404: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Unprocessable Entity */
			422: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
		};
	};
	update_api_key_api_v1_service_accounts__service_account_id__api_keys__api_key_name_or_id__put: {
		parameters: {
			query?: never;
			header?: never;
			path: {
				service_account_id: string;
				api_key_name_or_id: string;
			};
			cookie?: never;
		};
		requestBody: {
			content: {
				"application/json": components["schemas"]["APIKeyUpdate"];
			};
		};
		responses: {
			/** @description Successful Response */
			200: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["APIKeyResponse"];
				};
			};
			/** @description Unauthorized */
			401: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Conflict */
			409: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Unprocessable Entity */
			422: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
		};
	};
	delete_api_key_api_v1_service_accounts__service_account_id__api_keys__api_key_name_or_id__delete: {
		parameters: {
			query?: never;
			header?: never;
			path: {
				service_account_id: string;
				api_key_name_or_id: string;
			};
			cookie?: never;
		};
		requestBody?: never;
		responses: {
			/** @description Successful Response */
			200: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": unknown;
				};
			};
			/** @description Unauthorized */
			401: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Not Found */
			404: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Unprocessable Entity */
			422: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
		};
	};
	rotate_api_key_api_v1_service_accounts__service_account_id__api_keys__api_key_name_or_id__rotate_put: {
		parameters: {
			query?: never;
			header?: never;
			path: {
				service_account_id: string;
				api_key_name_or_id: string;
			};
			cookie?: never;
		};
		requestBody: {
			content: {
				"application/json": components["schemas"]["APIKeyRotateRequest"];
			};
		};
		responses: {
			/** @description Successful Response */
			200: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["APIKeyResponse"];
				};
			};
			/** @description Unauthorized */
			401: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Conflict */
			409: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Unprocessable Entity */
			422: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
		};
	};
	list_service_connectors_api_v1_service_connectors_get: {
		parameters: {
			query?: {
				project_name_or_id?: string | null;
				expand_secrets?: boolean;
				hydrate?: boolean;
				sort_by?: string;
				logical_operator?: components["schemas"]["LogicalOperators"];
				page?: number;
				size?: number;
				id?: string | null;
				created?: string | null;
				updated?: string | null;
				scope_user?: string | null;
				user?: string | null;
				name?: string | null;
				connector_type?: string | null;
				auth_method?: string | null;
				resource_type?: string | null;
				resource_id?: string | null;
				labels_str?: string | null;
				secret_id?: string | null;
			};
			header?: never;
			path?: never;
			cookie?: never;
		};
		requestBody?: {
			content: {
				"application/json": {
					[key: string]: unknown;
				} | null;
			};
		};
		responses: {
			/** @description Successful Response */
			200: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["Page_ServiceConnectorResponse_"];
				};
			};
			/** @description Unauthorized */
			401: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Forbidden */
			403: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Not Found */
			404: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Unprocessable Entity */
			422: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
		};
	};
	create_service_connector_api_v1_service_connectors_post: {
		parameters: {
			query?: {
				project_name_or_id?: string | null;
			};
			header?: never;
			path?: never;
			cookie?: never;
		};
		requestBody: {
			content: {
				"application/json": components["schemas"]["ServiceConnectorRequest"];
			};
		};
		responses: {
			/** @description Successful Response */
			200: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ServiceConnectorResponse"];
				};
			};
			/** @description Unauthorized */
			401: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Forbidden */
			403: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Conflict */
			409: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Unprocessable Entity */
			422: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
		};
	};
	list_service_connector_resources_api_v1_service_connectors_resources_get: {
		parameters: {
			query?: {
				project_name_or_id?: string | null;
				sort_by?: string;
				logical_operator?: components["schemas"]["LogicalOperators"];
				page?: number;
				size?: number;
				id?: string | null;
				created?: string | null;
				updated?: string | null;
				scope_user?: string | null;
				user?: string | null;
				name?: string | null;
				connector_type?: string | null;
				auth_method?: string | null;
				resource_type?: string | null;
				resource_id?: string | null;
				labels_str?: string | null;
				secret_id?: string | null;
			};
			header?: never;
			path?: never;
			cookie?: never;
		};
		requestBody?: {
			content: {
				"application/json": {
					[key: string]: unknown;
				} | null;
			};
		};
		responses: {
			/** @description Successful Response */
			200: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ServiceConnectorResourcesModel"][];
				};
			};
			/** @description Unauthorized */
			401: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Forbidden */
			403: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Not Found */
			404: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Unprocessable Entity */
			422: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
		};
	};
	get_service_connector_api_v1_service_connectors__connector_id__get: {
		parameters: {
			query?: {
				expand_secrets?: boolean;
				hydrate?: boolean;
			};
			header?: never;
			path: {
				connector_id: string;
			};
			cookie?: never;
		};
		requestBody?: never;
		responses: {
			/** @description Successful Response */
			200: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ServiceConnectorResponse"];
				};
			};
			/** @description Unauthorized */
			401: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Forbidden */
			403: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Not Found */
			404: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Unprocessable Entity */
			422: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
		};
	};
	update_service_connector_api_v1_service_connectors__connector_id__put: {
		parameters: {
			query?: never;
			header?: never;
			path: {
				connector_id: string;
			};
			cookie?: never;
		};
		requestBody: {
			content: {
				"application/json": components["schemas"]["ServiceConnectorUpdate"];
			};
		};
		responses: {
			/** @description Successful Response */
			200: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ServiceConnectorResponse"];
				};
			};
			/** @description Unauthorized */
			401: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Forbidden */
			403: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Not Found */
			404: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Unprocessable Entity */
			422: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
		};
	};
	delete_service_connector_api_v1_service_connectors__connector_id__delete: {
		parameters: {
			query?: never;
			header?: never;
			path: {
				connector_id: string;
			};
			cookie?: never;
		};
		requestBody?: never;
		responses: {
			/** @description Successful Response */
			200: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": unknown;
				};
			};
			/** @description Unauthorized */
			401: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Forbidden */
			403: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Not Found */
			404: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Unprocessable Entity */
			422: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
		};
	};
	validate_and_verify_service_connector_config_api_v1_service_connectors_verify_post: {
		parameters: {
			query?: {
				list_resources?: boolean;
			};
			header?: never;
			path?: never;
			cookie?: never;
		};
		requestBody: {
			content: {
				"application/json": components["schemas"]["ServiceConnectorRequest"];
			};
		};
		responses: {
			/** @description Successful Response */
			200: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ServiceConnectorResourcesModel"];
				};
			};
			/** @description Unauthorized */
			401: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Forbidden */
			403: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Conflict */
			409: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Unprocessable Entity */
			422: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
		};
	};
	validate_and_verify_service_connector_api_v1_service_connectors__connector_id__verify_put: {
		parameters: {
			query?: {
				resource_type?: string | null;
				resource_id?: string | null;
				list_resources?: boolean;
			};
			header?: never;
			path: {
				connector_id: string;
			};
			cookie?: never;
		};
		requestBody?: never;
		responses: {
			/** @description Successful Response */
			200: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ServiceConnectorResourcesModel"];
				};
			};
			/** @description Unauthorized */
			401: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Forbidden */
			403: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Not Found */
			404: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Unprocessable Entity */
			422: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
		};
	};
	get_service_connector_client_api_v1_service_connectors__connector_id__client_get: {
		parameters: {
			query?: {
				resource_type?: string | null;
				resource_id?: string | null;
			};
			header?: never;
			path: {
				connector_id: string;
			};
			cookie?: never;
		};
		requestBody?: never;
		responses: {
			/** @description Successful Response */
			200: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ServiceConnectorResponse"];
				};
			};
			/** @description Unauthorized */
			401: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Forbidden */
			403: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Not Found */
			404: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Unprocessable Entity */
			422: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
		};
	};
	get_resources_based_on_service_connector_info_api_v1_service_connectors_full_stack_resources_post: {
		parameters: {
			query?: {
				connector_uuid?: string | null;
			};
			header?: never;
			path?: never;
			cookie?: never;
		};
		requestBody?: {
			content: {
				"application/json":
					| components["schemas"]["ServiceConnectorInfo"]
					| null;
			};
		};
		responses: {
			/** @description Successful Response */
			200: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ServiceConnectorResourcesInfo"];
				};
			};
			/** @description Unauthorized */
			401: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Forbidden */
			403: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Conflict */
			409: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Unprocessable Entity */
			422: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
		};
	};
	list_service_connector_types_api_v1_service_connector_types_get: {
		parameters: {
			query?: {
				connector_type?: string | null;
				resource_type?: string | null;
				auth_method?: string | null;
			};
			header?: never;
			path?: never;
			cookie?: never;
		};
		requestBody?: never;
		responses: {
			/** @description Successful Response */
			200: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ServiceConnectorTypeModel"][];
				};
			};
			/** @description Unauthorized */
			401: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Forbidden */
			403: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Not Found */
			404: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Unprocessable Entity */
			422: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
		};
	};
	get_service_connector_type_api_v1_service_connector_types__connector_type__get: {
		parameters: {
			query?: never;
			header?: never;
			path: {
				connector_type: string;
			};
			cookie?: never;
		};
		requestBody?: never;
		responses: {
			/** @description Successful Response */
			200: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ServiceConnectorTypeModel"];
				};
			};
			/** @description Unauthorized */
			401: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Forbidden */
			403: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Not Found */
			404: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Unprocessable Entity */
			422: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
		};
	};
	list_services_api_v1_services_get: {
		parameters: {
			query?: {
				hydrate?: boolean;
				sort_by?: string;
				logical_operator?: components["schemas"]["LogicalOperators"];
				page?: number;
				size?: number;
				id?: string | null;
				created?: string | null;
				updated?: string | null;
				scope_user?: string | null;
				user?: string | null;
				project?: string | null;
				name?: string | null;
				type?: string | null;
				flavor?: string | null;
				config?: string | null;
				pipeline_name?: string | null;
				pipeline_step_name?: string | null;
				running?: boolean | null;
				model_version_id?: string | null;
				pipeline_run_id?: string | null;
			};
			header?: never;
			path?: never;
			cookie?: never;
		};
		requestBody?: never;
		responses: {
			/** @description Successful Response */
			200: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["Page_ServiceResponse_"];
				};
			};
			/** @description Unauthorized */
			401: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Forbidden */
			403: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Not Found */
			404: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Unprocessable Entity */
			422: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
		};
	};
	create_service_api_v1_services_post: {
		parameters: {
			query?: {
				project_name_or_id?: string | null;
			};
			header?: never;
			path?: never;
			cookie?: never;
		};
		requestBody: {
			content: {
				"application/json": components["schemas"]["ServiceRequest"];
			};
		};
		responses: {
			/** @description Successful Response */
			200: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ServiceResponse"];
				};
			};
			/** @description Unauthorized */
			401: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Forbidden */
			403: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Unprocessable Entity */
			422: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
		};
	};
	get_service_api_v1_services__service_id__get: {
		parameters: {
			query?: {
				hydrate?: boolean;
			};
			header?: never;
			path: {
				service_id: string;
			};
			cookie?: never;
		};
		requestBody?: never;
		responses: {
			/** @description Successful Response */
			200: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ServiceResponse"];
				};
			};
			/** @description Unauthorized */
			401: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Forbidden */
			403: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Not Found */
			404: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Unprocessable Entity */
			422: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
		};
	};
	update_service_api_v1_services__service_id__put: {
		parameters: {
			query?: never;
			header?: never;
			path: {
				service_id: string;
			};
			cookie?: never;
		};
		requestBody: {
			content: {
				"application/json": components["schemas"]["ServiceUpdate"];
			};
		};
		responses: {
			/** @description Successful Response */
			200: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ServiceResponse"];
				};
			};
			/** @description Unauthorized */
			401: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Forbidden */
			403: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Not Found */
			404: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Unprocessable Entity */
			422: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
		};
	};
	delete_service_api_v1_services__service_id__delete: {
		parameters: {
			query?: never;
			header?: never;
			path: {
				service_id: string;
			};
			cookie?: never;
		};
		requestBody?: never;
		responses: {
			/** @description Successful Response */
			200: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": unknown;
				};
			};
			/** @description Unauthorized */
			401: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Forbidden */
			403: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Not Found */
			404: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Unprocessable Entity */
			422: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
		};
	};
	get_stack_deployment_info_api_v1_stack_deployment_info_get: {
		parameters: {
			query: {
				provider: components["schemas"]["StackDeploymentProvider"];
			};
			header?: never;
			path?: never;
			cookie?: never;
		};
		requestBody?: never;
		responses: {
			/** @description Successful Response */
			200: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["StackDeploymentInfo"];
				};
			};
			/** @description Unauthorized */
			401: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Forbidden */
			403: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Validation Error */
			422: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["HTTPValidationError"];
				};
			};
		};
	};
	get_stack_deployment_config_api_v1_stack_deployment_config_get: {
		parameters: {
			query: {
				provider: components["schemas"]["StackDeploymentProvider"];
				stack_name: string;
				location?: string | null;
				terraform?: boolean;
			};
			header?: never;
			path?: never;
			cookie?: never;
		};
		requestBody?: never;
		responses: {
			/** @description Successful Response */
			200: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["StackDeploymentConfig"];
				};
			};
			/** @description Unauthorized */
			401: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Forbidden */
			403: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Validation Error */
			422: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["HTTPValidationError"];
				};
			};
		};
	};
	get_deployed_stack_api_v1_stack_deployment_stack_get: {
		parameters: {
			query: {
				provider: components["schemas"]["StackDeploymentProvider"];
				stack_name: string;
				location?: string | null;
				date_start?: string | null;
				terraform?: boolean;
			};
			header?: never;
			path?: never;
			cookie?: never;
		};
		requestBody?: never;
		responses: {
			/** @description Successful Response */
			200: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["DeployedStack"] | null;
				};
			};
			/** @description Unauthorized */
			401: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Forbidden */
			403: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Validation Error */
			422: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["HTTPValidationError"];
				};
			};
		};
	};
	list_stacks_api_v1_stacks_get: {
		parameters: {
			query?: {
				project_name_or_id?: string | null;
				hydrate?: boolean;
				sort_by?: string;
				logical_operator?: components["schemas"]["LogicalOperators"];
				page?: number;
				size?: number;
				id?: string | null;
				created?: string | null;
				updated?: string | null;
				scope_user?: string | null;
				user?: string | null;
				name?: string | null;
				description?: string | null;
				component_id?: string | null;
				component?: string | null;
			};
			header?: never;
			path?: never;
			cookie?: never;
		};
		requestBody?: never;
		responses: {
			/** @description Successful Response */
			200: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["Page_StackResponse_"];
				};
			};
			/** @description Unauthorized */
			401: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Forbidden */
			403: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Not Found */
			404: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Unprocessable Entity */
			422: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
		};
	};
	create_stack_api_v1_stacks_post: {
		parameters: {
			query?: {
				project_name_or_id?: string | null;
			};
			header?: never;
			path?: never;
			cookie?: never;
		};
		requestBody: {
			content: {
				"application/json": components["schemas"]["StackRequest"];
			};
		};
		responses: {
			/** @description Successful Response */
			200: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["StackResponse"];
				};
			};
			/** @description Unauthorized */
			401: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Forbidden */
			403: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Conflict */
			409: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Unprocessable Entity */
			422: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
		};
	};
	get_stack_api_v1_stacks__stack_id__get: {
		parameters: {
			query?: {
				hydrate?: boolean;
			};
			header?: never;
			path: {
				stack_id: string;
			};
			cookie?: never;
		};
		requestBody?: never;
		responses: {
			/** @description Successful Response */
			200: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["StackResponse"];
				};
			};
			/** @description Unauthorized */
			401: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Forbidden */
			403: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Not Found */
			404: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Unprocessable Entity */
			422: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
		};
	};
	update_stack_api_v1_stacks__stack_id__put: {
		parameters: {
			query?: never;
			header?: never;
			path: {
				stack_id: string;
			};
			cookie?: never;
		};
		requestBody: {
			content: {
				"application/json": components["schemas"]["StackUpdate"];
			};
		};
		responses: {
			/** @description Successful Response */
			200: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["StackResponse"];
				};
			};
			/** @description Unauthorized */
			401: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Forbidden */
			403: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Not Found */
			404: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Unprocessable Entity */
			422: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
		};
	};
	delete_stack_api_v1_stacks__stack_id__delete: {
		parameters: {
			query?: never;
			header?: never;
			path: {
				stack_id: string;
			};
			cookie?: never;
		};
		requestBody?: never;
		responses: {
			/** @description Successful Response */
			200: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": unknown;
				};
			};
			/** @description Unauthorized */
			401: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Forbidden */
			403: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Not Found */
			404: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Unprocessable Entity */
			422: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
		};
	};
	list_stack_components_api_v1_components_get: {
		parameters: {
			query?: {
				project_name_or_id?: string | null;
				hydrate?: boolean;
				sort_by?: string;
				logical_operator?: components["schemas"]["LogicalOperators"];
				page?: number;
				size?: number;
				id?: string | null;
				created?: string | null;
				updated?: string | null;
				scope_user?: string | null;
				user?: string | null;
				scope_type?: string | null;
				name?: string | null;
				flavor?: string | null;
				type?: string | null;
				connector_id?: string | null;
				stack_id?: string | null;
			};
			header?: never;
			path?: never;
			cookie?: never;
		};
		requestBody?: never;
		responses: {
			/** @description Successful Response */
			200: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["Page_ComponentResponse_"];
				};
			};
			/** @description Unauthorized */
			401: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Forbidden */
			403: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Not Found */
			404: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Unprocessable Entity */
			422: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
		};
	};
	create_stack_component_api_v1_components_post: {
		parameters: {
			query?: {
				project_name_or_id?: string | null;
			};
			header?: never;
			path?: never;
			cookie?: never;
		};
		requestBody: {
			content: {
				"application/json": components["schemas"]["ComponentRequest"];
			};
		};
		responses: {
			/** @description Successful Response */
			200: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ComponentResponse"];
				};
			};
			/** @description Unauthorized */
			401: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Forbidden */
			403: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Conflict */
			409: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Unprocessable Entity */
			422: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
		};
	};
	get_stack_component_api_v1_components__component_id__get: {
		parameters: {
			query?: {
				hydrate?: boolean;
			};
			header?: never;
			path: {
				component_id: string;
			};
			cookie?: never;
		};
		requestBody?: never;
		responses: {
			/** @description Successful Response */
			200: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ComponentResponse"];
				};
			};
			/** @description Unauthorized */
			401: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Forbidden */
			403: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Not Found */
			404: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Unprocessable Entity */
			422: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
		};
	};
	update_stack_component_api_v1_components__component_id__put: {
		parameters: {
			query?: never;
			header?: never;
			path: {
				component_id: string;
			};
			cookie?: never;
		};
		requestBody: {
			content: {
				"application/json": components["schemas"]["ComponentUpdate"];
			};
		};
		responses: {
			/** @description Successful Response */
			200: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ComponentResponse"];
				};
			};
			/** @description Unauthorized */
			401: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Forbidden */
			403: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Not Found */
			404: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Unprocessable Entity */
			422: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
		};
	};
	deregister_stack_component_api_v1_components__component_id__delete: {
		parameters: {
			query?: never;
			header?: never;
			path: {
				component_id: string;
			};
			cookie?: never;
		};
		requestBody?: never;
		responses: {
			/** @description Successful Response */
			200: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": unknown;
				};
			};
			/** @description Unauthorized */
			401: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Forbidden */
			403: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Not Found */
			404: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Unprocessable Entity */
			422: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
		};
	};
	get_stack_component_types_api_v1_component_types_get: {
		parameters: {
			query?: never;
			header?: never;
			path?: never;
			cookie?: never;
		};
		requestBody?: never;
		responses: {
			/** @description Successful Response */
			200: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": string[];
				};
			};
			/** @description Unauthorized */
			401: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Forbidden */
			403: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Not Found */
			404: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Unprocessable Entity */
			422: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
		};
	};
	list_run_steps_api_v1_steps_get: {
		parameters: {
			query?: {
				hydrate?: boolean;
				sort_by?: string;
				logical_operator?: components["schemas"]["LogicalOperators"];
				page?: number;
				size?: number;
				id?: string | null;
				created?: string | null;
				updated?: string | null;
				run_metadata?: string[] | null;
				scope_user?: string | null;
				user?: string | null;
				project?: string | null;
				name?: string | null;
				code_hash?: string | null;
				cache_key?: string | null;
				status?: string | null;
				start_time?: string | null;
				end_time?: string | null;
				pipeline_run_id?: string | null;
				deployment_id?: string | null;
				original_step_run_id?: string | null;
				model_version_id?: string | null;
				model?: string | null;
			};
			header?: never;
			path?: never;
			cookie?: never;
		};
		requestBody?: never;
		responses: {
			/** @description Successful Response */
			200: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["Page_StepRunResponse_"];
				};
			};
			/** @description Unauthorized */
			401: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Forbidden */
			403: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Not Found */
			404: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Unprocessable Entity */
			422: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
		};
	};
	create_run_step_api_v1_steps_post: {
		parameters: {
			query?: never;
			header?: never;
			path?: never;
			cookie?: never;
		};
		requestBody: {
			content: {
				"application/json": components["schemas"]["StepRunRequest"];
			};
		};
		responses: {
			/** @description Successful Response */
			200: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["StepRunResponse"];
				};
			};
			/** @description Unauthorized */
			401: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Forbidden */
			403: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Conflict */
			409: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Unprocessable Entity */
			422: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
		};
	};
	get_step_api_v1_steps__step_id__get: {
		parameters: {
			query?: {
				hydrate?: boolean;
			};
			header?: never;
			path: {
				step_id: string;
			};
			cookie?: never;
		};
		requestBody?: never;
		responses: {
			/** @description Successful Response */
			200: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["StepRunResponse"];
				};
			};
			/** @description Unauthorized */
			401: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Forbidden */
			403: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Not Found */
			404: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Unprocessable Entity */
			422: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
		};
	};
	update_step_api_v1_steps__step_id__put: {
		parameters: {
			query?: never;
			header?: never;
			path: {
				step_id: string;
			};
			cookie?: never;
		};
		requestBody: {
			content: {
				"application/json": components["schemas"]["StepRunUpdate"];
			};
		};
		responses: {
			/** @description Successful Response */
			200: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["StepRunResponse"];
				};
			};
			/** @description Unauthorized */
			401: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Forbidden */
			403: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Not Found */
			404: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Unprocessable Entity */
			422: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
		};
	};
	get_step_configuration_api_v1_steps__step_id__step_configuration_get: {
		parameters: {
			query?: never;
			header?: never;
			path: {
				step_id: string;
			};
			cookie?: never;
		};
		requestBody?: never;
		responses: {
			/** @description Successful Response */
			200: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": {
						[key: string]: unknown;
					};
				};
			};
			/** @description Unauthorized */
			401: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Forbidden */
			403: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Not Found */
			404: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Unprocessable Entity */
			422: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
		};
	};
	get_step_status_api_v1_steps__step_id__status_get: {
		parameters: {
			query?: never;
			header?: never;
			path: {
				step_id: string;
			};
			cookie?: never;
		};
		requestBody?: never;
		responses: {
			/** @description Successful Response */
			200: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ExecutionStatus"];
				};
			};
			/** @description Unauthorized */
			401: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Forbidden */
			403: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Not Found */
			404: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Unprocessable Entity */
			422: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
		};
	};
	get_step_logs_api_v1_steps__step_id__logs_get: {
		parameters: {
			query?: {
				offset?: number;
				length?: number;
			};
			header?: never;
			path: {
				step_id: string;
			};
			cookie?: never;
		};
		requestBody?: never;
		responses: {
			/** @description Successful Response */
			200: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": string;
				};
			};
			/** @description Unauthorized */
			401: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Forbidden */
			403: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Not Found */
			404: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Unprocessable Entity */
			422: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
		};
	};
	list_tags_api_v1_tags_get: {
		parameters: {
			query?: {
				hydrate?: boolean;
				sort_by?: string;
				logical_operator?: components["schemas"]["LogicalOperators"];
				page?: number;
				size?: number;
				id?: string | null;
				created?: string | null;
				updated?: string | null;
				scope_user?: string | null;
				user?: string | null;
				name?: string | null;
				color?: components["schemas"]["ColorVariants"] | null;
				exclusive?: boolean | null;
				resource_type?: components["schemas"]["TaggableResourceTypes"] | null;
			};
			header?: never;
			path?: never;
			cookie?: never;
		};
		requestBody?: never;
		responses: {
			/** @description Successful Response */
			200: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["Page_TagResponse_"];
				};
			};
			/** @description Unauthorized */
			401: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Forbidden */
			403: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Not Found */
			404: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Unprocessable Entity */
			422: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
		};
	};
	create_tag_api_v1_tags_post: {
		parameters: {
			query?: never;
			header?: never;
			path?: never;
			cookie?: never;
		};
		requestBody: {
			content: {
				"application/json": components["schemas"]["TagRequest"];
			};
		};
		responses: {
			/** @description Successful Response */
			200: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["TagResponse"];
				};
			};
			/** @description Unauthorized */
			401: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Forbidden */
			403: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Conflict */
			409: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Unprocessable Entity */
			422: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
		};
	};
	get_tag_api_v1_tags__tag_name_or_id__get: {
		parameters: {
			query?: {
				hydrate?: boolean;
			};
			header?: never;
			path: {
				tag_name_or_id: string;
			};
			cookie?: never;
		};
		requestBody?: never;
		responses: {
			/** @description Successful Response */
			200: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["TagResponse"];
				};
			};
			/** @description Unauthorized */
			401: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Forbidden */
			403: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Not Found */
			404: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Unprocessable Entity */
			422: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
		};
	};
	delete_tag_api_v1_tags__tag_name_or_id__delete: {
		parameters: {
			query?: never;
			header?: never;
			path: {
				tag_name_or_id: string;
			};
			cookie?: never;
		};
		requestBody?: never;
		responses: {
			/** @description Successful Response */
			200: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": unknown;
				};
			};
			/** @description Unauthorized */
			401: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Forbidden */
			403: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Not Found */
			404: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Unprocessable Entity */
			422: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
		};
	};
	update_tag_api_v1_tags__tag_id__put: {
		parameters: {
			query?: never;
			header?: never;
			path: {
				tag_id: string;
			};
			cookie?: never;
		};
		requestBody: {
			content: {
				"application/json": components["schemas"]["TagUpdate"];
			};
		};
		responses: {
			/** @description Successful Response */
			200: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["TagResponse"];
				};
			};
			/** @description Unauthorized */
			401: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Forbidden */
			403: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Not Found */
			404: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Unprocessable Entity */
			422: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
		};
	};
	create_tag_resource_api_v1_tag_resources_post: {
		parameters: {
			query?: never;
			header?: never;
			path?: never;
			cookie?: never;
		};
		requestBody: {
			content: {
				"application/json": components["schemas"]["TagResourceRequest"];
			};
		};
		responses: {
			/** @description Successful Response */
			200: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["TagResourceResponse"];
				};
			};
			/** @description Unauthorized */
			401: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Forbidden */
			403: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Not Found */
			404: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Unprocessable Entity */
			422: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
		};
	};
	delete_tag_resource_api_v1_tag_resources_delete: {
		parameters: {
			query?: never;
			header?: never;
			path?: never;
			cookie?: never;
		};
		requestBody: {
			content: {
				"application/json": components["schemas"]["TagResourceRequest"];
			};
		};
		responses: {
			/** @description Successful Response */
			200: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": unknown;
				};
			};
			/** @description Unauthorized */
			401: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Forbidden */
			403: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Not Found */
			404: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Unprocessable Entity */
			422: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
		};
	};
	batch_create_tag_resource_api_v1_tag_resources_batch_post: {
		parameters: {
			query?: never;
			header?: never;
			path?: never;
			cookie?: never;
		};
		requestBody: {
			content: {
				"application/json": components["schemas"]["TagResourceRequest"][];
			};
		};
		responses: {
			/** @description Successful Response */
			200: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["TagResourceResponse"][];
				};
			};
			/** @description Unauthorized */
			401: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Forbidden */
			403: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Conflict */
			409: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Unprocessable Entity */
			422: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
		};
	};
	batch_delete_tag_resource_api_v1_tag_resources_batch_delete: {
		parameters: {
			query?: never;
			header?: never;
			path?: never;
			cookie?: never;
		};
		requestBody: {
			content: {
				"application/json": components["schemas"]["TagResourceRequest"][];
			};
		};
		responses: {
			/** @description Successful Response */
			200: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": unknown;
				};
			};
			/** @description Unauthorized */
			401: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Forbidden */
			403: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Not Found */
			404: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Unprocessable Entity */
			422: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
		};
	};
	list_triggers_api_v1_triggers_get: {
		parameters: {
			query?: {
				hydrate?: boolean;
				sort_by?: string;
				logical_operator?: components["schemas"]["LogicalOperators"];
				page?: number;
				size?: number;
				id?: string | null;
				created?: string | null;
				updated?: string | null;
				scope_user?: string | null;
				user?: string | null;
				project?: string | null;
				name?: string | null;
				event_source_id?: string | null;
				action_id?: string | null;
				is_active?: boolean | null;
				action_flavor?: string | null;
				action_subtype?: string | null;
				event_source_flavor?: string | null;
				event_source_subtype?: string | null;
			};
			header?: never;
			path?: never;
			cookie?: never;
		};
		requestBody?: never;
		responses: {
			/** @description Successful Response */
			200: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["Page_TriggerResponse_"];
				};
			};
			/** @description Unauthorized */
			401: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Forbidden */
			403: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Not Found */
			404: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Unprocessable Entity */
			422: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
		};
	};
	create_trigger_api_v1_triggers_post: {
		parameters: {
			query?: never;
			header?: never;
			path?: never;
			cookie?: never;
		};
		requestBody: {
			content: {
				"application/json": components["schemas"]["TriggerRequest"];
			};
		};
		responses: {
			/** @description Successful Response */
			200: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["TriggerResponse"];
				};
			};
			/** @description Unauthorized */
			401: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Forbidden */
			403: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Conflict */
			409: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Unprocessable Entity */
			422: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
		};
	};
	get_trigger_api_v1_triggers__trigger_id__get: {
		parameters: {
			query?: {
				hydrate?: boolean;
			};
			header?: never;
			path: {
				trigger_id: string;
			};
			cookie?: never;
		};
		requestBody?: never;
		responses: {
			/** @description Successful Response */
			200: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["TriggerResponse"];
				};
			};
			/** @description Unauthorized */
			401: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Forbidden */
			403: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Not Found */
			404: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Unprocessable Entity */
			422: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
		};
	};
	update_trigger_api_v1_triggers__trigger_id__put: {
		parameters: {
			query?: never;
			header?: never;
			path: {
				trigger_id: string;
			};
			cookie?: never;
		};
		requestBody: {
			content: {
				"application/json": components["schemas"]["TriggerUpdate"];
			};
		};
		responses: {
			/** @description Successful Response */
			200: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["TriggerResponse"];
				};
			};
			/** @description Unauthorized */
			401: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Forbidden */
			403: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Not Found */
			404: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Unprocessable Entity */
			422: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
		};
	};
	delete_trigger_api_v1_triggers__trigger_id__delete: {
		parameters: {
			query?: never;
			header?: never;
			path: {
				trigger_id: string;
			};
			cookie?: never;
		};
		requestBody?: never;
		responses: {
			/** @description Successful Response */
			200: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": unknown;
				};
			};
			/** @description Unauthorized */
			401: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Forbidden */
			403: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Not Found */
			404: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Unprocessable Entity */
			422: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
		};
	};
	list_users_api_v1_users_get: {
		parameters: {
			query?: {
				hydrate?: boolean;
				sort_by?: string;
				logical_operator?: components["schemas"]["LogicalOperators"];
				page?: number;
				size?: number;
				id?: string | null;
				created?: string | null;
				updated?: string | null;
				name?: string | null;
				full_name?: string | null;
				email?: string | null;
				active?: boolean | string | null;
				email_opted_in?: boolean | string | null;
				external_user_id?: string | null;
			};
			header?: never;
			path?: never;
			cookie?: never;
		};
		requestBody?: never;
		responses: {
			/** @description Successful Response */
			200: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["Page_UserResponse_"];
				};
			};
			/** @description Unauthorized */
			401: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Not Found */
			404: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Unprocessable Entity */
			422: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
		};
	};
	create_user_api_v1_users_post: {
		parameters: {
			query?: never;
			header?: never;
			path?: never;
			cookie?: never;
		};
		requestBody: {
			content: {
				"application/json": components["schemas"]["UserRequest"];
			};
		};
		responses: {
			/** @description Successful Response */
			200: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["UserResponse"];
				};
			};
			/** @description Unauthorized */
			401: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Conflict */
			409: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Unprocessable Entity */
			422: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
		};
	};
	get_user_api_v1_users__user_name_or_id__get: {
		parameters: {
			query?: {
				hydrate?: boolean;
			};
			header?: never;
			path: {
				user_name_or_id: string;
			};
			cookie?: never;
		};
		requestBody?: never;
		responses: {
			/** @description Successful Response */
			200: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["UserResponse"];
				};
			};
			/** @description Unauthorized */
			401: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Not Found */
			404: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Unprocessable Entity */
			422: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
		};
	};
	update_user_api_v1_users__user_name_or_id__put: {
		parameters: {
			query?: never;
			header?: never;
			path: {
				user_name_or_id: string;
			};
			cookie?: never;
		};
		requestBody: {
			content: {
				"application/json": components["schemas"]["UserUpdate"];
			};
		};
		responses: {
			/** @description Successful Response */
			200: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["UserResponse"];
				};
			};
			/** @description Unauthorized */
			401: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Not Found */
			404: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Unprocessable Entity */
			422: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
		};
	};
	delete_user_api_v1_users__user_name_or_id__delete: {
		parameters: {
			query?: never;
			header?: never;
			path: {
				user_name_or_id: string;
			};
			cookie?: never;
		};
		requestBody?: never;
		responses: {
			/** @description Successful Response */
			200: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": unknown;
				};
			};
			/** @description Unauthorized */
			401: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Not Found */
			404: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Unprocessable Entity */
			422: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
		};
	};
	deactivate_user_api_v1_users__user_name_or_id__deactivate_put: {
		parameters: {
			query?: never;
			header?: never;
			path: {
				user_name_or_id: string;
			};
			cookie?: never;
		};
		requestBody?: never;
		responses: {
			/** @description Successful Response */
			200: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["UserResponse"];
				};
			};
			/** @description Unauthorized */
			401: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Not Found */
			404: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Unprocessable Entity */
			422: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
		};
	};
	email_opt_in_response_api_v1_users__user_name_or_id__email_opt_in_put: {
		parameters: {
			query?: never;
			header?: never;
			path: {
				user_name_or_id: string;
			};
			cookie?: never;
		};
		requestBody: {
			content: {
				"application/json": components["schemas"]["UserUpdate"];
			};
		};
		responses: {
			/** @description Successful Response */
			200: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["UserResponse"];
				};
			};
			/** @description Unauthorized */
			401: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Not Found */
			404: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Unprocessable Entity */
			422: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
		};
	};
	get_current_user_api_v1_current_user_get: {
		parameters: {
			query?: never;
			header?: never;
			path?: never;
			cookie?: never;
		};
		requestBody?: never;
		responses: {
			/** @description Successful Response */
			200: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["UserResponse"];
				};
			};
			/** @description Unauthorized */
			401: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Not Found */
			404: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Unprocessable Entity */
			422: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
		};
	};
	update_myself_api_v1_current_user_put: {
		parameters: {
			query?: never;
			header?: never;
			path?: never;
			cookie?: never;
		};
		requestBody: {
			content: {
				"application/json": components["schemas"]["UserUpdate"];
			};
		};
		responses: {
			/** @description Successful Response */
			200: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["UserResponse"];
				};
			};
			/** @description Unauthorized */
			401: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Not Found */
			404: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Unprocessable Entity */
			422: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
		};
	};
	webhook_api_v1_webhooks__event_source_id__post: {
		parameters: {
			query?: never;
			header?: never;
			path: {
				event_source_id: string;
			};
			cookie?: never;
		};
		requestBody?: never;
		responses: {
			/** @description Successful Response */
			200: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": {
						[key: string]: unknown;
					};
				};
			};
			/** @description Validation Error */
			422: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["HTTPValidationError"];
				};
			};
		};
	};
	list_projects_api_v1_workspaces_get: {
		parameters: {
			query?: {
				hydrate?: boolean;
				sort_by?: string;
				logical_operator?: components["schemas"]["LogicalOperators"];
				page?: number;
				size?: number;
				id?: string | null;
				created?: string | null;
				updated?: string | null;
				name?: string | null;
				display_name?: string | null;
			};
			header?: never;
			path?: never;
			cookie?: never;
		};
		requestBody?: never;
		responses: {
			/** @description Successful Response */
			200: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["Page_ProjectResponse_"];
				};
			};
			/** @description Unauthorized */
			401: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Not Found */
			404: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Unprocessable Entity */
			422: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
		};
	};
	create_project_api_v1_workspaces_post: {
		parameters: {
			query?: never;
			header?: never;
			path?: never;
			cookie?: never;
		};
		requestBody: {
			content: {
				"application/json": components["schemas"]["ProjectRequest"];
			};
		};
		responses: {
			/** @description Successful Response */
			200: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ProjectResponse"];
				};
			};
			/** @description Unauthorized */
			401: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Conflict */
			409: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Unprocessable Entity */
			422: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
		};
	};
	get_project_api_v1_workspaces__project_name_or_id__get: {
		parameters: {
			query?: {
				hydrate?: boolean;
			};
			header?: never;
			path: {
				project_name_or_id: string;
			};
			cookie?: never;
		};
		requestBody?: never;
		responses: {
			/** @description Successful Response */
			200: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ProjectResponse"];
				};
			};
			/** @description Unauthorized */
			401: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Not Found */
			404: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Unprocessable Entity */
			422: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
		};
	};
	update_project_api_v1_workspaces__project_name_or_id__put: {
		parameters: {
			query?: never;
			header?: never;
			path: {
				project_name_or_id: string;
			};
			cookie?: never;
		};
		requestBody: {
			content: {
				"application/json": components["schemas"]["ProjectUpdate"];
			};
		};
		responses: {
			/** @description Successful Response */
			200: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ProjectResponse"];
				};
			};
			/** @description Unauthorized */
			401: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Not Found */
			404: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Unprocessable Entity */
			422: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
		};
	};
	delete_project_api_v1_workspaces__project_name_or_id__delete: {
		parameters: {
			query?: never;
			header?: never;
			path: {
				project_name_or_id: string;
			};
			cookie?: never;
		};
		requestBody?: never;
		responses: {
			/** @description Successful Response */
			200: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": unknown;
				};
			};
			/** @description Unauthorized */
			401: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Not Found */
			404: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Unprocessable Entity */
			422: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
		};
	};
	get_project_statistics_api_v1_workspaces__project_name_or_id__statistics_get: {
		parameters: {
			query?: never;
			header?: never;
			path: {
				project_name_or_id: string;
			};
			cookie?: never;
		};
		requestBody?: never;
		responses: {
			/** @description Successful Response */
			200: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ProjectStatistics"];
				};
			};
			/** @description Unauthorized */
			401: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Not Found */
			404: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Unprocessable Entity */
			422: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
		};
	};
	list_code_repositories_api_v1_workspaces__project_name_or_id__code_repositories_get: {
		parameters: {
			query?: {
				hydrate?: boolean;
				sort_by?: string;
				logical_operator?: components["schemas"]["LogicalOperators"];
				page?: number;
				size?: number;
				id?: string | null;
				created?: string | null;
				updated?: string | null;
				scope_user?: string | null;
				user?: string | null;
				project?: string | null;
				name?: string | null;
			};
			header?: never;
			path: {
				project_name_or_id: string | null;
			};
			cookie?: never;
		};
		requestBody?: never;
		responses: {
			/** @description Successful Response */
			200: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["Page_CodeRepositoryResponse_"];
				};
			};
			/** @description Unauthorized */
			401: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Not Found */
			404: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Unprocessable Entity */
			422: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
		};
	};
	create_code_repository_api_v1_workspaces__project_name_or_id__code_repositories_post: {
		parameters: {
			query?: never;
			header?: never;
			path: {
				project_name_or_id: string | null;
			};
			cookie?: never;
		};
		requestBody: {
			content: {
				"application/json": components["schemas"]["CodeRepositoryRequest"];
			};
		};
		responses: {
			/** @description Successful Response */
			200: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["CodeRepositoryResponse"];
				};
			};
			/** @description Unauthorized */
			401: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Conflict */
			409: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Unprocessable Entity */
			422: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
		};
	};
	create_model_api_v1_workspaces__project_name_or_id__models_post: {
		parameters: {
			query?: never;
			header?: never;
			path: {
				project_name_or_id: string | null;
			};
			cookie?: never;
		};
		requestBody: {
			content: {
				"application/json": components["schemas"]["ModelRequest"];
			};
		};
		responses: {
			/** @description Successful Response */
			200: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ModelResponse"];
				};
			};
			/** @description Unauthorized */
			401: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Conflict */
			409: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Unprocessable Entity */
			422: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
		};
	};
	create_model_version_api_v1_workspaces__project_name_or_id__models__model_id__model_versions_post: {
		parameters: {
			query?: never;
			header?: never;
			path: {
				model_id: string | null;
				project_name_or_id: string | null;
			};
			cookie?: never;
		};
		requestBody: {
			content: {
				"application/json": components["schemas"]["ModelVersionRequest"];
			};
		};
		responses: {
			/** @description Successful Response */
			200: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ModelVersionResponse"];
				};
			};
			/** @description Unauthorized */
			401: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Conflict */
			409: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Unprocessable Entity */
			422: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
		};
	};
	list_builds_api_v1_workspaces__project_name_or_id__pipeline_builds_get: {
		parameters: {
			query?: {
				hydrate?: boolean;
				sort_by?: string;
				logical_operator?: components["schemas"]["LogicalOperators"];
				page?: number;
				size?: number;
				id?: string | null;
				created?: string | null;
				updated?: string | null;
				scope_user?: string | null;
				user?: string | null;
				project?: string | null;
				pipeline_id?: string | null;
				stack_id?: string | null;
				container_registry_id?: string | null;
				is_local?: boolean | null;
				contains_code?: boolean | null;
				zenml_version?: string | null;
				python_version?: string | null;
				checksum?: string | null;
				stack_checksum?: string | null;
				duration?: number | string | null;
			};
			header?: never;
			path: {
				project_name_or_id: string | null;
			};
			cookie?: never;
		};
		requestBody?: never;
		responses: {
			/** @description Successful Response */
			200: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["Page_PipelineBuildResponse_"];
				};
			};
			/** @description Unauthorized */
			401: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Not Found */
			404: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Unprocessable Entity */
			422: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
		};
	};
	create_build_api_v1_workspaces__project_name_or_id__pipeline_builds_post: {
		parameters: {
			query?: never;
			header?: never;
			path: {
				project_name_or_id: string | null;
			};
			cookie?: never;
		};
		requestBody: {
			content: {
				"application/json": components["schemas"]["PipelineBuildRequest"];
			};
		};
		responses: {
			/** @description Successful Response */
			200: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["PipelineBuildResponse"];
				};
			};
			/** @description Unauthorized */
			401: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Conflict */
			409: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Unprocessable Entity */
			422: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
		};
	};
	list_deployments_api_v1_workspaces__project_name_or_id__pipeline_deployments_get: {
		parameters: {
			query?: {
				hydrate?: boolean;
				sort_by?: string;
				logical_operator?: components["schemas"]["LogicalOperators"];
				page?: number;
				size?: number;
				id?: string | null;
				created?: string | null;
				updated?: string | null;
				scope_user?: string | null;
				user?: string | null;
				project?: string | null;
				pipeline_id?: string | null;
				stack_id?: string | null;
				build_id?: string | null;
				schedule_id?: string | null;
				template_id?: string | null;
			};
			header?: never;
			path: {
				project_name_or_id: string | null;
			};
			cookie?: never;
		};
		requestBody?: never;
		responses: {
			/** @description Successful Response */
			200: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["Page_PipelineDeploymentResponse_"];
				};
			};
			/** @description Unauthorized */
			401: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Not Found */
			404: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Unprocessable Entity */
			422: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
		};
	};
	create_deployment_api_v1_workspaces__project_name_or_id__pipeline_deployments_post: {
		parameters: {
			query?: never;
			header?: never;
			path: {
				project_name_or_id: string | null;
			};
			cookie?: never;
		};
		requestBody: {
			content: {
				"application/json": components["schemas"]["PipelineDeploymentRequest"];
			};
		};
		responses: {
			/** @description Successful Response */
			200: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["PipelineDeploymentResponse"];
				};
			};
			/** @description Unauthorized */
			401: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Conflict */
			409: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Unprocessable Entity */
			422: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
		};
	};
	list_pipelines_api_v1_workspaces__project_name_or_id__pipelines_get: {
		parameters: {
			query?: {
				hydrate?: boolean;
				sort_by?: string;
				logical_operator?: components["schemas"]["LogicalOperators"];
				page?: number;
				size?: number;
				id?: string | null;
				created?: string | null;
				updated?: string | null;
				tag?: string | null;
				tags?: string[] | null;
				scope_user?: string | null;
				user?: string | null;
				project?: string | null;
				name?: string | null;
				latest_run_status?: string | null;
			};
			header?: never;
			path: {
				project_name_or_id: string | null;
			};
			cookie?: never;
		};
		requestBody?: never;
		responses: {
			/** @description Successful Response */
			200: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["Page_PipelineResponse_"];
				};
			};
			/** @description Unauthorized */
			401: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Not Found */
			404: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Unprocessable Entity */
			422: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
		};
	};
	create_pipeline_api_v1_workspaces__project_name_or_id__pipelines_post: {
		parameters: {
			query?: never;
			header?: never;
			path: {
				project_name_or_id: string | null;
			};
			cookie?: never;
		};
		requestBody: {
			content: {
				"application/json": components["schemas"]["PipelineRequest"];
			};
		};
		responses: {
			/** @description Successful Response */
			200: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["PipelineResponse"];
				};
			};
			/** @description Unauthorized */
			401: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Conflict */
			409: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Unprocessable Entity */
			422: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
		};
	};
	create_run_metadata_api_v1_workspaces__project_name_or_id__run_metadata_post: {
		parameters: {
			query?: never;
			header?: never;
			path: {
				project_name_or_id: string | null;
			};
			cookie?: never;
		};
		requestBody: {
			content: {
				"application/json": components["schemas"]["RunMetadataRequest"];
			};
		};
		responses: {
			/** @description Successful Response */
			200: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": unknown;
				};
			};
			/** @description Unauthorized */
			401: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Conflict */
			409: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Unprocessable Entity */
			422: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
		};
	};
	list_run_templates_api_v1_workspaces__project_name_or_id__run_templates_get: {
		parameters: {
			query?: {
				hydrate?: boolean;
				sort_by?: string;
				logical_operator?: components["schemas"]["LogicalOperators"];
				page?: number;
				size?: number;
				id?: string | null;
				created?: string | null;
				updated?: string | null;
				tag?: string | null;
				tags?: string[] | null;
				scope_user?: string | null;
				user?: string | null;
				project?: string | null;
				name?: string | null;
				hidden?: boolean | null;
				pipeline_id?: string | null;
				build_id?: string | null;
				stack_id?: string | null;
				code_repository_id?: string | null;
				pipeline?: string | null;
				stack?: string | null;
			};
			header?: never;
			path: {
				project_name_or_id: string | null;
			};
			cookie?: never;
		};
		requestBody?: never;
		responses: {
			/** @description Successful Response */
			200: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["Page_RunTemplateResponse_"];
				};
			};
			/** @description Unauthorized */
			401: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Not Found */
			404: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Unprocessable Entity */
			422: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
		};
	};
	create_run_template_api_v1_workspaces__project_name_or_id__run_templates_post: {
		parameters: {
			query?: never;
			header?: never;
			path: {
				project_name_or_id: string | null;
			};
			cookie?: never;
		};
		requestBody: {
			content: {
				"application/json": components["schemas"]["RunTemplateRequest"];
			};
		};
		responses: {
			/** @description Successful Response */
			200: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["RunTemplateResponse"];
				};
			};
			/** @description Unauthorized */
			401: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Conflict */
			409: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Unprocessable Entity */
			422: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
		};
	};
	list_runs_api_v1_workspaces__project_name_or_id__runs_get: {
		parameters: {
			query?: {
				hydrate?: boolean;
				sort_by?: string;
				logical_operator?: components["schemas"]["LogicalOperators"];
				page?: number;
				size?: number;
				id?: string | null;
				created?: string | null;
				updated?: string | null;
				run_metadata?: string[] | null;
				tag?: string | null;
				tags?: string[] | null;
				scope_user?: string | null;
				user?: string | null;
				project?: string | null;
				name?: string | null;
				orchestrator_run_id?: string | null;
				pipeline_id?: string | null;
				stack_id?: string | null;
				schedule_id?: string | null;
				build_id?: string | null;
				deployment_id?: string | null;
				code_repository_id?: string | null;
				template_id?: string | null;
				model_version_id?: string | null;
				status?: string | null;
				start_time?: string | null;
				end_time?: string | null;
				unlisted?: boolean | null;
				pipeline_name?: string | null;
				pipeline?: string | null;
				stack?: string | null;
				code_repository?: string | null;
				model?: string | null;
				stack_component?: string | null;
				templatable?: boolean | null;
			};
			header?: never;
			path: {
				project_name_or_id: string | null;
			};
			cookie?: never;
		};
		requestBody?: never;
		responses: {
			/** @description Successful Response */
			200: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["Page_PipelineRunResponse_"];
				};
			};
			/** @description Unauthorized */
			401: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Not Found */
			404: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Unprocessable Entity */
			422: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
		};
	};
	get_or_create_pipeline_run_api_v1_workspaces__project_name_or_id__runs_post: {
		parameters: {
			query?: never;
			header?: never;
			path: {
				project_name_or_id: string | null;
			};
			cookie?: never;
		};
		requestBody: {
			content: {
				"application/json": components["schemas"]["PipelineRunRequest"];
			};
		};
		responses: {
			/** @description Successful Response */
			200: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": [
						components["schemas"]["PipelineRunResponse"],
						boolean,
					];
				};
			};
			/** @description Unauthorized */
			401: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Conflict */
			409: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Unprocessable Entity */
			422: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
		};
	};
	list_schedules_api_v1_workspaces__project_name_or_id__schedules_get: {
		parameters: {
			query?: {
				hydrate?: boolean;
				sort_by?: string;
				logical_operator?: components["schemas"]["LogicalOperators"];
				page?: number;
				size?: number;
				id?: string | null;
				created?: string | null;
				updated?: string | null;
				scope_user?: string | null;
				user?: string | null;
				project?: string | null;
				pipeline_id?: string | null;
				orchestrator_id?: string | null;
				active?: boolean | null;
				cron_expression?: string | null;
				start_time?: string | null;
				end_time?: string | null;
				interval_second?: number | null;
				catchup?: boolean | null;
				name?: string | null;
				run_once_start_time?: string | null;
			};
			header?: never;
			path: {
				project_name_or_id: string | null;
			};
			cookie?: never;
		};
		requestBody?: never;
		responses: {
			/** @description Successful Response */
			200: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["Page_ScheduleResponse_"];
				};
			};
			/** @description Unauthorized */
			401: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Not Found */
			404: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Unprocessable Entity */
			422: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
		};
	};
	create_schedule_api_v1_workspaces__project_name_or_id__schedules_post: {
		parameters: {
			query?: never;
			header?: never;
			path: {
				project_name_or_id: string | null;
			};
			cookie?: never;
		};
		requestBody: {
			content: {
				"application/json": components["schemas"]["ScheduleRequest"];
			};
		};
		responses: {
			/** @description Successful Response */
			200: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ScheduleResponse"];
				};
			};
			/** @description Unauthorized */
			401: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Conflict */
			409: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Unprocessable Entity */
			422: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
		};
	};
	create_secret_api_v1_workspaces__workspace_name_or_id__secrets_post: {
		parameters: {
			query?: never;
			header?: never;
			path: {
				workspace_name_or_id: string | null;
			};
			cookie?: never;
		};
		requestBody: {
			content: {
				"application/json": components["schemas"]["SecretRequest"];
			};
		};
		responses: {
			/** @description Successful Response */
			200: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["SecretResponse"];
				};
			};
			/** @description Unauthorized */
			401: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Conflict */
			409: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Unprocessable Entity */
			422: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
		};
	};
	list_service_connectors_api_v1_workspaces__project_name_or_id__service_connectors_get: {
		parameters: {
			query?: {
				expand_secrets?: boolean;
				hydrate?: boolean;
				sort_by?: string;
				logical_operator?: components["schemas"]["LogicalOperators"];
				page?: number;
				size?: number;
				id?: string | null;
				created?: string | null;
				updated?: string | null;
				scope_user?: string | null;
				user?: string | null;
				name?: string | null;
				connector_type?: string | null;
				auth_method?: string | null;
				resource_type?: string | null;
				resource_id?: string | null;
				labels_str?: string | null;
				secret_id?: string | null;
			};
			header?: never;
			path: {
				project_name_or_id: string | null;
			};
			cookie?: never;
		};
		requestBody?: {
			content: {
				"application/json": {
					[key: string]: unknown;
				} | null;
			};
		};
		responses: {
			/** @description Successful Response */
			200: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["Page_ServiceConnectorResponse_"];
				};
			};
			/** @description Unauthorized */
			401: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Not Found */
			404: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Unprocessable Entity */
			422: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
		};
	};
	create_service_connector_api_v1_workspaces__project_name_or_id__service_connectors_post: {
		parameters: {
			query?: never;
			header?: never;
			path: {
				project_name_or_id: string | null;
			};
			cookie?: never;
		};
		requestBody: {
			content: {
				"application/json": components["schemas"]["ServiceConnectorRequest"];
			};
		};
		responses: {
			/** @description Successful Response */
			200: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ServiceConnectorResponse"];
				};
			};
			/** @description Unauthorized */
			401: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Conflict */
			409: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Unprocessable Entity */
			422: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
		};
	};
	list_service_connector_resources_api_v1_workspaces__project_name_or_id__resources_get: {
		parameters: {
			query?: {
				sort_by?: string;
				logical_operator?: components["schemas"]["LogicalOperators"];
				page?: number;
				size?: number;
				id?: string | null;
				created?: string | null;
				updated?: string | null;
				scope_user?: string | null;
				user?: string | null;
				name?: string | null;
				connector_type?: string | null;
				auth_method?: string | null;
				resource_type?: string | null;
				resource_id?: string | null;
				labels_str?: string | null;
				secret_id?: string | null;
			};
			header?: never;
			path: {
				project_name_or_id: string | null;
			};
			cookie?: never;
		};
		requestBody?: {
			content: {
				"application/json": {
					[key: string]: unknown;
				} | null;
			};
		};
		responses: {
			/** @description Successful Response */
			200: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ServiceConnectorResourcesModel"][];
				};
			};
			/** @description Unauthorized */
			401: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Not Found */
			404: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Unprocessable Entity */
			422: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
		};
	};
	create_service_api_v1_workspaces__project_name_or_id__services_post: {
		parameters: {
			query?: never;
			header?: never;
			path: {
				project_name_or_id: string | null;
			};
			cookie?: never;
		};
		requestBody: {
			content: {
				"application/json": components["schemas"]["ServiceRequest"];
			};
		};
		responses: {
			/** @description Successful Response */
			200: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ServiceResponse"];
				};
			};
			/** @description Unauthorized */
			401: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Conflict */
			409: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Unprocessable Entity */
			422: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
		};
	};
	list_stack_components_api_v1_workspaces__project_name_or_id__components_get: {
		parameters: {
			query?: {
				hydrate?: boolean;
				sort_by?: string;
				logical_operator?: components["schemas"]["LogicalOperators"];
				page?: number;
				size?: number;
				id?: string | null;
				created?: string | null;
				updated?: string | null;
				scope_user?: string | null;
				user?: string | null;
				scope_type?: string | null;
				name?: string | null;
				flavor?: string | null;
				type?: string | null;
				connector_id?: string | null;
				stack_id?: string | null;
			};
			header?: never;
			path: {
				project_name_or_id: string | null;
			};
			cookie?: never;
		};
		requestBody?: never;
		responses: {
			/** @description Successful Response */
			200: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["Page_ComponentResponse_"];
				};
			};
			/** @description Unauthorized */
			401: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Not Found */
			404: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Unprocessable Entity */
			422: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
		};
	};
	create_stack_component_api_v1_workspaces__project_name_or_id__components_post: {
		parameters: {
			query?: never;
			header?: never;
			path: {
				project_name_or_id: string | null;
			};
			cookie?: never;
		};
		requestBody: {
			content: {
				"application/json": components["schemas"]["ComponentRequest"];
			};
		};
		responses: {
			/** @description Successful Response */
			200: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ComponentResponse"];
				};
			};
			/** @description Unauthorized */
			401: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Conflict */
			409: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Unprocessable Entity */
			422: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
		};
	};
	list_stacks_api_v1_workspaces__project_name_or_id__stacks_get: {
		parameters: {
			query?: {
				hydrate?: boolean;
				sort_by?: string;
				logical_operator?: components["schemas"]["LogicalOperators"];
				page?: number;
				size?: number;
				id?: string | null;
				created?: string | null;
				updated?: string | null;
				scope_user?: string | null;
				user?: string | null;
				name?: string | null;
				description?: string | null;
				component_id?: string | null;
				component?: string | null;
			};
			header?: never;
			path: {
				project_name_or_id: string | null;
			};
			cookie?: never;
		};
		requestBody?: never;
		responses: {
			/** @description Successful Response */
			200: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["Page_StackResponse_"];
				};
			};
			/** @description Unauthorized */
			401: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Not Found */
			404: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Unprocessable Entity */
			422: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
		};
	};
	create_stack_api_v1_workspaces__project_name_or_id__stacks_post: {
		parameters: {
			query?: never;
			header?: never;
			path: {
				project_name_or_id: string | null;
			};
			cookie?: never;
		};
		requestBody: {
			content: {
				"application/json": components["schemas"]["StackRequest"];
			};
		};
		responses: {
			/** @description Successful Response */
			200: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["StackResponse"];
				};
			};
			/** @description Unauthorized */
			401: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Conflict */
			409: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Unprocessable Entity */
			422: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
		};
	};
	list_projects_api_v1_projects_get: {
		parameters: {
			query?: {
				hydrate?: boolean;
				sort_by?: string;
				logical_operator?: components["schemas"]["LogicalOperators"];
				page?: number;
				size?: number;
				id?: string | null;
				created?: string | null;
				updated?: string | null;
				name?: string | null;
				display_name?: string | null;
			};
			header?: never;
			path?: never;
			cookie?: never;
		};
		requestBody?: never;
		responses: {
			/** @description Successful Response */
			200: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["Page_ProjectResponse_"];
				};
			};
			/** @description Unauthorized */
			401: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Not Found */
			404: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Unprocessable Entity */
			422: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
		};
	};
	create_project_api_v1_projects_post: {
		parameters: {
			query?: never;
			header?: never;
			path?: never;
			cookie?: never;
		};
		requestBody: {
			content: {
				"application/json": components["schemas"]["ProjectRequest"];
			};
		};
		responses: {
			/** @description Successful Response */
			200: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ProjectResponse"];
				};
			};
			/** @description Unauthorized */
			401: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Conflict */
			409: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Unprocessable Entity */
			422: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
		};
	};
	get_project_api_v1_projects__project_name_or_id__get: {
		parameters: {
			query?: {
				hydrate?: boolean;
			};
			header?: never;
			path: {
				project_name_or_id: string;
			};
			cookie?: never;
		};
		requestBody?: never;
		responses: {
			/** @description Successful Response */
			200: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ProjectResponse"];
				};
			};
			/** @description Unauthorized */
			401: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Not Found */
			404: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Unprocessable Entity */
			422: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
		};
	};
	update_project_api_v1_projects__project_name_or_id__put: {
		parameters: {
			query?: never;
			header?: never;
			path: {
				project_name_or_id: string;
			};
			cookie?: never;
		};
		requestBody: {
			content: {
				"application/json": components["schemas"]["ProjectUpdate"];
			};
		};
		responses: {
			/** @description Successful Response */
			200: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ProjectResponse"];
				};
			};
			/** @description Unauthorized */
			401: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Not Found */
			404: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Unprocessable Entity */
			422: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
		};
	};
	delete_project_api_v1_projects__project_name_or_id__delete: {
		parameters: {
			query?: never;
			header?: never;
			path: {
				project_name_or_id: string;
			};
			cookie?: never;
		};
		requestBody?: never;
		responses: {
			/** @description Successful Response */
			200: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": unknown;
				};
			};
			/** @description Unauthorized */
			401: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Not Found */
			404: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Unprocessable Entity */
			422: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
		};
	};
	get_project_statistics_api_v1_projects__project_name_or_id__statistics_get: {
		parameters: {
			query?: never;
			header?: never;
			path: {
				project_name_or_id: string;
			};
			cookie?: never;
		};
		requestBody?: never;
		responses: {
			/** @description Successful Response */
			200: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ProjectStatistics"];
				};
			};
			/** @description Unauthorized */
			401: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Not Found */
			404: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Unprocessable Entity */
			422: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
		};
	};
	activate_user_api_v1_users__user_name_or_id__activate_put: {
		parameters: {
			query?: never;
			header?: never;
			path: {
				user_name_or_id: string;
			};
			cookie?: never;
		};
		requestBody: {
			content: {
				"application/json": components["schemas"]["UserUpdate"];
			};
		};
		responses: {
			/** @description Successful Response */
			200: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["UserResponse"];
				};
			};
			/** @description Unauthorized */
			401: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Not Found */
			404: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
			/** @description Unprocessable Entity */
			422: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorModel"];
				};
			};
		};
	};
}

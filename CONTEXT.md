# ZenML Dashboard

Client for browsing and managing ZenML workspace resources: projects, stacks, components, pipelines, runs, and artifacts.

## Language

**Project**:
A named workspace that scopes pipelines, runs, and artifacts.
_Avoid_: Workspace, tenant, folder

**Component**:
A typed building block that can be assembled into a Stack (e.g. orchestrator, artifact store).
_Avoid_: Plugin, integration, service

**Stack**:
A named assembly of Components that forms the runtime environment for pipeline execution.
_Avoid_: Environment, configuration, infra

**Pipeline**:
The definition of a multi-step ML workflow (the DAG), independent of any single execution.
_Avoid_: Workflow, job, DAG, graph

**Run**:
One execution of a Pipeline.
_Avoid_: Job, execution, pipeline run (prefer Run in UI copy)

**Artifact**:
A named identity for a line of data products. Versions of that identity are Artifact Versions.
_Avoid_: Output, asset, file, dataset (dataset is a kind of Artifact, not a synonym), namespace (implementation metaphor only)

**Artifact Version**:
One concrete materialization of an Artifact. In the UI, distinguished from its Artifact by a version label, not a separate type icon.
_Avoid_: Artifact (when you mean a specific version), output, blob

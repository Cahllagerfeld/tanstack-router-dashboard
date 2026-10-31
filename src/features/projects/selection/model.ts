import type { Project } from "../model";

const S3_BASE_URL = "https://public-flavor-logos.s3.eu-central-1.amazonaws.com";

export function findProject(projects: Project[], idOrName: string | null) {
	return projects.find(
		(project) => project.id === idOrName || project.name === idOrName
	);
}

/** The Project to open by default: the last opened one, otherwise the first listed. */
export function resolveProject(
	projects: Project[],
	lastOpenedIdOrName: string | null
) {
	return findProject(projects, lastOpenedIdOrName) ?? projects[0];
}

/**
 * The active Project outside of a Project route. A list that failed or is still
 * refreshing cannot prove the last opened Project is gone, so nothing is active.
 */
export function resolveUnscopedProject(
	projects: Project[],
	lastOpenedIdOrName: string | null,
	isListCurrent: boolean
) {
	const isUnconfirmedAbsence =
		lastOpenedIdOrName !== null &&
		!isListCurrent &&
		!findProject(projects, lastOpenedIdOrName);

	return isUnconfirmedAbsence
		? undefined
		: resolveProject(projects, lastOpenedIdOrName);
}

function generateNumberFromSalt(salt: string): number {
	function hashString(str: string): number {
		let hash = 0;
		for (let i = 0; i < str.length; i++) {
			hash = (hash * 31 + str.charCodeAt(i)) >>> 0;
		}
		return hash;
	}

	const hash = hashString(salt);
	return (hash % 49) + 1;
}

export function getIllustrationUrl(name: string) {
	return `${S3_BASE_URL}/projects/${generateNumberFromSalt(name)}.jpg`;
}

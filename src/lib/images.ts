import { S3_BASE_URL } from "./constants";

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

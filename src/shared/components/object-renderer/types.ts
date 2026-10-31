export interface ObjectRendererProps {
	data: Record<string, unknown>;
	depth?: number;
	maxDepth?: number;
	className?: string;
}

export interface ValueRendererProps {
	value: unknown;
	keyName: string;
	depth: number;
	maxDepth: number;
}

// Keywords that indicate a sensitive value
const SENSITIVE_KEYWORDS = [
	"key",
	"token",
	"secret",
	"password",
	"credential",
	"auth",
];

export function isSensitiveKey(keyName: string): boolean {
	const lowerKey = keyName.toLowerCase();
	return SENSITIVE_KEYWORDS.some((keyword) => lowerKey.includes(keyword));
}

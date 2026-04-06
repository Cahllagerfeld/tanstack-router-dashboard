import { useState } from "react";

export function useCopy(duration = 2000) {
	const [copied, setCopied] = useState(false);

	function copyToClipboard(text: string) {
		if (navigator.clipboard) {
			navigator.clipboard.writeText(text);
			setCopied(true);
			setTimeout(() => {
				setCopied(false);
			}, duration);
		}
	}
	return { copied, copyToClipboard };
}

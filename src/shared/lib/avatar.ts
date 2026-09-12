type settings = {
	svg?: boolean;
	size?: number;
	rounded?: number;
	text?: string;
};

export function getAvatarUrl(name: string, settings?: settings) {
	const params = new URLSearchParams();
	if (settings?.size) params.append("size", settings.size.toString());
	if (settings?.rounded) params.append("rounded", settings.rounded.toString());
	if (settings?.text) params.append("text", settings.text);
	return `https://avatar.vercel.sh/${name}${settings?.svg ? ".svg" : ""}?${params.toString()}`;
}

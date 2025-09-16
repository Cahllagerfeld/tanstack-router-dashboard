export function getClassVariant(saltValue: number): string {
	switch (saltValue) {
		case 1:
			return "bg-rose-300 text-rose-900";
		case 2:
			return "bg-sky-300 text-sky-900";
		case 3:
			return "bg-fuchsia-300 text-fuchsia-900";
		case 4:
			return "bg-lime-300 text-lime-900";
		default:
			return "";
	}
}

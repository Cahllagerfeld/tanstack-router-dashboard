export function parseBackendDate(dateString: string) {
	if (!dateString.endsWith("Z")) {
		return new Date(`${dateString}Z`);
	}
	return new Date(dateString);
}

const DATE_TIME_OPTIONS: Intl.DateTimeFormatOptions = {
	year: "numeric",
	month: "short",
	day: "numeric",
	hour: "numeric",
	minute: "2-digit",
};

/** The one app-wide date format; the locale decides order and 12h or 24h. */
export function formatDateTime(date: Date, locale: string, timeZone?: string) {
	return new Intl.DateTimeFormat(locale, {
		...DATE_TIME_OPTIONS,
		timeZone,
	}).format(date);
}

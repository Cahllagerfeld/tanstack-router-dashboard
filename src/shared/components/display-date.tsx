import { getLocale } from "@/paraglide/runtime";

export default function DisplayDate({
	date,
	short = false,
}: {
	date: Date;
	short?: boolean;
}) {
	const formattedDate = short
		? formatShortDate(date)
		: date.toLocaleString(getLocale());

	return <>{formattedDate}</>;
}

function formatShortDate(date: Date) {
	const dateOptions: Intl.DateTimeFormatOptions = {
		month: "short",
		day: "numeric",
		year: "numeric",
	};
	const timeOptions: Intl.DateTimeFormatOptions = {
		hour: "numeric",
		minute: "numeric",
		hour12: false,
	};

	const locale = getLocale();
	const formattedDate = date.toLocaleDateString(locale, dateOptions);
	const formattedTime = date.toLocaleTimeString(locale, timeOptions);
	return `${formattedDate} ${formattedTime}`;
}

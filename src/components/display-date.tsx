export default function DisplayDate({
	date,
	short = false,
}: {
	date: Date;
	short?: boolean;
}) {
	const formattedDate = short ? formatShortDate(date) : date.toLocaleString();

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

	const formattedDate = date.toLocaleDateString("en-US", dateOptions);
	const formattedTime = date.toLocaleTimeString("en-US", timeOptions);
	return `${formattedDate} ${formattedTime}`;
}

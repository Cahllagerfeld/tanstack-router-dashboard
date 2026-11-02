import { getLocale } from "@/paraglide/runtime";
import { formatDateTime } from "@/shared/lib/dates";

export default function DisplayDate({ date }: { date: Date }) {
	return (
		<time dateTime={date.toISOString()}>
			{formatDateTime(date, getLocale())}
		</time>
	);
}

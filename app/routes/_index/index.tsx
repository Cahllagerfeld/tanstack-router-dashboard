import { Link } from "@remix-run/react";

export default function IndexPage() {
	return (
		<p>
			<Link to="/login">Login</Link>
		</p>
	);
}

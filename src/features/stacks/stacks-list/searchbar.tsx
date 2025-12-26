import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { Plus } from "lucide-react";

export function StackSearchbar() {
	return (
		<div className="flex items-center justify-end">
			<Button
				render={
					<Link to="/stacks/new">
						<Plus />
						Create Stack
					</Link>
				}
			></Button>
		</div>
	);
}

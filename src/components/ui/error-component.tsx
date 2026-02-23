import { CircleAlertIcon } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/reui/alert";

export function ErrorComponent({
	title = "Error! Something went wrong",
	message = "Please try again. If the problem persists, contact support.",
}: {
	title?: string;
	message?: string;
}) {
	return (
		<Alert variant="destructive" className="max-w-lg">
			<CircleAlertIcon />
			<AlertTitle>{title || "Error! Something went wrong"}</AlertTitle>
			<AlertDescription>
				{message ||
					"Please try again. If the problem persists, contact support."}
			</AlertDescription>
		</Alert>
	);
}

import { Loader2Icon } from "lucide-react";
import type { PropsWithChildren } from "react";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorComponent } from "@/components/ui/error-component";

type Props = {
	errorMessage?: string;
	loader?: React.ReactNode;
};

export function ErrorBoundaryWithSuspense({
	errorMessage,
	children,
	loader,
}: PropsWithChildren<Props>) {
	return (
		<ErrorBoundary
			fallback={
				<ErrorComponent
					title="🛑Error:"
					message={errorMessage || "Something went wrong"}
				/>
			}
		>
			<Suspense fallback={loader || <Loader2Icon className="animate-spin" />}>
				{children}
			</Suspense>
		</ErrorBoundary>
	);
}

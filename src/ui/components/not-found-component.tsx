import { Link } from "@tanstack/react-router";
import { ArrowLeftIcon } from "lucide-react";
import type * as React from "react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface NotFoundComponentProps
	extends React.HTMLAttributes<HTMLDivElement> {
	code?: string;
	title?: string;
	description?: string;
}

export function NotFoundComponent({
	className,
	code = "404",
	title = "Off the map",
	description = "The page you are looking for drifted beyond our routes. Try the map, or return to safer ground.",

	...props
}: NotFoundComponentProps) {
	return (
		<section
			className={cn(
				"relative isolate overflow-hidden rounded-3xl border bg-card p-8 text-foreground shadow-sm sm:p-10 max-w-xl",
				className,
			)}
			{...props}
		>
			<div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(90%_60%_at_50%_0%,oklch(var(--primary)/0.18),transparent_60%)]" />
			<div className="pointer-events-none absolute -left-10 -top-12 -z-10 size-56 rounded-full bg-primary/20 blur-3xl" />
			<div className="pointer-events-none absolute -bottom-16 right-0 -z-10 size-72 rounded-full bg-secondary/60 blur-3xl" />
			<div className="pointer-events-none absolute inset-0 -z-10 opacity-[0.12] [background-image:repeating-linear-gradient(120deg,transparent,transparent_10px,hsl(var(--foreground)/0.12)_12px,transparent_18px)]" />

			<div className="space-y-6">
				<div className="space-y-6">
					<div className="inline-flex items-center gap-2 rounded-full border bg-background/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.28em] text-muted-foreground">
						<span className="h-1.5 w-1.5 rounded-full bg-primary" />
						Lost Signal
					</div>

					<div className="space-y-3">
						<p className="font-display text-5xl font-semibold uppercase tracking-[0.18em] text-foreground/60 sm:text-6xl">
							{code}
						</p>
						<h1 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
							{title}
						</h1>
						<p className="max-w-xl text-sm text-muted-foreground sm:text-base">
							{description}
						</p>
					</div>

					<div className="flex flex-wrap items-center gap-3">
						<Link
							className={buttonVariants({ variant: "default", size: "lg" })}
							to="/dashboard"
						>
							<ArrowLeftIcon />
							Go Back Home
						</Link>
					</div>
				</div>
			</div>
		</section>
	);
}

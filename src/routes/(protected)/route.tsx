import { Separator } from "@radix-ui/react-separator";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { AppSidebar } from "@/components/app-sidebar";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbList,
	BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import {
	SidebarInset,
	SidebarProvider,
	SidebarTrigger,
} from "@/components/ui/sidebar";
import { getUserSession } from "@/lib/session/session.api";

export const Route = createFileRoute("/(protected)")({
	beforeLoad: async ({ context, location }) => {
		if (!context.userSession || context.userSession.user.role !== "member") {
			throw redirect({ to: "/sign-in", search: { redirectTo: location.href } });
		}
	},
	loader: async () => {
		const userSession = await getUserSession();
		if (!userSession || userSession.user.role !== "member") {
			throw redirect({ to: "/sign-in", search: { redirectTo: location.href } });
		}
		return {
			user: {
				name: userSession.user.name,
				image: userSession.user.image,
				email: userSession.user.email,
				createdAt: userSession.user.createdAt,
			},
		};
	},
	component: RouteComponent,
});

function RouteComponent() {
	const { user } = Route.useLoaderData();
	return (
		<SidebarProvider>
			<AppSidebar user={user} />
			<SidebarInset>
				<header className="flex h-14 shrink-0 items-center gap-2">
					<div className="flex flex-1 items-center gap-2 px-3">
						<SidebarTrigger className="block md:hidden" />
						<Separator
							orientation="vertical"
							className="mr-2 data-[orientation=vertical]:h-4"
						/>
						<Breadcrumb>
							<BreadcrumbList>
								<BreadcrumbItem>
									<BreadcrumbPage className="line-clamp-1">
										Project Management & Task Tracking
									</BreadcrumbPage>
								</BreadcrumbItem>
							</BreadcrumbList>
						</Breadcrumb>
					</div>
				</header>
				<div className="flex flex-1 flex-col gap-4 px-4 py-10">
					<Outlet />
				</div>
			</SidebarInset>
		</SidebarProvider>
	);
}

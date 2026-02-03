import { Separator } from "@radix-ui/react-separator";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { MoonIcon, SunIcon } from "lucide-react";
import { AppSidebar } from "@/components/app-sidebar";
import { RouterBreadcrumb } from "@/components/router-breadcrumb";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	SidebarInset,
	SidebarProvider,
	SidebarTrigger,
} from "@/components/ui/sidebar";
import { useTheme } from "@/integrations/theme/theme-provider";
import { getMemberId, getUserSession } from "@/lib/session/session.api";

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
		const memberId = await getMemberId({ data: userSession.user.id });
		return {
			user: {
				name: userSession.user.name,
				image: userSession.user.image,
				email: userSession.user.email,
				createdAt: userSession.user.createdAt,
			},
			memberId,
		};
	},
	component: RouteComponent,
});

function RouteComponent() {
	const { user } = Route.useLoaderData();
	const { setTheme } = useTheme();
	return (
		<SidebarProvider>
			<AppSidebar user={user} />
			<SidebarInset>
				<header className="flex h-14 shrink-0 items-center gap-2 px-3">
					<div className="flex flex-1 items-center gap-2">
						<SidebarTrigger className="block md:hidden" />
						<Separator
							orientation="vertical"
							className="mr-2 data-[orientation=vertical]:h-4"
						/>
						<RouterBreadcrumb />
					</div>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="ghost" size="icon">
								<SunIcon className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
								<MoonIcon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
								<span className="sr-only">Toggle theme</span>
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end" className="*:cursor-pointer">
							<DropdownMenuItem onClick={() => setTheme("light")}>
								Light
							</DropdownMenuItem>
							<DropdownMenuItem onClick={() => setTheme("dark")}>
								Dark
							</DropdownMenuItem>
							<DropdownMenuItem onClick={() => setTheme("system")}>
								System
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</header>
				<div className="flex flex-1 flex-col gap-4 px-4 py-6 lg:py-10 max-w-6xl mx-auto w-full">
					<Outlet />
				</div>
			</SidebarInset>
		</SidebarProvider>
	);
}

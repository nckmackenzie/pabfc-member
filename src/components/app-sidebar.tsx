import { Link, linkOptions } from "@tanstack/react-router";
import {
	DumbbellIcon,
	HandCoinsIcon,
	type LucideIcon,
	UserIcon,
} from "lucide-react";
import { NavMain } from "@/components/nav-main";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarRail,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

type Item = {
	title: string;
	to: string;
	icon: LucideIcon;
	activeOptions?: { exact?: boolean };
};

const menuItemOptions: Item[] = linkOptions([
	// {
	// 	title: "Dashboard",
	// 	to: "/dashboard",
	// 	icon: HomeIcon,
	// 	activeOptions: { exact: false },
	// },
	{
		title: "Payments",
		to: "/payments",
		icon: HandCoinsIcon,
		activeOptions: { exact: false },
	},
	{
		title: "Profile",
		to: "/profile",
		icon: UserIcon,
		activeOptions: { exact: false },
	},
]);

export function AppSidebar({
	user,
}: {
	user: {
		name: string;
		image: string | null | undefined;
		email: string;
		createdAt: Date;
	};
}) {
	return (
		<Sidebar className="border-r-0">
			<SidebarHeader>
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton asChild size="lg">
							<Link to="/payments" className="flex items-center gap-3">
								<div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
									<DumbbellIcon className="size-4" />
								</div>
								<div className="grid flex-1 text-left text-sm leading-tight">
									<span className="font-medium">Prime Age</span>
									<span className="text-xs text-muted-foreground">
										Beauty & Fitness Center
									</span>
								</div>
							</Link>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarHeader>
			<SidebarContent>
				<NavMain items={menuItemOptions} />
			</SidebarContent>
			<SidebarRail />
			<SidebarFooter>
				<div className="flex items-center gap-2">
					<Avatar>
						<AvatarImage
							src={
								user.image ??
								`https://api.dicebear.com/9.x/initials/svg?seed=${user.name}`
							}
						/>
						<AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
					</Avatar>
					<div className="grid flex-1 text-left text-sm leading-tight">
						<span className="font-medium capitalize">
							{user.name.toLowerCase()}
						</span>
						<span className="text-xs text-muted-foreground">
							Member Since {new Date(user.createdAt).getFullYear()}
						</span>
					</div>
				</div>
			</SidebarFooter>
		</Sidebar>
	);
}

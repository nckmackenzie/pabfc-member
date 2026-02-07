import { createFileRoute, redirect } from "@tanstack/react-router";
import {
	DownloadCloudIcon,
	LinkIcon,
	LockKeyholeIcon,
	UserIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { PageHeader } from "@/components/ui/page-header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AccountLinking } from "@/features/profile/components/account-linking";
import { EditPersonalInfoForm } from "@/features/profile/components/edit-personal-info-form";
import { SecurityForm } from "@/features/profile/components/security-form";
import { TwoFactor } from "@/features/profile/components/two-factor";
import { getUserInformation } from "@/features/profile/services/member.api";
import { getUserAccounts } from "@/features/profile/services/profile.api";
import { profileSearchValidate } from "@/features/profile/services/schema";
import { useFilters } from "@/hooks/use-filters";

export const Route = createFileRoute("/(protected)/profile/")({
	staticData: {
		breadcrumb: "User Profile",
	},
	validateSearch: profileSearchValidate,
	head: () => ({ meta: [{ title: "Profile / PABFC" }] }),
	component: RouteComponent,
	loader: async () => {
		const [userInfo, userAccounts] = await Promise.all([
			getUserInformation(),
			getUserAccounts(),
		]);
		if (!userInfo) throw redirect({ to: "/sign-in" });
		return { userInfo, userAccounts };
	},
});

const TABS = [
	{ value: "personal", label: "Personal Information", icon: UserIcon },
	{ value: "security", label: "Security", icon: LockKeyholeIcon },
	{ value: "account", label: "Account", icon: LinkIcon },
];

function RouteComponent() {
	const { filters, setFilters } = useFilters(Route.id);
	return (
		<div className="space-y-6">
			<PageHeader
				title="User Profile"
				description="Manage your personal information and security details"
				content={
					<Button variant="outline">
						<DownloadCloudIcon />
						Download data
					</Button>
				}
			/>
			<Tabs
				defaultValue={filters.tab}
				onValueChange={(tab: string) => {
					setFilters({ tab });
				}}
			>
				<TabsList className="w-full lg:w-fit justify-start">
					{TABS.map((tab) => (
						<TabsTrigger value={tab.value} key={tab.value}>
							<tab.icon className="" />
							<span className="max-sm:hidden">{tab.label}</span>
						</TabsTrigger>
					))}
				</TabsList>
				<TabsContent value="personal">
					<Card>
						<CardHeader>
							<CardTitle>Personal Information</CardTitle>
							<CardDescription>
								Update your personal information
							</CardDescription>
						</CardHeader>
						<CardContent>
							<EditPersonalInfoForm />
						</CardContent>
					</Card>
				</TabsContent>
				<TabsContent value="security">
					<div className="grid md:grid-cols-2 gap-6">
						<SecurityForm />
						<TwoFactor />
					</div>
				</TabsContent>
				<TabsContent value="account">
					<AccountLinking />
				</TabsContent>
			</Tabs>
		</div>
	);
}

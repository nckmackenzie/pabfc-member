import { createFileRoute } from "@tanstack/react-router";
import { DownloadCloudIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { PageHeader } from "@/components/ui/page-header";
import { EditPersonalInfoForm } from "@/features/profile/components/edit-personal-info-form";
import { getMemberInformation } from "@/features/profile/services/member.api";

export const Route = createFileRoute("/(protected)/profile/")({
	staticData: {
		breadcrumb: "User Profile",
	},
	head: () => ({ meta: [{ title: "Profile / PABFC" }] }),
	component: RouteComponent,
	loader: async () => {
		const memberInfo = await getMemberInformation();
		return { memberInfo };
	},
});

function RouteComponent() {
	return (
		<div className="space-y-6">
			<PageHeader
				title="User Profile"
				description="Manage your personal information, and membership details"
				content={
					<Button variant="outline">
						<DownloadCloudIcon />
						Download data
					</Button>
				}
			/>
			<div className="grid lg:grid-cols-3 gap-4">
				<Card className="lg:col-span-2">
					<CardHeader>
						<CardTitle>Personal Information</CardTitle>
						<CardDescription>Update your personal information</CardDescription>
					</CardHeader>
					<CardContent>
						<EditPersonalInfoForm />
					</CardContent>
				</Card>
				<Card className="self-start">
					<CardHeader>
						<CardTitle>Membership Information</CardTitle>
						<CardDescription>
							Update your membership information
						</CardDescription>
					</CardHeader>
				</Card>
			</div>
		</div>
	);
}

import { useQuery } from "@tanstack/react-query";
import { getRouteApi, redirect, useRouter } from "@tanstack/react-router";
import { formatDistanceToNow } from "date-fns";
import { Dot } from "lucide-react";
import toast from "react-hot-toast";
import {
	FaAndroid,
	FaApple,
	FaChrome,
	FaFirefox,
	FaLinux,
	FaWindows,
} from "react-icons/fa";
import { GoDeviceDesktop } from "react-icons/go";
import { UAParser } from "ua-parser-js";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ToastContent } from "@/components/ui/toast-content";
import type { getActiveSessions } from "@/features/profile/services/profile.api";
import { authClient } from "@/lib/auth-client";

interface IpApiResponse {
	status: string;
	country?: string;
	city?: string;
	message?: string;
}

async function fetchLocationFromIp(ip: string): Promise<IpApiResponse> {
	const response = await fetch(
		`http://ip-api.com/json/${ip}?fields=status,message,country,city`,
	);
	return response.json();
}

type Session = Awaited<ReturnType<typeof getActiveSessions>>[number];

export function SessionManagement() {
	const { activeSessions } = getRouteApi(
		"/(protected)/profile/",
	).useLoaderData();
	const { data: session, isPending } = authClient.useSession();

	if (isPending) return <SessionManagementSkeleton />;
	if (!session) {
		throw redirect({ to: "/sign-in" });
	}
	return (
		<Card>
			<CardHeader>
				<CardTitle>Active Sessions</CardTitle>
				<CardDescription>Manage your active sessions</CardDescription>
			</CardHeader>
			<CardContent className="divide-y">
				{activeSessions.map((s) => (
					<SessionItem
						key={s.id}
						session={s}
						isCurrent={s.id === session.session.id}
					/>
				))}
			</CardContent>
		</Card>
	);
}

function SessionItem({
	session,
	isCurrent,
}: {
	session: Session;
	isCurrent: boolean;
}) {
	const router = useRouter();
	const userAgentInfo = session.userAgent ? UAParser(session.userAgent) : null;
	const os = userAgentInfo?.os.name?.toString().toLowerCase() || "Unknown OS";
	const browser =
		userAgentInfo?.browser.name?.toString().toLowerCase() || "Unknown Browser";

	const { data: locationData, isLoading: isLoadingLocation } = useQuery({
		queryKey: ["ip-location", session.ipAddress],
		queryFn: () => fetchLocationFromIp(session.ipAddress ?? ""),
		enabled: !!session.ipAddress,
		staleTime: 1000 * 60 * 60, // Cache for 1 hour
		gcTime: 1000 * 60 * 60 * 24, // Keep in cache for 24 hours
	});

	const location =
		locationData?.status === "success" &&
		locationData.city &&
		locationData.country
			? `${locationData.city}, ${locationData.country}`
			: null;

	async function handleRevokeSession() {
		await authClient.revokeSession(
			{
				token: session.token,
			},
			{
				onError: (error) => {
					toast.error((t) => (
						<ToastContent
							t={t}
							title="Error"
							message={error.error.message || "Failed to revoke session"}
						/>
					));
				},
				onSuccess: async () => {
					await router.invalidate({ sync: true });
				},
			},
		);
	}

	return (
		<div className="p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
			<div className="flex items-center gap-4">
				<RenderIcon os={os} size={24} />
				<div className="flex flex-col">
					<div className="font-medium capitalize flex items-center">
						<span>{browser}</span> <Dot /> <span>{os}</span>
						{isCurrent && (
							<Badge className="ml-2" variant="default">
								Current Session
							</Badge>
						)}
					</div>
					<div className="text-xs text-muted-foreground capitalize flex items-center gap-1 flex-wrap">
						<span>
							{formatDistanceToNow(new Date(session.createdAt), {
								addSuffix: true,
							})}
						</span>
						{session.ipAddress && (
							<div className="text-xs text-muted-foreground flex items-center gap-1 ">
								<Dot className="text-muted-foreground -ml-1" size={12} />
								{/* <MapPin size={12} /> */}
								{isLoadingLocation ? (
									<Skeleton className="h-3 w-24 bg-gray-200 dark:bg-gray-800" />
								) : location ? (
									<span>{location}</span>
								) : (
									<span className="normal-case">{session.ipAddress}</span>
								)}
							</div>
						)}
					</div>
				</div>
			</div>
			{!isCurrent && (
				<Button variant="destructive" size="sm" onClick={handleRevokeSession}>
					Revoke
				</Button>
			)}
		</div>
	);
}

interface RenderIconProps {
	os: string;
}
function RenderIcon({
	os,
	...props
}: RenderIconProps & React.ComponentProps<typeof FaWindows>) {
	switch (os) {
		case "windows":
			return <FaWindows {...props} />;
		case "macos":
		case "ios":
			return <FaApple {...props} />;
		case "android":
			return <FaAndroid {...props} />;
		case "ubuntu":
		case "redhat":
		case "centos":
		case "fedora":
		case "arch":
		case "mint":
		case "debian":
		case "raspbian":
		case "linux":
			return <FaLinux {...props} />;
		case "chrome_os":
			return <FaChrome {...props} />;
		case "firefox_os":
			return <FaFirefox {...props} />;
		default:
			return <GoDeviceDesktop {...props} />;
	}
}

function SessionManagementSkeleton() {
	return (
		<Card>
			<CardHeader>
				<Skeleton className="h-6 w-32" />
				<Skeleton className="h-4 w-48" />
			</CardHeader>
			<CardContent className="divide-y">
				{Array.from({ length: 3 }).map((_, i) => (
					<div
						// biome-ignore lint/suspicious/noArrayIndexKey: <>
						key={i}
						className="p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
					>
						<div className="flex items-center gap-4">
							<Skeleton className="h-6 w-6 rounded" />
							<div className="flex flex-col gap-2">
								<div className="flex items-center gap-2">
									<Skeleton className="h-4 w-16" />
									<Skeleton className="h-4 w-16" />
								</div>
								<div className="flex items-center gap-1">
									<Skeleton className="h-3 w-20" />
									<Skeleton className="h-3 w-28" />
								</div>
							</div>
						</div>
						<Skeleton className="h-8 w-16" />
					</div>
				))}
			</CardContent>
		</Card>
	);
}

'use client'

import BaseLayout from "@/components/BaseLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ContentTab from "./content/ContentTab";
import StoreTab from "./store/StoreTab";
import AnalyticsTab from "./analytics/AnalyticsTab";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { useEffect } from "react";

const Page = () => {
	const router = useRouter()
	const { data: user, isLoading } = useAuth()

	const isAdmin =
		process.env.NEXT_PUBLIC_ADMIN_EMAIL === user?.email

	useEffect(() => {
		if (!isLoading && !isAdmin) {
			router.replace("/")
		}
	}, [isAdmin, isLoading, router])

	if (isLoading) return null

	if (!isAdmin) return null

	return (
		<BaseLayout renderRightPanel={false}>
			<Tabs defaultValue='content' className='w-full mx-auto my-10 px-2 md:px-10'>
				<TabsList className='flex flex-col md:flex-row w-full md:w-3/4 mx-auto h-auto'>
					<TabsTrigger value='content' className='w-full md:w-auto'>
						Content
					</TabsTrigger>
					<TabsTrigger value='store' className='w-full md:w-auto'>
						Store
					</TabsTrigger>
					<TabsTrigger value='analytics' className='w-full md:w-auto'>
						Analytics
					</TabsTrigger>
				</TabsList>

				<TabsContent value='content'>
					<ContentTab />
				</TabsContent>
				<TabsContent value='store'>
					<StoreTab />
				</TabsContent>
				<TabsContent value='analytics'>
					<AnalyticsTab />
				</TabsContent>
			</Tabs>
		</BaseLayout>
	);
};
export default Page;
"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { fetchMe } from "@/lib/api/auth";
import Loading from "@/components/Loading";

const Page = () => {
	const router = useRouter();

	useEffect(() => {
		const handleRedirect = async () => {
			const user = await fetchMe();

			if (!user) {
				router.push("/");
				return;
			}

			if (user.isSubscribed) {
				router.replace("/");
				return;
			}

			const stripeUrl = localStorage.getItem("stripeRedirectUrl");

			if (stripeUrl) {
				localStorage.removeItem("stripeRedirectUrl");

				window.location.href =
					stripeUrl + "?prefilled_email=" + user.email;
			} else {
				router.push("/");
			}
		};

		handleRedirect();
	}, [router]);

	return <Loading />;
};

export default Page;
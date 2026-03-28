import BaseLayout from "@/components/BaseLayout"
import UserProfile from "./UserProfile"
import Posts from "./Posts"
import { useQuery } from "@tanstack/react-query";
import { fetchAdminProfile, fetchUserProfile } from "@/lib/api/user";

const HomeScreen = () => {
  const { data: admin } = useQuery({
    queryKey: ["adminProfile"],
    queryFn: fetchAdminProfile,
  });

  const { data: user } = useQuery({
    queryKey: ["userProfile"],
    queryFn: fetchUserProfile,
  });

  return (
    <BaseLayout>
      <UserProfile />
      <Posts admin={admin} isSubscribed={user?.isSubscribed}/>
    </BaseLayout>
  )
}

export default HomeScreen
import { fetchMe } from "@/lib/api/auth";
import { useQuery } from "@tanstack/react-query";

export const useAuth = () => {
  return useQuery({
    queryKey: ["authUser"],
    queryFn: fetchMe,
    staleTime: 1000 * 60 * 5,
    retry: false,
  });
};
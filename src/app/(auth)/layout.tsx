"use client";

import { useAuth } from "@/hooks/useAuth";
import { useRouter, usePathname } from "next/navigation";
import { ReactNode, useEffect } from "react";

export default function AuthLayout({
  children,
}: {
  children: ReactNode;
}) {
  const { data: user, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isLoading && user && pathname !== "/auth/callback") {
      router.push("/");
    }
  }, [user, isLoading, router, pathname]);


  return <>{children}</>;
}
"use client";

import { useAuth } from "@/hooks/useAuth";
import AuthScreen from "@/components/home/auth-screen/AuthScreen";
import HomeScreen from "@/components/home/home-screen/HomeScreen";
import Loading from "@/components/Loading";

export default function Home() {
  const { data: user, isLoading } = useAuth();

  if (isLoading) {
    return <Loading />;
  }

  if (user) {
    return (
      <main>
        <HomeScreen />
      </main>
    );
  }

  return (
    <main>
      <AuthScreen />
    </main>
  );
}
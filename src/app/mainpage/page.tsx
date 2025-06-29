"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const MainPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    console.log(status);
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  if (status === "loading" || status === "unauthenticated") {
    return <div>Načítání...</div>;
  }

  return <div>MainPage – vítej {session?.user?.name}</div>;
};

export default MainPage;

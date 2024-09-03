"use client";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function Dashboard() {
  const session = useSession();
  if (session.status === "unauthenticated") {
    redirect("/");
  }
  return (
    <>
      {session && session.status === "authenticated" && (
        <h1>Welcome {session?.data?.user?.name}</h1>
      )}
    </>
  );
}

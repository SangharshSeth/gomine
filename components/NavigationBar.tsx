"use client";

import * as React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "./ui/button";
import { signIn, signOut, useSession } from "next-auth/react";

export default function Navbar() {
  const { data: sessionData, status } = useSession();

  return (
    <header className="sticky top-0 z-50 w-full border-b-slate-800 border-b-2">
      <div className="container mx-auto px-4 flex h-14 items-center justify-between">
        <div className="flex items-center">
          <a href="/" className="text-xl font-bold">Sangharsh</a>
        </div>
        <div className="flex items-center space-x-4 ml-auto">
          {status === "authenticated" && (
            <>
              <span className="font-medium">{sessionData?.user?.name}</span>
              <Button onClick={() => signOut()}>Sign out</Button>
            </>
          )}
          {status === "unauthenticated" && <Button onClick={() => signIn()}>Sign in</Button>}
          <Avatar className="h-8 w-8">
            <AvatarImage src={sessionData?.user?.image || "https://github.com/shadcn.png"} alt="Sangharsh Seth" />
            <AvatarFallback>SS</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
}
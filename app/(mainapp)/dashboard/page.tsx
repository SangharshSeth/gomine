"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import Link from "next/link";
import { FaUser, FaClipboardList, FaFileAlt } from "react-icons/fa"; // Import icons
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function Dashboard() {
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/");
    },
  });

  if (status === "loading") {
    return <Skeleton className="h-12 w-12 rounded-full" />;
  }

  return (
    <div className="w-full bg-gray-900  text-white min-h-screen p-6">
      <div className="space-y-6">
        <h1 className="text-3xl font-bold mb-4">
          Welcome, {session?.user?.name}!
        </h1>
        <p className="text-lg mb-4">
          Your email: <strong>{session?.user?.email}</strong>
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link
            href="/problems"
            className="bg-gray-800 p-4 rounded-lg shadow-lg flex items-center space-x-4 hover:bg-gray-700 transition-colors"
          >
            <FaClipboardList className="text-2xl" />
            <div>
              <h2 className="text-xl font-semibold">Checkout Problems</h2>
              <p className="text-gray-400">View and manage your problems</p>
            </div>
          </Link>
          <Link
            href="/articles"
            className="bg-gray-800 p-4 rounded-lg shadow-lg flex items-center space-x-4 hover:bg-gray-700 transition-colors"
          >
            <FaFileAlt className="text-2xl" />
            <div>
              <h2 className="text-xl font-semibold">Articles</h2>
              <p className="text-gray-400">Read and explore articles</p>
            </div>
          </Link>
          <Link
            href="/profile"
            className="bg-gray-800 p-4 rounded-lg shadow-lg flex items-center space-x-4 hover:bg-gray-700 transition-colors"
          >
            <FaUser className="text-2xl" />
            <div>
              <h2 className="text-xl font-semibold">Profile</h2>
              <p className="text-gray-400">Update your profile information</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

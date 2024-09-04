"use client";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FiFileText, FiBook } from "react-icons/fi";
import { signOut, useSession } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import Image from "next/image";
import { FaQuestion } from "react-icons/fa";

export default function LeftNav() {
  const router = useRouter();
  const session = useSession();
  const user = session?.data?.user;
  if(session.status === "unauthenticated") {
    router.push("/");
  }

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  return (
    <aside className="fixed left-0 w-full sm:w-64 lg:w-72 h-screen border-r-2 border-r-slate-700 bg-gray-800 flex flex-col">
      <div className="flex-1 overflow-y-auto">
        <nav className="p-4 space-y-2">
          <button
            className="w-full flex items-center p-2 rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
            onClick={() => handleNavigation("/problems")}
          >
            <FiFileText className="text-gray-400 text-2xl mr-3" />
            Problems
          </button>
          <button
            className="w-full flex items-center p-2 rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
            onClick={() => handleNavigation("/articles")}
          >
            <FiBook className="text-gray-400 text-2xl mr-3" />
            Articles
          </button>
          <button
            className="w-full flex items-center p-2 rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
            onClick={() => handleNavigation("/quizz")}
          >
            <FaQuestion className="text-gray-400 text-2xl mr-3" />
            Quizzes
          </button>
        </nav>
      </div>
      <div className="p-4 flex gap-1 border-t border-slate-700 bg-gray-800 sticky bottom-0">
        <Image
          src={user?.image || "/default-avatar.png"}
          alt={user?.name || "User Avatar"}
          width={40}
          className="rounded-full cursor-pointer"
          height={40}
        />
        <DropdownMenu>
          <DropdownMenuTrigger className="text-gray-300 hover:text-white">
            {user?.name || "Account"}
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-gray-800 text-gray-300">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="hover:bg-gray-700 hover:text-white transition-colors">
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem
              className="hover:bg-gray-700 hover:text-white transition-colors"
              onClick={() => signOut()}
            >
              SignOut
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </aside>
  );
}

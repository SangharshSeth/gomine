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

export default function LeftNav() {
  const router = useRouter();
  const session = useSession();
  const user = session?.data?.user;

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  return (
    <aside className="fixed left-0 w-64 h-screen bg-white shadow-lg flex flex-col">
      <div className="flex-1 overflow-y-auto">
        <nav className="p-4 space-y-2">
          <button
            className="w-full flex items-center p-2 rounded-lg hover:bg-gray-100"
            onClick={() => handleNavigation("/problems")}
          >
            <FiFileText className="text-gray-600 text-2xl mr-3" />
            Problems
          </button>
          <button
            className="w-full flex items-center p-2 rounded-lg hover:bg-gray-100"
            onClick={() => handleNavigation("/articles")}
          >
            <FiBook className="text-gray-600 text-2xl mr-3" />
            Articles
          </button>
        </nav>
      </div>
      <div className="p-4 flex gap-1 border-t border-gray-200 bg-white sticky bottom-0">
        <Image
          src={user?.image || ""}
          alt={""}
          width={40}
          className="rounded-full cursor-pointer"
          height={40}
        />
        <DropdownMenu>
          <DropdownMenuTrigger>{user?.name}</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem onClick={() => signOut()}>
              SignOut
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </aside>
  );
}

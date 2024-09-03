"use client";
import LeftNav from "@/components/LeftNavigation";
import Navbar from "@/components/NavigationBar";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function MainAppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={`min-h-screen flex flex-col ${inter.className}`}>
      <Navbar />
      <div className="flex flex-1">
        <LeftNav />
        <main className="flex-1 pt-6 ml-64 bg-gray-100">{children}</main>
      </div>
    </div>
  );
}

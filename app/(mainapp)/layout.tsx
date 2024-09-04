"use client";
import DynamicBreadcrumb from "@/components/DynamicBreadCrumbs";
import LeftNav from "@/components/LeftNavigation";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function MainAppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={`min-h-screen flex flex-col ${inter.className}`}>
      <div className="flex flex-1">
        <LeftNav />
        <main className="flex-1 sm:ml-64 lg:ml-72">
          <DynamicBreadcrumb />
          {children}
        </main>
      </div>
    </div>
  );
}

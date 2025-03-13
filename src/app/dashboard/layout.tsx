"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Navbar from "@/components/fragments/dashboard/Navbar";
import Sidebar from "@/components/fragments/dashboard/Sidebar";
import SidebarSettings from "@/components/fragments/dashboard/settings/Sidebar";

interface LayoutProps {
  children: React.ReactNode;
}

// Fungsi pembantu untuk mengubah string ke Title Case
const toTitleCase = (str: string): string => {
  return str.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
};

export default function DashboardLayout({ children }: LayoutProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [name, setName] = useState("");

  // Check if the user is logged in by verifying that a user object exists in localStorage.
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      router.push("/auth/login");
    } else {
      try {
        const userObj = JSON.parse(storedUser);
        if (userObj && userObj.name) {
          setName(toTitleCase(userObj.name));
        } else {
          router.push("/auth/login");
        }
      } catch (error) {
        console.error("Error parsing user data:", error);
        router.push("/auth/login");
      }
    }
  }, [router]);

  return (
    <div
      className="
        min-h-screen
        grid
        /* Layout untuk mobile (default): 1 kolom, 3 baris */
        grid-cols-1
        grid-rows-[auto_auto_1fr]
        /* Layout untuk md ke atas: 5 kolom, 2 baris (baris pertama navbar, baris kedua sidebar + konten) */
        md:grid-rows-[auto_1fr]
        md:grid-cols-5
      "
    >
      {/* Navbar (baris 1 di mobile & md) */}
      <div className="col-span-1 md:col-span-5">
        <Navbar />
      </div>

      {/* Sidebar (baris 2 di mobile, kolom 1 di md) */}
      <div className="col-span-1 md:col-span-1">
        {pathname.startsWith("/dashboard/settings") ? (
          <SidebarSettings />
        ) : (
          <Sidebar />
        )}
      </div>

      {/* Main content (baris 3 di mobile, col-span-4 di md) */}
      <main
        className={`
          col-span-1
          md:col-span-4
          max-h-screen
          ${pathname.startsWith("/dashboard/settings") ? "" : "overflow-y-scroll"}
        `}
      >
        {children}
      </main>
    </div>
  );
}

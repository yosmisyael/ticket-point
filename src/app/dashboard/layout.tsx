"use client";

import Navbar from "@/components/fragments/dashboard/Navbar";
import Sidebar from "@/components/fragments/dashboard/Sidebar";
import SidebarSettings from "@/components/fragments/dashboard/settings/Sidebar";
import { usePathname } from "next/navigation";

interface LayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: LayoutProps) {
  const pathname = usePathname();

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

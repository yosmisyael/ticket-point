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
        <>
            <div className="grid grid-cols-5">
                <Navbar/>
                { pathname.startsWith("/dashboard/settings") ? <SidebarSettings/> : <Sidebar/>}
                <main className={`col-span-4 max-h-screen ${pathname.startsWith("/dashboard/settings") ? "" : "overflow-y-scroll"}`}>
                    { children }
                </main>
            </div>
        </>
    )
}
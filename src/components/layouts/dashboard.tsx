import Navbar from "@/components/fragments/Navbar";
import Sidebar from "@/components/fragments/Sidebar";

interface LayoutProps {
    children: React.ReactNode;
}

export default function DashboardLayout({ children }: LayoutProps) {
    return (
        <>
            <div className="grid grid-cols-5">
                <Navbar />
                {/* load sidebar */}
                <Sidebar />
                {/* main content */}
                <main className="col-span-4 max-h-screen overflow-y-scroll">
                    {children}
                </main>
            </div>
        </>
    )
}
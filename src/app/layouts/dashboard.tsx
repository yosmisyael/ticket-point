import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";

interface LayoutProps {
    children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
    return (
        <div>
            <Navbar />
            <div className="flex flex-1 pt-16">
                {/* load sidebar */}
                <Sidebar />
                {/* main content */}
                <main className="">
                    {children}
                </main>
            </div>
        </div>
    )
}
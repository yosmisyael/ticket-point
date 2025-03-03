import Navbar from "@/app/components/navbar";
import Sidebar from "@/app/components/sidebar";
interface LayoutProps {
    children: React.ReactNode; // Tipe untuk children
}
export default function Layout({ children }: LayoutProps) {
    return (
        <div>
            <Navbar />
            <div className="flex flex-1 pt-16">
                {/* Sidebar */}
                <Sidebar />
                {/* Konten Dinamis */}
                <main className="">
                    {children}
                </main>
            </div>
        </div>
    )
}
import { NextFont } from "next/dist/compiled/@next/font";
import { Poppins } from "next/font/google";
import Link from "next/link";
import UserMenuButton from "@/components/ui/UserMenuButton";

const poppins: NextFont = Poppins({
    weight: ['200', '400', '800'],
    subsets: ['latin'],
});

const dummyUser = {
    name: 'Havid Rosihandanuu',
    email: 'mangaped@king.com',
}

export default function Navbar() {
    return (
        <nav className="bg-light shadow-sm col-span-full">
            <div className="max-w-screen-3xl flex flex-wrap items-center justify-between mx-auto px-12 p-4">
                <Link href="/" className={`${poppins.className} flex items-center space-x-3 rtl:space-x-reverse`}>
                    <span className="self-center text-3xl font-bold whitespace-nowrap"><span className="text-primary-dark">Ticket</span><span className="text-alternative-mid">Point</span></span>
                </Link>
                <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                    <UserMenuButton user={dummyUser} />
                </div>
            </div>
        </nav>
    )
}
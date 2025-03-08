import Link from "next/link";
import {Menu, Search, X} from "lucide-react";
import React from "react";
import {NextFont} from "next/dist/compiled/@next/font";
import {Poppins} from "next/font/google";

const poppins: NextFont = Poppins({
    weight: ['200', '400', '800'],
    subsets: ['latin'],
});

interface NavbarProps {
    mobileMenuOpen: boolean,
    toggleMobileMenu: () => void,
}

export default function Navbar({ mobileMenuOpen, toggleMobileMenu }: NavbarProps, ): React.ReactNode {
    return (
        <header
            className="sticky top-0 z-50 flex flex-wrap gap-4 lg:gap-7 justify-between items-center px-4 lg:px-8 w-full text-xl leading-none text-black bg-white border-b border-solid border-zinc-200 min-h-[70px] shadow-sm">
            <Link href="/" className={`${poppins.className} flex items-center space-x-3 rtl:space-x-reverse`}>
                <span className="self-center text-3xl font-bold whitespace-nowrap"><span
                    className="text-primary-dark">Ticket</span><span
                    className="text-alternative-mid">Point</span></span>
            </Link>

            <div
                className="order-3 lg:order-2 flex overflow-hidden gap-2.5 items-center py-2 px-4 lg:px-6 tracking-wide whitespace-nowrap bg-white border border-zinc-300 hover:border-primary-mid min-h-[45px] rounded-lg w-full lg:w-auto lg:flex-1 lg:max-w-[500px] transition-all duration-300 focus-within:border-primary-mid focus-within:ring-1 focus-within:ring-primary-mid">
                <Search className="w-4 h-4 text-gray-500"/>
                <input
                    type="text"
                    placeholder="Search events, categories, locations..."
                    className="w-full bg-transparent border-none outline-none text-sm lg:text-base"
                />
            </div>

            <div className="order-2 lg:order-3 flex lg:hidden">
                <button
                    onClick={toggleMobileMenu}
                    className="p-2 text-gray-700 hover:text-primary-mid transition-colors"
                >
                    {mobileMenuOpen ? <X className="w-6 h-6"/> : <Menu className="w-6 h-6"/>}
                </button>
            </div>

            <nav
                className={`order-4 w-full lg:w-auto lg:flex flex-wrap gap-3 xl:gap-6 justify-center items-center font-medium text-center tracking-wide ${mobileMenuOpen ? 'flex flex-col items-start pt-4 pb-6' : 'hidden'} lg:flex`}>
                <button
                    className="w-full lg:w-auto text-left lg:text-center px-4 py-2 hover:bg-gray-100 transition-colors duration-300 rounded-lg">
                    Find Events
                </button>


                <Link
                    href="/auth/login"
                    className="w-full lg:w-auto text-left lg:text-center px-4 py-2 hover:bg-mid-light transition-colors duration-300 rounded-lg">
                    Log In
                </Link>
                <Link
                    href="/auth/register"
                    className="w-full lg:w-auto text-left lg:text-center px-4 py-2 text-white rounded-lg bg-primary-mid hover:bg-primary-mid transition-colors duration-300">
                    Sign Up
                </Link>
            </nav>
        </header>
    )
}
"use client";

import Link from "next/link";
import { Menu, Search, X } from "lucide-react";
import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { NextFont } from "next/dist/compiled/@next/font";
import { Poppins } from "next/font/google";
import UserMenuButton from "@/components/ui/UserMenuButton";

const poppins: NextFont = Poppins({
  weight: ["200", "400", "800"],
  subsets: ["latin"],
});

interface NavbarProps {
  mobileMenuOpen: boolean;
  toggleMobileMenu: () => void;
}

function Loader() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-60 backdrop-blur-sm">
      <div className="loader"></div>
      <style jsx>{`
        .loader {
          --c1: #673b14;
          --c2: #f8b13b;
          width: 40px;
          height: 80px;
          border-top: 4px solid var(--c1);
          border-bottom: 4px solid var(--c1);
          background: linear-gradient(
              90deg,
              var(--c1) 2px,
              var(--c2) 0 5px,
              var(--c1) 0
            )
            50%/7px 8px no-repeat;
          display: grid;
          overflow: hidden;
          animation: l5-0 2s infinite linear;
        }
        .loader::before,
        .loader::after {
          content: "";
          grid-area: 1/1;
          width: 75%;
          height: calc(50% - 4px);
          margin: 0 auto;
          border: 2px solid var(--c1);
          border-top: 0;
          box-sizing: content-box;
          border-radius: 0 0 40% 40%;
          -webkit-mask: linear-gradient(#000 0 0) bottom/4px 2px no-repeat,
            linear-gradient(#000 0 0);
          -webkit-mask-composite: destination-out;
                  mask-composite: exclude;
          background: linear-gradient(var(--d, 0deg), var(--c2) 50%, #0000 0)
              bottom/100% 205%,
            linear-gradient(var(--c2) 0 0) center/0 100%;
          background-repeat: no-repeat;
          animation: l5-1 2s infinite linear;
        }
        .loader::after {
          transform-origin: 50% calc(100% + 2px);
          transform: scaleY(-1);
          --s: 3px;
          --d: 180deg;
        }
        @keyframes l5-0 {
          80% {
            transform: rotate(0);
          }
          100% {
            transform: rotate(0.5turn);
          }
        }
        @keyframes l5-1 {
          10%,
          70% {
            background-size: 100% 205%, var(--s, 0) 100%;
          }
          70%,
          100% {
            background-position: top, center;
          }
        }
      `}</style>
    </div>
  );
}

export default function Navbar({ mobileMenuOpen, toggleMobileMenu }: NavbarProps): React.ReactNode {
  const [loading, setLoading] = useState(false);
  const path = usePathname();

  // Setiap kali route berubah, matikan loader
  useEffect(() => {
    setLoading(false);
  }, [path]);

  // Handler untuk mengaktifkan loader saat navigasi
  const handleNavClick = () => {
    setLoading(true);
  };

  return (
    <header className="sticky top-0 z-50 flex flex-wrap gap-4 lg:gap-7 justify-between items-center px-4 lg:px-8 w-full text-xl leading-none text-black bg-white border-b border-solid border-zinc-200 min-h-[70px] shadow-sm">
      {loading && <Loader />}
      <Link
        href="/"
        onClick={handleNavClick}
        className={`${poppins.className} flex items-center space-x-3 rtl:space-x-reverse`}
      >
        <span className="self-center text-3xl font-bold whitespace-nowrap">
          <span className="text-primary-dark">Ticket</span>
          <span className="text-alternative-mid">Point</span>
        </span>
      </Link>

      <div className="order-3 lg:order-2 flex overflow-hidden gap-2.5 items-center py-2 px-4 lg:px-6 tracking-wide whitespace-nowrap bg-white border border-zinc-300 hover:border-primary-mid min-h-[45px] rounded-lg w-full lg:w-auto lg:flex-1 lg:max-w-[500px] transition-all duration-300 focus-within:border-primary-mid focus-within:ring-1 focus-within:ring-primary-mid">
        <Search className="w-4 h-4 text-gray-500" />
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
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      <nav
        className={`order-4 w-full lg:w-auto lg:flex flex-wrap gap-3 xl:gap-6 justify-center items-center font-medium text-center tracking-wide ${
          mobileMenuOpen ? "flex flex-col items-start pt-4 pb-6" : "hidden"
        } lg:flex`}
      >
        <button
          onClick={handleNavClick}
          className="w-full lg:w-auto text-left lg:text-center px-4 py-2 hover:bg-gray-100 transition-colors duration-300 rounded-lg"
        >
          Find Events
        </button>

        <Link
          href="/auth/login"
          onClick={handleNavClick}
          className="w-full lg:w-auto text-left lg:text-center px-4 py-2 hover:bg-mid-light transition-colors duration-300 rounded-lg"
        >
          Log In
        </Link>
        <Link
          href="/auth/register"
          onClick={handleNavClick}
          className="w-full lg:w-auto text-left lg:text-center px-4 py-2 text-white rounded-lg bg-primary-mid hover:bg-primary-mid transition-colors duration-300"
        >
          Sign Up
        </Link>
      </nav>
    </header>
  );
}

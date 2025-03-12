"use client";

import { Poppins } from "next/font/google";
import Link from "next/link";
import UserMenuButton from "@/components/ui/UserMenuButton";
import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

// Font configuration
const poppins = Poppins({
  weight: ["200", "400", "800"],
  subsets: ["latin"],
});

// Helper function to convert a string to Title Case.
function toTitleCase(str: string): string {
  return str
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export default function Navbar() {
  const [loading, setLoading] = useState(false);
  const path = usePathname();
  const [user, setUser] = useState<{ name: string; email: string; token: string }>({
    name: "",
    email: "",
    token: "",
  });

  // Stop loader when navigation path changes.
  useEffect(() => {
    setLoading(false);
  }, [path]);

  // Retrieve user data from localStorage and format the name.
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        if (parsedUser && parsedUser.name && parsedUser.email && parsedUser.token) {
          setUser({
            name: toTitleCase(parsedUser.name),
            email: parsedUser.email,
            token: parsedUser.token,
          });
        }
      } catch (error) {
        console.error("Failed to parse user data:", error);
      }
    }
  }, []);

  return (
    <nav className="bg-light shadow-sm col-span-full">
      {loading && <Loader />}
      <div className="max-w-screen-3xl flex flex-wrap items-center justify-between mx-auto px-12 p-4">
        {/* Logo/Brand */}
        <Link
          href="/"
          className={`${poppins.className} flex items-center space-x-3 rtl:space-x-reverse`}
        >
          <span className="self-center text-3xl font-bold whitespace-nowrap">
            <span className="text-primary-dark">Ticket</span>
            <span className="text-alternative-mid">Point</span>
          </span>
        </Link>
        {/* Right side of Navbar (User Menu) */}
        <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          <UserMenuButton user={user} />
        </div>
      </div>
    </nav>
  );
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
          background: linear-gradient(
            var(--d, 0deg),
            var(--c2) 50%,
            transparent 0
          )
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

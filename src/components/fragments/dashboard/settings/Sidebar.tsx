"use client";

import LinkInterface from "@/interfaces/Link";
import Link from "next/link";
import React, { useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

// Contoh link
const links: LinkInterface[] = [
  { name: "account information", path: "/dashboard/settings/contact" },
  { name: "change email address", path: "/dashboard/settings/email" },
  { name: "change password", path: "/dashboard/settings/password" },
];

// Tetapkan kelas sidebar secara statis agar tidak berubah antara server dan client
const sidebarContentClass = "h-full px-3 py-4 overflow-hidden bg-light text-mid-dark";

export default function Sidebar() {
  const path: string = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div >
      {/* Tombol hamburger untuk mobile */}
      <div className="md:hidden p-4">
        <button onClick={() => setIsOpen(true)} className="text-mid-dark">
          <Menu size={24} />
        </button>
      </div>

      {/* Sidebar Overlay (Mobile) */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div className="w-64 bg-light shadow-lg">
            <div className="flex justify-end p-4">
              <button onClick={() => setIsOpen(false)} className="text-mid-dark">
                <X size={24} />
              </button>
            </div>
            <div className={sidebarContentClass}>
              <ul className="space-y-3 text-xl">
                {links.map((link, index) => (
                  <li key={index}>
                    <Link
                      href={link.path}
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center p-2 rounded-lg transition-colors ${
                        path === link.path
                          ? "bg-mid-dark text-white"
                          : "text-mid-dark hover:bg-white hover:text-dark"
                      }`}
                    >
                      <span className="ml-3 capitalize">{link.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          {/* Area klik di luar sidebar untuk menutup */}
          <div className="flex-grow" onClick={() => setIsOpen(false)}></div>
        </div>
      )}

      {/* Sidebar untuk Desktop */}
      <div className="hidden md:block">
        <aside className="w-64 h-screen shadow-lg" aria-label="Sidebar">
          <div className={sidebarContentClass}>
            <ul className="space-y-3 text-xl">
              {links.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.path}
                    className={`flex items-center p-2 rounded-lg transition-colors ${
                      path === link.path
                        ? "bg-mid-dark text-white"
                        : "text-mid-dark hover:bg-white hover:text-dark"
                    }`}
                  >
                    <span className="ml-3 capitalize">{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}

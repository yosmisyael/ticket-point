"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import LinkInterface from "@/interfaces/Link";

// Contoh link
const links: LinkInterface[] = [
  { name: "account information", path: "/dashboard/settings/contact" },
  { name: "change email address", path: "/dashboard/settings/email" },
  { name: "change password", path: "/dashboard/settings/password" },
];

// Tetapkan kelas sidebar secara statis agar tidak berubah antara server dan client
const sidebarContentClass =
  "h-full px-3 py-4 overflow-hidden bg-light text-mid-dark";

// Komponen Loader
function Loader() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-60 backdrop-blur-sm">
      {/* Elemen loader */}
      <div className="loader"></div>

      {/* CSS loader inline */}
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
            50% / 7px 8px no-repeat;
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
              bottom / 100% 205%,
            linear-gradient(var(--c2) 0 0) center / 0 100%;
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

export default function Sidebar() {
  const path: string = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  // State untuk loader
  const [loading, setLoading] = useState(false);
  // Simpan path sebelumnya untuk mematikan loader setelah route berubah
  const [prevPath, setPrevPath] = useState(path);

  // Setiap kali path berubah, matikan loader
  useEffect(() => {
    if (prevPath !== path) {
      setLoading(false);
      setPrevPath(path);
    }
  }, [path, prevPath]);

  // Saat link diklik, aktifkan loader
  const handleLinkClick = () => {
    setLoading(true);
  };

  return (
    <>
      {/* Tampilkan loader jika state loading true */}
      {loading && <Loader />}

      <div>
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
                        onClick={() => {
                          setIsOpen(false);
                          handleLinkClick();
                        }}
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
                      onClick={handleLinkClick}
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
    </>
  );
}

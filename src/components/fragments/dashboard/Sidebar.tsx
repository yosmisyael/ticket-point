import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Users, Calendar, Building2, LineChart } from 'lucide-react';
import LinkInterface from "@/interfaces/Link";

// Data link sidebar
const links: LinkInterface[] = [
  {
    name: "home",
    path: "/dashboard/home",
    icon: <Home className="size-6" />,
  },
  {
    name: "Attendance",
    path: "/dashboard/attendance",
    icon: <Users className="size-6" />,
  },
  {
    name: "events",
    path: "/dashboard/events",
    icon: <Calendar className="size-6" />,
  },
  {
    name: "organization",
    path: "/dashboard/organization",
    icon: <Building2 className="size-6" />,
  },
  {
    name: "reports",
    path: "/dashboard/reports",
    icon: <LineChart className="size-6" />,
  },
];

// Komponen Loader
function Loader() {
  return (
      <div className="loader-overlay">
        <div className="loader"></div>
        <style jsx>{`
          .loader-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(255, 255, 255, 0.6);
            backdrop-filter: blur(5px);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 9999;
          }
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
            -webkit-mask:
                linear-gradient(#000 0 0) bottom/4px 2px no-repeat,
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
            10%, 70% {
              background-size: 100% 205%, var(--s, 0) 100%;
            }
            70%, 100% {
              background-position: top, center;
            }
          }
        `}</style>
      </div>
  );
}

export default function Sidebar() {
  const pathname = usePathname() || "";

  // Loader state
  const [loading, setLoading] = useState(false);
  const [prevPath, setPrevPath] = useState(pathname);

  // Toggle sidebar (mobile)
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Saat route berubah, matikan loader
  useEffect(() => {
    if (prevPath !== pathname) {
      setLoading(false);
      setPrevPath(pathname);
      // Tutup sidebar otomatis setelah navigasi (opsional)
      setSidebarOpen(false);
    }
  }, [pathname, prevPath]);

  const handleLinkClick = () => {
    setLoading(true);
  };

  return (
      <>
        {/* Loader */}
        {loading && <Loader />}

        {/* Tombol hamburger (hanya di mobile) */}
        <div className="sm:hidden p-2">
          <button
              onClick={() => setSidebarOpen(true)}
              className="text-gray-700 focus:outline-none"
          >
            {/* Icon hamburger */}
            <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
            >
              <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        {/* SIDEBAR untuk MOBILE (overlay) */}
        {sidebarOpen && (
            <div className="fixed inset-0 z-50 sm:hidden">
              {/* Background hitam transparan */}
              <div
                  className="absolute inset-0 bg-black bg-opacity-50"
                  onClick={() => setSidebarOpen(false)}
              />
              {/* Sidebar overlay dari kiri */}
              <aside className="absolute left-0 top-0 w-64 h-full bg-white shadow-lg p-4 overflow-y-auto">
                {/* Tombol close */}
                <button
                    onClick={() => setSidebarOpen(false)}
                    className="mb-4 text-gray-700 focus:outline-none"
                >
                  <svg
                      className="h-6 w-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                  >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
                {/* Isi link sidebar */}
                <ul className="space-y-3 text-xl">
                  {links.map((link, index) => (
                      <li key={index}>
                        <Link
                            href={link.path}
                            onClick={handleLinkClick}
                            className={`flex items-center p-2 rounded-lg group ${
                                pathname.split("/").pop() === link.name.toLowerCase()
                                    ? "bg-blue-600 text-white"
                                    : "hover:bg-gray-100 text-gray-700"
                            }`}
                        >
                          {link.icon}
                          <span className="ml-3 capitalize">{link.name}</span>
                        </Link>
                      </li>
                  ))}
                </ul>
              </aside>
            </div>
        )}

        {/* SIDEBAR untuk DESKTOP (tetap muncul di kiri) */}
        <aside
            id="sidebar-multi-level-sidebar"
            className="hidden sm:block w-64 h-screen border-r border-gray-200 bg-white text-gray-700"
            aria-label="Sidebar"
        >
          <div className="h-full px-3 py-4 overflow-y-auto">
            <ul className="space-y-3 text-xl">
              {links.map((link, index) => (
                  <li key={index}>
                    <Link
                        href={link.path}
                        onClick={handleLinkClick}
                        className={`flex items-center p-2 rounded-lg group ${
                            pathname.split("/").pop() === link.name.toLowerCase()
                                ? "bg-blue-600 text-white"
                                : "hover:bg-gray-100"
                        }`}
                    >
                      {link.icon}
                      <span className="ml-3 capitalize">{link.name}</span>
                    </Link>
                  </li>
              ))}
            </ul>
          </div>
        </aside>
      </>
  );
}
"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { CircleUser, LogOut, Settings } from "lucide-react";
import { useRouter } from "next/navigation";
import axios, { AxiosError } from "axios";
import { UserProps } from "@/interfaces/user";

// Helper function to convert a string to Title Case.
function toTitleCase(str: string): string {
  return str
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

const UserMenuButton = ({ user }: { user: UserProps }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Logout function using DELETE method and including JWT token in the header.
  const handleLogout = async () => {
    try {
      // Retrieve token from the user object.
      const token = user.token;
      if (!token) {
        alert("Token not found. Please log in again.");
        return;
      }
      await axios.delete(
        `${process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000/api"}/users/logout`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // Clear user data from localStorage and redirect to login page.
      localStorage.removeItem("user");
      router.push("/auth/login");
    } catch (error: unknown) {
      console.error("Logout error:", error);
      alert("Logout failed. Please try again.");
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* User Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 rounded-full px-4 py-2 border-2 border-mid-dark hover:bg-mid-light focus:outline-none focus:ring-1 focus:ring-dark focus:ring-offset-2"
      >
        <div className="h-8 w-8 flex justify-center items-center rounded-full overflow-hidden">
          <CircleUser size={24} />
        </div>
        <span className="hidden md:inline font-medium text-sm">
          {user?.name ? toTitleCase(user.name) : "User"}
        </span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className={`h-5 w-5 text-gray-500 transition-transform ${isOpen ? "rotate-180" : ""}`}
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-full sm:w-64 md:w-48 rounded-lg bg-white border border-mid-dark z-10 shadow-lg max-h-[calc(100vh-6rem)] overflow-y-auto">
          {/* Dropdown Header */}
          <div className="px-4 py-2 border-b border-mid-dark">
            <p className="text-base font-medium">{user?.name ? toTitleCase(user.name) : "User"}</p>
            <p className="text-sm text-gray-500 truncate">{user?.email || "user@example.com"}</p>
          </div>

          {/* Menu Items */}
          <Link
            href="/dashboard/settings/contact"
            className="flex gap-3 items-center px-4 py-2 text-base text-mid-dark hover:text-dark hover:bg-mid-light"
          >
            <Settings size={24} />
            <span>Settings</span>
          </Link>

          <button
            onClick={handleLogout}
            className="flex gap-3 items-center w-full text-left px-4 py-2 text-base text-mid-dark hover:text-light hover:bg-red-600"
          >
            <LogOut size={24} />
            <span>Sign out</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default UserMenuButton;

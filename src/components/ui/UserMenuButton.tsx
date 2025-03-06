"use client"

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import {CircleUser, LogOut, Settings} from "lucide-react";

interface UserProps {
    name: string;
    email: string;
}

const UserMenuButton = ({ user }: { user: UserProps }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Handle click outside to close dropdown
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="relative cursor-pointer" ref={dropdownRef}>
            {/* User Button */}
            <button
                className="flex items-center space-x-2 rounded-full px-4 py-2 border-2 border-mid-dark hover:bg-mid-light focus:outline-none focus:ring-1 focus:ring-dark focus:ring-offset-2"
                onClick={() => setIsOpen(!isOpen)}
            >
                <div className="h-8 w-8 flex justify-center items-center rounded-full overflow-hidden">
                    <CircleUser size={24} />
                </div>
                <span className="hidden md:inline font-medium text-sm">
          {user?.name || 'User'}
        </span>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className={`h-5 w-5 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`}
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
                <div className="absolute right-0 mt-2 w-full rounded-lg bg-white border border-mid-dark z-10">
                    <div className="px-4 py-2 border-b border-mid-dark">
                        <p className="text-base font-medium">{user?.name || 'User'}</p>
                        <p className="text-sm text-gray-500 truncate">{user?.email || 'user@example.com'}</p>
                    </div>

                    <Link href="/dashboard/settings/contact" className="cursor-pointer flex gap-3 rounded-lg items-center px-4 py-2 text-base text-mid-dark hover:text-dark hover:bg-mid-light">
                        <Settings size={24} />
                        Settings
                    </Link>

                    <button
                        onClick={() => console.log('Sign out')}
                        className="cursor-pointer flex gap-3 rounded-lg items-center w-full text-left px-4 py-2 text-base text-mid-dark hover:text-light hover:bg-red-600"
                    >
                        <LogOut size={24} />
                        Sign out
                    </button>
                </div>
            )}
        </div>
    );
};

export default UserMenuButton;
"use client";

import LinkInterface from "@/interfaces/Link";
import Link from "next/link";
import React from "react";
import {usePathname} from "next/navigation";

const links : LinkInterface[] = [
    {
        name: "account information",
        path: "/dashboard/settings/contact",
    },
    {
        name: "change email address",
        path: "/dashboard/settings/email"
    },
    {
        name: "change password",
        path: "/dashboard/settings/password"
    },
];

export default function Sidebar(): React.ReactNode {
    const path: string = usePathname();

    return (
        <div>
            <aside
                   className="col-span-2 h-screen shadow-lg"
                   aria-label="Sidebar">
                <div className="h-full px-3 py-4 overflow-y-auto bg-light text-mid-dark">
                    <ul className="space-y-3 text-xl">
                        {
                            links.map((link: LinkInterface, index) => (
                                <li key={index}>
                                    <Link href={link.path}
                                          className={`flex items-center p-2 text-mid-dark rounded-lg group ${path === link.path ? "bg-mid-dark text-white" : "hover:bg-white hover:text-dark"}`}>
                                        <span className="ms-3 capitalize">{link.name}</span>
                                    </Link>
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </aside>
        </div>
    );
}
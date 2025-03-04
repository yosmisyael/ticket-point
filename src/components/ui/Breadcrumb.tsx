'use client'

import { usePathname } from "next/navigation";
import Link from "next/link";

export default function Breadcrumb() {
    const pathName = usePathname();
    const paths = pathName.split("/").filter((item) => item !== "");
    return (
        <ul className="flex gap-5 text-mid-dark text-lg">
            {
                paths.map((path, index) => (
                    <li className="inline-flex items-center capitalize" key={index}>
                        <Link href={
                            index === 0 && path === "dashboard" ? "/dashboard/home" :
                            index !== paths.length - 1 ? `/${paths.slice(0, index + 1).join('/')}` : ''
                        }>
                            {path}
                        </Link>
                        {index !== paths.length - 1 && (
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                                 stroke="currentColor" className="size-4 ms-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5"/>
                            </svg>
                        )}
                    </li>
                ))
            }
        </ul>
    )
}
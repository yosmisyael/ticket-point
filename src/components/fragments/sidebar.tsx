import React from 'react';
import Link from "next/link";
export default function Sidebar() {
    return (
        <div>
            {/* Sidebar */}
            <aside id="sidebar-multi-level-sidebar" className="col-span-2 h-screen border-r-[1] border-mid-dark transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
                <div className="h-full px-3 py-4 overflow-y-auto bg-light text-mid-dark">
                    <ul className="space-y-3 text-xl">
                        <li>
                            <Link href="/dashboard"
                               className="flex items-center p-2 text-mid-dark rounded-lg hover:bg-white hover:text-dark group">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                     strokeWidth={1.5} stroke="currentColor" className="size-6 group-hover:text-dark">
                                    <path strokeLinecap="round" strokeLinejoin="round"
                                          d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"/>
                                </svg>
                                <span className="ms-3">Home</span>
                            </Link>
                        </li>
                        <li>
                            <Link href="/dashboard/events"
                               className="flex items-center p-2 text-mid-dark rounded-lg hover:bg-white hover:text-dark group">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                     strokeWidth={1.5} stroke="currentColor" className="size-6 group-hover:text-dark">
                                    <path strokeLinecap="round" strokeLinejoin="round"
                                          d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5"/>
                                </svg>
                                <span className="ms-3">Events</span>
                            </Link>
                        </li>
                        <li>
                            <a href="/dashboard/organization"
                               className="flex items-center p-2 text-mid-dark rounded-lg hover:bg-white hover:text-dark group">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                     strokeWidth={1.5} stroke="currentColor" className="size-6 group-hover:text-dark">
                                    <path strokeLinecap="round" strokeLinejoin="round"
                                          d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Z"/>
                                </svg>
                                <span className="ms-3">Organization</span>
                            </a>
                        </li>
                        <li>
                            <a href="/dashboard/reports"
                               className="flex items-center p-2 text-mid-dark rounded-lg hover:bg-white hover:text-dark group">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                     strokeWidth={1.5} stroke="currentColor" className="size-6 group-hover:text-dark">
                                    <path strokeLinecap="round" strokeLinejoin="round"
                                          d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0 .5 1.5m-.5-1.5h-9.5m0 0-.5 1.5m.75-9 3-3 2.148 2.148A12.061 12.061 0 0 1 16.5 7.605"/>
                                </svg>
                                <span className="ms-3">Reports</span>
                            </a>
                        </li>
                    </ul>
                </div>
            </aside>
        </div>
    );
}
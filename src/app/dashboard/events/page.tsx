"use client";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/CardEvent";
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { useEffect, useRef } from "react";

export default function Events() {
    const events = [
        {
            id: 1,
            title: "TechVision 2025",
            description: "TechVision 2025 adalah konferensi teknologi tahunan yang menghadirkan inovasi terbaru di bidang kecerdasan buatan, komputasi awan, dan keamanan siber. Acara ini mengundang para pakar industri, startup teknologi, dan perusahaan besar untuk berbagi wawasan tentang masa depan teknologi digital.",
            imageUrl: "/1.jpg",
        },
        {
            id: 2,
            title: "Inovasi EduFest",
            description: "Inovasi EduFest adalah festival pendidikan yang bertujuan untuk memperkenalkan metode pembelajaran terbaru, teknologi pendidikan, dan tren dalam dunia akademik. Acara ini mencakup seminar, lokakarya, dan pameran dari berbagai institusi pendidikan dan startup edtech.",
            imageUrl: "/1.jpg",
        },
        {
            id: 3,
            title: "Creative Future Expo",
            description: "Creative Future Expo adalah pameran kreatif yang menampilkan inovasi di bidang desain, seni digital, dan industri kreatif. Acara ini menghadirkan berbagai workshop, kompetisi, serta sesi networking bagi desainer, seniman, dan pengusaha kreatif untuk berbagi inspirasi dan kolaborasi.",
            imageUrl: "/1.jpg",
        }
    ];

    const dateInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (dateInputRef.current) {
            flatpickr(dateInputRef.current, {
                mode: "range",
                dateFormat: "Y-m-d",
                onChange: (selectedDates) => {
                    console.log("Selected dates:", selectedDates);
                }
            });
        }
    }, []);

    return (
        <div className="sm:p-6 md:p-5">
            <div className="mb-6 md:mb-20">
                <h1 className="mx-2 text-4xl sm:text-5xl md:text-6xl font-semibold font-inter text-[var(--color-dark)]">
                    Events
                </h1>
            </div>

            <div className="my-5 grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 md:mb-10">
                <form className="col-span-1 md:col-span-2 flex flex-col sm:flex-row gap-4">
                    <div className="relative w-full">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">

                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-[var(--color-mid-dark)]">
                                <path strokeLinecap="round" strokeLinejoin="round"
                                    d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
                            </svg>
                        </div>
                        <label htmlFor="date" className="sr-only">Date</label>
                        <input
                            ref={dateInputRef}
                            type="text"
                            id="date"
                            placeholder="Select Date Range"
                            className="w-full p-3 pl-10 text-sm text-[var(--color-dark)] border border-[var(--color-mid-light)] rounded-lg bg-[var(--color-light)] focus:ring-[var(--color-primary-mid)] focus:border-[var(--color-primary-mid)] focus:outline-none"
                        />
                    </div>

                    <div className="relative w-full">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <svg className="w-5 h-5 text-[var(--color-mid-dark)]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                            </svg>
                        </div>
                        <label htmlFor="default-search" className="sr-only">Search</label>
                        <input
                            type="search"
                            id="default-search"
                            className="block w-full p-3 pl-10 text-sm text-[var(--color-dark)] border border-[var(--color-mid-light)] rounded-lg bg-[var(--color-light)] focus:ring-[var(--color-primary-mid)] focus:border-[var(--color-primary-mid)] focus:outline-none"
                            placeholder="Search Event..."
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full sm:w-auto text-[var(--color-light)] bg-[var(--color-primary-mid)] hover:bg-[var(--color-primary-dark)] focus:ring-4 focus:outline-none focus:ring-[var(--color-primary-mid)] font-medium rounded-lg text-sm px-4 py-2"
                    >
                        Search
                    </button>
                </form>

                <div className="flex justify-start md:justify-end">
                    <Button href="/dashboard/events/create" bgColor="var(--color-primary-mid)" textColor="var(--color-light)" >Create Event</Button>
                </div>

                <hr className="col-span-3 w-full border-[var(--color-mid-light)]" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {events.map((event, index) => (
                    <Card key={index} path="events" id={event.id} title={event.title} description={event.description} imageUrl={event.imageUrl} />
                ))}
            </div>
        </div>
    );
}

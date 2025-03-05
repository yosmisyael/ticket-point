"use client";
import Card from "@/components/ui/Card";
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { useEffect } from "react";

export default function EventsPage() {
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

    useEffect(() => {
        flatpickr("#date", {
            mode: "range",
            dateFormat: "Y-m-d",
        });
    }, []);

    return (
        <div className="p-4 sm:p-6 md:p-10">
            <div className="mb-6 md:mb-20">
                <h1 className="mx-2 text-4xl sm:text-5xl md:text-6xl font-semibold font-inter text-[var(--color-dark)]">
                    Events
                </h1>
            </div>

            <div className="my-5 grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 md:mb-10">
                <form className="col-span-1 md:col-span-2 flex flex-col sm:flex-row gap-4">
                    <div className="w-full sm:w-auto">
                        <label htmlFor="date" className="sr-only">Tanggal</label>
                        <input
                            type="text"
                            id="date"
                            placeholder="Select Date"
                            className="w-full p-3 text-sm text-[var(--color-dark)] border border-[var(--color-mid-light)] rounded-lg bg-[var(--color-light)] focus:ring-[var(--color-primary-mid)] focus:border-[var(--color-primary-mid)] focus:outline-none"
                        />
                    </div>

                    <div className="relative w-full">
                        <label htmlFor="default-search" className="sr-only">Search</label>
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <svg className="w-4 h-4 text-[var(--color-mid-dark)]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                            </svg>
                        </div>
                        <input
                            type="search"
                            id="default-search"
                            className="block w-full p-3 pl-10 text-sm text-[var(--color-dark)] border border-[var(--color-mid-light)] rounded-lg bg-[var(--color-light)] focus:ring-[var(--color-primary-mid)] focus:border-[var(--color-primary-mid)] focus:outline-none"
                            placeholder="Search Event..."
                            required
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
                    <a
                        href="#"
                        className="flex w-fit items-center px-4 py-2 text-sm font-medium text-center rounded-lg text-[var(--color-light)] bg-[var(--color-primary-mid)] hover:bg-[var(--color-primary-dark)] focus:ring-4 focus:outline-none"
                    >
                        <svg className="w-6 h-6 text-[var(--color-light)] mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14m-7 7V5" />
                        </svg>
                        Create Event
                    </a>
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

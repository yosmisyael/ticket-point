"use client";
import Image from "next/image";
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { useEffect } from "react";

export default function EventsPage() {
    const events = [
        {
            name: "TechVision 2025",
            description: "TechVision 2025 adalah konferensi teknologi tahunan yang menghadirkan inovasi terbaru di bidang kecerdasan buatan, komputasi awan, dan keamanan siber. Acara ini mengundang para pakar industri, startup teknologi, dan perusahaan besar untuk berbagi wawasan tentang masa depan teknologi digital."
        },
        {
            name: "Inovasi EduFest",
            description: "Inovasi EduFest adalah festival pendidikan yang bertujuan untuk memperkenalkan metode pembelajaran terbaru, teknologi pendidikan, dan tren dalam dunia akademik. Acara ini mencakup seminar, lokakarya, dan pameran dari berbagai institusi pendidikan dan startup edtech."
        },
        {
            name: "Creative Future Expo",
            description: "Creative Future Expo adalah pameran kreatif yang menampilkan inovasi di bidang desain, seni digital, dan industri kreatif. Acara ini menghadirkan berbagai workshop, kompetisi, serta sesi networking bagi desainer, seniman, dan pengusaha kreatif untuk berbagi inspirasi dan kolaborasi."
        }
    ];

    const truncateWords = (text: string, maxWords = 18) => {
        const words = text.split(" ");
        return words.length > maxWords ? words.slice(0, maxWords).join(" ") + "..." : text;
    };

    useEffect(() => {
        flatpickr("#date", {
            mode: "range",
            dateFormat: "Y-m-d",
        });
    }, []);

    return (
        <div className="p-4 sm:p-6 md:p-10">
            <div className="mb-6 md:mb-10">
                <h1 className="mx-2 text-4xl sm:text-5xl md:text-6xl font-semibold font-inter text-[var(--color-dark)]">
                    Events
                </h1>
            </div>

            <div className="my-5 grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 md:mb-10">
                <form className="col-span-1 md:col-span-2 flex flex-col sm:flex-row gap-4">
                    <div className="w-full sm:w-auto flex">
                        <div>
                            <label htmlFor="date" className="sr-only">Tanggal</label>
                            <input
                                type="text"
                                id="date"
                                placeholder="Select Date"
                                className="w-full p-3 text-sm text-[var(--color-dark)] border border-[var(--color-mid-light)] rounded-lg bg-[var(--color-light)] focus:ring-[var(--color-primary-mid)] focus:border-[var(--color-primary-mid)] focus:outline-none"
                            />
                        </div>
                        <div className="mx-2">
                            <label htmlFor="default-search" className="sr-only">Search</label>
                            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                <svg className="w-4 h-4 text-[var(--color-mid-dark)]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                </svg>
                            </div>
                            <input
                                type="search"
                                id="default-search"
                                className="block w-full p-3 ps-10 mx-2 text-sm text-[var(--color-dark)] border border-[var(--color-mid-light)] rounded-lg bg-[var(--color-light)] focus:ring-[var(--color-primary-mid)] focus:border-[var(--color-primary-mid)] focus:outline-none"
                                placeholder="Search Event..."
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="text-[var(--color-light)] mx-2 bg-[var(--color-primary-mid)] hover:bg-[var(--color-primary-dark)] focus:ring-4 focus:outline-none focus:ring-[var(--color-primary-mid)] font-medium rounded-lg text-sm px-4 py-2"
                        >
                            Search
                        </button>
                    </div>
                </form>
                <div className="flex justify-end">
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
                    <div key={index} className="max-w-sm w-full bg-[var(--color-light)] border border-[var(--color-mid-light)] rounded-lg shadow-sm">
                        <a href="#">
                            <Image
                                className="rounded-t-lg w-full h-48 object-cover"
                                src={"/1.jpg"}
                                width={500}
                                height={500}
                                alt={event.name}
                            />
                        </a>
                        <div className="p-5">
                            <a href="#">
                                <h5 className="mb-2 text-2xl font-bold tracking-tight text-[var(--color-dark)] font-inter">
                                    {event.name}
                                </h5>
                            </a>
                            <p className="mb-3 font-normal text-[var(--color-mid-dark)] font-inter">
                                {truncateWords(event.description)}
                            </p>
                            <div className="flex justify-end">
                                <a
                                    href="#"
                                    className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-[var(--color-light)] bg-[var(--color-primary-mid)] hover:bg-[var(--color-primary-dark)] focus:ring-4 focus:outline-none"
                                >
                                    Read more
                                    <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
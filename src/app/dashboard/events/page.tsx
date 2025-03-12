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
      description:
        "TechVision 2025 adalah konferensi teknologi tahunan yang menghadirkan inovasi terbaru di bidang kecerdasan buatan, komputasi awan, dan keamanan siber.",
      imageUrl: "/1.jpg",
    },
    {
      id: 2,
      title: "Inovasi EduFest",
      description:
        "Inovasi EduFest adalah festival pendidikan yang bertujuan untuk memperkenalkan metode pembelajaran terbaru, teknologi pendidikan, dan tren dalam dunia akademik.",
      imageUrl: "/1.jpg",
    },
    {
      id: 3,
      title: "Creative Future Expo",
      description:
        "Creative Future Expo adalah pameran kreatif yang menampilkan inovasi di bidang desain, seni digital, dan industri kreatif.",
      imageUrl: "/1.jpg",
    },
  ];

  const dateInputRef = useRef(null);

  useEffect(() => {
    if (dateInputRef.current) {
      flatpickr(dateInputRef.current, {
        mode: "range",
        dateFormat: "Y-m-d",
        onChange: (selectedDates) => {
          console.log("Selected dates:", selectedDates);
        },
      });
    }
  }, []);

  return (
    <div className="container mx-auto px-4 py-6">
      <header className="mb-8">
        <h1 className="text-4xl font-semibold text-[var(--color-dark)] sm:text-left">
          Events
        </h1>
        <hr className="mt-2 border-slate-100" />
      </header>

      {/* Search & Filter Section */}
      <div className="mb-8 flex flex-wrap gap-2 sm:gap-4 items-center justify-between">
        {/* Search & Date Input */}
        <div className="flex flex-wrap w-full sm:w-auto flex-1 gap-2 sm:gap-4">
          {/* Date Range Input */}
          <input
            ref={dateInputRef}
            type="text"
            placeholder="Select Date Range"
            className="w-full sm:w-auto flex-1 p-3 text-sm text-[var(--color-dark)] border border-[var(--color-mid-light)] rounded-lg bg-[var(--color-light)] focus:ring-[var(--color-primary-mid)] focus:border-[var(--color-primary-mid)] focus:outline-none"
          />

          {/* Search Input */}
          <input
            type="search"
            placeholder="Search Event..."
            className="w-full sm:w-auto flex-1 p-3 text-sm text-[var(--color-dark)] border border-[var(--color-mid-light)] rounded-lg bg-[var(--color-light)] focus:ring-[var(--color-primary-mid)] focus:border-[var(--color-primary-mid)] focus:outline-none"
          />

          {/* Search Button */}
          <Button
            type="submit"
            className="w-full sm:w-auto text-[var(--color-light)] bg-[var(--color-primary-mid)] hover:bg-[var(--color-primary-dark)] focus:ring-4 focus:outline-none focus:ring-[var(--color-primary-mid)] font-medium rounded-lg text-sm px-4 py-2"
          >
            Search
          </Button>
        </div>

        {/* Create Event Button */}
        <Button
          className="w-full sm:w-auto text-[var(--color-light)] bg-[var(--color-primary-mid)] hover:bg-[var(--color-primary-dark)] focus:ring-4 focus:outline-none focus:ring-[var(--color-primary-mid)] font-medium rounded-lg text-sm px-4 py-3"
          href="/dashboard/events/create"
        >
          Create Event
        </Button>
      </div>

      <hr className="border-[var(--color-mid-light)] mb-6" />

      {/* Event Grid */}
      <div className="flex justify-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {events.map((event) => (
            <Card
              key={event.id}
              path="events"
              id={event.id}
              title={event.title}
              description={event.description}
              imageUrl={event.imageUrl}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

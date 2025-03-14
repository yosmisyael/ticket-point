"use client";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/CardEvent";
import AxiosInstance from "@/service/api";
import flatpickr from "flatpickr";
import { useRouter } from "next/navigation";
import "flatpickr/dist/flatpickr.min.css";
import { useEffect, useRef, useState } from "react";

// Helper function untuk mengubah string ke Title Case.
function toTitleCase(str) {
  return str
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export default function Events() {
  const router = useRouter();
  const dateInputRef = useRef(null);
  const flatpickrInstance = useRef(null); // Simpan instance flatpickr
  const [name, setName] = useState("");
  const [userId, setUserId] = useState(null);
  const [events, setEvents] = useState([]); // Data event dari API
  const [filteredEvents, setFilteredEvents] = useState([]); // Hasil pencarian
  const [searchQuery, setSearchQuery] = useState(""); // Query pencarian
  const [selectedDates, setSelectedDates] = useState([]); // Tanggal yang dipilih
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Cek apakah pengguna sudah login dengan memeriksa data di localStorage.
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      router.push("/auth/login");
    } else {
      try {
        const userObj = JSON.parse(storedUser);
        if (userObj && userObj.name && userObj.id) {
          setName(toTitleCase(userObj.name));
          setUserId(userObj.id);
        } else {
          router.push("/auth/login");
        }
      } catch (error) {
        console.error("Error parsing user data:", error);
        router.push("/auth/login");
      }
    }
  }, [router]);

  // Mengambil data event dari API berdasarkan organizer (userId).
  useEffect(() => {
    async function fetchEvents() {
      if (!userId) return;
      try {
        const response = await AxiosInstance(`/api/events/owner/${userId}`);

        if (response.status !== 200) {
          throw new Error("Failed to fetch events");
        }

        const payload = response.data;
        console.log(payload);
        if (payload.message === "success") {
          setEvents(payload.data);
          setFilteredEvents(payload.data); // Set filteredEvents dengan data awal
        } else {
          setError("Failed to fetch events");
        }
      } catch (error) {
        console.error("Error fetching events:", error);
        setError("Error fetching events");
      } finally {
        setLoading(false);
      }
    }
    fetchEvents();
  }, [userId]);

  // Inisialisasi flatpickr setelah data selesai dimuat.
  useEffect(() => {
    if (!loading && dateInputRef.current && !flatpickrInstance.current) {
      flatpickrInstance.current = flatpickr(dateInputRef.current, {
        mode: "range",
        dateFormat: "Y-m-d",
        onChange: (selectedDates) => {
          console.log("Selected dates (raw):", selectedDates);

          // Format tanggal yang dipilih
          const formattedDates = selectedDates.map((date) =>
            date.toLocaleDateString("en-CA") // Format: YYYY-MM-DD
          );
          setSelectedDates(formattedDates);

          console.log("Formatted dates:", formattedDates);
        },
      });

      // Cleanup function
      return () => {
        if (flatpickrInstance.current) {
          flatpickrInstance.current.destroy();
          flatpickrInstance.current = null;
        }
      };
    }
  }, [loading]); // Inisialisasi ulang hanya jika loading berubah

  // Fungsi untuk menangani perubahan input pencarian
  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    // Filter events berdasarkan query
    const filtered = events.filter(
      (event) =>
        event.title.toLowerCase().includes(query) ||
        event.description.toLowerCase().includes(query)
    );
    setFilteredEvents(filtered);
  };

  if (loading) {
    return <div className="p-5">Loading events...</div>;
  }

  if (error) {
    return <div className="p-5">Error: {error}</div>;
  }

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
            value={searchQuery}
            onChange={handleSearch} // Tambahkan onChange handler
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
          {filteredEvents.length > 0 ? (
            filteredEvents.map((event, index) => (
              <Card
                key={index}
                id={event.id}
                title={event.title}
                description={event.description}
                path="home"
                imageUrl={event.coverImage ? event.coverImage : ""}
                format={event.format}
                startTime={event.startTime}
                endTime={event.endTime}
                startDate={event.startDate}
                endDate={event.endDate}
              />
            ))
          ) : (
            <p>No events found</p>
          )}
        </div>
      </div>
    </div>
  );
}
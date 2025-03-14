"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Card from "@/components/ui/CardEvent";
import AxiosInstance from "../../../service/api";

// Helper function untuk mengubah string ke Title Case.
function toTitleCase(str: string): string {
  return str
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export default function DashboardHome() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [userId, setUserId] = useState<number | null>(null);
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  if (loading) {
    return <div className="p-5">Loading events...</div>;
  }

  if (error) {
    return <div className="p-5">Error: {error}</div>;
  }

  return (
    <div className="p-5">
      <div className="mb-10">
        <h1 className="mx-2 text-6xl font-semibold font-inter text-[var(--color-dark)]">
          Welcome, {name}
        </h1>
      </div>
      <div className="grid gap-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
        {events.length > 0 ? (
          events.map((event, index) => (
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
  );
}

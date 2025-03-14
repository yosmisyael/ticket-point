'use client'

import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { Calendar1Icon, MapPinIcon, TimerIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Reports() {
  const router = useRouter();
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userId, setUserId] = useState<number | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      router.push("/auth/login");
    } else {
      try {
        const userObj = JSON.parse(storedUser);
        if (userObj?.id) {
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

  useEffect(() => {
    async function fetchEvents() {
      if (!userId) return;
      try {
        const res = await axios.get(`http://localhost:3000/api/events/search?organizer=${userId}`);
        if (res.status === 200 && res.data.message === "success") {
          setEvents(res.data.data);
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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="p-5">
      <header className="mb-8">
        <h1 className="text-4xl font-semibold text-[var(--color-dark)] sm:text-left">Reports</h1>
        <hr className="mt-2 border-slate-100" />
      </header>
      {events.map((event) => (
        <Card key={event.id} className="w-full mb-5 flex flex-col h-full">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 flex-grow">
            <div className="col-span-1 flex justify-center md:justify-start">
              <Image
                className="rounded-lg"
                src={event.imageUrl || "/banner-placeholder.png"}
                width={300}
                height={150}
                alt={event.title}
              />
            </div>
            <div className="col-span-1 mx-4 md:col-span-3 flex flex-col">
              <h3 className="text-2xl md:text-3xl font-bold text-[var(--color-dark-mid)]">
                {event.title}
              </h3>
              <p className="text-sm mx-2 text-[var(--color-mid-dark)] my-2">
                {event.description}
              </p>
              <div className="flex flex-col md:flex-row text-[var(--color-mid-dark)] items-start md:items-center gap-2 md:gap-4">
                <span className="flex items-center gap-1 text-[var(--color-primary-mid)]">
                  <Calendar1Icon size={16} className="text-[var(--color-alternative-mid)] mr-1" />
                  {event.date}
                </span>
                <span className="flex items-center gap-1 text-[var(--color-primary-mid)]">
                  <TimerIcon size={16} className="text-[var(--color-alternative-mid)] mr-1" />
                  {event.startTime} - {event.endTime}
                </span>
                <span className="flex items-center gap-1 text-[var(--color-primary-mid)]">
                  <MapPinIcon size={16} className="text-[var(--color-alternative-mid)] mr-1" />
                  {event.location ? event.location.address : "Lokasi tidak tersedia"}
                </span>
              </div>
              <div className="mt-auto flex justify-end pt-4">
                <Button href={`/dashboard/reports/${event.id}`} bgColor="var(--color-primary-mid)" textColor="var(--color-light)">
                  Detail
                </Button>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}

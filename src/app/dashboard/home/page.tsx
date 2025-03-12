"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Card from "@/components/ui/CardEvent";

// Helper function to convert a string to Title Case.
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
  const events = [
    {
      id: 1,
      title: "TechVision 2025",
      description:
        "TechVision 2025 is an annual technology conference featuring the latest innovations in artificial intelligence, cloud computing, and cybersecurity. The event invites industry experts, tech startups, and major companies to share insights on the future of digital technology.",
      imageUrl: "/1.jpg",
    },
    {
      id: 2,
      title: "Inovasi EduFest",
      description:
        "Inovasi EduFest is an education festival aimed at showcasing the latest learning methods, educational technology, and academic trends. The event includes seminars, workshops, and exhibitions from various educational institutions and edtech startups.",
      imageUrl: "/1.jpg",
    },
    {
      id: 3,
      title: "Creative Future Expo",
      description:
        "Creative Future Expo is a creative exhibition that displays innovations in design, digital art, and the creative industry. The event features various workshops, competitions, and networking sessions for designers, digital artists, and creative entrepreneurs to share inspiration and collaborate.",
      imageUrl: "/1.jpg",
    },
  ];

  // Check if the user is logged in by verifying that a user object exists in localStorage.
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      router.push("/auth/login");
    } else {
      try {
        const userObj = JSON.parse(storedUser);
        if (userObj && userObj.name) {
          setName(toTitleCase(userObj.name));
        } else {
          router.push("/auth/login");
        }
      } catch (error) {
        console.error("Error parsing user data:", error);
        router.push("/auth/login");
      }
    }
  }, [router]);

  return (
    <div className="p-5">
      <div className="mb-10">
        <h1 className="mx-2 text-6xl font-semibold font-inter text-[var(--color-dark)]">
          Welcome, {name}
        </h1>
      </div>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
        {events.map((event, index) => (
          <Card
            key={index}
            id={event.id}
            title={event.title}
            description={event.description}
            path="home"
            imageUrl={event.imageUrl}
          />
        ))}
      </div>
    </div>
  );
}

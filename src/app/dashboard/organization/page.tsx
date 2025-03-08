"use strict";
import React from "react";
import { Globe, Users } from "lucide-react";

export default function Page() {
  const organization = {
    name: "TechCommunity Indonesia",
    description:
      "Komunitas teknologi terbesar di Indonesia yang berfokus pada pengembangan skill dan networking profesional IT. Kami menyelenggarakan berbagai event, workshop, dan konferensi untuk memajukan ekosistem teknologi di Indonesia.",
    website: "https://techcommunity.id",
    logo: <Users className="w-16 h-16 text-[var(--color-primary-mid)]" />,
  };

  const events = [
    {
      id: 1,
      title: "TechVision 2025",
      description:
        "TechVision 2025 adalah konferensi teknologi tahunan yang menghadirkan inovasi terbaru di bidang kecerdasan buatan, komputasi awan, dan keamanan siber. Acara ini mengundang para pakar industri, startup teknologi, dan perusahaan besar untuk berbagi wawasan tentang masa depan teknologi digital.",
      imageUrl:
        "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=1000",
    },
    {
      id: 2,
      title: "Inovasi EduFest",
      description:
        "Inovasi EduFest adalah festival pendidikan yang bertujuan untuk memperkenalkan metode pembelajaran terbaru, teknologi pendidikan, dan tren dalam dunia akademik. Acara ini mencakup seminar, lokakarya, dan pameran dari berbagai institusi pendidikan dan startup edtech.",
      imageUrl:
        "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=1000",
    },
    {
      id: 3,
      title: "Creative Future Expo",
      description:
        "Creative Future Expo adalah pameran kreatif yang menampilkan inovasi di bidang desain, seni digital, dan industri kreatif. Acara ini menghadirkan berbagai workshop, kompetisi, serta sesi networking bagi desainer, seniman, dan pengusaha kreatif untuk berbagi inspirasi dan kolaborasi.",
      imageUrl:
        "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&q=80&w=1000",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Organization Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="p-4 bg-gray-50 rounded-full">{organization.logo}</div>
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
                {organization.name}
              </h1>
              <p className="text-gray-600 mb-4 max-w-2xl">{organization.description}</p>
              <a 
                href={organization.website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-[var(--color-primary-mid)] hover:text-[var(--color-primary-dark)] transition-colors text-sm sm:text-base"
              >
                <Globe className="w-4 h-4 mr-2" />
                {organization.website}
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Events Section */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8">Upcoming Events</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event) => (
            <div key={event.id} className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
              <img 
                src={event.imageUrl} 
                alt={event.title}
                className="w-full h-48 object-cover sm:h-56 md:h-48 lg:h-56"
              />
              <div className="p-6">
                <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-2">{event.title}</h3>
                <p className="text-gray-600 text-sm sm:text-base line-clamp-3">{event.description}</p>
                <button className="mt-4 px-4 py-2 bg-[var(--color-primary-mid)] text-white rounded-md hover:bg-[var(--color-primary-dark)] transition-colors">
                  Learn More
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

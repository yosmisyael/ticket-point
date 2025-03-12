import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { Calendar1Icon, MapPinIcon, TimerIcon } from "lucide-react";
import Image from "next/image";

export default function Reports() {
    const events = [
        {
            id: 1,
            title: "TechVision 2025",
            description: "TechVision 2025 adalah konferensi teknologi tahunan yang menghadirkan inovasi terbaru di bidang kecerdasan buatan, komputasi awan, dan keamanan siber. Acara ini mengundang para pakar industri, startup teknologi, dan perusahaan besar untuk berbagi wawasan tentang masa depan teknologi digital.",
            imageUrl: "/1.jpg",
            date: "1/3/2024",
            startTime: "12.00 AM",
            endTime: "19.00 AM",
            location: "Virtual",
        },
        {
            id: 2,
            title: "Inovasi EduFest",
            description: "Inovasi EduFest adalah festival pendidikan yang bertujuan untuk memperkenalkan metode pembelajaran terbaru, teknologi pendidikan, dan tren dalam dunia akademik. Acara ini mencakup seminar, lokakarya, dan pameran dari berbagai institusi pendidikan dan startup edtech.",
            imageUrl: "/1.jpg",
            date: "1/3/2024",
            startTime: "12.00 AM",
            endTime: "19.00 AM",
            location: "Virtual",
        },
        {
            id: 3,
            title: "Creative Future Expo",
            description: "Creative Future Expo adalah pameran kreatif yang menampilkan inovasi di bidang desain, seni digital, dan industri kreatif. Acara ini menghadirkan berbagai workshop, kompetisi, serta sesi networking bagi desainer, seniman, dan pengusaha kreatif untuk berbagi inspirasi dan kolaborasi.",
            imageUrl: "/1.jpg",
            date: "1/3/2024",
            startTime: "12.00 AM",
            endTime: "19.00 AM",
            location: "Virtual",
        }
    ];
    return (
        <div className="p-5">
            <header className="mb-8">
                <h1 className="text-4xl font-semibold text-[var(--color-dark)] sm:text-left">
                    Repots
                </h1>
                <hr className="mt-2 border-slate-100" />
            </header>
            {events.map((event, index) => (
                <Card key={index} className="w-full mb-5 flex flex-col h-full">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 flex-grow">
                        <div className="col-span-1 flex justify-center md:justify-start">
                            <Image
                                className="rounded-lg"
                                src={event.imageUrl}
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
                                    {event.location}
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

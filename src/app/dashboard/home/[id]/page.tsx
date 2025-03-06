import Card from "@/components/ui/Card";
import Table from "@/components/ui/Table";
import { Calendar1Icon, MapPinIcon, TimerIcon } from "lucide-react";
import Image from "next/image";

export default function DetailEvent() {
    const events = [
        {
            id: 1,
            title: "TechVision 2025",
            description: "TechVision 2025 adalah konferensi teknologi tahunan yang menghadirkan inovasi terbaru di bidang kecerdasan buatan, komputasi awan, dan keamanan siber. Acara ini mengundang para pakar industri, startup teknologi, dan perusahaan besar untuk berbagi wawasan tentang masa depan teknologi digital.",
            date: "1/3/2024",
            startTime: "12.00 AM",
            endTime: "19.00 AM",
            location: "Virtual",
        }
    ];

    const th = ["No", "Name", "Email", "Phone", "City"];
    const td = [
        ["1", "John Doe", "johndoe@gmail.com", "0812345678", "Jakarta"],
        ["2", "Fajar Sulistyo", "fajarsulistyo@gmail.com", "0812345678", "Bandung"],
        ["3", "Bob Smith", "bobsmith@gmail.com", "0812345678", "Surabaya"],
    ];

    return (
        <div className="p-5">
            {events.map((event, index) => (
                <Card className="w-full mb-10" key={index}>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="col-span-1 flex justify-center md:justify-start">
                            <Image
                                src={"/1.jpg"}
                                width={300}
                                height={150}
                                className="rounded-xl"
                                alt="Event Image"
                            />
                        </div>
                        <div className="col-span-1 md:col-span-3">
                            <h3 className="text-2xl md:text-3xl text-[var(--color-dark)] font-bold">
                                {event.title}
                            </h3>
                            <h5 className="text-sm text-[var(--color-mid-dark)] my-2">
                                {event.description}
                            </h5>
                            <div className="flex flex-col md:flex-row text-[var(--color-mid-dark)] items-start md:items-center gap-2 md:gap-4">
                                <h5 className="flex items-center gap-1">
                                    <Calendar1Icon size={16} /> {event.date}
                                </h5>
                                <h5 className="flex items-center gap-1">
                                    <TimerIcon size={16} /> {event.startTime} - {event.endTime}
                                </h5>
                                <h5 className="flex items-center gap-1">
                                    <MapPinIcon size={16} /> {event.location}
                                </h5>
                            </div>
                        </div>
                    </div>
                </Card>
            ))}
            <h1 className="text-3xl font-semibold my-2 text-[var(--color-mid-dark)]">Participants</h1>
            <Table th={th} td={td} />
        </div>
    );
}
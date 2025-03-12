import Breadcrumb from "@/components/ui/Breadcrumb";
import Card from "@/components/ui/Card";
import Table from "@/components/ui/Table";
import { Calendar1Icon, MapPinIcon, TimerIcon } from "lucide-react";
import Image from "next/image";

export default function DetailEvent() {
    const event = {
        title: "TechVision 2025",
        description:
            "TechVision 2025 adalah konferensi teknologi tahunan yang menghadirkan inovasi terbaru di bidang kecerdasan buatan, komputasi awan, dan keamanan siber. Acara ini mengundang para pakar industri, startup teknologi, dan perusahaan besar untuk berbagi wawasan tentang masa depan teknologi digital.",
        date: "1/3/2024",
        startTime: "12.00 AM",
        endTime: "19.00 AM",
        location: "Virtual",
    };

    const tableHeaders = ["No", "Name", "Email", "Phone", "City"];
    const tableData = [
        ["1", "John Doe", "johndoe@gmail.com", "0812345678", "Jakarta"],
        ["2", "Fajar Sulistyo", "fajarsulistyo@gmail.com", "0812345678", "Bandung"],
        ["3", "Bob Smith", "bobsmith@gmail.com", "0812345678", "Surabaya"],
    ];

    return (
        <div className="p-5">
            <Breadcrumb />
            <Card className="w-full my-10">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="col-span-1 flex justify-center md:justify-start">
                        <Image
                            src="/1.jpg"
                            width={300}
                            height={150}
                            className="rounded-xl w-full md:w-full lg:w-auto"
                            alt="Event Image"
                            style={{ objectFit: "cover", width: "100%", height: "auto" }}
                        />
                    </div>
                    <div className="col-span-1 mx-4 md:col-span-3">
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
                        <span className="inline-block text-lg p-1 px-6 rounded-full mt-4 text-[var(--color-light)] font-semibold bg-[var(--color-alternative-mid)]">
                            Publish
                        </span>
                    </div>
                </div>
            </Card>
            <h1 className="text-3xl font-semibold my-2 text-[var(--color-mid-dark)]">Participants</h1>
            <Table th={tableHeaders} td={tableData} />
        </div>
    );
}

import Card from "@/components/ui/Card";
import MyChart from "@/components/ui/BarCart";
import MyLineChart from "@/components/ui/LineChart";
import { Calendar1Icon, MapPinIcon, TimerIcon } from "lucide-react";
import Image from "next/image";

export default function DetailRepot() {
    const event = {
        title: "TechVision 2025",
        description:
            "TechVision 2025 adalah konferensi teknologi tahunan yang menghadirkan inovasi terbaru di bidang kecerdasan buatan, komputasi awan, dan keamanan siber. Acara ini mengundang para pakar industri, startup teknologi, dan perusahaan besar untuk berbagi wawasan tentang masa depan teknologi digital.",
        date: "1/3/2024",
        startTime: "12.00 AM",
        endTime: "19.00 AM",
        location: "Virtual",
    };
    return (
        <div className="p-2 md:p-5">
            <Card className="w-full my-10">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
                    </div>
                </div>
            </Card>
            <Card>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="mx-2">
                        <Card>
                            <div className="w-full h-64">
                                <MyChart />
                            </div>
                        </Card>
                    </div>
                    <div className="mx-2">
                        <Card>
                            <div className="w-full h-64">
                                <MyLineChart />
                            </div>
                        </Card>
                    </div>
                </div>
            </Card>
        </div>
    );
}
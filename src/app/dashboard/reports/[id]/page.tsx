'use client'

import MyBarChart from "@/components/ui/BarCart";
import Card from "@/components/ui/Card";
import MyLineChart from "@/components/ui/LineChart";
import { Calendar1Icon, MapPinIcon, TimerIcon } from "lucide-react";
import Image from "next/image";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";

interface EventType {
    id: number;
    title: string;
    description: string;
    date: string;
    startTime: string;
    endTime: string;
    imageUrl?: string;
    location?: {
        address: string;
    };
}

export default function DetailReport() {
    const router = useRouter();
    const params = useParams();
    const eventId = params.id;
    const [event, setEvent] = useState<EventType | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [userId, setUserId] = useState<number | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [labels, setLabels] = useState<string[]>([]);
    const [data, setData] = useState<number[]>([]);
    const [transactionsLabel, setTransactionsLabel] = useState<string[]>([]);
    const [transactionsPerDay, setTransactionsPerDay] = useState<number[]>([]);

    // Ambil userId dan token dari localStorage
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (!storedUser) {
            router.push("/auth/login");
        } else {
            try {
                const userObj = JSON.parse(storedUser);
                if (userObj?.id && userObj?.token) {
                    setUserId(userObj.id);
                    setToken(userObj.token);
                } else {
                    router.push("/auth/login");
                }
            } catch (error) {
                console.error("Error parsing user data:", error);
                router.push("/auth/login");
            }
        }
    }, [router]);

    // Ambil data kehadiran berdasarkan eventId
    useEffect(() => {
        async function fetchAttendance() {
            if (!token || !eventId) return;
            try {
                const res = await axios.get(`http://localhost:3000/api/tickets/attendances/${eventId}`, {
                    headers: { "Authorization": `Bearer ${token}` }
                });
                const jsonData = res.data;
                // Kelompokkan data kehadiran per jam
                const attendanceByHour: { [key: string]: number } = {};
                jsonData.data.attendances.forEach((attendance: any) => {
                    const date = new Date(attendance.checkinDate);
                    const hour = date.getUTCHours(); // Ambil jam dalam format UTC
                    attendanceByHour[hour] = (attendanceByHour[hour] || 0) + 1; // Tambah jumlah kehadiran
                });

                // Konversi objek menjadi array untuk digunakan dalam grafik
                setLabels(Object.keys(attendanceByHour).map(h => `${h}:00`)); // Label jam
                setData(Object.values(attendanceByHour)); // Data kehadiran
            } catch (error) {
                console.error('Error fetching attendance data:', error);
            }
        }
        fetchAttendance();
    }, [token, eventId]);

    // Ambil data transaksi berdasarkan transactionTime
    useEffect(() => {
        async function fetchTransactionsByDate() {
            if (!token || !eventId) return;
            try {
                const res = await axios.get(`http://localhost:3000/api/tickets/attendances/${eventId}`, {
                    headers: { "Authorization": `Bearer ${token}` }
                });
                const jsonData = res.data;

                // Kelompokkan data transaksi per hari
                const transactionsByDay: { [key: string]: number } = {};
                jsonData.data.attendances.forEach((attendance: any) => {
                    if (attendance.transactionTime) {
                        const date = new Date(attendance.transactionTime);
                        const day = date.toISOString().split('T')[0]; // Ambil tanggal dalam format YYYY-MM-DD
                        transactionsByDay[day] = (transactionsByDay[day] || 0) + 1; // Tambah jumlah transaksi
                    }
                });

                // Konversi objek menjadi array untuk digunakan dalam grafik
                setTransactionsLabel(Object.keys(transactionsByDay)); // Label hari
                setTransactionsPerDay(Object.values(transactionsByDay)); // Data transaksi
            } catch (error) {
                console.error('Error fetching transaction data by date:', error);
            }
        }
        fetchTransactionsByDate();
    }, [token, eventId]);

    // Ambil data event berdasarkan eventId
    useEffect(() => {
        async function fetchEventById() {
            if (!userId || !eventId || !token) return;
            try {
                const res = await axios.get(`http://localhost:3000/api/events/${eventId}`, {
                    headers: { "Authorization": `Bearer ${token}` }
                });
                if (res.status === 200) {
                    setEvent(res.data.data);
                }
            } catch (error) {
                console.error("Error fetching event:", error);
                setError("Error fetching event");
            } finally {
                setLoading(false);
            }
        }
        fetchEventById();
    }, [userId, eventId, token]);


    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;
    if (!event) return <div>Event not found</div>;

    return (
        <div className="p-2 md:p-5">
            <Card className="w-full my-10">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="col-span-1">
                        <Image src={event.imageUrl || "/banner-placeholder.png"} width={300} height={200} alt={event.title} className="rounded-lg" />
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
                                {event.location ? event.location.address : "Lokasi tidak tersedia"}
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
                                <MyBarChart label={labels} data={data} />
                            </div>
                        </Card>
                    </div>
                    <div className="mx-2">
                        <Card>
                            <div className="w-full h-64">
                                <MyLineChart label={transactionsLabel} data={transactionsPerDay} />
                            </div>
                        </Card>
                    </div>
                </div>
            </Card>
        </div>
    );
}
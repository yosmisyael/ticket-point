import Card from "@/components/ui/CardEvent";

export default function DashboardHome() {
    const events = [
        {
            id: 1,
            title: "TechVision 2025",
            description: "TechVision 2025 adalah konferensi teknologi tahunan yang menghadirkan inovasi terbaru di bidang kecerdasan buatan, komputasi awan, dan keamanan siber. Acara ini mengundang para pakar industri, startup teknologi, dan perusahaan besar untuk berbagi wawasan tentang masa depan teknologi digital.",
            imageUrl: "/1.jpg",
        },
        {
            id: 2,
            title: "Inovasi EduFest",
            description: "Inovasi EduFest adalah festival pendidikan yang bertujuan untuk memperkenalkan metode pembelajaran terbaru, teknologi pendidikan, dan tren dalam dunia akademik. Acara ini mencakup seminar, lokakarya, dan pameran dari berbagai institusi pendidikan dan startup edtech.",
            imageUrl: "/1.jpg",
        },
        {
            id: 3,
            title: "Creative Future Expo",
            description: "Creative Future Expo adalah pameran kreatif yang menampilkan inovasi di bidang desain, seni digital, dan industri kreatif. Acara ini menghadirkan berbagai workshop, kompetisi, serta sesi networking bagi desainer, seniman, dan pengusaha kreatif untuk berbagi inspirasi dan kolaborasi.",
            imageUrl: "/1.jpg",
        }
    ];

    const name = "King Yosev";

    return (
        <div className="p-5">
            <div className="mb-10">
                <h1 className="mx-2 text-4xl font-semibold font-inter text-[var(--color-dark-mid)]">Welcome, <span className="text-[var(--color-primary-mid)]">{name}</span> </h1>
                <p className="mt-2 mx-2 text-lg text-gray-600">
                    Explore the latest events and stay updated with whats happening.
                </p>
            </div>
            <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
                {events.map((event, index) => (
                    <Card key={index} id={event.id} title={event.title} description={event.description} path="home" imageUrl={event.imageUrl} />
                ))}
            </div>
        </div>
    );
}
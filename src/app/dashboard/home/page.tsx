import Image from "next/image";

export default function DashboardHome() {
    const events = [
        {
            name: "TechVision 2025",
            description: "TechVision 2025 adalah konferensi teknologi tahunan yang menghadirkan inovasi terbaru di bidang kecerdasan buatan, komputasi awan, dan keamanan siber. Acara ini mengundang para pakar industri, startup teknologi, dan perusahaan besar untuk berbagi wawasan tentang masa depan teknologi digital."
        },
        {
            name: "Inovasi EduFest",
            description: "Inovasi EduFest adalah festival pendidikan yang bertujuan untuk memperkenalkan metode pembelajaran terbaru, teknologi pendidikan, dan tren dalam dunia akademik. Acara ini mencakup seminar, lokakarya, dan pameran dari berbagai institusi pendidikan dan startup edtech."
        },
        {
            name: "Creative Future Expo",
            description: "Creative Future Expo adalah pameran kreatif yang menampilkan inovasi di bidang desain, seni digital, dan industri kreatif. Acara ini menghadirkan berbagai workshop, kompetisi, serta sesi networking bagi desainer, seniman, dan pengusaha kreatif untuk berbagi inspirasi dan kolaborasi."
        }
    ];

    const truncateWords = (text: string, maxWords = 18) => {
        const words = text.split(" ");
        return words.length > maxWords ? words.slice(0, maxWords).join(" ") + "..." : text;
    };

    const name = "King Yosev";

    return (
        <div className="p-10">
            <div className="mb-10">
                <h1 className="mx-2 text-6xl font-semibold font-inter text-[var(--color-dark)]">Welcome, {name} </h1>
                {/* <p className="mx-2 text-xl my-5 ml-5 font-normal font-inter text-[var(--color-mid-dark)]">Rencanakan dan koordinasikan acara tersebut.</p> */}
            </div>
            <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 ">
                {events.map((event, index) => (
                    <div key={index} className="max-w-sm mx-2 my-2 bg-[var(--color-light)] border-[var(--color-mid-light)] rounded-lg shadow-sm ">
                        <a href="#">
                            <Image className="rounded-t-lg" src={"/1.jpg"} width={500} height={500} alt={event.name} />
                        </a>
                        <div className="p-5">
                            <a href="#">
                                <h5 className="mb-2 text-2xl font-bold tracking-tight text-[var(--color-dark)] font-inter">{event.name}</h5>
                            </a>
                            <p className="mb-3 font-normal text-[var(--color-mid-dark)] font-inter">{truncateWords(event.description)}</p>
                            <div className="flex justify-end">
                                <a href="#" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-[var(--color-light)] bg-[var(--color-primary-mid)] hover:bg-[var(--color-primary-dark)] focus:ring-4 focus:outline-none ">
                                    Read more
                                    <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
import Image from "next/image"
import Button from "./Button";

type Props = {
    id: number,
    title: string,
    description: string,
    path: string,
    imageUrl: string,
}

const truncateWords = (text: string, maxWords = 18) => {
    const words = text.split(" ");
    return words.length > maxWords ? words.slice(0, maxWords).join(" ") + "..." : text;
};

export default function Card({ id, path, title, description, imageUrl }: Props) {
    return (
        <div className="max-w-sm w-full bg-[var(--color-light)] border border-[var(--color-mid-light)] rounded-lg shadow-sm">
            <a href="#">
                <Image
                    className="rounded-t-lg w-full h-48 object-cover"
                    src={imageUrl}
                    width={500}
                    height={500}
                    alt={title}
                />
            </a>
            <div className="p-5">
                <h1>
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-[var(--color-dark)] font-inter">
                        {title}
                    </h5>
                </h1>
                <p className="mb-3 font-normal text-[var(--color-mid-dark)] font-inter">
                    {truncateWords(description)}
                </p>
                <div className="flex justify-end">
                    <Button href={`${path}/${id}`} bgColor="var(--color-primary-mid)" textColor="var(--color-light)" >Read More</Button>
                </div>
            </div>
        </div>
    )
}

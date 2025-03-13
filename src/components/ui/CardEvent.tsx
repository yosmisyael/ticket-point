import Image from "next/image";
import Button from "./Button";

type Props = {
  id: number;
  title: string;
  description: string;
  path: string;
  imageUrl?: string;
  format: string;
  startTime: number;
  endTime: number;
  startDate: string;
  endDate: string;
};

const truncateWords = (text: string, maxWords = 18) => {
  const words = text.split(" ");
  return words.length > maxWords ? words.slice(0, maxWords).join(" ") + "..." : text;
};

export default function CardEvent({
  id,
  path,
  title,
  description,
  imageUrl,
  format,
  startTime,
  endTime,
  startDate,
  endDate,
}: Props) {
  // Gunakan gambar default jika imageUrl tidak ada atau kosong.
  const finalImage = imageUrl && imageUrl.trim() !== "" ? imageUrl : "/banner-placeholder.png";
  
  return (
    <div className="max-w-sm w-full bg-[var(--color-light)] border border-[var(--color-mid-light)] rounded-lg shadow-sm">
      <a href="#">
        <Image
          className="rounded-t-lg w-full h-48 object-cover"
          src={finalImage}
          width={500}
          height={500}
          alt={title}
        />
      </a>
      <div className="p-5">
        <h1 className="mb-2 text-2xl font-bold tracking-tight text-[var(--color-dark)] font-inter">
          {title}
        </h1>
        <p className="mb-3 font-normal text-[var(--color-mid-dark)] font-inter">
          {truncateWords(description)}
        </p>
        <div className="text-sm text-gray-500 mb-3">
          <p>Format: {format}</p>
          <p>
            Date: {new Date(startDate).toLocaleDateString()} -{" "}
            {new Date(endDate).toLocaleDateString()}
          </p>
          <p>
            Time: {startTime}:00 - {endTime}:00
          </p>
        </div>
        <div className="flex justify-end">
          <Button
            href={`${path}/${id}`}
            bgColor="var(--color-primary-mid)"
            textColor="var(--color-light)"
          >
            Detail
          </Button>
        </div>
      </div>
    </div>
  );
}

import Link from "next/link";
import clsx from "clsx"; 

type Props = {
    href: string;
    children: React.ReactNode;
    icons?: React.ReactNode;
    bgColor?: string; 
    textColor?: string; 
};

export default function Button({
    href,
    children,
    icons,
    bgColor,
    textColor
}: Props) {
    const isTailwindClass = bgColor?.startsWith("bg-") && textColor?.startsWith("text-");

    return (
        <Link
            href={href}
            className={clsx(
                "px-10",
                "inline-flex items-center px-3 py-2 text-sm rounded-lg font-medium text-center focus:ring-4 focus:outline-none",
                isTailwindClass ? bgColor : "", 
                isTailwindClass ? textColor : "",
                "hover:bg-opacity-80"
            )}
            style={!isTailwindClass ? { backgroundColor: bgColor, color: textColor } : undefined} 
        >
            {children}
            {icons && <span className="ml-2">{icons}</span>}
        </Link>
    );
};



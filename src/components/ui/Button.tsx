import Link from "next/link";
import clsx from "clsx";
import React from "react";

type Props = {
    href?: string;
    children: React.ReactNode;
    icons?: React.ReactNode;
    bgColor?: string;
    type?: "button" | "submit" | "reset";
    textColor?: string;
    className?: string;
    onClick?: () => void;
    disabled?: boolean;
};

export default function Button({
    href,
    children,
    icons,
    type = "button",
    bgColor,
    textColor,
    className,
    onClick,
    disabled = false,
}: Props) {

    const isTailwindClass = bgColor?.startsWith("bg-") && textColor?.startsWith("text-");


    const baseClasses = clsx(
        "inline-flex items-center justify-center px-4 py-2 text-sm rounded-lg font-medium focus:ring-4 focus:outline-none transition-all",
        "hover:bg-opacity-80",
        isTailwindClass ? bgColor : "",
        isTailwindClass ? textColor : "",
        className,
        {
            'opacity-50 cursor-not-allowed': disabled,
        }
    );


    if (href) {
        return (
            <Link
                href={href}
                className={baseClasses}
                style={!isTailwindClass ? { backgroundColor: bgColor, color: textColor } : undefined}
                onClick={disabled ? undefined : onClick}
            >
                {children}
                {icons && <span className="ml-2">{icons}</span>}
            </Link>
        );
    }


    return (
        <button
            type={type}
            className={baseClasses}
            style={!isTailwindClass ? { backgroundColor: bgColor, color: textColor } : undefined}
            onClick={disabled ? undefined : onClick}
            disabled={disabled}
        >
            {children}
            {icons && <span className="ml-2">{icons}</span>}
        </button>
    );
}
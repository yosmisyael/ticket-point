type Props = {
    children: React.ReactNode,
    className?: string,
}


export default function Card({ children, className }: Props) {
    return (
        <div className={`block p-6 ${className} bg-[var(--color-light)] border-[var(--color-mid-light)] rounded-lg shadow-sm hover:bg-[var(--color-mid-light)]]`}>
            {children}
        </div>
    )
}
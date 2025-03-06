type Props = {
    th: string[];
    td: string[][];
};

export default function Table({ th, td }: Props) {
    return (
        <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left rtl:text-right text-[var(--color-mid-dark)]">
                <thead className="text-xs text-[var(--color-mid-dark)] uppercase bg-[var(--color-light)]">
                    <tr className="border-b border-[var(--color-mid-light)]">
                        {th.map((header, index) => (
                            <th key={index} scope="col" className="px-4 py-3 whitespace-nowrap">
                                {header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {td.map((row, rowIndex) => (
                        <tr key={rowIndex} className="border-b border-[var(--color-mid-light)]">
                            {row.map((cell, cellIndex) => (
                                <td key={cellIndex} className="px-4 py-4 whitespace-nowrap">
                                    {cell}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
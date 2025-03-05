import { useState } from "react";
import { DateRange, DayPicker, getDefaultClassNames } from "react-day-picker";
import "react-day-picker/style.css";

export default function DatePicker() {
    const [selected, setSelected] = useState<DateRange>();

    const defaultClassNames = getDefaultClassNames();

    return (
        <DayPicker
            classNames={{
                month_caption: 'text-lg font-medium',
                weekdays: "text-lg",
                today: `border-alternative-mid`,
                selected: `bg-primary-mid border-none text-white`,
                range_start: `bg-primary-mid border-none text-white rounded-l-full`,
                range_end: `bg-primary-mid text-white rounded-r-full`,
                range_middle: `bg-blue-50 text-dark`,
                root: `${defaultClassNames.root} text-dark shadow-lg p-5`,
                chevron: `${defaultClassNames.chevron} outline-dark`
            }}
            mode="range"
            min={1}
            selected={ selected }
            onSelect={ setSelected }
            footer={
                selected
                    ? selected.from && selected.to
                        ? `Selected: ${selected.from.toLocaleDateString("en-GB")} - ${selected.to.toLocaleDateString("en-GB")}`
                        : selected.from
                            ? `Selected: ${selected.from.toLocaleDateString("en-GB")}`
                            : "No date picked yet"
                    : "No date picked yet"
            }
        />
    );
}
import { useState } from "react";
import { DayPicker, getDefaultClassNames } from "react-day-picker";
import "react-day-picker/style.css";
import { DateRange } from "react-day-picker";

interface DatePickerProps {
  selected?: DateRange;
  onSelect: (range: DateRange | undefined) => void;
  onClose: () => void;
}

export default function DatePicker({ selected, onSelect, onClose }: DatePickerProps) {
  const defaultClassNames = getDefaultClassNames();
  // State lokal untuk menyimpan pilihan tanggal sementara
  const [localRange, setLocalRange] = useState<DateRange | undefined>(selected);

  return (
    <div className="relative border p-4 rounded-lg shadow-lg bg-white">
      {/* Tombol X untuk menutup DatePicker tanpa mengubah pilihan */}
      <button
        type="button"
        className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 z-20"
        onClick={onClose}
      >
        X
      </button>
      <DayPicker
        mode="range"
        selected={localRange}
        onSelect={(range) => setLocalRange(range)}
        classNames={{
          month_caption: "text-lg font-medium",
          weekdays: "text-lg",
          today: "border-alternative-mid",
          selected: "bg-primary-mid border-none text-white",
          range_start: "bg-primary-mid border-none text-white rounded-l-full",
          range_end: "bg-primary-mid text-white rounded-r-full",
          range_middle: "bg-blue-50 text-dark",
          root: `${defaultClassNames.root} text-dark shadow-lg p-5`,
          chevron: `${defaultClassNames.chevron} outline-dark`,
        }}
        footer={
          localRange
            ? localRange.from && localRange.to
              ? `Selected: ${localRange.from.toLocaleDateString("en-GB")} - ${localRange.to.toLocaleDateString("en-GB")}`
              : localRange.from
                ? `Selected: ${localRange.from.toLocaleDateString("en-GB")}`
                : "No date picked yet"
            : "No date picked yet"
        }
      />
      <div className="mt-2 flex justify-end space-x-2">
        {/* Tombol Reset untuk menghapus pilihan */}
        <button
          type="button"
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg"
          onClick={() => setLocalRange(undefined)}
        >
          Reset
        </button>
        {/* Tombol Select untuk mengonfirmasi pilihan */}
        <button
          type="button"
          className="px-4 py-2 bg-primary-mid text-white rounded-lg"
          onClick={() => onSelect(localRange)}
          disabled={!localRange?.from || !localRange?.to}
        >
          Select
        </button>
      </div>
    </div>
  );
}

// ================================================
// LETAK FILE: src/components/MiniCalendar.jsx
// ================================================

import { useState } from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

const DAYS = ["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"];
const MONTHS = ["Januari","Februari","Maret","April","Mei","Juni","Juli","Agustus","September","Oktober","November","Desember"];

function getDaysInMonth(year, month) {
    return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year, month) {
    const day = new Date(year, month, 1).getDay();
    return day === 0 ? 6 : day - 1; // Senin = 0
}

export default function MiniCalendar() {
    const today = new Date();
    const [current, setCurrent] = useState({ year: today.getFullYear(), month: today.getMonth() });
    const [selected, setSelected] = useState(today.getDate());

    const daysInMonth = getDaysInMonth(current.year, current.month);
    const firstDay = getFirstDayOfMonth(current.year, current.month);

    const prevMonth = () => {
        setCurrent(prev => {
            if (prev.month === 0) return { year: prev.year - 1, month: 11 };
            return { year: prev.year, month: prev.month - 1 };
        });
    };

    const nextMonth = () => {
        setCurrent(prev => {
            if (prev.month === 11) return { year: prev.year + 1, month: 0 };
            return { year: prev.year, month: prev.month + 1 };
        });
    };

    const cells = [...Array(firstDay).fill(null), ...Array.from({ length: daysInMonth }, (_, i) => i + 1)];

    return (
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
            <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-gray-800 text-base">Kalender</h3>
                <div className="flex gap-1">
                    <button onClick={prevMonth} className="p-1 hover:bg-gray-100 rounded-lg transition-colors">
                        <MdChevronLeft className="text-gray-400 text-lg" />
                    </button>
                    <button onClick={nextMonth} className="p-1 hover:bg-gray-100 rounded-lg transition-colors">
                        <MdChevronRight className="text-gray-400 text-lg" />
                    </button>
                </div>
            </div>

            {/* Bulan Tahun */}
            <p className="text-center text-sm font-semibold text-gray-600 mb-3">
                {MONTHS[current.month]} {current.year}
            </p>

            {/* Header hari */}
            <div className="grid grid-cols-7 mb-2">
                {DAYS.map(d => (
                    <div key={d} className="text-center text-[10px] font-semibold text-gray-400 py-1">{d}</div>
                ))}
            </div>

            {/* Grid tanggal */}
            <div className="grid grid-cols-7 gap-y-1">
                {cells.map((day, i) => {
                    if (!day) return <div key={i} />;
                    const isToday = day === today.getDate() &&
                        current.month === today.getMonth() &&
                        current.year === today.getFullYear();
                    const isSelected = day === selected;

                    return (
                        <div
                            key={i}
                            onClick={() => setSelected(day)}
                            className={`text-center text-xs py-1.5 rounded-full cursor-pointer transition-all font-medium
                                ${isSelected && isToday ? "bg-primary text-white" :
                                  isSelected ? "bg-primary text-white" :
                                  isToday ? "bg-blue-100 text-primary" :
                                  "text-gray-600 hover:bg-gray-100"}`}
                        >
                            {day}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
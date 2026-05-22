// ================================================
// LETAK FILE: src/components/SearchBar.jsx
// ================================================

import { useState } from "react";
import { MdSearch, MdClose } from "react-icons/md";

const searchData = [
    "Siti Aisyah - Pembersihan Karang Gigi",
    "Budi Santoso - Tambal Gigi",
    "Dewi Lestari - Konsultasi & Pemeriksaan",
    "Rizky Pratama - Bleaching",
    "Janji Temu Hari Ini",
    "Laporan Pendapatan Mei",
    "Stok Bahan Gigi",
];

export default function SearchBar() {
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState("");

    const results = searchData.filter(item =>
        item.toLowerCase().includes(query.toLowerCase())
    );

    return (
        <>
            {/* Search Input */}
            <div className="relative flex-1 max-w-xl">
                <MdSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
                <input
                    type="text"
                    placeholder="Cari pasien, janji temu, atau tindakan..."
                    readOnly
                    onClick={() => setOpen(true)}
                    className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none cursor-pointer hover:border-primary transition-colors text-gray-500"
                />
            </div>

            {/* Search Modal */}
            {open && (
                <div
                    className="fixed inset-0 bg-black/30 z-50 flex items-start justify-center pt-20"
                    onClick={() => { setOpen(false); setQuery(""); }}
                >
                    <div
                        className="bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-4 overflow-hidden"
                        onClick={e => e.stopPropagation()}
                    >
                        <div className="flex items-center gap-3 p-4 border-b border-gray-100">
                            <MdSearch className="text-gray-400 text-xl flex-shrink-0" />
                            <input
                                autoFocus
                                value={query}
                                onChange={e => setQuery(e.target.value)}
                                placeholder="Cari pasien, janji temu, atau tindakan..."
                                className="flex-1 outline-none text-sm text-gray-700"
                            />
                            <MdClose
                                className="text-gray-400 cursor-pointer hover:text-gray-600 text-xl"
                                onClick={() => { setOpen(false); setQuery(""); }}
                            />
                        </div>
                        <div className="max-h-64 overflow-y-auto">
                            {query === "" ? (
                                <div className="p-4 text-center text-sm text-gray-400">
                                    Ketik untuk mencari...
                                </div>
                            ) : results.length === 0 ? (
                                <div className="p-4 text-center text-sm text-gray-400">
                                    Tidak ada hasil untuk "{query}"
                                </div>
                            ) : (
                                results.map((item, i) => (
                                    <div
                                        key={i}
                                        onClick={() => { setOpen(false); setQuery(""); }}
                                        className="flex items-center gap-3 px-4 py-3 hover:bg-blue-50 cursor-pointer transition-colors border-b border-gray-50 last:border-0"
                                    >
                                        <MdSearch className="text-gray-300 text-sm flex-shrink-0" />
                                        <span className="text-sm text-gray-700">{item}</span>
                                    </div>
                                ))
                            )}
                        </div>
                        <div className="px-4 py-2 border-t border-gray-100 text-xs text-gray-400 flex justify-between">
                            <span>Tekan ESC untuk tutup</span>
                            <span>{results.length} hasil</span>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
import { useState } from "react";
import { janjiTemuAPI } from "../../services/janjiTemuAPI"; 
import {
    MdCalendarMonth,
    MdPerson,
    MdPhone,
    MdMedicalServices,
    MdAccessTime,
    MdCheckCircle,
} from "react-icons/md";

// Sesuai dengan ID yang sudah terdaftar di database Supabase kamu
const doctorsList = [
    { id: 1, nama: "drg. Farel Abdul Halim", spesialis: "Umum" },
    { id: 2, nama: "drg. Sarah Amanda", spesialis: "Orthodontist" },
    { id: 3, nama: "drg. Michael Wijaya", spesialis: "Aesthetic" },
];

const servicesList = [
    { id: 1, nama: "Pembersihan Karang Gigi", harga: 350000 },
    { id: 2, nama: "Tambal Gigi Premium", harga: 550000 },
    { id: 3, nama: "Cabut Gigi Bungsu", harga: 1200000 },
];

export default function AppointmentPage() {
    const [formData, setFormData] = useState({
        pasien_nama: "", 
        pasien_telp: "", 
        dokter_id: doctorsList[0].id, 
        perawatan_rencana_id: servicesList[0].id, 
        tanggal_janji: "", 
        waktu_mulai: "", 
        keluhan: "",
    });

    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false); 
    const [errorMsg, setErrorMsg] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: name.endsWith('_id') ? Number(value) : value,
        }));
    };

    const getSelectedService = () => {
        return servicesList.find(s => s.id === formData.perawatan_rencana_id);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setSuccess(false);
        setErrorMsg("");

        // 1. Generate Kode Janji unik berupa string (Varchar)
        const uniqueKodeJanji = `REG-${Math.floor(1000 + Math.random() * 9000)}`; 

        // 2. Menyusun string timestamp yang valid (YYYY-MM-DD HH:MM:00)
        const formattedTimestamp = `${formData.tanggal_janji} ${formData.waktu_mulai}:00`;

        // 3. Menyusun payload murni (pasien_id diset null agar terdaftar sebagai Guest)
        const payloadData = {
            kode_janji: uniqueKodeJanji,
            pasien_id: null, // Menggunakan Cara 2: Nilai diset null
            dokter_id: Number(formData.dokter_id),
            perawatan_rencana_id: Number(formData.perawatan_rencana_id),
            tanggal_janji: formattedTimestamp, 
            keluhan: formData.keluhan.trim() === "" ? null : formData.keluhan,
            status_janji: "Menunggu"
        };
        
        try {
            await janjiTemuAPI.createJanjiTemu(payloadData);
            setSuccess(true);
            
            // Reset form jika sukses
            setFormData({
                pasien_nama: "",
                pasien_telp: "",
                dokter_id: doctorsList[0].id,
                perawatan_rencana_id: servicesList[0].id,
                tanggal_janji: "",
                waktu_mulai: "",
                keluhan: "",
            });
        } catch (error) {
            const dbError = error.response?.data?.message || error.response?.data?.details || error.message;
            setErrorMsg(`Kesalahan Database: ${dbError}`);
        } finally {
            setLoading(false);
        }
    };

    const selectedService = getSelectedService();

    return (
        <div className="bg-slate-50 min-h-screen">
            {/* HERO BAR */}
            <section className="bg-gradient-to-r from-blue-700 via-cyan-600 to-blue-500 text-white">
                <div className="max-w-7xl mx-auto px-6 py-16">
                    <h1 className="text-4xl font-bold">Booking Janji Temu (Guest)</h1>
                    <p className="mt-2 text-blue-100 text-sm">
                        Layanan pendaftaran kunjungan cepat tanpa perlu mendaftar akun terlebih dahulu.
                    </p>
                </div>
            </section>

            {/* FORM CARD */}
            <section className="max-w-4xl mx-auto px-6 py-12">
                <div className="bg-white rounded-3xl p-8 shadow-md relative overflow-hidden">
                    
                    {loading && (
                        <div className="absolute inset-0 bg-white/70 backdrop-blur-sm z-50 flex flex-col items-center justify-center gap-2">
                            <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                            <p className="text-xs font-semibold text-blue-800">Menyimpan data...</p>
                        </div>
                    )}

                    <h2 className="text-2xl font-bold mb-6 text-slate-800">Isi Formulir Janji</h2>

                    {success && (
                        <div className="mb-6 bg-green-100 text-green-700 p-4 rounded-xl flex items-center gap-3 border border-green-200">
                            <MdCheckCircle size={24} className="shrink-0" />
                            <div>
                                <p className="font-semibold">Janji Temu Berhasil Dikirim ke Database!</p>
                            </div>
                        </div>
                    )}

                    {errorMsg && (
                        <div className="mb-6 bg-red-100 text-red-700 p-4 rounded-xl border border-red-200 text-sm">
                            <p className="font-bold">Gagal Menyimpan:</p>
                            <p>{errorMsg}</p>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                        
                        {/* INPUT NAMA & TELEPON */}
                        <div className="grid md:grid-cols-2 gap-5">
                            <div>
                                <label className="font-medium text-gray-700 text-sm">Nama Lengkap Pasien</label>
                                <div className="relative mt-2">
                                    <MdPerson className="absolute left-4 top-3.5 text-gray-400" size={20} />
                                    <input
                                        type="text"
                                        name="pasien_nama"
                                        value={formData.pasien_nama}
                                        onChange={handleChange}
                                        required
                                        className="w-full text-sm pl-12 pr-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-blue-500"
                                        placeholder="Nama Lengkap"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="font-medium text-gray-700 text-sm">Nomor Telepon</label>
                                <div className="relative mt-2">
                                    <MdPhone className="absolute left-4 top-3.5 text-gray-400" size={20} />
                                    <input
                                        type="tel"
                                        name="pasien_telp"
                                        value={formData.pasien_telp}
                                        onChange={handleChange}
                                        required
                                        className="w-full text-sm pl-12 pr-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-blue-500"
                                        placeholder="08xxxxxxxx"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* SELECT DOKTER & PERAWATAN */}
                        <div className="grid md:grid-cols-2 gap-5">
                            <div>
                                <label className="font-medium text-gray-700 text-sm">Pilih Dokter</label>
                                <select
                                    name="dokter_id"
                                    value={formData.dokter_id}
                                    onChange={handleChange}
                                    required
                                    className="w-full text-sm mt-2 px-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-blue-500 bg-white"
                                >
                                    {doctorsList.map(doc => (
                                        <option key={doc.id} value={doc.id}>{doc.nama}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="font-medium text-gray-700 text-sm">Rencana Perawatan</label>
                                <select
                                    name="perawatan_rencana_id"
                                    value={formData.perawatan_rencana_id}
                                    onChange={handleChange}
                                    required
                                    className="w-full text-sm mt-2 px-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-blue-500 bg-white"
                                >
                                    {servicesList.map(ser => (
                                        <option key={ser.id} value={ser.id}>{ser.nama}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* TANGGAL & JAM */}
                        <div className="grid md:grid-cols-2 gap-5">
                            <div>
                                <label className="font-medium text-gray-700 text-sm">Tanggal Rencana</label>
                                <div className="relative mt-2">
                                    <MdCalendarMonth className="absolute left-4 top-3.5 text-gray-400" size={20} />
                                    <input
                                        type="date"
                                        name="tanggal_janji"
                                        value={formData.tanggal_janji}
                                        onChange={handleChange}
                                        required
                                        className="w-full text-sm pl-12 pr-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-blue-500"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="font-medium text-gray-700 text-sm">Jam Mulai</label>
                                <div className="relative mt-2">
                                    <MdAccessTime className="absolute left-4 top-3.5 text-gray-400" size={20} />
                                    <input
                                        type="time"
                                        name="waktu_mulai"
                                        value={formData.waktu_mulai}
                                        onChange={handleChange}
                                        required
                                        className="w-full text-sm pl-12 pr-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-blue-500"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* KELUHAN */}
                        <div>
                            <label className="font-medium text-gray-700 text-sm">Keluhan Tambahan</label>
                            <textarea
                                name="keluhan"
                                rows="3"
                                value={formData.keluhan}
                                onChange={handleChange}
                                className="w-full text-sm mt-2 px-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-blue-500"
                                placeholder="Tulis keluhan jika ada..."
                            ></textarea>
                        </div>

                        {/* LAYANAN DETAIL & HARGA */}
                        {selectedService && (
                            <div className="bg-blue-50 p-4 rounded-xl flex justify-between items-center text-blue-900 border border-blue-100">
                                <span className="text-sm font-semibold">{selectedService.nama}</span>
                                <strong className="text-blue-800">Rp {selectedService.harga.toLocaleString("id-ID")}</strong>
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 text-white py-3.5 rounded-xl font-bold text-sm transition duration-150"
                        >
                            {loading ? "Menyimpan ke Server..." : "Kirim Pendaftaran Janji Temu"}
                        </button>
                    </form>
                </div>
            </section>
        </div>
    );
}
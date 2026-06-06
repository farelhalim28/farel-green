import { useState } from "react";
import {
    MdSettings,
    MdNotifications,
    MdWorkspacePremium,
    MdBusiness,
    MdStorage,
} from "react-icons/md";

export default function Pengaturan() {

    const [reminderJanji, setReminderJanji] = useState(true);
    const [notifWhatsapp, setNotifWhatsapp] = useState(true);
    const [notifEmail, setNotifEmail] = useState(false);

    return (
        <div className="p-6 space-y-6">

            {/* HEADER */}
            <div className="bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-500 rounded-3xl p-8 text-white shadow-lg">

                <div className="flex items-center justify-between">

                    <div>

                        <h1 className="text-3xl font-bold">
                            Pengaturan Sistem
                        </h1>

                        <p className="mt-2 text-blue-100">
                            Kelola konfigurasi klinik, membership, notifikasi, dan sistem CRM.
                        </p>

                    </div>

                    <div className="hidden lg:block text-[80px]">
                        ⚙️
                    </div>

                </div>

            </div>

            {/* PENGATURAN KLINIK */}
            <div className="bg-white rounded-3xl shadow-sm p-6">

                <div className="flex items-center gap-3 mb-6">

                    <MdBusiness
                        className="text-blue-600"
                        size={28}
                    />

                    <h2 className="text-xl font-bold">
                        Pengaturan Klinik
                    </h2>

                </div>

                <div className="grid md:grid-cols-2 gap-5">

                    <div>
                        <label className="text-sm text-gray-500">
                            Nama Klinik
                        </label>

                        <input
                            type="text"
                            defaultValue="SIGIGI Dental Clinic"
                            className="w-full mt-2 border border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-blue-300 outline-none"
                        />
                    </div>

                    <div>
                        <label className="text-sm text-gray-500">
                            Email Klinik
                        </label>

                        <input
                            type="email"
                            defaultValue="admin@sigigi.com"
                            className="w-full mt-2 border border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-blue-300 outline-none"
                        />
                    </div>

                    <div>
                        <label className="text-sm text-gray-500">
                            Nomor Telepon
                        </label>

                        <input
                            type="text"
                            defaultValue="081234567890"
                            className="w-full mt-2 border border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-blue-300 outline-none"
                        />
                    </div>

                    <div>
                        <label className="text-sm text-gray-500">
                            Jam Operasional
                        </label>

                        <input
                            type="text"
                            defaultValue="08:00 - 20:00"
                            className="w-full mt-2 border border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-blue-300 outline-none"
                        />
                    </div>

                    <div className="md:col-span-2">
                        <label className="text-sm text-gray-500">
                            Alamat Klinik
                        </label>

                        <textarea
                            rows="3"
                            defaultValue="Jl. Soekarno Hatta No. 123, Pekanbaru, Riau"
                            className="w-full mt-2 border border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-blue-300 outline-none"
                        />
                    </div>

                </div>

            </div>

            {/* NOTIFIKASI */}
            <div className="bg-white rounded-3xl shadow-sm p-6">

                <div className="flex items-center gap-3 mb-6">

                    <MdNotifications
                        className="text-yellow-500"
                        size={28}
                    />

                    <h2 className="text-xl font-bold">
                        Pengaturan Notifikasi
                    </h2>

                </div>

                <div className="space-y-5">

                    <div className="flex items-center justify-between">

                        <div>
                            <h3 className="font-medium">
                                Reminder Janji Temu
                            </h3>

                            <p className="text-sm text-gray-500">
                                Kirim pengingat otomatis ke pasien.
                            </p>
                        </div>

                        <button
                            onClick={() =>
                                setReminderJanji(!reminderJanji)
                            }
                            className={`w-14 h-8 rounded-full transition ${
                                reminderJanji
                                    ? "bg-green-500"
                                    : "bg-gray-300"
                            }`}
                        >
                            <div
                                className={`bg-white w-6 h-6 rounded-full shadow transform transition ${
                                    reminderJanji
                                        ? "translate-x-7"
                                        : "translate-x-1"
                                }`}
                            />
                        </button>

                    </div>

                    <div className="flex items-center justify-between">

                        <div>
                            <h3 className="font-medium">
                                Notifikasi WhatsApp
                            </h3>

                            <p className="text-sm text-gray-500">
                                Kirim notifikasi melalui WhatsApp.
                            </p>
                        </div>

                        <button
                            onClick={() =>
                                setNotifWhatsapp(!notifWhatsapp)
                            }
                            className={`w-14 h-8 rounded-full transition ${
                                notifWhatsapp
                                    ? "bg-green-500"
                                    : "bg-gray-300"
                            }`}
                        >
                            <div
                                className={`bg-white w-6 h-6 rounded-full shadow transform transition ${
                                    notifWhatsapp
                                        ? "translate-x-7"
                                        : "translate-x-1"
                                }`}
                            />
                        </button>

                    </div>

                    <div className="flex items-center justify-between">

                        <div>
                            <h3 className="font-medium">
                                Notifikasi Email
                            </h3>

                            <p className="text-sm text-gray-500">
                                Kirim notifikasi melalui Email.
                            </p>
                        </div>

                        <button
                            onClick={() =>
                                setNotifEmail(!notifEmail)
                            }
                            className={`w-14 h-8 rounded-full transition ${
                                notifEmail
                                    ? "bg-green-500"
                                    : "bg-gray-300"
                            }`}
                        >
                            <div
                                className={`bg-white w-6 h-6 rounded-full shadow transform transition ${
                                    notifEmail
                                        ? "translate-x-7"
                                        : "translate-x-1"
                                }`}
                            />
                        </button>

                    </div>

                </div>

            </div>

            {/* MEMBERSHIP */}
            <div className="bg-white rounded-3xl shadow-sm p-6">

                <div className="flex items-center gap-3 mb-6">

                    <MdWorkspacePremium
                        className="text-purple-600"
                        size={28}
                    />

                    <h2 className="text-xl font-bold">
                        Pengaturan Membership
                    </h2>

                </div>

                <div className="grid md:grid-cols-3 gap-5">

                    <div>
                        <label className="text-sm text-gray-500">
                            Silver
                        </label>

                        <input
                            type="number"
                            defaultValue="500"
                            className="w-full mt-2 border border-gray-200 rounded-xl p-3"
                        />
                    </div>

                    <div>
                        <label className="text-sm text-gray-500">
                            Gold
                        </label>

                        <input
                            type="number"
                            defaultValue="1000"
                            className="w-full mt-2 border border-gray-200 rounded-xl p-3"
                        />
                    </div>

                    <div>
                        <label className="text-sm text-gray-500">
                            VIP
                        </label>

                        <input
                            type="number"
                            defaultValue="2000"
                            className="w-full mt-2 border border-gray-200 rounded-xl p-3"
                        />
                    </div>

                </div>

            </div>

            {/* SISTEM */}
            <div className="bg-white rounded-3xl shadow-sm p-6">

                <div className="flex items-center gap-3 mb-6">

                    <MdStorage
                        className="text-green-600"
                        size={28}
                    />

                    <h2 className="text-xl font-bold">
                        Informasi Sistem
                    </h2>

                </div>

                <div className="grid md:grid-cols-3 gap-4">

                    <div className="bg-blue-50 rounded-2xl p-5">

                        <p className="text-sm text-gray-500">
                            Versi Sistem
                        </p>

                        <h3 className="font-bold text-blue-600 mt-2">
                            CRM Dental v1.0
                        </h3>

                    </div>

                    <div className="bg-green-50 rounded-2xl p-5">

                        <p className="text-sm text-gray-500">
                            Status Server
                        </p>

                        <h3 className="font-bold text-green-600 mt-2">
                            Online
                        </h3>

                    </div>

                    <div className="bg-purple-50 rounded-2xl p-5">

                        <p className="text-sm text-gray-500">
                            Database
                        </p>

                        <h3 className="font-bold text-purple-600 mt-2">
                            Connected
                        </h3>

                    </div>

                </div>

            </div>

        </div>
    );
}
import { Link } from "react-router-dom";
import {
  MdWorkspacePremium,
  MdStars,
  MdCardGiftcard,
  MdVerified,
} from "react-icons/md";

export default function MembershipPage() {
  const memberships = [
    {
      name: "Reguler",
      point: "0 Poin",
      color: "from-slate-400 to-slate-600",
      benefit: [
        "Pendaftaran Akun Gratis",
        "Reminder Kontrol Otomatis",
        "Kumpulkan Poin Setiap Sesi",
        "Akses Menu Konsultasi",
      ],
    },
    {
      name: "Silver",
      point: "500 Poin",
      color: "from-gray-400 to-gray-600",
      benefit: [
        "Diskon 5% Semua Perawatan",
        "Reminder Kontrol Otomatis",
        "Poin Loyalty Standar",
        "Promo Member Spesial",
      ],
    },
    {
      name: "Gold",
      point: "1000 Poin",
      color: "from-yellow-400 to-orange-500",
      benefit: [
        "Diskon 10% Semua Perawatan",
        "Prioritas Sistem Booking",
        "Voucher Promo Ulang Tahun",
        "Poin Loyalty Lebih Besar",
      ],
    },
    {
      name: "Platinum",
      point: "2000 Poin",
      color: "from-cyan-500 to-blue-600",
      benefit: [
        "Diskon 15% Semua Perawatan",
        "Free Konsultasi Dokter Gigi",
        "Priority Service & Jalur Cepat",
        "Promo Eksklusif Platinum",
      ],
    },
  ];

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* HERO */}
      <section className="bg-gradient-to-r from-blue-700 via-cyan-600 to-blue-500 text-white">
        <div className="max-w-7xl mx-auto px-6 py-24">
          <h1 className="text-5xl font-bold">
            Membership Program
          </h1>
          <p className="mt-4 text-blue-100 max-w-3xl">
            Nikmati berbagai keuntungan eksklusif, loyalty point, promo spesial, dan layanan prioritas berdasarkan tingkatan akun Anda di klinik SIGIGI.
          </p>
        </div>
      </section>

      {/* BENEFIT HIGHLIGHT */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-3xl p-6 shadow-sm">
            <MdCardGiftcard className="text-5xl text-blue-600 mb-4" />
            <h3 className="font-bold text-xl">Loyalty Point</h3>
            <p className="text-gray-500 mt-2">
              Kumpulkan poin dari setiap transaksi dan tukarkan dengan voucher menarik.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-sm">
            <MdStars className="text-5xl text-yellow-500 mb-4" />
            <h3 className="font-bold text-xl">Promo Eksklusif</h3>
            <p className="text-gray-500 mt-2">
              Dapatkan promo spesial yang hanya tersedia untuk level membership tertentu.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-sm">
            <MdWorkspacePremium className="text-5xl text-purple-600 mb-4" />
            <h3 className="font-bold text-xl">Priority Service</h3>
            <p className="text-gray-500 mt-2">
              Nikmati kenyamanan tanpa antre panjang bagi member prioritas kami.
            </p>
          </div>
        </div>
      </section>

      {/* MEMBERSHIP CARD - 4 Kolom */}
      <section className="max-w-7xl mx-auto px-6 pb-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800">
            Pilih Membership Anda
          </h2>
          <p className="text-gray-500 mt-3">
            Semakin tinggi level membership, semakin besar keuntungan dan benefit pelayanan yang Anda dapat.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {memberships.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition flex flex-col justify-between"
            >
              <div>
                <div className={`bg-gradient-to-r ${item.color} text-white p-6`}>
                  <h3 className="text-2xl font-bold">
                    {item.name}
                  </h3>
                  <p className="mt-1.5 text-xs opacity-90">
                    Minimum {item.point}
                  </p>
                </div>

                <div className="p-6">
                  <ul className="space-y-4">
                    {item.benefit.map((benefit, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-3 text-sm text-slate-700"
                      >
                        <MdVerified className="text-green-500 mt-0.5 shrink-0" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="p-6 pt-0">
                <Link
                  to="/register-member"
                  className="block text-center w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition text-sm"
                >
                  Gabung Membership
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-blue-700 to-cyan-500 text-white">
        <div className="max-w-7xl mx-auto px-6 py-20 text-center">
          <h2 className="text-4xl font-bold">
            Mulai Kumpulkan Poin Hari Ini
          </h2>
          <p className="mt-4 text-blue-100">
            Semakin sering melakukan perawatan, semakin cepat level membership Anda meningkat!
          </p>
          <Link
            to="/register-member"
            className="inline-block mt-8 bg-white text-blue-700 px-8 py-4 rounded-2xl font-bold hover:scale-105 transition"
          >
            Daftar Membership
          </Link>
        </div>
      </section>
    </div>
  );
}
import { MdQuestionAnswer } from "react-icons/md";

export default function DoctorFaqSection() {
  const faqs = [
    { q: "Apakah bisa memilih dokter gigi yang sama di setiap kunjungan?", a: "Tentu saja bisa. Sistem CRM kami mencatat riwayat rekam medis Anda dan akan merekomendasikan dokter yang sama untuk menjaga konsistensi perawatan." },
    { q: "Bagaimana jika saya ingin mengubah jadwal (reschedule) janji temu?", a: "Perubahan jadwal bisa dilakukan maksimal 2 jam sebelum sesi dimulai melalui dashboard member atau menghubungi WhatsApp operasional kami." },
    { q: "Apakah dokter di SIGIGI menerima penanganan pasien anak-anak?", a: "Ya, seluruh tim dokter kami terlatih secara profesional untuk menangani pasien anak-anak dengan pendekatan yang ramah dan nyaman." }
  ];

  return (
    <section className="py-24 bg-white border-t border-slate-100">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-blue-600 font-bold uppercase tracking-wider text-sm">FAQ Dokter</span>
          <h2 className="text-3xl font-bold text-slate-900 mt-2">Pertanyaan Seputar Janji Temu</h2>
        </div>
        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-slate-50 p-6 rounded-2xl border border-slate-100 flex gap-4">
              <div className="text-blue-600 text-2xl mt-1 shrink-0"><MdQuestionAnswer /></div>
              <div>
                <h4 className="font-bold text-slate-900 text-lg">{faq.q}</h4>
                <p className="text-gray-500 text-sm mt-2 leading-relaxed">{faq.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
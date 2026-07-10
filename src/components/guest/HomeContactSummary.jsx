import { MdPhoneInTalk, MdAccessTime, MdLocationOn } from "react-icons/md";

export default function HomeContactSummary() {
  return (
    <section className="py-16 bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-inner">
      <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row justify-between items-center gap-8">
        <div>
          <span className="text-cyan-200 font-semibold tracking-wider text-sm uppercase">Konfirmasi & Kunjungan</span>
          <h2 className="text-2xl md:text-3xl font-bold mt-1">Butuh Bantuan Darurat atau Konsultasi Cepat?</h2>
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8 mt-4 text-blue-50 text-sm">
            <span className="flex items-center gap-2">
              <MdAccessTime className="text-xl text-cyan-200" /> 
              <span>Jam Operasional: <strong>Senin - Jumat (08.00 - 20.00)</strong> | <strong>Sabtu (08.00 - 17.00)</strong></span>
            </span>
            <span className="flex items-center gap-2">
              <MdLocationOn className="text-xl text-cyan-200" /> 
              <span>Pekanbaru, Riau</span>
            </span>
          </div>
        </div>
        
        <div className="flex gap-4 shrink-0 w-full lg:w-auto">
          <a 
            href="https://wa.me/6281234567890" // Langsung masukin nomor telepon dari halaman kontak lu
            target="_blank" 
            rel="noopener noreferrer" 
            className="w-full lg:w-auto text-center px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-white font-bold rounded-2xl flex items-center justify-center gap-2 shadow-lg transition duration-300"
          >
            <MdPhoneInTalk className="text-xl" /> Hubungi via WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
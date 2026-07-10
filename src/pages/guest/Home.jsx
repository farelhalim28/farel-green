// ================================================
// LETAK FILE: src/pages/guest/Home.jsx (VERSI FULL MANTAP)
// ================================================

import HeroSection from "../../components/guest/HeroSection";
import StatsSection from "../../components/guest/StatsSection";
import AboutSection from "../../components/guest/AboutSection";
import HomeServiceQualitySection from "../../components/guest/HomeServiceQualitySection"; 
import CrmFeaturesSection from "../../components/guest/CrmFeaturesSection"; 

// 3 Komponen Preview Estetik Pilihan Lu
import HomeServicesPreview from "../../components/guest/HomeServicesPreview"; 
import HomeDoctorsPreview from "../../components/guest/HomeDoctorsPreview";   
import HomeMembershipHighlight from "../../components/guest/HomeMembershipHighlight"; 

import HomeStepSection from "../../components/guest/HomeStepSection"; 
import PromoBannerSection from "../../components/guest/PromoBannerSection"; 
import TestimonialSection from "../../components/guest/TestimonialSection"; 
import HomeContactSummary from "../../components/guest/HomeContactSummary"; 

export default function Home() {
    return (
        <div className="overflow-x-hidden">

            {/* 1. Banner Utama */}
            <HeroSection />

            {/* 2. Angka Pencapaian (10.000+ Pasien) */}
            <StatsSection />

            {/* 3. Pengenalan Singkat SIGIGI */}
            <AboutSection />

            {/* 4. Standar Kualitas Pelayanan Klinik (Protokol Medis) */}
            <HomeServiceQualitySection />

            {/* 5. Display Fitur Utama Aplikasi CRM */}
            <CrmFeaturesSection />

            {/* 6. PREVIEW LAYANAN: Tampilan Simpel 3 Layanan Teratas */}
            <HomeServicesPreview />

            {/* 7. PREVIEW DOKTER: Highlight Grid Tim Medis */}
            <HomeDoctorsPreview />

            {/* 8. PREVIEW MEMBERSHIP: Skema Tiering CRM (Silver, Gold, VIP) */}
            <HomeMembershipHighlight />

            {/* 9. Alur Tiga Langkah Registrasi Pasien */}
            <HomeStepSection />

            {/* 10. Gimmick Promo Member (Diskon 30%) */}
            <PromoBannerSection />

            {/* 11. Feedback / Testimoni Pasien */}
            <TestimonialSection />

            {/* 12. Bar Kontak Kilat & Jam Operasional (Penutup Bawah) */}
            <HomeContactSummary />

        </div>
    );
}
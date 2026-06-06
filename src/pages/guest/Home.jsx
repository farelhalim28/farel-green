// ================================================
// LETAK FILE: src/pages/guest/Home.jsx
// ================================================

import HeroSection from "../../components/guest/HeroSection";
import StatsSection from "../../components/guest/StatsSection";
import AboutSection from "../../components/guest/AboutSection";
import ServicesSection from "../../components/guest/ServicesSection";
import DoctorsSection from "../../components/guest/DoctorsSection";
import MembershipSection from "../../components/guest/MembershipSection";
import PromoSection from "../../components/guest/PromoSection";
import TestimonialSection from "../../components/guest/TestimonialSection";
import FAQSection from "../../components/guest/FAQSection";
import ContactSection from "../../components/guest/ContactSection";

export default function Home() {
    return (
        <div className="overflow-x-hidden">

            <HeroSection />

            <StatsSection />

            <AboutSection />

            <ServicesSection />

            <DoctorsSection />

            <MembershipSection />

            <PromoSection />

            <TestimonialSection />

            <FAQSection />

            <ContactSection />

        </div>
    );
}
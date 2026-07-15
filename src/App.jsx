// =========================================================================
// LETAK FILE: src/App.jsx
// =========================================================================
import React, { Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Loading from "./components/Loading";

// LAYOUT
import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";
import GuestLayout from "./layouts/GuestLayout";
import MemberLayout from "./layouts/MemberLayout";

// CRM ADMIN (ERP)
const Dashboard = lazy(() => import("./pages/Dashboard"));
const JanjiTemu = lazy(() => import("./pages/JanjiTemu"));
const Pasien = lazy(() => import("./pages/Pasien"));
const Dokter = lazy(() => import("./pages/Dokter")); // LAZY LOAD DOKTER BARU!
const Perawatan = lazy(() => import("./pages/Perawatan"));
const RekamMedis = lazy(() => import("./pages/RekamMedis"));
const Pembayaran = lazy(() => import("./pages/Pembayaran"));
const Laporan = lazy(() => import("./pages/Laporan"));
const Pengaturan = lazy(() => import("./pages/Pengaturan"));
const Components = lazy(() => import("./pages/Components"));
const User = lazy(() => import("./pages/User")); // Halaman CRUD Member/Pasien

// AUTH
const Login = lazy(() => import("./pages/auth/Login")); 
const LoginMember = lazy(() => import("./pages/auth/LoginMember"));
const Register = lazy(() => import("./pages/auth/Register"));
const Forgot = lazy(() => import("./pages/auth/Forgot"));

// GUEST WEBSITE
const Home = lazy(() => import("./pages/guest/Home"));
const ServicesPage = lazy(() => import("./pages/guest/ServicesPage"));
const DoctorsPage = lazy(() => import("./pages/guest/DoctorsPage"));
const MembershipPage = lazy(() => import("./pages/guest/MembershipPage"));
const RegistrasiMembership = lazy(() => import("./pages/guest/RegistrasiMembership"));
const PromoPage = lazy(() => import("./pages/guest/PromoPage"));
const FAQPage = lazy(() => import("./pages/guest/FAQPage"));
const ContactPage = lazy(() => import("./pages/guest/ContactPage"));
const AppointmentPage = lazy(() => import("./pages/guest/AppointmentPage"));

// MEMBER PORTAL
const DashboardMember = lazy(() => import("./pages/member/DashboardMember"));
const MembershipSaya = lazy(() => import("./pages/member/MembershipSaya"));
const LoyaltyPoint = lazy(() => import("./pages/member/LoyaltyPoint"));
const RiwayatKunjungan = lazy(() => import("./pages/member/RiwayatKunjungan"));
const AppointmentSaya = lazy(() => import("./pages/member/AppointmentSaya"));
const ProfilSaya = lazy(() => import("./pages/member/ProfilSaya"));

export default function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        {/* =====================================
            1. WEBSITE PUBLIK (GUEST)
        ===================================== */}
        <Route element={<GuestLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/doctors" element={<DoctorsPage />} />
          <Route path="/membership" element={<MembershipPage />} />
          <Route path="/membership/register" element={<RegistrasiMembership />} />
          <Route path="/promo" element={<PromoPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/appointment" element={<AppointmentPage />} />
        </Route>

        {/* =====================================
            2. AUTHENTICATION URLS
        ===================================== */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/login-member" element={<LoginMember />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot" element={<Forgot />} />
        </Route>

        {/* =====================================
            3. PORTAL ADMINISTRATOR (ADMIN ERP)
        ===================================== */}
        <Route element={<MainLayout />}>
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/janji-temu" element={<JanjiTemu />} />
          <Route path="/admin/pasien" element={<Pasien />} />
          <Route path="/admin/dokter" element={<Dokter />} /> {/* ROUTE DOKTER BARU DISINI */}
          <Route path="/admin/perawatan" element={<Perawatan />} />
          <Route path="/admin/rekam-medis" element={<RekamMedis />} />
          <Route path="/admin/pembayaran" element={<Pembayaran />} />
          <Route path="/admin/laporan" element={<Laporan />} />
          <Route path="/admin/pengaturan" element={<Pengaturan />} />
          <Route path="/admin/components" element={<Components />} />
          <Route path="/admin/user" element={<User />} />
        </Route>

        {/* =====================================
            4. PORTAL PASIEN (MEMBER APP)
        ===================================== */}
        <Route element={<MemberLayout />}>
          <Route path="/member/dashboard" element={<DashboardMember />} />
          <Route path="/member/membership" element={<MembershipSaya />} />
          <Route path="/member/loyalty" element={<LoyaltyPoint />} />
          <Route path="/member/riwayat" element={<RiwayatKunjungan />} />
          <Route path="/member/appointment" element={<AppointmentSaya />} />
          <Route path="/member/profil" element={<ProfilSaya />} />
          
          {/* Tambahan rute kelola user/pasien di dalam portal member */}
          <Route path="/member/user" element={<User />} /> 
        </Route>

        {/* Wildcard fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
}
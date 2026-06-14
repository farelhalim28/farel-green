// import './App.css'
// // import BiodataDiri from './BiodataDiri/BiodataDiri'
// // import MultiStepForm from './Beasiswa/MultiStepForm'
// import { useState } from 'react'
// import GuestView from './Wisata/GuestView'
// import AdminView from './Wisata/AdminView'

// function App() {
//   const [mode, setMode] = useState('guest')

//   return (
//     <div>
//       {/* <BiodataDiri /> */}
//       {/* <MultiStepForm /> */}

//       {/* Toggle Guest / Admin */}
//       <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex gap-2 bg-gray-900 border border-gray-700 rounded-2xl px-3 py-2 shadow-2xl">
//         <button
//           onClick={() => setMode('guest')}
//           className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
//             mode === 'guest' ? 'bg-teal-600 text-white shadow-lg' : 'text-gray-400 hover:text-white'
//           }`}
//         >
//           🌏 Guest View
//         </button>
//         <button
//           onClick={() => setMode('admin')}
//           className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
//             mode === 'admin' ? 'bg-teal-600 text-white shadow-lg' : 'text-gray-400 hover:text-white'
//           }`}
//         >
//           🔐 Admin View
//         </button>
//       </div>

//       {/* Tampilan Wisata */}
//       {mode === 'guest' ? <GuestView /> : <AdminView />}
//     </div>
//   )
// }

// export default App

// import './App.css'
// // import BiodataDiri from './BiodataDiri/BiodataDiri'
// // import MultiStepForm from './Beasiswa/MultiStepForm'
// import { useState } from 'react'
// import GuestView from './Wisata/GuestView'
// import AdminView from './Wisata/AdminView'

// ── Proyek Dokter Gigi ──
import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";

import Loading from "./components/Loading";

// ================================================
// LAYOUT
// ================================================

import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";
import GuestLayout from "./layouts/GuestLayout";
import MemberLayout from "./layouts/MemberLayout";

// ================================================
// CRM ADMIN
// ================================================

const Dashboard = lazy(() => import("./pages/Dashboard"));
const JanjiTemu = lazy(() => import("./pages/JanjiTemu"));
const Pasien = lazy(() => import("./pages/Pasien"));
const Perawatan = lazy(() => import("./pages/Perawatan"));
const RekamMedis = lazy(() => import("./pages/RekamMedis"));
const Pembayaran = lazy(() => import("./pages/Pembayaran"));
const Laporan = lazy(() => import("./pages/Laporan"));
const Pengaturan = lazy(() => import("./pages/Pengaturan"));
const Components = lazy(() => import("./pages/Components"));

// ================================================
// AUTH
// ================================================

const Login = lazy(() => import("./pages/auth/Login"));
const Register = lazy(() => import("./pages/auth/Register"));
const Forgot = lazy(() => import("./pages/auth/Forgot"));

// ================================================
// GUEST WEBSITE
// ================================================

const Home = lazy(() => import("./pages/guest/Home"));
const ServicesPage = lazy(() => import("./pages/guest/ServicesPage"));
const DoctorsPage = lazy(() => import("./pages/guest/DoctorsPage"));
const MembershipPage = lazy(() => import("./pages/guest/MembershipPage"));
const PromoPage = lazy(() => import("./pages/guest/PromoPage"));
const FAQPage = lazy(() => import("./pages/guest/FAQPage"));
const ContactPage = lazy(() => import("./pages/guest/ContactPage"));
const AppointmentPage = lazy(() => import("./pages/guest/AppointmentPage"));

// ================================================
// MEMBER PORTAL
// ================================================

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
        GUEST WEBSITE
    ===================================== */}

        <Route element={<GuestLayout />}>
          <Route path="/" element={<Home />} />

          <Route path="/services" element={<ServicesPage />} />

          <Route path="/doctors" element={<DoctorsPage />} />

          <Route path="/membership" element={<MembershipPage />} />

          <Route path="/promo" element={<PromoPage />} />

          <Route path="/faq" element={<FAQPage />} />

          <Route path="/contact" element={<ContactPage />} />

          <Route path="/appointment" element={<AppointmentPage />} />
        </Route>

        {/* =====================================
        AUTH
    ===================================== */}

        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />

          <Route path="/register" element={<Register />} />

          <Route path="/forgot" element={<Forgot />} />
        </Route>

        {/* =====================================
        CRM ADMIN
    ===================================== */}

        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />

          <Route path="/janji-temu" element={<JanjiTemu />} />

          <Route path="/pasien" element={<Pasien />} />

          <Route path="/perawatan" element={<Perawatan />} />

          <Route path="/rekam-medis" element={<RekamMedis />} />

          <Route path="/pembayaran" element={<Pembayaran />} />

          <Route path="/laporan" element={<Laporan />} />

          <Route path="/pengaturan" element={<Pengaturan />} />

          <Route path="/components" element={<Components />} />
        </Route>

        {/* =====================================
        MEMBER PORTAL
    ===================================== */}

        <Route element={<MemberLayout />}>
          <Route path="/member" element={<DashboardMember />} />

          <Route path="/member/membership" element={<MembershipSaya />} />

          <Route path="/member/loyalty" element={<LoyaltyPoint />} />

          <Route path="/member/riwayat" element={<RiwayatKunjungan />} />

          <Route path="/member/appointment" element={<AppointmentSaya />} />

          <Route path="/member/profil" element={<ProfilSaya />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

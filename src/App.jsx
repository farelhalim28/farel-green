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
// ================================================
// LETAK FILE: src/App.jsx
// ================================================

import React, { Suspense, lazy } from "react"
import { Routes, Route, Navigate } from "react-router-dom"
import Loading from "./components/Loading"

// ── Import Layout
import MainLayout from "./layouts/MainLayout"
import AuthLayout from "./layouts/AuthLayout"

// ── Lazy: /pages
const Dashboard = lazy(() => import("./pages/Dashboard"))
const JanjiTemu = lazy(() => import("./pages/JanjiTemu"))
const Pasien = lazy(() => import("./pages/Pasien"))
const Components = lazy(() => import("./pages/Components"))

// ── HALAMAN CRM KLINIK GIGI
const Perawatan = lazy(() => import("./pages/Perawatan"))
const RekamMedis = lazy(() => import("./pages/RekamMedis"))
const Pembayaran = lazy(() => import("./pages/Pembayaran"))
const Laporan = lazy(() => import("./pages/Laporan"))
const Pengaturan = lazy(() => import("./pages/Pengaturan"))

// ── AUTH
const Login = lazy(() => import("./pages/auth/Login"))
const Register = lazy(() => import("./pages/auth/Register"))
const Forgot = lazy(() => import("./pages/auth/Forgot"))

export default function App() {
    return (
        <Suspense fallback={<Loading />}>

            <Routes>

                {/* =====================================
                    REDIRECT AWAL KE LOGIN
                ===================================== */}

                <Route
                    path="/"
                    element={<Navigate to="/login" replace />}
                />

                {/* =====================================
                    HALAMAN UTAMA
                ===================================== */}

                <Route element={<MainLayout />}>

                    <Route
                        path="/dashboard"
                        element={<Dashboard />}
                    />

                    <Route
                        path="/janji-temu"
                        element={<JanjiTemu />}
                    />

                    <Route
                        path="/pasien"
                        element={<Pasien />}
                    />

                    <Route
                        path="/perawatan"
                        element={<Perawatan />}
                    />

                    <Route
                        path="/rekam-medis"
                        element={<RekamMedis />}
                    />

                    <Route
                        path="/pembayaran"
                        element={<Pembayaran />}
                    />

                    <Route
                        path="/laporan"
                        element={<Laporan />}
                    />

                    <Route
                        path="/pengaturan"
                        element={<Pengaturan />}
                    />

                    <Route
                        path="/components"
                        element={<Components />}
                    />

                </Route>

                {/* =====================================
                    AUTH
                ===================================== */}

                <Route element={<AuthLayout />}>

                    <Route
                        path="/login"
                        element={<Login />}
                    />

                    <Route
                        path="/register"
                        element={<Register />}
                    />

                    <Route
                        path="/forgot"
                        element={<Forgot />}
                    />

                </Route>

            </Routes>

        </Suspense>
    )
}
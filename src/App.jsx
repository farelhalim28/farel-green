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

// ── Proyek Dokter Gigi ──
// ================================================
// LETAK FILE: src/App.jsx
// ================================================

import React, { Suspense, lazy } from "react"
import { Routes, Route } from "react-router-dom"
import Loading from "./components/Loading"

// ── Lazy: /layouts
import MainLayout from "./layouts/MainLayout"
import AuthLayout from "./layouts/AuthLayout"

// ── Lazy: /components
const Sidebar           = lazy(() => import("./components/Sidebar"))
const Header            = lazy(() => import("./components/Header"))
const SearchBar         = lazy(() => import("./components/SearchBar"))
const NotificationBell  = lazy(() => import("./components/NotificationBell"))
const ProfileDropdown   = lazy(() => import("./components/ProfileDropdown"))
const StatCard          = lazy(() => import("./components/StatCard"))
const RevenueChart      = lazy(() => import("./components/RevenueChart"))
const AppointmentList   = lazy(() => import("./components/AppointmentList"))
const MiniCalendar      = lazy(() => import("./components/MiniCalendar"))
const QuickActions      = lazy(() => import("./components/QuickActions"))

// ── Lazy: /pages
const Dashboard = lazy(() => import("./pages/Dashboard"))
const JanjiTemu = lazy(() => import("./pages/JanjiTemu"))
const Pasien    = lazy(() => import("./pages/Pasien"))

// ── Lazy: /pages/auth
const Login    = lazy(() => import("./pages/auth/Login"))
const Register = lazy(() => import("./pages/auth/Register"))
const Forgot   = lazy(() => import("./pages/auth/Forgot"))

export default function App() {
    return (
        <Suspense fallback={<Loading />}>
            <Routes>

                {/* ── MainLayout: halaman utama ── */}
                <Route element={<MainLayout />}>
                    <Route path="/"           element={<Dashboard />} />
                    <Route path="/janji-temu" element={<JanjiTemu />} />
                    <Route path="/pasien"     element={<Pasien />} />
                </Route>

                {/* ── AuthLayout: halaman login, register, forgot ── */}
                <Route element={<AuthLayout />}>
                    <Route path="/login"    element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/forgot"   element={<Forgot />} />
                </Route>

            </Routes>
        </Suspense>
    )
}
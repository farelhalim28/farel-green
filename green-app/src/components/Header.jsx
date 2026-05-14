// ================================================
// LETAK FILE: src/components/Header.jsx
// ================================================
// Header ini gabungan dari 3 komponen:
// - SearchBar
// - NotificationBell
// - ProfileDropdown

import SearchBar from "./SearchBar";
import NotificationBell from "./NotificationBell";
import ProfileDropdown from "./ProfileDropdown";

export default function Header() {
    return (
        <header className="flex items-center justify-between px-6 py-3.5 bg-white border-b border-gray-100 sticky top-0 z-20">
            {/* Kiri: Search Bar */}
            <SearchBar />

            {/* Kanan: Notif + Profile */}
            <div className="flex items-center gap-3 ml-4">
                <NotificationBell />
                <ProfileDropdown />
            </div>
        </header>
    );
}
import {
  MdDashboard,
  MdWorkspacePremium,
  MdStars,
  MdHistory,
  MdCalendarMonth,
  MdPerson,
} from "react-icons/md";

export default function MemberSidebar() {
  const menus = [
    {
      title: "Dashboard",
      icon: <MdDashboard />,
    },
    {
      title: "Membership Saya",
      icon: <MdWorkspacePremium />,
    },
    {
      title: "Loyalty Point",
      icon: <MdStars />,
    },
    {
      title: "Riwayat Kunjungan",
      icon: <MdHistory />,
    },
    {
      title: "Appointment Saya",
      icon: <MdCalendarMonth />,
    },
    {
      title: "Profil Saya",
      icon: <MdPerson />,
    },
  ];

  return (
    <div className="w-72 min-h-screen bg-white border-r border-gray-100 shadow-sm">

      <div className="p-6 border-b">

        <h1 className="text-2xl font-bold text-blue-600">
          SIGIGI
        </h1>

        <p className="text-gray-500 text-sm">
          Member Portal
        </p>

      </div>

      <div className="p-4 space-y-2">

        {menus.map((menu, index) => (
          <button
            key={index}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-blue-50 hover:text-blue-600 transition"
          >
            {menu.icon}
            <span>{menu.title}</span>
          </button>
        ))}

      </div>

    </div>
  );
}
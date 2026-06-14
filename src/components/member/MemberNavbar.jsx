import { MdNotifications } from "react-icons/md";

export default function MemberNavbar() {
  return (
    <div className="bg-white h-20 shadow-sm px-8 flex items-center justify-between">

      <input
        type="text"
        placeholder="Cari layanan atau informasi..."
        className="w-[400px] border border-gray-200 rounded-xl px-4 py-2"
      />

      <div className="flex items-center gap-4">

        <button className="relative">
          <MdNotifications size={24} />
        </button>

        <div className="flex items-center gap-3">

          <img
            src="https://avatar.iran.liara.run/public/girl/10"
            alt=""
            className="w-10 h-10 rounded-full"
          />

          <div>
            <h4 className="font-semibold">
              Siti Aisyah
            </h4>

            <p className="text-xs text-gray-500">
              Gold Member
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}
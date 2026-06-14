import {
  MdPerson,
  MdEmail,
  MdPhone,
  MdLocationOn,
  MdCake,
  MdBadge,
  MdWorkspacePremium,
  MdEdit,
  MdVerified,
} from "react-icons/md";

export default function ProfilSaya() {
  const member = {
    nama: "Andi Saputra",
    email: "andi.saputra@gmail.com",
    telepon: "081278991122",
    alamat: "Jl. Arifin Ahmad, Pekanbaru",
    tanggalLahir: "18 November 1995",
    membership: "VIP",
    noRM: "RM-2026-003",
    poin: 2350,
    status: "Aktif",
    bergabung: "11 Maret 2023",
    foto: "https://avatar.iran.liara.run/public/boy/11",
  };

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div className="bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 rounded-3xl p-8 text-white shadow-xl">
        <div className="flex items-center justify-between flex-wrap gap-5">

          <div>
            <h1 className="text-4xl font-bold">
              Profil Saya
            </h1>

            <p className="text-cyan-100 mt-2">
              Kelola informasi akun dan data pribadi member.
            </p>
          </div>

          <button className="bg-white text-blue-600 px-5 py-3 rounded-xl font-semibold flex items-center gap-2 hover:bg-blue-50 transition">
            <MdEdit size={20} />
            Edit Profil
          </button>

        </div>
      </div>

      {/* PROFILE CARD */}
      <div className="bg-white rounded-3xl shadow-md p-8">

        <div className="flex flex-col lg:flex-row items-center gap-8">

          <img
            src={member.foto}
            alt={member.nama}
            className="w-40 h-40 rounded-full object-cover border-4 border-blue-100"
          />

          <div className="flex-1">

            <div className="flex items-center gap-3 flex-wrap">

              <h2 className="text-3xl font-bold text-gray-800">
                {member.nama}
              </h2>

              <span className="bg-purple-100 text-purple-700 px-4 py-1 rounded-full text-sm font-bold flex items-center gap-1">
                <MdWorkspacePremium />
                {member.membership}
              </span>

            </div>

            <p className="text-gray-500 mt-2">
              Nomor Rekam Medis : {member.noRM}
            </p>

            <div className="mt-4 flex flex-wrap gap-3">

              <span className="bg-green-100 text-green-700 px-4 py-2 rounded-xl flex items-center gap-2 font-medium">
                <MdVerified />
                {member.status}
              </span>

              <span className="bg-yellow-100 text-yellow-700 px-4 py-2 rounded-xl font-medium">
                ⭐ {member.poin} Loyalty Point
              </span>

            </div>

          </div>

        </div>

      </div>

      {/* INFORMASI PRIBADI */}
      <div className="grid lg:grid-cols-2 gap-6">

        <div className="bg-white rounded-3xl shadow-md p-6">

          <h3 className="text-xl font-bold text-gray-800 mb-5">
            Informasi Pribadi
          </h3>

          <div className="space-y-5">

            <div className="flex items-center gap-4">
              <MdPerson className="text-blue-600 text-2xl" />
              <div>
                <p className="text-sm text-gray-500">Nama Lengkap</p>
                <p className="font-semibold">{member.nama}</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <MdEmail className="text-red-500 text-2xl" />
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-semibold">{member.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <MdPhone className="text-green-600 text-2xl" />
              <div>
                <p className="text-sm text-gray-500">Telepon</p>
                <p className="font-semibold">{member.telepon}</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <MdLocationOn className="text-orange-500 text-2xl" />
              <div>
                <p className="text-sm text-gray-500">Alamat</p>
                <p className="font-semibold">{member.alamat}</p>
              </div>
            </div>

          </div>

        </div>

        {/* DATA MEMBER */}
        <div className="bg-white rounded-3xl shadow-md p-6">

          <h3 className="text-xl font-bold text-gray-800 mb-5">
            Data Membership
          </h3>

          <div className="space-y-5">

            <div className="flex items-center gap-4">
              <MdWorkspacePremium className="text-purple-600 text-2xl" />
              <div>
                <p className="text-sm text-gray-500">Level Membership</p>
                <p className="font-semibold">{member.membership}</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <MdBadge className="text-blue-600 text-2xl" />
              <div>
                <p className="text-sm text-gray-500">Nomor Rekam Medis</p>
                <p className="font-semibold">{member.noRM}</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <MdCake className="text-pink-500 text-2xl" />
              <div>
                <p className="text-sm text-gray-500">Tanggal Lahir</p>
                <p className="font-semibold">{member.tanggalLahir}</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <MdVerified className="text-green-600 text-2xl" />
              <div>
                <p className="text-sm text-gray-500">Member Sejak</p>
                <p className="font-semibold">{member.bergabung}</p>
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* KEAMANAN AKUN */}
      <div className="bg-white rounded-3xl shadow-md p-6">

        <h3 className="text-xl font-bold text-gray-800 mb-6">
          Pengaturan Akun
        </h3>

        <div className="grid md:grid-cols-3 gap-4">

          <button className="bg-blue-600 text-white py-4 rounded-2xl font-semibold hover:bg-blue-700 transition">
            Ubah Profil
          </button>

          <button className="bg-yellow-500 text-white py-4 rounded-2xl font-semibold hover:bg-yellow-600 transition">
            Ganti Password
          </button>

          <button className="bg-red-500 text-white py-4 rounded-2xl font-semibold hover:bg-red-600 transition">
            Logout
          </button>

        </div>

      </div>

    </div>
  );
}
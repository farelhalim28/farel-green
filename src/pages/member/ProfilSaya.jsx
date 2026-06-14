import {
  MdPerson,
  MdWorkspacePremium,
  MdPhone,
  MdEmail,
  MdLocationOn,
  MdFavorite,
  MdHistory,
  MdEdit,
  MdDownload,
  MdVerified,
} from "react-icons/md";

export default function ProfilSaya() {
  const member = {
    nama: "Siti Aisyah",
    no_rm: "RM-2026-001",
    email: "siti.aisyah@gmail.com",
    telepon: "081234567890",
    alamat: "Jl. Merdeka No.12, Pekanbaru",
    usia: 28,
    golongan_darah: "A",
    alergi: "Tidak Ada",
    membership: "Gold",
    poin: 850,
    totalKunjungan: 12,
    memberSejak: "10 Januari 2024",
    dokter: "drg. Farel Abdul Halim",
    foto: "https://avatar.iran.liara.run/public/girl/10",
  };

  return (
    <div className="p-6 space-y-6">

      {/* HEADER */}

      <div className="bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-500 rounded-3xl p-8 text-white shadow-xl">

        <div className="flex items-center justify-between">

          <div>

            <h1 className="text-4xl font-bold">
              Profil Member
            </h1>

            <p className="mt-2 text-blue-100">
              Kelola informasi akun, membership, dan data kesehatan Anda.
            </p>

          </div>

          <div className="text-7xl">
            👤
          </div>

        </div>

      </div>

      {/* PROFILE CARD */}

      <div className="bg-white rounded-3xl shadow-md p-6">

        <div className="flex flex-col lg:flex-row gap-8 items-center">

          <img
            src={member.foto}
            alt={member.nama}
            className="w-40 h-40 rounded-full object-cover border-4 border-blue-100"
          />

          <div className="flex-1">

            <h2 className="text-3xl font-bold text-gray-800">
              {member.nama}
            </h2>

            <p className="text-gray-500 mt-1">
              Nomor Rekam Medis : {member.no_rm}
            </p>

            <div className="mt-4 flex flex-wrap gap-3">

              <span className="bg-yellow-100 text-yellow-700 px-4 py-2 rounded-full font-semibold">
                <MdWorkspacePremium className="inline mr-1" />
                {member.membership}
              </span>

              <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full font-semibold">
                <MdVerified className="inline mr-1" />
                Membership Aktif
              </span>

            </div>

          </div>

          <div className="flex gap-3">

            <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl flex items-center gap-2">
              <MdEdit />
              Edit Profil
            </button>

            <button className="bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-xl flex items-center gap-2">
              <MdDownload />
              Kartu Member
            </button>

          </div>

        </div>

      </div>

      {/* KPI */}

      <div className="grid md:grid-cols-4 gap-5">

        <div className="bg-white rounded-3xl p-6 shadow-md">

          <p className="text-gray-500">
            Loyalty Point
          </p>

          <h2 className="text-4xl font-bold text-purple-600 mt-2">
            {member.poin}
          </h2>

        </div>

        <div className="bg-white rounded-3xl p-6 shadow-md">

          <p className="text-gray-500">
            Total Kunjungan
          </p>

          <h2 className="text-4xl font-bold text-blue-600 mt-2">
            {member.totalKunjungan}
          </h2>

        </div>

        <div className="bg-white rounded-3xl p-6 shadow-md">

          <p className="text-gray-500">
            Membership
          </p>

          <h2 className="text-3xl font-bold text-yellow-500 mt-2">
            {member.membership}
          </h2>

        </div>

        <div className="bg-white rounded-3xl p-6 shadow-md">

          <p className="text-gray-500">
            Member Sejak
          </p>

          <h2 className="text-xl font-bold text-green-600 mt-2">
            {member.memberSejak}
          </h2>

        </div>

      </div>

      {/* INFORMASI PRIBADI */}

      <div className="bg-white rounded-3xl shadow-md p-6">

        <h2 className="text-xl font-bold mb-5">
          Informasi Pribadi
        </h2>

        <div className="grid md:grid-cols-2 gap-6">

          <div className="flex items-center gap-3">
            <MdPhone className="text-blue-600 text-2xl" />
            <div>
              <p className="text-gray-500">Nomor Telepon</p>
              <h3 className="font-semibold">{member.telepon}</h3>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <MdEmail className="text-red-500 text-2xl" />
            <div>
              <p className="text-gray-500">Email</p>
              <h3 className="font-semibold">{member.email}</h3>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <MdPerson className="text-indigo-600 text-2xl" />
            <div>
              <p className="text-gray-500">Usia</p>
              <h3 className="font-semibold">{member.usia} Tahun</h3>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <MdLocationOn className="text-green-600 text-2xl" />
            <div>
              <p className="text-gray-500">Alamat</p>
              <h3 className="font-semibold">{member.alamat}</h3>
            </div>
          </div>

        </div>

      </div>

      {/* DATA MEDIS */}

      <div className="bg-white rounded-3xl shadow-md p-6">

        <h2 className="text-xl font-bold mb-5">
          Informasi Medis
        </h2>

        <div className="grid md:grid-cols-3 gap-5">

          <div className="bg-blue-50 rounded-2xl p-5">
            <p className="text-gray-500">
              Golongan Darah
            </p>

            <h3 className="text-3xl font-bold text-blue-600">
              {member.golongan_darah}
            </h3>
          </div>

          <div className="bg-red-50 rounded-2xl p-5">
            <p className="text-gray-500">
              Alergi
            </p>

            <h3 className="text-lg font-bold text-red-600">
              {member.alergi}
            </h3>
          </div>

          <div className="bg-green-50 rounded-2xl p-5">
            <p className="text-gray-500">
              Dokter Penanggung Jawab
            </p>

            <h3 className="font-bold text-green-600">
              {member.dokter}
            </h3>
          </div>

        </div>

      </div>

      {/* ACTIVITY */}

      <div className="bg-white rounded-3xl shadow-md p-6">

        <h2 className="text-xl font-bold mb-5">
          Aktivitas Terakhir
        </h2>

        <div className="space-y-4">

          <div className="flex gap-4 items-center">
            <MdHistory className="text-blue-600 text-2xl" />
            <p>
              Kunjungan Scaling Gigi pada 04 Juni 2026
            </p>
          </div>

          <div className="flex gap-4 items-center">
            <MdFavorite className="text-red-500 text-2xl" />
            <p>
              Mendapatkan 150 Loyalty Point
            </p>
          </div>

          <div className="flex gap-4 items-center">
            <MdWorkspacePremium className="text-yellow-500 text-2xl" />
            <p>
              Membership Gold masih aktif
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}
// ================================
// BiodataDiri.js  ← INI KOMPONEN INDUK (PARENT)
// Letakkan file ini di: src/components/BiodataDiri.js
// ================================

// Import semua child komponen dari folder yang sama
import FotoProfil from './FotoProfil';
import NamaLengkap from './NamaLengkap';
import Pendidikan from './Pendidikan';
import Keahlian from './Keahlian';
import Hobi from './Hobi';
import KontakSosmed from './KontakSosmed';

// ====================================
// GANTI DATA DI BAWAH INI DENGAN DATA LO SENDIRI!
// ====================================
const dataBiodata = {
  // --- Foto & Header ---
  nama: 'Farel Abdul Halim',
  profesi: 'Mahasiswa Sistem Informasi',
  foto: null, // isi dengan URL foto jika punya, contoh: 'https://...' atau null

  // --- Data Diri ---
  namaLengkap: 'Farel Abdul Halim',
  namaPanggilan: 'Farel',
  tempatLahir: 'Salo',
  tanggalLahir: '26 February 2006',
  jenisKelamin: 'Laki-laki',
  agama: 'Islam',
  

  // --- Pendidikan ---
  riwayatPendidikan: [
    {
      icon: '🏫',
      nama: 'SD Negeri 01 Penyasawan',
      jurusan: '-',
      tahun: '2010 - 2016',
    },
    {
      icon: '🏫',
      nama: 'SMP Negeri 01 Penyasawan',
      jurusan: '-',
      tahun: '2016 - 2019',
    },
    {
      icon: '🏫',
      nama: 'SMA Negeri 01 Penyasawan',
      jurusan: 'IPA',
      tahun: '2019 - 2022',
    },
    {
      icon: '🎓',
      nama: 'Politeknik Caltex Riau',
      jurusan: 'Sistem Informasi',
      tahun: '2022 - Sekarang',
    },
  ],

  // --- Keahlian ---
  daftarKeahlian: [
    'HTML & CSS',
    'JavaScript',
    'React.js',
    'Node.js',
    'Git & GitHub',
    'Figma',
  ],

  // --- Hobi ---
  daftarHobi: [
    { emoji: '💻', nama: 'Coding' },
    { emoji: '📚', nama: 'Membaca' },
    { emoji: '🎮', nama: 'Gaming' },
    { emoji: '🎵', nama: 'Musik' },
    { emoji: '📷', nama: 'Fotografi' },
    { emoji: '✈️', nama: 'Traveling' },
  ],

  // --- Kontak & Sosmed ---
  email: 'email@gmail.com',
  noHp: '+62 812-3456-7890',
  instagram: 'username_ig',
  github: 'username_github',
  linkedin: 'username_linkedin',
};

// ====================================
// KOMPONEN BIODATA DIRI (PARENT)
// ====================================
function BiodataDiri() {
  return (
    <div className="biodata-container">

      {/* Child 1: Foto Profil */}
      <FotoProfil
        nama={dataBiodata.nama}
        profesi={dataBiodata.profesi}
        foto={dataBiodata.foto}
      />

      {/* Child 2: Nama Lengkap & Data Diri */}
      <NamaLengkap
        namaLengkap={dataBiodata.namaLengkap}
        namaPanggilan={dataBiodata.namaPanggilan}
        tempatLahir={dataBiodata.tempatLahir}
        tanggalLahir={dataBiodata.tanggalLahir}
        jenisKelamin={dataBiodata.jenisKelamin}
        agama={dataBiodata.agama}
      />

      {/* Child 3: Riwayat Pendidikan */}
      <Pendidikan riwayatPendidikan={dataBiodata.riwayatPendidikan} />

      {/* Child 4: Keahlian */}
      <Keahlian daftarKeahlian={dataBiodata.daftarKeahlian} />

      {/* Child 5: Hobi */}
      <Hobi daftarHobi={dataBiodata.daftarHobi} />

      {/* Child 6: Kontak & Sosmed */}
      <KontakSosmed
        email={dataBiodata.email}
        noHp={dataBiodata.noHp}
        instagram={dataBiodata.instagram}
        github={dataBiodata.github}
        linkedin={dataBiodata.linkedin}
      />

    </div>
  );
}

export default BiodataDiri;
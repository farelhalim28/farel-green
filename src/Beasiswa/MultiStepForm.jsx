import { useState } from "react";
import InputField from "./InputField";
import SelectField from "./SelectField";
import "./beasiswa.css";

export default function FormMahasiswa() {

  const [form, setForm] = useState({
    nama: "",
    email: "",
    umur: "",
    gender: "",
    jurusan: "",
  });

  const [errors, setErrors] = useState({});
  const [result, setResult] = useState(null);

  // VALIDASI
  const validate = () => {
    let err = {};

    // NAMA (3 validasi)
    if (!form.nama) err.nama = "Nama wajib diisi";
    else if (/\d/.test(form.nama)) err.nama = "Tidak boleh angka";
    else if (form.nama.length < 3) err.nama = "Minimal 3 karakter";

    // EMAIL (3 validasi)
    if (!form.email) err.email = "Email wajib diisi";
    else if (!form.email.includes("@")) err.email = "Email tidak valid";
    else if (form.email.length < 5) err.email = "Email terlalu pendek";

    // UMUR (3 validasi)
    if (!form.umur) err.umur = "Umur wajib diisi";
    else if (isNaN(form.umur)) err.umur = "Harus angka";
    else if (form.umur < 10) err.umur = "Minimal umur 10";

    // SELECT
    if (!form.gender) err.gender = "Pilih gender";
    if (!form.jurusan) err.jurusan = "Pilih jurusan";

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  // HANDLE INPUT + VALIDASI LANGSUNG
  const handleChange = (name, value) => {
    const newForm = { ...form, [name]: value };
    setForm(newForm);

    // realtime validasi
    let err = {};

    if (!newForm.nama) err.nama = "Nama wajib diisi";
    else if (/\d/.test(newForm.nama)) err.nama = "Tidak boleh angka";
    else if (newForm.nama.length < 3) err.nama = "Minimal 3 karakter";

    if (!newForm.email) err.email = "Email wajib diisi";
    else if (!newForm.email.includes("@")) err.email = "Email tidak valid";
    else if (newForm.email.length < 5) err.email = "Email terlalu pendek";

    if (!newForm.umur) err.umur = "Umur wajib diisi";
    else if (isNaN(newForm.umur)) err.umur = "Harus angka";
    else if (newForm.umur < 10) err.umur = "Minimal umur 10";

    if (!newForm.gender) err.gender = "Pilih gender";
    if (!newForm.jurusan) err.jurusan = "Pilih jurusan";

    setErrors(err);
  };

  const handleSubmit = () => {
    if (validate()) {
      setResult(form);
    }
  };

  const isValid =
    Object.keys(errors).length === 0 &&
    form.nama &&
    form.email &&
    form.umur &&
    form.gender &&
    form.jurusan;

  return (
    <div className="form-page">
      <div className="form-card">

        <div className="form-title">
          <h1>Form Mahasiswa</h1>
          <p>Isi data dengan benar</p>
        </div>

        {/* INPUT */}
        <InputField
          label="Nama Lengkap"
          value={form.nama}
          onChange={(e) => handleChange("nama", e.target.value)}
          error={errors.nama}
        />

        <InputField
          label="Email"
          value={form.email}
          onChange={(e) => handleChange("email", e.target.value)}
          error={errors.email}
        />

        <InputField
          label="Umur"
          value={form.umur}
          onChange={(e) => handleChange("umur", e.target.value)}
          error={errors.umur}
        />

        <SelectField
          label="Jenis Kelamin"
          value={form.gender}
          onChange={(e) => handleChange("gender", e.target.value)}
          options={["Laki-laki", "Perempuan"]}
          error={errors.gender}
        />

        <SelectField
          label="Prodi"
          value={form.jurusan}
          onChange={(e) => handleChange("jurusan", e.target.value)}
          options={["Informatika", "Sistem Informasi", "Manajemen"]}
          error={errors.jurusan}
        />

        {/* BUTTON */}
        {isValid && (
          <button onClick={handleSubmit} className="btn btn-primary" style={{width:"100%", marginTop:"15px"}}>
            Submit
          </button>
        )}

        {/* HASIL */}
        {result && (
          <div className="result-card">
            <h3>Data Berhasil Disubmit</h3>
            <p>Nama: {result.nama}</p>
            <p>Email: {result.email}</p>
            <p>Umur: {result.umur}</p>
            <p>Gender: {result.gender}</p>
            <p>Prodi: {result.jurusan}</p>
          </div>
        )}

      </div>
    </div>
  );
}
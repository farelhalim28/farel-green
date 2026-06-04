// ================================================
// LETAK FILE: src/pages/Components.jsx
// PATH: /components
// ================================================
// Halaman playground untuk menampilkan semua komponen

import Button from "../components/Button";
import Badge from "../components/Badge";
import Avatar from "../components/Avatar";
import Card from "../components/Card";
import StatCard from "../components/StatCard";
import Table from "../components/Table";
import InputField from "../components/InputField";
import SelectField from "../components/SelectField";
import TextArea from "../components/TextArea";
import Alert from "../components/Alert";
import Modal from "../components/Modal";
import Container from "../components/Container";
import PageHeader from "../components/PageHeader";
import PatientCard from "../components/PatientCard";
import AppointmentCard from "../components/AppointmentCard";
import Footer from "../components/Footer";
import { useState } from "react";

export default function Components() {
    const [modalOpen, setModalOpen] = useState(false);

    return (
        <div className="min-h-screen bg-gray-50 pb-10">
            <PageHeader
                title="Component Library"
                subtitle="Semua komponen yang digunakan di proyek SIGIGI"
                action={<Button type="primary">+ Tambah Komponen</Button>}
            />

            <Container>

                {/* ── 1. BASIC COMPONENTS ── */}
                <section className="mb-10">
                    <h2 className="text-lg font-bold text-gray-700 mb-4 border-b pb-2">
                        1. Basic Component
                    </h2>

                    {/* Button */}
                    <div className="mb-6">
                        <p className="text-sm font-semibold text-gray-500 mb-3">Button</p>
                        <div className="flex flex-wrap gap-3">
                            <Button type="primary">Primary</Button>
                            <Button type="secondary">Secondary</Button>
                            <Button type="success">Simpan</Button>
                            <Button type="danger">Hapus</Button>
                            <Button type="warning">Peringatan</Button>
                            <Button type="outline">Outline</Button>
                            <Button type="primary" disabled>Disabled</Button>
                        </div>
                    </div>

                    {/* Badge */}
                    <div className="mb-6">
                        <p className="text-sm font-semibold text-gray-500 mb-3">Badge</p>
                        <div className="flex flex-wrap gap-3">
                            <Badge type="success">Confirmed</Badge>
                            <Badge type="warning">Pending</Badge>
                            <Badge type="danger">Cancelled</Badge>
                            <Badge type="primary">Aktif</Badge>
                            <Badge type="secondary">Selesai</Badge>
                            <Badge type="purple">Baru</Badge>
                        </div>
                    </div>

                    {/* Avatar */}
                    <div className="mb-6">
                        <p className="text-sm font-semibold text-gray-500 mb-3">Avatar</p>
                        <div className="flex flex-wrap gap-4 items-center">
                            <Avatar name="Siti Aisyah" size="sm" />
                            <Avatar name="Budi Santoso" size="md" />
                            <Avatar name="Dewi Lestari" size="lg" />
                            <Avatar name="R" src="https://avatar.iran.liara.run/public/boy/1" size="md" />
                        </div>
                    </div>
                </section>

                {/* ── 2. LAYOUT COMPONENTS ── */}
                <section className="mb-10">
                    <h2 className="text-lg font-bold text-gray-700 mb-4 border-b pb-2">
                        2. Layout Component
                    </h2>

                    {/* Card */}
                    <div className="mb-6">
                        <p className="text-sm font-semibold text-gray-500 mb-3">Card</p>
                        <Card className="max-w-sm">
                            <h3 className="font-bold text-gray-800 mb-1">Contoh Card</h3>
                            <p className="text-sm text-gray-500">Ini adalah isi dari card komponen.</p>
                        </Card>
                    </div>

                    {/* Footer preview */}
                    <div className="mb-6">
                        <p className="text-sm font-semibold text-gray-500 mb-3">Footer</p>
                        <Footer />
                    </div>
                </section>

                {/* ── 3. DATA DISPLAY COMPONENTS ── */}
                <section className="mb-10">
                    <h2 className="text-lg font-bold text-gray-700 mb-4 border-b pb-2">
                        3. Data Display Component
                    </h2>

                    {/* StatCard */}
                    <div className="mb-6">
                        <p className="text-sm font-semibold text-gray-500 mb-3">StatCard</p>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <StatCard icon="📅" label="Janji Temu Hari Ini" value="8" unit="Pasien" trend="12% dari kemarin" trendUp={true} color="blue" />
                            <StatCard icon="👥" label="Pasien Aktif" value="126" unit="Pasien" trend="4% bulan ini" trendUp={true} color="green" />
                            <StatCard icon="🦷" label="Perawatan Bulan Ini" value="32" unit="Tindakan" trend="8% dari bulan lalu" trendUp={false} color="purple" />
                            <StatCard icon="💰" label="Pendapatan" value="Rp 18.4jt" trend="12.5% dari bulan lalu" trendUp={true} color="yellow" />
                        </div>
                    </div>

                    {/* PatientCard */}
                    <div className="mb-6">
                        <p className="text-sm font-semibold text-gray-500 mb-3">PatientCard</p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <PatientCard name="Siti Aisyah" age={28} lastVisit="15 Mei 2026" treatment="Pembersihan Karang Gigi" status="Aktif" />
                            <PatientCard name="Budi Santoso" age={35} lastVisit="14 Mei 2026" treatment="Tambal Gigi" status="Selesai" />
                            <PatientCard name="Dewi Lestari" age={22} lastVisit="13 Mei 2026" treatment="Konsultasi" status="Pending" />
                        </div>
                    </div>

                    {/* AppointmentCard */}
                    <div className="mb-6">
                        <p className="text-sm font-semibold text-gray-500 mb-3">AppointmentCard</p>
                        <Card className="max-w-lg">
                            <AppointmentCard time="09:00" endTime="09:30" name="Siti Aisyah" treatment="Pembersihan Karang Gigi" status="confirmed" />
                            <AppointmentCard time="10:00" endTime="10:30" name="Budi Santoso" treatment="Tambal Gigi" status="pending" />
                            <AppointmentCard time="11:00" endTime="11:30" name="Dewi Lestari" treatment="Konsultasi" status="cancelled" />
                        </Card>
                    </div>

                    {/* Table */}
                    <div className="mb-6">
                        <p className="text-sm font-semibold text-gray-500 mb-3">Table</p>
                        <Table headers={["No", "Nama Pasien", "Tindakan", "Tanggal", "Status", "Aksi"]}>
                            {[
                                { id: 1, name: "Siti Aisyah",  treatment: "Scaling", date: "15 Mei 2026", status: "confirmed" },
                                { id: 2, name: "Budi Santoso", treatment: "Tambal",  date: "15 Mei 2026", status: "pending" },
                                { id: 3, name: "Rizky Pratama",treatment: "Bleaching",date: "16 Mei 2026", status: "cancelled" },
                            ].map((row, i) => (
                                <tr key={row.id} className="hover:bg-gray-50">
                                    <td className="px-4 py-3 text-sm">{i + 1}</td>
                                    <td className="px-4 py-3 text-sm font-medium">{row.name}</td>
                                    <td className="px-4 py-3 text-sm">{row.treatment}</td>
                                    <td className="px-4 py-3 text-sm">{row.date}</td>
                                    <td className="px-4 py-3">
                                        <Badge type={row.status === "confirmed" ? "success" : row.status === "pending" ? "warning" : "danger"}>
                                            {row.status}
                                        </Badge>
                                    </td>
                                    <td className="px-4 py-3">
                                        <Button type="outline">Detail</Button>
                                    </td>
                                </tr>
                            ))}
                        </Table>
                    </div>
                </section>

                {/* ── 4. FORM COMPONENTS ── */}
                <section className="mb-10">
                    <h2 className="text-lg font-bold text-gray-700 mb-4 border-b pb-2">
                        4. Form Component
                    </h2>
                    <Card className="max-w-lg">
                        <InputField label="Nama Pasien" name="nama" placeholder="Masukkan nama pasien" required />
                        <SelectField
                            label="Jenis Perawatan"
                            name="perawatan"
                            options={[
                                { value: "scaling", label: "Pembersihan Karang Gigi" },
                                { value: "tambal",  label: "Tambal Gigi" },
                                { value: "cabut",   label: "Cabut Gigi" },
                                { value: "bleaching",label: "Bleaching" },
                            ]}
                        />
                        <TextArea label="Catatan Dokter" name="catatan" placeholder="Tulis catatan pemeriksaan..." rows={3} />
                    </Card>
                </section>

                {/* ── 5. FEEDBACK COMPONENTS ── */}
                <section className="mb-10">
                    <h2 className="text-lg font-bold text-gray-700 mb-4 border-b pb-2">
                        5. Feedback Component
                    </h2>
                    <div className="space-y-3 max-w-lg mb-4">
                        <Alert type="success">Janji temu berhasil disimpan!</Alert>
                        <Alert type="warning">Stok obat anestesi hampir habis.</Alert>
                        <Alert type="danger">Gagal menyimpan data pasien.</Alert>
                        <Alert type="info">Jadwal dokter berubah hari ini.</Alert>
                    </div>

                    {/* Modal */}
                    <Button type="primary" onClick={() => setModalOpen(true)}>
                        Buka Modal
                    </Button>
                    <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Tambah Janji Temu">
                        <InputField label="Nama Pasien" name="nama" placeholder="Masukkan nama pasien" />
                        <SelectField
                            label="Jenis Perawatan"
                            name="perawatan"
                            options={[
                                { value: "scaling", label: "Pembersihan Karang Gigi" },
                                { value: "tambal",  label: "Tambal Gigi" },
                            ]}
                        />
                        <div className="flex gap-3 mt-4">
                            <Button type="success">Simpan</Button>
                            <Button type="secondary" onClick={() => setModalOpen(false)}>Batal</Button>
                        </div>
                    </Modal>
                </section>

            </Container>
        </div>
    );
}
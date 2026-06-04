// ================================================
// LETAK FILE: src/components/PageHeader.jsx
// JENIS: Layout Component
// ================================================

export default function PageHeader({ title, subtitle, action }) {
    return (
        <div className="flex items-center justify-between px-4 py-4">
            {/* Kiri: Title + Breadcrumb */}
            <div className="flex flex-col">
                <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
                {subtitle && (
                    <p className="text-sm text-gray-400 mt-0.5">{subtitle}</p>
                )}
            </div>

            {/* Kanan: Action Button */}
            {action && (
                <div>{action}</div>
            )}
        </div>
    );
}

// Cara pakai:
// <PageHeader
//     title="Data Pasien"
//     subtitle="Dashboard / Pasien"
//     action={<Button type="primary">+ Tambah Pasien</Button>}
// />
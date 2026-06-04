// ================================================
// LETAK FILE: src/components/TextArea.jsx
// JENIS: Form Component
// ================================================

export default function TextArea({ label, name, placeholder, value, onChange, error, rows = 4, required = false }) {
    return (
        <div className="mb-4">
            {label && (
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    {label} {required && <span className="text-red-500">*</span>}
                </label>
            )}
            <textarea
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                rows={rows}
                className={`w-full px-4 py-2.5 border rounded-xl text-sm outline-none transition-colors resize-none bg-gray-50
                    ${error ? "border-red-400" : "border-gray-200 focus:border-blue-500"}`}
            />
            {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
        </div>
    );
}

// Cara pakai:
// <TextArea
//     label="Catatan Dokter"
//     name="catatan"
//     placeholder="Tulis catatan pemeriksaan..."
//     value={form.catatan}
//     onChange={handleChange}
//     rows={5}
// />
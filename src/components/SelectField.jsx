// ================================================
// LETAK FILE: src/components/SelectField.jsx
// JENIS: Form Component
// ================================================

export default function SelectField({ label, name, options = [], value, onChange, error, required = false }) {
    return (
        <div className="mb-4">
            {label && (
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    {label} {required && <span className="text-red-500">*</span>}
                </label>
            )}
            <select
                name={name}
                value={value}
                onChange={onChange}
                className={`w-full px-4 py-2.5 border rounded-xl text-sm outline-none transition-colors appearance-none bg-gray-50
                    ${error ? "border-red-400" : "border-gray-200 focus:border-blue-500"}`}
            >
                <option value="">-- Pilih --</option>
                {options.map((opt, i) => (
                    <option key={i} value={opt.value}>{opt.label}</option>
                ))}
            </select>
            {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
        </div>
    );
}

// Cara pakai:
// <SelectField
//     label="Jenis Perawatan"
//     name="perawatan"
//     options={[
//         { value: "tambal", label: "Tambal Gigi" },
//         { value: "cabut", label: "Cabut Gigi" },
//         { value: "scaling", label: "Pembersihan Karang Gigi" },
//     ]}
//     value={form.perawatan}
//     onChange={handleChange}
// />
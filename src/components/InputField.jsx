// ================================================
// LETAK FILE: src/components/InputField.jsx
// JENIS: Form Component
// ================================================

export default function InputField({
    label,
    name,
    type = "text",
    placeholder,
    value,
    onChange,
    error,
    required = false,
    icon,
}) {
    return (
        <div className="mb-4">
            {label && (
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    {label} {required && <span className="text-red-500">*</span>}
                </label>
            )}
            <div className="relative">
                {icon && (
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                        {icon}
                    </span>
                )}
                <input
                    type={type}
                    name={name}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    className={`w-full ${icon ? "pl-10" : "pl-4"} pr-4 py-2.5 border rounded-xl text-sm outline-none transition-colors
                        ${error
                            ? "border-red-400 focus:border-red-500 bg-red-50"
                            : "border-gray-200 focus:border-blue-500 bg-gray-50"
                        }`}
                />
            </div>
            {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
        </div>
    );
}

// Cara pakai:
// <InputField
//     label="Nama Pasien"
//     name="namaPasien"
//     placeholder="Masukkan nama pasien"
//     value={form.namaPasien}
//     onChange={handleChange}
//     required
// />
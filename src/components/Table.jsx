// ================================================
// LETAK FILE: src/components/Table.jsx
// JENIS: Data Display Component
// ================================================

export default function Table({ headers, children }) {
    return (
        <div className="overflow-x-auto rounded-xl border border-gray-100">
            <table className="w-full bg-white">
                <thead className="bg-gray-50 border-b border-gray-100">
                    <tr>
                        {headers.map((header, index) => (
                            <th
                                key={index}
                                className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider"
                            >
                                {header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                    {children}
                </tbody>
            </table>
        </div>
    );
}

// Cara pakai:
// <Table headers={["No", "Nama Pasien", "Tindakan", "Tanggal", "Status"]}>
//     <tr className="hover:bg-gray-50">
//         <td className="px-4 py-3">1</td>
//         <td className="px-4 py-3">Siti Aisyah</td>
//         ...
//     </tr>
// </Table>
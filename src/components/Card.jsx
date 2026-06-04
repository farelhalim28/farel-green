// ================================================
// LETAK FILE: src/components/Card.jsx
// JENIS: Data Display Component
// ================================================

export default function Card({ children, className = "" }) {
    return (
        <div className={`bg-white border border-gray-100 rounded-2xl shadow-sm p-6 ${className}`}>
            {children}
        </div>
    );
}

// Cara pakai:
// <Card>
//     <h2 className="text-xl font-bold">Judul</h2>
//     <p className="text-gray-600">Isi card</p>
// </Card>
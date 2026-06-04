// ================================================
// LETAK FILE: src/components/Container.jsx
// JENIS: Layout Component
// ================================================

export default function Container({ children, className = "" }) {
    return (
        <div className={`container mx-auto py-6 px-4 ${className}`}>
            {children}
        </div>
    );
}

// Cara pakai:
// <Container className="bg-gray-50">
//     <h1>Halaman Pasien</h1>
// </Container>
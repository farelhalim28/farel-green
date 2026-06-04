// ================================================
// LETAK FILE: src/components/Modal.jsx
// JENIS: Feedback Component
// ================================================

export default function Modal({ isOpen, onClose, title, children }) {
    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4"
            onClick={onClose}
        >
            <div
                className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden"
                onClick={e => e.stopPropagation()}
            >
                {/* Header Modal */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                    <h3 className="font-bold text-gray-800 text-base">{title}</h3>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 text-xl font-bold"
                    >
                        ✕
                    </button>
                </div>

                {/* Isi Modal */}
                <div className="px-6 py-4">
                    {children}
                </div>
            </div>
        </div>
    );
}

// Cara pakai:
// const [open, setOpen] = useState(false)
// <Modal isOpen={open} onClose={() => setOpen(false)} title="Tambah Pasien">
//     <p>Isi form di sini</p>
// </Modal>
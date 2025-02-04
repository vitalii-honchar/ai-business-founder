export default function ConfirmationModal({ 
    isOpen, 
    onClose, 
    onConfirm, 
    title, 
    message, 
    confirmText = 'Confirm',
    cancelText = 'Cancel',
    confirmIcon = null,
    confirmButtonClass = 'bg-blue-600 hover:bg-blue-700',
    isLoading = false
}) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div 
                className="absolute inset-0 bg-black opacity-50" 
                onClick={onClose}
            ></div>
            <div className="bg-white rounded-lg shadow-lg p-6 z-10 max-w-sm mx-auto">
                <h2 className="text-xl font-semibold mb-4">{title}</h2>
                <p className="mb-4">{message}</p>
                <div className="flex justify-end gap-4">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                        disabled={isLoading}
                    >
                        {cancelText}
                    </button>
                    <button
                        onClick={onConfirm}
                        className={`px-4 py-2 text-white rounded flex items-center gap-2 ${confirmButtonClass} ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                        disabled={isLoading}
                    >
                        {confirmText}
                        {confirmIcon && <span>{confirmIcon}</span>}
                    </button>
                </div>
            </div>
        </div>
    );
} 
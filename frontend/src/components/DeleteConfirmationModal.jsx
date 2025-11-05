export default function DeleteConfirmationModal({ isOpen, userName, onConfirm, onCancel }) {
    if (!isOpen) return null

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6 max-w-sm w-full mx-4">
                <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Delete User</h2>
                <p className="text-gray-700 dark:text-gray-300 mb-6">
                    Are you sure you want to delete <span className="font-semibold">{userName}</span>? This action cannot be
                    undone.
                </p>
                <div className="flex gap-3 justify-end">
                    <button
                        onClick={onCancel}
                        className="px-4 py-2 bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600 text-gray-900 dark:text-white rounded transition"
                    >
                        Cancel
                    </button>
                    <button onClick={onConfirm} className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded transition">
                        Delete
                    </button>
                </div>
            </div>
        </div>
    )
}

import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { toggleColumn, resetColumns } from "../store/slices/columnSlice"

const COLUMN_LABELS = {
    name: "Name",
    email: "Email",
    age: "Age",
    role: "Role",
    department: "Department",
    location: "Location",
}

export default function ManageColumnsModal() {
    const [isOpen, setIsOpen] = useState(false)
    const dispatch = useDispatch()
    const { visible } = useSelector((state) => state.columns)

    const handleToggle = (col) => {
        dispatch(toggleColumn(col))
    }

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition text-sm font-medium"
            >
                Manage Columns
            </button>

            {isOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-96 max-h-96 overflow-y-auto">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Manage Columns</h2>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white text-2xl"
                            >
                                ×
                            </button>
                        </div>

                        <div className="space-y-3 mb-6">
                            {Object.keys(COLUMN_LABELS).map((col) => (
                                <label key={col} className="flex items-center gap-3 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={visible[col] || false}
                                        onChange={() => handleToggle(col)}
                                        className="w-4 h-4 accent-blue-600 rounded"
                                    />
                                    <span className="text-gray-900 dark:text-white">{COLUMN_LABELS[col]}</span>
                                </label>
                            ))}
                        </div>

                        <div className="flex gap-2">
                            <button
                                onClick={() => dispatch(resetColumns())}
                                className="flex-1 px-4 py-2 bg-gray-300 dark:bg-gray-700 text-gray-900 dark:text-white rounded hover:bg-gray-400 dark:hover:bg-gray-600 transition text-sm"
                            >
                                Reset
                            </button>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition text-sm"
                            >
                                Done
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

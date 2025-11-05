import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
    setEditingId,
    setEditingData,
    updateUser,
    deleteUser,
    clearEditing,
    updateEditingField,
} from "../store/slices/tableSlice"
import DeleteConfirmationModal from "./DeleteConfirmationModal"

export default function TableRow({ user, visibleColumns }) {
    const dispatch = useDispatch()
    const { editingId, editingData } = useSelector((state) => state.table)
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const isEditing = editingId === user._id

    const handleEdit = () => {
        dispatch(setEditingId(user._id))
        dispatch(setEditingData({ ...user }))
    }

    const handleSave = async () => {
        await dispatch(updateUser({ id: user._id, data: editingData }))
        dispatch(clearEditing())
    }

    const handleDelete = async () => {
        await dispatch(deleteUser(user._id))
        setShowDeleteModal(false)
    }

    const handleInputChange = (field, value) => {
        dispatch(updateEditingField({ field, value }))
    }

    return (
        <>
            <tr className="border-b border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900 transition">
                {visibleColumns.map((col) => (
                    <td key={col} className="px-6 py-4 text-sm text-gray-900 dark:text-gray-300">
                        {isEditing ? (
                            <input
                                type={col === "age" ? "number" : "text"}
                                value={editingData[col] || ""}
                                onChange={(e) => handleInputChange(col, e.target.value)}
                                className="w-full px-2 py-1 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                        ) : (
                            user[col]
                        )}
                    </td>
                ))}
                <td className="px-6 py-4 text-sm">
                    <div className="flex gap-2">
                        {isEditing ? (
                            <>
                                <button
                                    onClick={handleSave}
                                    className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white rounded text-xs transition"
                                >
                                    Save
                                </button>
                                <button
                                    onClick={() => dispatch(clearEditing())}
                                    className="px-3 py-1 bg-gray-400 hover:bg-gray-500 text-white rounded text-xs transition"
                                >
                                    Cancel
                                </button>
                            </>
                        ) : (
                            <>
                                <button
                                    onClick={handleEdit}
                                    className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded text-xs transition"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => setShowDeleteModal(true)}
                                    className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded text-xs transition"
                                >
                                    Delete
                                </button>
                            </>
                        )}
                    </div>
                </td>
            </tr>
            <DeleteConfirmationModal
                isOpen={showDeleteModal}
                userName={user.name}
                onConfirm={handleDelete}
                onCancel={() => setShowDeleteModal(false)}
            />
        </>
    )
}

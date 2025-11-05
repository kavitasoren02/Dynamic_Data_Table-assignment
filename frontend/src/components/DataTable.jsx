import { useDispatch, useSelector } from "react-redux"
import { setSortBy, setSortOrder } from "../store/slices/tableSlice"
import TableRow from "./TableRow"
import Pagination from "./Pagination"

const COLUMN_LABELS = {
    name: "Name",
    email: "Email",
    age: "Age",
    role: "Role",
    department: "Department",
    location: "Location",
}

export default function DataTable() {
    const dispatch = useDispatch()
    const { users, loading, error, pagination, sortBy, sortOrder } = useSelector((state) => state.table)
    const { visible } = useSelector((state) => state.columns)

    const visibleColumns = Object.keys(visible).filter((col) => visible[col])

    const handleSort = (column) => {
        if (sortBy === column) {
            dispatch(setSortOrder(sortOrder === "asc" ? "desc" : "asc"))
        } else {
            dispatch(setSortBy(column))
            dispatch(setSortOrder("asc"))
        }
    }

    if (error) return <div className="text-red-600 dark:text-red-400 p-4">Error: {error}</div>

    return (
        <div className="space-y-4">
            <div className="overflow-x-auto border border-gray-200 dark:border-gray-800 rounded-lg">
                <table className="w-full">
                    <thead>
                        <tr className="bg-gray-100 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
                            {visibleColumns.map((col) => (
                                <th
                                    key={col}
                                    onClick={() => handleSort(col)}
                                    className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-800 transition"
                                >
                                    <div className="flex items-center gap-2">
                                        {COLUMN_LABELS[col]}
                                        <span className="text-xs">{sortBy === col && (sortOrder === "asc" ? "↑" : "↓")}</span>
                                    </div>
                                </th>
                            ))}
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td
                                    colSpan={visibleColumns.length + 1}
                                    className="px-6 py-8 text-center text-gray-500 dark:text-gray-400"
                                >
                                    Loading...
                                </td>
                            </tr>
                        ) : users.length === 0 ? (
                            <tr>
                                <td
                                    colSpan={visibleColumns.length + 1}
                                    className="px-6 py-8 text-center text-gray-500 dark:text-gray-400"
                                >
                                    No users found
                                </td>
                            </tr>
                        ) : (
                            users.map((user) => <TableRow key={user._id} user={user} visibleColumns={visibleColumns} />)
                        )}
                    </tbody>
                </table>
            </div>

            {pagination.pages > 1 && <Pagination />}
        </div>
    )
}

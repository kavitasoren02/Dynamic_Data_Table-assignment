import { useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { importUsers, fetchUsers } from "../store/slices/tableSlice"

export default function ImportExportButtons() {
    const fileInputRef = useRef(null)
    const dispatch = useDispatch()
    const { users, pagination } = useSelector((state) => state.table)
    const { visible } = useSelector((state) => state.columns)

    const handleImport = async (e) => {
        const file = e.target.files?.[0]
        if (!file) return

        const text = await file.text()
        const lines = text.trim().split("\n")
        const headers = lines[0].split(",").map((h) => h.trim())

        const users = lines.slice(1).map((line) => {
            const values = line.split(",").map((v) => v.trim())
            const user = {}
            headers.forEach((header, index) => {
                if (header === "age") {
                    user[header] = Number.parseInt(values[index]) || 0
                } else {
                    user[header] = values[index]
                }
            })
            return user
        })

        await dispatch(importUsers(users))
        dispatch(fetchUsers({ page: 1, limit: pagination.limit }))
        fileInputRef.current.value = ""
    }

    const handleExport = () => {
        const visibleColumns = Object.keys(visible).filter((col) => visible[col])

        let csv = visibleColumns.join(",") + "\n"

        users.forEach((user) => {
            const row = visibleColumns
                .map((col) => {
                    const value = user[col]
                    // Handle commas and quotes in values
                    if (typeof value === "string" && value.includes(",")) {
                        return `"${value}"`
                    }
                    return value
                })
                .join(",")
            csv += row + "\n"
        })

        const blob = new Blob([csv], { type: "text/csv" })
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement("a")
        a.href = url
        a.download = `data-table-${new Date().toISOString().split("T")[0]}.csv`
        a.click()
        window.URL.revokeObjectURL(url)
    }

    return (
        <div className="flex gap-2">
            <button
                onClick={() => fileInputRef.current?.click()}
                className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition text-sm font-medium"
            >
                Import CSV
            </button>
            <button
                onClick={handleExport}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition text-sm font-medium"
            >
                Export CSV
            </button>
            <input ref={fileInputRef} type="file" accept=".csv" onChange={handleImport} className="hidden" />
        </div>
    )
}

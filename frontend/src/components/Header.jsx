import { useDispatch, useSelector } from "react-redux"
import { setSearch } from "../store/slices/tableSlice"
import ImportExportButtons from "./ImportExportButtons"
import ManageColumnsModal from "./ManageColumnsModal"

export default function Header() {
    const dispatch = useDispatch()
    const { search } = useSelector((state) => state.table)

    return (
        <header className="bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-10">
            <div className="max-w-7xl mx-auto px-4 py-6">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Data Table Manager</h1>
                        <p className="text-gray-600 dark:text-gray-400 mt-1">Manage, search, sort and edit your data</p>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center">
                    <input
                        type="text"
                        placeholder="Search by name, email, role..."
                        value={search}
                        onChange={(e) => dispatch(setSearch(e.target.value))}
                        className="flex-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <div className="flex gap-2">
                        <ManageColumnsModal />
                        <ImportExportButtons />
                    </div>
                </div>
            </div>
        </header>
    )
}

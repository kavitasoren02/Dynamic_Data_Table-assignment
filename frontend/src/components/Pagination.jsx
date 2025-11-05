import { useDispatch, useSelector } from "react-redux"
import { fetchUsers } from "../store/slices/tableSlice"

export default function Pagination() {
    const dispatch = useDispatch()
    const { pagination, search, sortBy, sortOrder } = useSelector((state) => state.table)
    const { pages, currentPage } = pagination

    const handlePageChange = (page) => {
        dispatch(
            fetchUsers({
                page,
                limit: pagination.limit,
                search,
                sortBy,
                sortOrder,
            }),
        )
    }

    const pageNumbers = []
    for (let i = Math.max(1, currentPage - 2); i <= Math.min(pages, currentPage + 2); i++) {
        pageNumbers.push(i)
    }

    return (
        <div className="flex items-center justify-center gap-2 mt-6">
            <button
                onClick={() => handlePageChange(1)}
                disabled={currentPage === 1}
                className="px-3 py-2 rounded bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 dark:hover:bg-gray-700 transition"
            >
                First
            </button>

            <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-2 rounded bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 dark:hover:bg-gray-700 transition"
            >
                Previous
            </button>

            {pageNumbers.map((page) => (
                <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`px-3 py-2 rounded transition ${page === currentPage
                            ? "bg-blue-600 text-white"
                            : "bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-700"
                        }`}
                >
                    {page}
                </button>
            ))}

            <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === pages}
                className="px-3 py-2 rounded bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 dark:hover:bg-gray-700 transition"
            >
                Next
            </button>

            <button
                onClick={() => handlePageChange(pages)}
                disabled={currentPage === pages}
                className="px-3 py-2 rounded bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 dark:hover:bg-gray-700 transition"
            >
                Last
            </button>

            <span className="text-sm text-gray-600 dark:text-gray-400">
                Page {currentPage} of {pages}
            </span>
        </div>
    )
}

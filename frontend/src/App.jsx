import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import Header from "./components/Header"
import DataTable from "./components/DataTable"
import { fetchUsers } from "./store/slices/tableSlice"

function App() {
  const dispatch = useDispatch()
  const { pagination, search, sortBy, sortOrder } = useSelector((state) => state.table)

  useEffect(() => {
    dispatch(
      fetchUsers({
        page: pagination.currentPage,
        limit: pagination.limit,
        search,
        sortBy,
        sortOrder,
      }),
    )
  }, [dispatch, pagination.currentPage, pagination.limit, search, sortBy, sortOrder])

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-50">
      <Header />
      <main className="max-w-7xl mx-auto px-4 py-8">
        <DataTable />
      </main>
    </div>
  )
}

export default App

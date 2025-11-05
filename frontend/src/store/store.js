import { configureStore } from "@reduxjs/toolkit"
import columnReducer from "./slices/columnSlice"
import tableReducer from "./slices/tableSlice"

export default configureStore({
    reducer: {
        table: tableReducer,
        columns: columnReducer
    },
})

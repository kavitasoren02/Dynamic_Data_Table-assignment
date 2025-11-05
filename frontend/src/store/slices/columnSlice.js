import { createSlice } from "@reduxjs/toolkit"

const defaultColumns = {
    name: true,
    email: true,
    age: true,
    role: true,
    department: false,
    location: false,
}

const initialState = {
    visible: (() => {
        const saved = localStorage.getItem("tableColumns")
        return saved ? JSON.parse(saved) : defaultColumns
    })(),
    order: ["name", "email", "age", "role", "department", "location"],
}

const columnSlice = createSlice({
    name: "columns",
    initialState,
    reducers: {
        toggleColumn(state, action) {
            state.visible[action.payload] = !state.visible[action.payload]
            localStorage.setItem("tableColumns", JSON.stringify(state.visible))
        },
        setColumnsOrder(state, action) {
            state.order = action.payload
            localStorage.setItem("tableColumnsOrder", JSON.stringify(state.order))
        },
        resetColumns(state) {
            state.visible = defaultColumns
            localStorage.setItem("tableColumns", JSON.stringify(defaultColumns))
        },
    },
})

export const { toggleColumn, setColumnsOrder, resetColumns } = columnSlice.actions
export default columnSlice.reducer

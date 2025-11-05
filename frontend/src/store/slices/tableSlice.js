import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import apiClient from "../../utils/api"

export const fetchUsers = createAsyncThunk(
    "table/fetchUsers",
    async ({ page = 1, limit = 10, search = "", sortBy = "name", sortOrder = "asc" }) => {
        const response = await apiClient.get("/api/users", {
            params: { page, limit, search, sortBy, sortOrder },
        })
        return response.data
    },
)

export const updateUser = createAsyncThunk(
    "table/updateUser",
    async ({ id, data }) => {
        const response = await apiClient.put(`/api/users/${id}`, data)
        return response.data
    },
)

export const deleteUser = createAsyncThunk(
    "table/deleteUser",
    async (id) => {
        await apiClient.delete(`/api/users/${id}`)
        return id
    },
)

export const importUsers = createAsyncThunk(
    "table/importUsers",
    async (users) => {
        const response = await apiClient.post("/api/users/bulk/import", { users })
        return response.data
    },
)

const initialState = {
    users: [],
    pagination: { total: 0, pages: 0, currentPage: 1, limit: 10 },
    loading: false,
    error: null,
    search: "",
    sortBy: "name",
    sortOrder: "asc",
    editingId: null,
    editingData: {},
}

const tableSlice = createSlice({
    name: "table",
    initialState,
    reducers: {
        setSearch(state, action) {
            state.search = action.payload
        },
        setSortBy(state, action) {
            state.sortBy = action.payload
        },
        setSortOrder(state, action) {
            state.sortOrder = action.payload
        },
        setEditingId(state, action) {
            state.editingId = action.payload
        },
        setEditingData(state, action) {
            state.editingData = action.payload
        },
        updateEditingField(state, action) {
            const { field, value } = action.payload
            state.editingData[field] = value
        },
        clearEditing(state) {
            state.editingId = null
            state.editingData = {}
        },
    },
    extraReducers(builder) {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.loading = false
                state.users = action.payload.users
                state.pagination = action.payload.pagination
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                const index = state.users.findIndex((u) => u._id === action.payload._id)
                if (index !== -1) {
                    state.users[index] = action.payload
                }
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.users = state.users.filter((u) => u._id !== action.payload)
            })
            .addCase(importUsers.fulfilled, (state) => {
                state.pagination.currentPage = 1
            })
    },
})

export const { setSearch, setSortBy, setSortOrder, setEditingId, setEditingData, updateEditingField, clearEditing } =
    tableSlice.actions

export default tableSlice.reducer

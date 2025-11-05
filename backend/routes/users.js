import express from "express"
import User from "../models/User.js"

const router = express.Router()

// Get all users with pagination, search, and sorting
router.get("/", async (req, res) => {
    try {
        const { page = 1, limit = 10, search = "", sortBy = "name", sortOrder = "asc" } = req.query
        const skip = (page - 1) * limit

        const searchRegex = new RegExp(search, "i")
        const query = {
            $or: [
                { name: searchRegex },
                { email: searchRegex },
                { role: searchRegex },
                { department: searchRegex },
                { location: searchRegex },
            ],
        }

        const sortObj = {}
        sortObj[sortBy] = sortOrder === "desc" ? -1 : 1

        const users = await User.find(query).sort(sortObj).skip(skip).limit(Number.parseInt(limit))
        const total = await User.countDocuments(query)

        res.json({
            users,
            pagination: {
                total,
                pages: Math.ceil(total / limit),
                currentPage: Number.parseInt(page),
                limit: Number.parseInt(limit),
            },
        })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

// Get single user
router.get("/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        if (!user) return res.status(404).json({ error: "User not found" })
        res.json(user)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

// Create user
router.post("/", async (req, res) => {
    try {
        const user = new User(req.body)
        await user.save()
        res.status(201).json(user)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})

// Create multiple users (for import)
router.post("/bulk/import", async (req, res) => {
    try {
        const { users } = req.body
        const result = await User.insertMany(users, { ordered: false })
        res.status(201).json({ inserted: result.length })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})

// Update user
router.put("/:id", async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true })
        if (!user) return res.status(404).json({ error: "User not found" })
        res.json(user)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})

// Delete user
router.delete("/:id", async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id)
        if (!user) return res.status(404).json({ error: "User not found" })
        res.json({ message: "User deleted" })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

export default router

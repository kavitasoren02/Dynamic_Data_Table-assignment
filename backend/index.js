import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import mongoose from "mongoose"
import userRoutes from "./routes/users.js"
import { seedDatabase } from "./scripts/seedData.js"

dotenv.config()

const app = express()

// Middleware
app.use(
    cors({
        origin: process.env.FRONTEND_URL || "https://dynamicdatatables.netlify.app",
        credentials: true
    }),
)
app.use(express.json())

// MongoDB Connection
mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.error("MongoDB connection error:", err))

// Routes
app.use("/api/users", userRoutes)

// Health check
app.get("/api/health", (req, res) => {
    res.json({ status: "OK" })
})

const PORT = process.env.PORT || 5000
app.listen(PORT, async() => {
    await seedDatabase();
    console.log(`Server running on port ${PORT}`)
})

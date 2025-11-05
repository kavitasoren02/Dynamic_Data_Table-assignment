import mongoose from "mongoose"
import dotenv from "dotenv"
import User from "../models/User.js"

dotenv.config()

const departments = ["Engineering", "Sales", "Marketing", "HR", "Finance", "Operations", "Product"]
const locations = ["New York", "San Francisco", "London", "Tokyo", "Berlin", "Singapore", "Toronto"]
const roles = ["Manager", "Developer", "Designer", "Analyst", "Coordinator", "Specialist", "Lead"]

function generateRandomUser(index) {
    const firstNames = ["John", "Jane", "Michael", "Emily", "David", "Sarah", "Robert", "Jessica", "James", "Amanda"]
    const lastNames = [
        "Smith",
        "Johnson",
        "Williams",
        "Brown",
        "Jones",
        "Garcia",
        "Miller",
        "Davis",
        "Rodriguez",
        "Martinez",
    ]

    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)]
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)]

    return {
        name: `${firstName} ${lastName}`,
        email: `user${index}@example.com`,
        age: Math.floor(Math.random() * (65 - 22)) + 22,
        role: roles[Math.floor(Math.random() * roles.length)],
        department: departments[Math.floor(Math.random() * departments.length)],
        location: locations[Math.floor(Math.random() * locations.length)],
    }
}

export async function seedDatabase() {
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("Connected to MongoDB")

        // Clear existing data
        await User.deleteMany({})
        console.log("Cleared existing users")

        // Generate 500 dummy users
        const users = []
        for (let i = 1; i <= 500; i++) {
            users.push(generateRandomUser(i))
        }

        // Insert users
        await User.insertMany(users)
        console.log(`Successfully inserted ${users.length} users`)
    } catch (error) {
        console.error("Seed error:", error)
    }
}


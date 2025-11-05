import mongoose from "mongoose"

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        age: {
            type: Number,
            required: true,
        },
        role: {
            type: String,
            required: true,
        },
        department: {
            type: String,
            default: "N/A",
        },
        location: {
            type: String,
            default: "N/A",
        },
    },
    { timestamps: true },
)

export default mongoose.model("User", userSchema)

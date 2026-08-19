import mongoose, { Types } from "mongoose";
import { type } from "node:os";

const todoSchema = new mongoose.Schema({
    title: {
        type: String
    },
    desc: {
        type: String
    },
    priority: {
        type: String
    },
    dueDate: {
        type: String,
        default: new Date()
    }


}, { timestamps: true })

const todoModel = mongoose.model("todos", todoSchema)
export default todoModel
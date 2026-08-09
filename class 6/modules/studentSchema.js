import mongoose from "mongoose"

const stdSchema = new mongoose.Schema({
    fullName: String,
    age: Number,
    email: String
})

const stdModel = mongoose.model("students", stdSchema)
export default stdModel
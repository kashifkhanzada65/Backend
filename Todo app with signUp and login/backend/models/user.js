import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullName: String,
    email: {
        type: String
    },
    password: {
        type: String
    }
})

const userModel = mongoose.model("user", userSchema)
export default userModel
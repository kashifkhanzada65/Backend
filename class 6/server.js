import express from "express"
import mongoose from "mongoose";
const PORT = 5000
const app = express()
import stdModel from "./modules/studentSchema.js";
import { setServers } from 'node:dns/promises';
// Force Node to use Google and Cloudflare public DNS servers
setServers(['8.8.8.8', '1.1.1.1']);

const URI = "mongodb+srv://muhammadkashif_db_user:kashifkhanzada111@batch-18.7a6cq9n.mongodb.net/"

mongoose.connect(URI)
    .then(() => console.log("mongodg connected!"))
    .catch((err) => console.log("mongoDB Error", err))


app.use(express.json())

app.post("/create-std", async (req, res) => {
    const stdObj = req.body

    await stdModel.create(stdObj)

    res.json({
        "message": "user created"
    })

})

app.get("/getAll-std", async (req, res) => {

    const stdData = await stdModel.find({
        "age": 16
    })



    res.json({
        "message": "student object",
        "Data": stdData
    })
})

app.get("/single-user", async (req, res) => {

    const userId = req.body.userId
    console.log(userId);

    // const stdData = await stdModel.findOne({ "_id": userId })

    const stdData = await stdModel.findById(userId)

    res.json({
        "message": "student fetch",
        "Data": stdData
    })

})

app.put("/edit-user", async (req, res) => {

    const { userId } = req.body

    await stdModel.findByIdAndUpdate(userId, req.body)

    res.json({
        "message": "student edit",
    })
})


app.delete("/delete-user", async (req, res) => {

    const { userId } = req.body

    await stdModel.findByIdAndDelete(userId)

    res.json({
        "message": "student delete",
    })
})



app.listen(PORT, () => console.log(`server running on http//:localhost${PORT}`))
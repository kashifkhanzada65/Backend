import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import userModel from "./models/user.js"
import { setServers } from 'node:dns/promises';
const PORT = 5000
const app = express()
app.use(express.json())
app.use(cors())


setServers(['8.8.8.8', '1.1.1.1']);
const URL = "mongodb+srv://muhammadkashif:muhammadkashif111@batch-18.7a6cq9n.mongodb.net/"

mongoose.connect(URL)
    .then(() => console.log("mongoDB Connected!"))
    .catch((err) => console.log("mongoDB ERROR!", err))



// signUp api     
app.post('/signup', async (req, res) => {
    try {
        console.log(req.body);
        const { fullName, email, password } = req.body

        if (!fullName || !email || !password) {
            res.json({
                message: "required field are missing",
                status: false
            })
            return
        }

        const userData = await userModel.findOne({ email })

        if (userData) {
            res.json({
                message: "user email adress already exist",
                status: false
            })
            return
        }

        await userModel.create(req.body)

        res.json({
            message: "user sign Up successfully",
            status: true
        })

    } catch (error) {
        res.json({
            message: "something went wrong",
            status: false
        })
    }

})


// login api 
app.post('/login', async (req, res) => {
    try {
        console.log('body', req.body);
        const { email, password } = req.body

        if (!email || !password) {
            res.json({
                message: "required field are missing",
                status: false
            })
            return
        }

        const userData = await userModel.findOne({ email })

        if (!userData) {
            res.json({
                message: "user not found",
                status: false
            })
            return
        }

        if (userData.password === password) {
            res.json({
                message: "User Login Successfully",
                status: true,
                data: userData
            })
        } else {
            res.json({
                message: "User not found",
                status: false
            })
            return
        }


    } catch (error) {
        console.log(error);

        res.json({
            message: "something went wrong",
            status: false
        })
    }

})








app.listen(PORT, () => console.log(`server running on http://localhost:${PORT}`))
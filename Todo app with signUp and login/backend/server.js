import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import userModel from "./models/user.js"
import { setServers } from 'node:dns/promises';
import todoModel from "./models/todo.js";
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


app.get("/get-single-user/:id", async (req, res) => {
    try {
        const userId = req.params.id
        console.log("userId", userId);
        const userData = await userModel.findById(userId)
        res.json({
            message: "fetch single user",
            data: userData,
            status: true
        })

    } catch (error) {
        res.json({
            message: error.message || "something went wrong",
            data: null,
            status: false
        })
    }
})

// Todo CRUD 
// app.get('./create-todo')      wrong way
// app.post('./get-todo')     wrong way
// app.put('./update-todo')     wrong way
// app.delete('./delete-todo')     wrong way

app.post("/todo", async (req, res) => {
    try {
        const body = req.body
        console.log(body);

        if (!body.title || !body.desc || !body.priority || !body.dueDate) {
            return res.json({
                message: "required fields are missing",
                status: false
            })
        }

        await todoModel.create(body)
        res.json({
            message: "Todo created",
            status: true
        })

    } catch (error) {
        res.json({
            message: error.message || "something went wrong",
            status: false
        })
    }
})

app.get("/todo", async (req, res) => {
    try {
        const todoId = req.query.todoId
        // console.log(todoId);
        if (todoId) {
            const singleData = await todoModel.findById(todoId)
            res.json({
                message: "Single todo fetch",
                singleData: singleData,
                status: true
            })
        } else {
            const data = await todoModel.find({})

            res.json({
                message: "All todo fetch",
                data: data,
                status: true
            })
        }



    } catch (error) {
        res.json({
            message: error.message || "something went wrong",
            status: false
        })
    }
})


app.put("/todo/:todoId", async (req, res) => {
    try {
        const todoId = req.params.todoId
        const body = req.body
        if (!todoId) {
            return res.json({
                meaasge: "Id required",
                status: false
            })
        }

        await todoModel.findByIdAndUpdate(todoId, body)
        res.json({
            message: "edit successfully!",
            status: true
        })



    } catch (error) {
        res.json({
            message: error.message || "Something went wrong",
            status: false
        })
    }
})

app.delete("/todo", async (req, res) => {

})




app.listen(PORT, () => console.log(`server running on http://localhost:${PORT}`))
import express from "express"
import mongoose from "mongoose"
const PORT = 6000
import { setServers } from 'node:dns/promises';
const app = express()

app.use(express.json())
setServers(['8.8.8.8', '1.1.1.1']);
const URL = "mongodb+srv://muhammadkashif_db_user:kashifkhanzada111@batch-18.7a6cq9n.mongodb.net/"

mongoose.connect(URL)
    .then(() => console.log("mongoDB Connected!"))
    .catch((err) => console.log("mongoDB ERROR!", err))















app.listen(PORT, () => console.log(`server running on http://localhost:${PORT}/`))
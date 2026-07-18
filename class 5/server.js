import express, { json } from "express"
import fs from "fs"
const app = express()
const PORT = 2000


app.use(express.json())

app.post('/signup', (request, response) => {
    // console.log("request==>", request.body);
    const userObj = request.body
    const isFileExist = fs.existsSync("users.txt")
    if (isFileExist) {
        // already user exit 

        const userData = JSON.parse(fs.readFileSync("users.txt", "utf-8"))

        const isUserExist = userData.find((obj) => {
            if (obj.email === userObj.email) {
                return true
            }
        })

        if (isUserExist) {
            return response.send('Email address already exist!')
        }

        userData.push(userObj)
        fs.writeFileSync("users.txt", JSON.stringify(userData, null, 2))
        response.send("user created!")
    } else {
        // first user 

        fs.writeFileSync("users.txt", JSON.stringify([userObj], null, 2))
        response.send("user created!")
    }



})


app.post("/login", (request, response) => {
    // console.log("request==>", request.body);
    const body = request.body
    const readData = JSON.parse(fs.readFileSync("users.txt", "utf-8"))
    // console.log(readData);
    const isEmailExist = readData.find((obj) => {
        if (obj.email === body.email) {
            return true
        }
    })

    if (!isEmailExist) {
        return response.send("user is not found")
    }

    if (isEmailExist.password === body.password) {
        response.send("user login!")
    } else {
        response.send("Invalid email or password")
    }

})






app.listen(PORT, () => console.log(`server running on local:host/:{PORT}`))
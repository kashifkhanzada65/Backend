import http from "http"
import fs from "fs"
const PORT = 3000

const server = http.createServer((request, response) => {
    if (request.url === '/create-user') {
        const userObj = {
            name: 'Muhammad Kashif',
            email: 'kashif123@gmail.com',
            password: 5678
        }

        fs.writeFileSync('user.data', JSON.stringify(userObj))
        response.end('user created!')
    } else if (request.url === "/another-user") {
        // const userData = JSON.parse(fs.readFileSync('user.data', 'utf-8'))

        const userObj = {
            name: 'Sir Jaffar aman',
            email: 'jaffar123@gmail.com',
            password: 123456
        }

        fs.appendFileSync('user.data', JSON.stringify(userObj))



        // response.setHeader('Content-Type', 'application/json');
        // response.end(JSON.stringify(userData))
        response.end("another user create")
        // console.log(userData);


    }
})

server.listen(PORT, () => console.log("user register"))
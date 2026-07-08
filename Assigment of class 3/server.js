import http from "http"
import fs from "fs"
const PORT = 3000

const server = http.createServer((request, response) => {
    if (request.url === '/create-user') {

        const userObj = [{
            name: 'Muhammad Kashif',
            email: 'kashif123@gmail.com',
            password: 5678
        }]

        fs.writeFileSync('user.data', JSON.stringify(userObj, null, 2))
        response.end('user created!')
    } else if (request.url === "/another-user") {
        const userData = JSON.parse(fs.readFileSync('user.data', 'utf-8'))

        if (userData.length === 0) {
            console.log('Error');
            return
        }

        const userObj = {
            name: 'Sir Jaffar aman',
            email: 'jaffar123@gmail.com',
            password: 123456
        }

        const userExists = userData.find(
            user => user.email === userObj.email
        );

        if (userExists) {
            response.end("User already exists");
        } else {
            userData.push(userObj);

            fs.writeFileSync(
                "user.data",
                JSON.stringify(userData, null, 2)
            );

            response.end("Another user created");
        }

    }
})

server.listen(PORT, () => console.log("user register"))
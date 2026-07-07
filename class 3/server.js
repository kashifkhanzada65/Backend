import { log } from "console"
import http, { request } from "http"

const PORT = 2000

const server = http.createServer((request, Response) => {
    if (request.url === '/') {
        Response.end('hello world')
    } else if (request.url === "/about") {
        Response.end('hello about......')
    } else if (request.url === "/contact") {
        Response.end("hello contact.......")
    }
})

server.listen(PORT, () => console.log('server created on localhost:2000'))
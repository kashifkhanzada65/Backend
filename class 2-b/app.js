import http from "http"

const PORT = 2000

// server create 
const server = http.createServer((request, response) => {
    response.end('What is your name')
})

server.listen(PORT, () => console.log('server running on PORT: 2000'));

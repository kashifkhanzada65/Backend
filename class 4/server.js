import express from "express"

const PORT = 2000
const app = express()


// API METHOD 
// 1.Get => read data
// 2.Post => read data
// 3.Put => edit data
// 4.Delete => delete data
// 5.Patch


app.get('/', (request, response) => {
    response.send('hello world')
})

app.post('/create-user', (request, response) => {
    response.send("user created!")
})



app.listen(PORT, () => console.log("server running....."))
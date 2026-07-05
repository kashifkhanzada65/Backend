// console.log('Hello wolrd');
// const num1 = 100
// const num2 = 200
// console.log('result', num1 + num2);
// // console.log(document);
// alert('hello world')


// file syatem

import fs from 'fs'

const createFile = () => {
    console.log("createFile")
    fs.writeFileSync('name.txt', 'Muhammad Kashif')
}
createFile()

// IIFE (Immediately Invoked Funtion Expression)
// const readFile =(()=>{
//      console.log("readFile IIFE")
// })()


const readFile =(()=>{
    const data = fs.readFileSync('./name.txt','utf-8')
    console.log(data);
    
})()






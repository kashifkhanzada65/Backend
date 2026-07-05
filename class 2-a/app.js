// console.log('hello world');

import { log } from 'console';
import fs from 'fs'

const cretaFile = (() => {
    // fs.writeFile('file name', 'content', 'callBack(error , success)');

    // create file
    fs.writeFile('user.txt', 'Muhammad Kashif', (err, success) => {
        if (err) {
            console.log(err);
        } else {
            console.log('file created');

        }
    })

})()



// Read file
const readFile = (() => {
    fs.readFile('user.txt', 'utf-8', (err, success) => {
        if (err) {
            console.log(err);
        } else {
            console.log(success);

        }
    })
})()



// update file
const updateFile = (() => {
    fs.appendFile('./user.txt', '\nKhanzada', (err, success) => {
        if (err) {
            console.log(err);
        } else {
            console.log('updated');

        }
    })
})()


// delete full file
const deleteFile = () => {
    fs.unlink('./user.txt', (err, success) => {
        if (err) {
            console.log(err);

        } else {
            console.log("success", "file deleted", success);

        }
    })
}
deleteFile()




// writeFile= create
// readFile = read
// appendFile = update
// unlink = delete


// folder create 
const createFolder = (() => {
    fs.mkdirSync('data/user/Muhammar/Kashif', { recursive: true })
})()
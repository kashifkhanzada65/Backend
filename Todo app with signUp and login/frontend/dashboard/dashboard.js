import { BASE_URL } from "../config.js"

const authCheck = (async () => {
    const userId = localStorage.getItem("user")
    // console.log(userId);

    if (!userId) {
        window.location.replace("../login/login.html")
        return
    }
    const getCurrentUser = await fetch(`${BASE_URL}/get-single-user/${userId}`).then(res => res.json())
    // console.log("getCurrentUser", getCurrentUser);

    if (!getCurrentUser.status) {
        localStorage.removeItem("user")
        return window.location.replace("../login/login.html")
    }
    localStorage.setItem("userInfo", JSON.stringify(getCurrentUser.data))
    document.getElementById("dashboardHeading").innerHTML = `Hello ${getCurrentUser.data.fullName}`
})()

const parent = document.getElementById('parent')

const getAllTodo = async () => {

    const todoData = await fetch(`${BASE_URL}/todo`).then(res => res.json())

    if (!todoData.status) {
        return alert(todoData.message)
    }
    const todos = todoData.data
    parent.innerHTML = ""
    todos.forEach((obj) => {
        // console.log(obj);

        parent.innerHTML += ` 
        
            <div class="todo-card">

                <div class="todo-content">
                    <h3>${obj.title}</h3>
                    <p>${obj.desc}</p>

                    <div class="meta">
                        <span class='priority ${obj.priority.toLowerCase()}'>${obj.priority}</span>
                        ${obj.dueDate && `<span>${obj.dueDate}</span>`}
                    </div>
                </div>

                <div class="actions">
                    <button id="${obj._id}" onclick="editTodo(this)" class="edit">Edit</button>
                    <button class="delete">Delete</button>
                </div>

            </div>`

    });
}

const logoutHandler = () => {
    localStorage.clear()
    window.location.replace("../login/login.html")
}

const createTodo = async () => {
    try {
        const title = document.getElementById("title").value
        const desc = document.getElementById("desc").value
        const priority = document.getElementById("priority").value
        const date = document.getElementById("date").value


        const todoObj = {
            title,
            desc,
            priority,
            dueDate: date
        }


        const res = await fetch(`${BASE_URL}/todo`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(todoObj)
        }).then(res => res.json())

        if (!res.status) {
            return alert(res.message)
        }

        alert(res.message)
        document.getElementById("title").value = ""
        document.getElementById("desc").value = ""
        document.getElementById("priority").value = ""
        document.getElementById("date").value = ""

        getAllTodo()

    } catch (error) {
        alert(error)
    }
}


const editTodo = async (ele) => {
    try {
        const editTodoValue = prompt("edit todo value")
        const editDescValue = prompt("edit desc value")

        const obj = {
            title: editTodoValue,
            desc: editDescValue
        }

        const res = await fetch(`${BASE_URL}/todo/${ele.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(obj)
        }).then(res => res.json())

        if (!res.status) {
            alert(res.message)
        } else {
            alert(res.message)
            getAllTodo()
        }


    } catch (error) {
        alert(error.message)
    }



}


window.logoutHandler = logoutHandler
window.createTodo = createTodo
window.getAllTodo = getAllTodo
window.editTodo = editTodo
const authCheck = (async () => {
    const userId = localStorage.getItem("user")
    // console.log(userId);

    if (!userId) {
        window.location.replace("../login/login.html")
        return
    }
    const getCurrentUser = await fetch(`http://localhost:5000/get-single-user/${userId}`).then(res => res.json())
    // console.log("getCurrentUser", getCurrentUser);

    if (!getCurrentUser.status) {
        localStorage.removeItem("user")
        return window.location.replace("../login/login.html")
    }
    localStorage.setItem("userInfo", JSON.stringify(getCurrentUser.data))
    document.getElementById("dashboardHeading").innerHTML = `Hello ${getCurrentUser.data.fullName}`
})()

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


        const res = await fetch("http://localhost:5000/todo", {
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



    } catch (error) {
        alert(error)
    }
}


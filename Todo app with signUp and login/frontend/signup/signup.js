const authCheck = (() => {
    const userId = localStorage.getItem("user")
    console.log(userId);
    
    if (userId) {
        window.location.replace("../dashboard/dashboard.html")
        return
    }
})()

const signUpHandler = async () => {

    try {
        console.log("hello world");
        const fullName = document.getElementById("fullName").value
        const email = document.getElementById("email").value
        const password = document.getElementById("password").value
        const confirmPassword = document.getElementById("confirmPassword").value


        if (!fullName || !email || !password || !confirmPassword) {
            alert("required field are missing..")
            return
        }

        if (password != confirmPassword) {
            alert("password not match")
            return
        }

        const userObj = {
            fullName,
            email,
            password
        }
        console.log(userObj);

        // const res = await fetch("http://localhost:5000/signup", {
        //     method: "POST",
        //     headers: {
        //         "Content-Type": "apllication/json"
        //     },
        //     body: JSON.stringify(userObj)
        // }).then(res => res.json())
        const res = await fetch(`http://localhost:5000/signup`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userObj)
        }).then(res => res.json())

        if (res.status) {
            alert("sign Successfully")
            window.location.assign("../login/login.html")
        } else {
            alert(res.message)
        }
        console.log("res", res)

    } catch (error) {
        alert(error.message)
    }


}



const authCheck = (async () => {
    const userId = localStorage.getItem("user")
    console.log(userId);

    if (!userId) {
        window.location.replace("../login/login.html")
        return
    }
    const getCurrentUser = await fetch(`http://localhost:5000/get-single-user/${userId}`).then(res => res.json())
    console.log("getCurrentUser", getCurrentUser);

    if (!getCurrentUser.status) {
        localStorage.removeItem("user")
        return window.location.replace("../login/login.html")
    }

    localStorage.setItem("userInfo", JSON.stringify(getCurrentUser.data))

})()
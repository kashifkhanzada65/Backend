const signUpHandler = () => {
    try {
        const fullName = document.getElementById("fullName").value
        const email = document.getElementById("email").value
        const password = document.getElementById("password").value
        const confirmPassword = document.getElementById("confirmPassword").value

        if (!fullName || !email || !password || !confirmPassword) {
            alert("Required fields are missing!")
            return
        }

        if (password !== confirmPassword) {
            alert("password not match!")
            return
        }

        const userObj = {
            fullName,
            email,
            password,
            confirmPassword
        }
        console.log(userObj);
        const


    } catch (error) {
        alert(error.message)
    }





}
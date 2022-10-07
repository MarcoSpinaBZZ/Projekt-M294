


document.addEventListener("DOMContentLoaded", function () {
    //check if loggedin
    checkLoggedIn()


    document.getElementById("login").addEventListener("submit", function(event) {
        event.preventDefault()

        const email = document.getElementById("emailInput").value
        const password = document.getElementById("passwordInput").value
        const login = {email: email, password: password}

        fetch(`http://127.0.0.1:3000/auth/cookie/login`, {
            method: "POST",
            credentials: "include",
            headers: {
                'Content-Type':'application/json',
            },
            body: JSON.stringify(login)
        }).then(() => window.location.reload())
    })
})

function checkLoggedIn() {

    const elementWhenLoggedIn = document.getElementById("loggedIn")
    const elementWhenNotLoggedIn = document.getElementById("notLoggedIn")

    fetch(`http://127.0.0.1:3000/auth/cookie/status`, {
        credentials: "include"
    }).then(function(response) {
        if (response.status === 200) {
            elementWhenLoggedIn.classList.remove("hidden")
            elementWhenNotLoggedIn.classList.add("hidden")
        } else {
            elementWhenLoggedIn.classList.add("hidden")
            elementWhenNotLoggedIn.classList.remove("hidden")
            alert("Falsche Anmeldedaten!")
        }
    })
};
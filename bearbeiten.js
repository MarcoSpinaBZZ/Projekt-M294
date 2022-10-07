function createTask() {
    const addInput = document.getElementById("addInput")
    const task = { title: addInput.value }

    fetch("http://127.0.0.1:3000/auth/cookie/tasks", {
        method: 'POST',
        credentials: "include",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(task)
    }).then((response) => response.json())
        .then((data) => {
            console.log("Succes:", data)
        })
}

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("add");

    form.addEventListener("submit", (event) => {
        event.preventDefault();
        createTask();
    })

});
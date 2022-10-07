function createCell(text) {
    const cell = document.createElement('td')
    cell.innerText = text;
    return cell;
}


function renderTasks(tasks) {
    const tableBody = document.querySelector('tbody');
    tasks.forEach((task) => {
        const tableRow = document.createElement('tr');
        const box = document.createElement("input");
        box.checked = task.completed
        box.type = "checkbox"
        box.addEventListener("click", (event) => completeTask(task, event.target.checked));
        const button = document.createElement("button")
        button.innerText = "Delete🗑"
        button.addEventListener("click", () => deleteTask(task.id));
        document.body.appendChild(button);
        const bearbeiten = document.createElement("button")
        bearbeiten.innerText = "Taskname ändern📋"
        bearbeiten.addEventListener("click", () => renameTask(task.id));
        tableRow.append(createCell(task.id), createCell(task.title), createCell(task.completed));
        tableBody.appendChild(tableRow);
        tableRow.appendChild(box);
        tableRow.appendChild(button);
        tableRow.appendChild(bearbeiten);

    });
}

function indexTask() {
    fetch("http://localhost:3000/tasks")
        .then((response) => response.json())
        .then((data) => renderTasks(data))
}


document.addEventListener("DOMContentLoaded", () => {
    indexTask();
});

function deleteTask(id) {
    fetch(`http://localhost:3000/task/${id}`, {
        method: 'DELETE',
    }).then(() => location.reload())
};

function renameTask(id) {
    const bearbeiten = prompt("Neuer Taskname eingeben:")
    fetch(`http://localhost:3000/tasks`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: id,
            title: bearbeiten,
        })
    }).then(() => location.reload())

};

function completeTask(task, completed) {
    

    fetch(`http://localhost:3000/tasks`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: task.id,
            title: task.title,
            completed: completed,
        })
    })
        .then((response) => response.json())
        .then(() => location.reload())
};
/*function indexTask() {
    fetch("http://localhost:3000/auth/cookies/tasks", {
        method: 'POST',
        Credentials: 'include',
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify(task)
    }).then()
};*/
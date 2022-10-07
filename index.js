function createCell(text) {
    const cell = document.createElement('td')
    cell.innerText = text;
    return cell;
}


function renderTasks(tasks) {
    const tableBody = document.querySelector('tbody');
    tasks.forEach((task) => {
        const tableRow = document.createElement('tr');
        const button = document.createElement("button")
        button.innerText = "Delete"
        button.addEventListener("click", () => deleteTask(task.id));
        document.body.appendChild(button);
        const bearbeiten = document.createElement("button")
        bearbeiten.innerText = "Taskname ändern"
        bearbeiten.addEventListener("click", () => renameTask(task.id));
        tableRow.append(createCell(task.id), createCell(task.title), createCell(task.completed));
        tableBody.appendChild(tableRow);
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
    const form = document.getElementById("add")
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
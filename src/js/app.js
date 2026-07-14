import '../css/style.css';
import { LocalStorageTaskRepository } from './repositories/LocalStorageTaskRepository.js';
import { TaskService } from './services/TaskService.js';

const taskRepository = new LocalStorageTaskRepository();
const taskService = new TaskService(taskRepository);

let currentFilter = 'all';

window.onload = function () {
    document.getElementById('addBtn').onclick = addTask;

    let filterButtons = document.querySelectorAll('.filter-btn');
    for (let i = 0; i < filterButtons.length; i++) {
        filterButtons[i].onclick = function () {
            filterTasks(this.getAttribute('data-filter'));
        };
    }

    document.getElementById('taskInput').onkeypress = function (e) {
        if (e.key === 'Enter') {
            addTask();
        }
    };

    renderTasks();
    updateStats();
};

function addTask() {
    let input = document.getElementById('taskInput');

    try {
        taskService.add(input.value);
        input.value = '';
        renderTasks();
        updateStats();
    } catch (error) {
        alert(error.message);
    }
}

function renderTasks() {
    let taskList = document.getElementById('taskList');
    taskList.innerHTML = '';

    let tasks = taskService.getAll();
    let filteredTasks = tasks;
    if (currentFilter == 'active') {
        filteredTasks = tasks.filter(function (task) {
            return !task.completed;
        });
    } else if (currentFilter == 'completed') {
        filteredTasks = tasks.filter(function (task) {
            return task.completed;
        });
    }

    for (let i = 0; i < filteredTasks.length; i++) {
        let task = filteredTasks[i];
        let taskDiv = document.createElement('div');
        taskDiv.className = 'task-item';

        if (task.completed) {
            taskDiv.className = 'task-item completed';
        }

        taskDiv.innerHTML =
            `<span>${task.text}</span>
            <div class="task-buttons">
              <button class="complete-btn" data-id="${task.id}">
                ${task.completed ? "Reactivar" : "Completar"}
              </button>
              <button class="delete-btn" data-id="${task.id}">Eliminar</button>
            </div>`;

        let completeBtn = taskDiv.querySelector('.complete-btn');
        let deleteBtn = taskDiv.querySelector('.delete-btn');

        completeBtn.onclick = function () {
            toggleTask(parseInt(this.getAttribute('data-id')));
        };

        deleteBtn.onclick = function () {
            deleteTask(parseInt(this.getAttribute('data-id')));
        };

        taskList.appendChild(taskDiv);
    }

    if (filteredTasks.length === 0) {
        taskList.innerHTML = '<p style="text-align: center; color: #999; padding: 20px;">No hay tareas para mostrar</p>';
    }
}

function toggleTask(id) {
    try {
        taskService.toggle(id);
        renderTasks();
        updateStats();
    } catch (error) {
        console.error(error.message);
    }
}

function deleteTask(id) {
    try {
        taskService.delete(id);
        renderTasks();
        updateStats();
    } catch (error) {
        console.error(error.message);
    }
}

function filterTasks(filter) {
    currentFilter = filter;

    let buttons = document.querySelectorAll('.filter-btn');
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].classList.remove('active');
    }

    if (filter == 'all') {
        buttons[0].classList.add('active');
    } else if (filter == 'active') {
        buttons[1].classList.add('active');
    } else {
        buttons[2].classList.add('active');
    }

    renderTasks();
}

function updateStats() {
    let stats = taskService.getStats();
    let statsDiv = document.getElementById('stats');
    statsDiv.innerHTML = 'Total: ' + stats.total + ' | Completadas: ' + stats.completed + ' | Activas: ' + stats.active;
}
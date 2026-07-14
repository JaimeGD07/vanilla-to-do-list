export class TaskListRenderer {
    #container;
    #onToggle;
    #onDelete;

    constructor(container, { onToggle, onDelete }) {
        this.#container = container;
        this.#onToggle = onToggle;
        this.#onDelete = onDelete;
    }

    render(tasks) {
        this.#container.innerHTML = '';

        if (tasks.length === 0) {
            this.#container.innerHTML =
                '<p style="text-align: center; color: #999; padding: 20px;">No hay tareas para mostrar</p>';
            return;
        }

        tasks.forEach(task => {
            this.#container.appendChild(this.#createTaskElement(task));
        });
    }

    #createTaskElement(task) {
        const taskDiv = document.createElement('div');
        taskDiv.className = task.completed ? 'task-item completed' : 'task-item';

        taskDiv.innerHTML = `
            <span>${task.text}</span>
            <div class="task-buttons">
              <button class="complete-btn" data-id="${task.id}">
                ${task.completed ? 'Reactivar' : 'Completar'}
              </button>
              <button class="delete-btn" data-id="${task.id}">Eliminar</button>
            </div>`;

        taskDiv.querySelector('.complete-btn').onclick = () => this.#onToggle(task.id);
        taskDiv.querySelector('.delete-btn').onclick = () => this.#onDelete(task.id);

        return taskDiv;
    }
}
const EMPTY_LIST_MESSAGE = 'No hay tareas para mostrar';

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
            this.#renderEmptyState();
            return;
        }

        tasks.forEach(task => {
            this.#container.appendChild(this.#createTaskElement(task));
        });
    }

    #renderEmptyState() {
        const message = document.createElement('p');
        message.textContent = EMPTY_LIST_MESSAGE;
        message.style.textAlign = 'center';
        message.style.color = '#999';
        message.style.padding = '20px';
        this.#container.appendChild(message);
    }

    #createTaskElement(task) {
        const taskDiv = document.createElement('div');
        taskDiv.className = task.completed ? 'task-item completed' : 'task-item';

        const completeLabel = task.completed ? 'Reactivar' : 'Completar';

        taskDiv.innerHTML = `
            <span>${task.text}</span>
            <div class="task-buttons">
              <button class="complete-btn" data-id="${task.id}">${completeLabel}</button>
              <button class="delete-btn" data-id="${task.id}">Eliminar</button>
            </div>`;

        taskDiv.querySelector('.complete-btn').onclick = () => this.#onToggle(task.id);
        taskDiv.querySelector('.delete-btn').onclick = () => this.#onDelete(task.id);

        return taskDiv;
    }
}
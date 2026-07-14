import { Task } from '../models/Task.js';

export class TaskService {
    #tasks = [];
    #nextId = 1;
    #repository;

    constructor(repository) {
        this.#repository = repository;
        this.#tasks = this.#repository.getAll();
        this.#nextId = this.#calculateNextId();
    }

    #calculateNextId() {
        if (this.#tasks.length === 0) return 1;
        return Math.max(...this.#tasks.map(task => task.id)) + 1;
    }

    getAll() {
        return [...this.#tasks];
    }

    add(text) {
        const trimmedText = text.trim();
        if (trimmedText === '') {
            throw new Error('El texto de la tarea no puede estar vacío');
        }

        const newTask = new Task(this.#nextId++, trimmedText);
        this.#tasks.push(newTask);
        this.#persist();
        return newTask;
    }

    toggle(id) {
        const task = this.#tasks.find(task => task.id === id);
        if (!task) {
            throw new Error(`No se encontró una tarea con id ${id}`);
        }
        task.completed = !task.completed;
        this.#persist();
        return task;
    }

    delete(id) {
        const initialLength = this.#tasks.length;
        this.#tasks = this.#tasks.filter(task => task.id !== id);

        if (this.#tasks.length === initialLength) {
            throw new Error(`No se encontró una tarea con id ${id}`);
        }
        this.#persist();
    }

    getStats() {
        const total = this.#tasks.length;
        const completed = this.#tasks.filter(task => task.completed).length;
        const active = total - completed;
        return { total, completed, active };
    }

    #persist() {
        this.#repository.save(this.#tasks);
    }
}
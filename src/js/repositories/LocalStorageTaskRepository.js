import { TaskRepository } from './TaskRepository.js';
import { Task } from '../models/Task.js';

const STORAGE_KEY = 'tasks';

export class LocalStorageTaskRepository extends TaskRepository {
    getAll() {
        const savedTasks = localStorage.getItem(STORAGE_KEY);
        if (!savedTasks) return [];

        try {
            const parsedTasks = JSON.parse(savedTasks);
            return parsedTasks.map(
                task => new Task(task.id, task.text, task.completed, task.createdAt)
            );
        } catch (error) {
            console.error('Error al leer las tareas guardadas:', error);
            return [];
        }
    }

    save(tasks) {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
        } catch (error) {
            console.error('Error al guardar las tareas:', error);
        }
    }
}
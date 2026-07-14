import { TaskRepository } from './TaskRepository.js';

/**
 * LSP: esta clase es 100% sustituible por LocalStorageTaskRepository
 * en cualquier lugar donde se use TaskRepository (ej. en TaskService),
 * sin romper ningún comportamiento esperado por quien la consume.
 * Útil para pruebas unitarias sin depender del navegador.
 */
export class InMemoryTaskRepository extends TaskRepository {
    #tasks = [];

    getAll() {
        return [...this.#tasks];
    }

    save(tasks) {
        this.#tasks = [...tasks];
    }
}
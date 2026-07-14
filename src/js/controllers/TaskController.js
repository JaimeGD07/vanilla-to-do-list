import { filterRegistry } from '../filters/filterRegistry.js';

/**
 * DIP: depende de abstracciones (taskService, renderers) inyectadas
 * por constructor, no las crea ni conoce sus detalles internos.
 * ISP: en vez de depender de un único "UIRenderer" con muchos métodos,
 * depende de tres renderers pequeños y enfocados (TaskListRenderer,
 * StatsRenderer, FilterButtonsRenderer), cada uno con solo lo que necesita.
 */

export class TaskController {
    #taskService;
    #taskListRenderer;
    #statsRenderer;
    #filterButtonsRenderer;
    #inputElement;
    #currentFilterKey = 'all';

    constructor({ taskService, taskListRenderer, statsRenderer, filterButtonsRenderer, inputElement }) {
        this.#taskService = taskService;
        this.#taskListRenderer = taskListRenderer;
        this.#statsRenderer = statsRenderer;
        this.#filterButtonsRenderer = filterButtonsRenderer;
        this.#inputElement = inputElement;
    }

    init() {
        this.#filterButtonsRenderer.onFilterSelected(filterKey => this.#applyFilter(filterKey));

        this.#inputElement.onkeypress = (event) => {
            if (event.key === 'Enter') this.addTask();
        };

        this.#filterButtonsRenderer.setActive(this.#currentFilterKey);
        this.#refresh();
    }

    addTask() {
        try {
            this.#taskService.add(this.#inputElement.value);
            this.#inputElement.value = '';
            this.#refresh();
        } catch (error) {
            alert(error.message);
        }
    }

    toggleTask(id) {
        try {
            this.#taskService.toggle(id);
            this.#refresh();
        } catch (error) {
            console.error(error.message);
        }
    }

    deleteTask(id) {
        try {
            this.#taskService.delete(id);
            this.#refresh();
        } catch (error) {
            console.error(error.message);
        }
    }

    #applyFilter(filterKey) {
        this.#currentFilterKey = filterKey;
        this.#filterButtonsRenderer.setActive(filterKey);
        this.#refresh();
    }

    #refresh() {
        const tasks = this.#taskService.getAll();
        const strategy = filterRegistry[this.#currentFilterKey] ?? filterRegistry.all;
        const filteredTasks = strategy.apply(tasks);

        this.#taskListRenderer.render(filteredTasks);
        this.#statsRenderer.render(this.#taskService.getStats());
    }
}
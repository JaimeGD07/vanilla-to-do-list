export class StatsRenderer {
    #container;

    constructor(container) {
        this.#container = container;
    }

    render(stats) {
        this.#container.innerHTML =
            `Total: ${stats.total} | Completadas: ${stats.completed} | Activas: ${stats.active}`;
    }
}
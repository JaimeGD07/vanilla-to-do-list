export class FilterButtonsRenderer {
    #buttons;

    constructor(buttons) {
        this.#buttons = buttons;
    }

    setActive(filterKey) {
        this.#buttons.forEach(button => {
            const isActive = button.getAttribute('data-filter') === filterKey;
            button.classList.toggle('active', isActive);
        });
    }

    onFilterSelected(callback) {
        this.#buttons.forEach(button => {
            button.onclick = () => callback(button.getAttribute('data-filter'));
        });
    }
}
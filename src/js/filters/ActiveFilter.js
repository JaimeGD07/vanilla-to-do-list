import { FilterStrategy } from './FilterStrategy.js';

export class ActiveFilter extends FilterStrategy {
    apply(tasks) {
        return tasks.filter(task => !task.completed);
    }
}
import { FilterStrategy } from './FilterStrategy.js';

export class CompletedFilter extends FilterStrategy {
    apply(tasks) {
        return tasks.filter(task => task.completed);
    }
}
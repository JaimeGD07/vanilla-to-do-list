import { FilterStrategy } from './FilterStrategy.js';

export class AllFilter extends FilterStrategy {
    apply(tasks) {
        return tasks;
    }
}
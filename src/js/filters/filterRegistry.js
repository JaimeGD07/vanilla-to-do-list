import { AllFilter } from './AllFilter.js';
import { ActiveFilter } from './ActiveFilter.js';
import { CompletedFilter } from './CompletedFilter.js';

export const filterRegistry = {
    all: new AllFilter(),
    active: new ActiveFilter(),
    completed: new CompletedFilter(),
};
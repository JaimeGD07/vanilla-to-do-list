import '../css/style.css';
import { LocalStorageTaskRepository } from './repositories/LocalStorageTaskRepository.js';
import { TaskService } from './services/TaskService.js';
import { TaskListRenderer } from './ui/TaskListRenderer.js';
import { StatsRenderer } from './ui/StatsRenderer.js';
import { FilterButtonsRenderer } from './ui/FilterButtonsRenderer.js';
import { TaskController } from './controllers/TaskController.js';

window.onload = function () {
    const taskRepository = new LocalStorageTaskRepository();
    const taskService = new TaskService(taskRepository);

    const taskListRenderer = new TaskListRenderer(document.getElementById('taskList'), {
        onToggle: (id) => controller.toggleTask(id),
        onDelete: (id) => controller.deleteTask(id),
    });
    const statsRenderer = new StatsRenderer(document.getElementById('stats'));
    const filterButtonsRenderer = new FilterButtonsRenderer(
        Array.from(document.querySelectorAll('.filter-btn'))
    );

    const controller = new TaskController({
        taskService,
        taskListRenderer,
        statsRenderer,
        filterButtonsRenderer,
        inputElement: document.getElementById('taskInput'),
    });

    document.getElementById('addBtn').onclick = () => controller.addTask();

    controller.init();
};
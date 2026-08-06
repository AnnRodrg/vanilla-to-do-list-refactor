import { LocalStorageTaskRepository } from './repositories/LocalStorageTaskRepository.js';
import { TaskService } from './services/TaskService.js';
import { TaskView } from './views/TaskView.js';
import { TaskController } from './controllers/TaskController.js';

/**
 * Punto de entrada de la aplicacion.
 * Aqui se realiza la composicion de dependencias (composition root),
 * cumpliendo DIP: las clases de alto nivel no crean sus propias
 * dependencias concretas, se les inyectan desde este punto central.
 */
function bootstrapApp() {
  const taskRepository = new LocalStorageTaskRepository();
  const taskService = new TaskService(taskRepository);
  const taskView = new TaskView({
    taskListId: 'taskList',
    statsId: 'stats',
    filterButtonsSelector: '.filter-btn',
  });
  const taskController = new TaskController(taskService, taskView);

  taskController.init();
}

window.addEventListener('DOMContentLoaded', bootstrapApp);
